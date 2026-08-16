"use client";

import { motion } from "framer-motion";
import { DS, b } from "@/lib/ds";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "0 24px" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, letterSpacing: "0.12em" }}>
          EDUCATION
        </span>
        <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3 }}>
          {String(education.length).padStart(2, "0")}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {education.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              borderTop: b,
              padding: "24px 0",
            }}
          >
            <div style={{ display: "flex", gap: 20 }}>
              {/* Left side: Logo */}
              {item.logo && (
                <div style={{ width: 64, height: 64, flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                  <img src={item.logo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", background: "transparent" }} />
                </div>
              )}
              
              {/* Right side: Content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                {/* Period + title */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ fontFamily: DS.font, fontSize: 13, fontWeight: 600, color: DS.text, margin: 0, lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <span style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, flexShrink: 0, marginTop: 2 }}>
                    {item.period}
                  </span>
                </div>

                {/* Institution */}
                <p style={{ fontFamily: DS.font, fontSize: 9, color: DS.text3, margin: 0, letterSpacing: "0.06em", lineHeight: 1.6 }}>
                  {item.institution}
                </p>

                {/* Description */}
                <p style={{ fontFamily: DS.font, fontSize: 10, color: DS.text2, margin: "4px 0 0", lineHeight: 1.8 }}>
                  {item.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{ fontFamily: DS.font, fontSize: 7, color: DS.text3, border: b, padding: "3px 10px", letterSpacing: "0.06em" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <div style={{ borderTop: b }} />
      </div>
    </motion.section>
  );
}
