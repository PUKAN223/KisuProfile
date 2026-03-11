import { NextResponse } from "next/server";

const GITHUB_USERNAME = "PUKAN223";
const GITHUB_API = "https://api.github.com";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  open_issues_count: number;
  watchers_count: number;
  visibility: string;
}

let cache: { data: GithubRepo[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  // Return cached data if still fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Attach token if available for higher rate limits (60 → 5000 req/hr)
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    // Fetch all public (non-fork) repos — paginated to grab full list
    let allRepos: GithubRepo[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const res = await fetch(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=${perPage}&page=${page}`,
        { headers, next: { revalidate: 300 } },
      );

      if (!res.ok) {
        const text = await res.text();
        console.error(`GitHub API error ${res.status}: ${text}`);

        // If we have stale cache, serve it rather than error
        if (cache) {
          return NextResponse.json(cache.data, {
            headers: { "X-Cache": "STALE" },
          });
        }

        return NextResponse.json(
          { error: `GitHub API returned ${res.status}` },
          { status: res.status },
        );
      }

      const batch: GithubRepo[] = await res.json();
      allRepos = allRepos.concat(batch);

      // Stop if we received fewer than perPage (last page)
      if (batch.length < perPage) break;
      page++;
    }

    // Filter out forks & archived repos, then sort by stars descending
    const filtered = allRepos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5);

    // Update cache
    cache = { data: filtered, fetchedAt: Date.now() };

    return NextResponse.json(filtered, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);

    if (cache) {
      return NextResponse.json(cache.data, {
        headers: { "X-Cache": "STALE" },
      });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
