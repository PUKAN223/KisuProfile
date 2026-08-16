import * as React from "react";
import { cn } from "@/lib/utils";

export interface DarkPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  labelRight?: string;
  strong?: boolean;
}

const DarkPanel = React.forwardRef<HTMLDivElement, DarkPanelProps>(
  ({ className, label, labelRight, strong = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border",
          strong
            ? "bg-[rgba(4,6,10,0.94)]"
            : "bg-[rgba(4,6,10,0.85)]",
          className
        )}
        style={{ borderColor: "rgba(70,105,130,0.55)" }}
        {...props}
      >
        {(label || labelRight) && (
          <div
            className="flex justify-between items-center px-3 py-1.5"
            style={{
              borderBottom: "1px solid rgba(70,105,130,0.4)",
              backgroundColor: "rgba(2,4,8,0.5)"
            }}
          >
            {label && (
              <span className="text-[8px] tracking-widest uppercase" style={{ color: "#506070" }}>
                {label}
              </span>
            )}
            {labelRight && (
              <span className="text-[8px] tracking-widest" style={{ color: "#506070" }}>
                {labelRight}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);
DarkPanel.displayName = "DarkPanel";

// Keep GlassPanel export for backward compat
const GlassPanel = DarkPanel;
export { GlassPanel, DarkPanel };
