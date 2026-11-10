import { useState, useEffect } from "react";
import { TweakConfig } from "../types";

interface PartnersPanelProps {
  config: TweakConfig;
  width?: number | string;
  height?: number;
  logoWidth?: number;
  logoHeight?: number;
  centerVertically?: boolean;
  rightOffset?: number;
  topOffset?: number;
  bottomOffset?: number;
}

const SLIDE_INTERVAL_MS = 4000;

const PartnersPanel = ({
  config,
  width = 420,
  height = 230,
  logoWidth = 160,
  logoHeight = 80,
  centerVertically = false,
  rightOffset = 30,
  topOffset = 50,
  bottomOffset,
}: PartnersPanelProps) => {
  const { primary, accent, bgPanel } = config;
  const partners = config.partners ?? [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (partners.length <= 1) return;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % partners.length);
        setVisible(true);
      }, 400);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [partners.length]);

  // Reset index when partners list shrinks
  useEffect(() => {
    if (activeIndex >= partners.length && partners.length > 0) {
      setActiveIndex(0);
    }
  }, [partners.length, activeIndex]);

  if (partners.length === 0) return null;

  const partner = partners[activeIndex];

  return (
    <div
      style={{
        position: "absolute",
        right: rightOffset,
        top: centerVertically ? "50%" : bottomOffset === undefined ? topOffset : undefined,
        bottom: centerVertically ? undefined : bottomOffset,
        transform: centerVertically ? "translateY(-50%)" : undefined,
        width: width,
        height,
        background: bgPanel,
        border: `1px solid ${accent}59`,
        borderRadius: 20,
        boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${accent}26 inset, 0 0 60px ${primary}26`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: `${accent}B3`,
          fontFamily: "var(--font-body, Inter, sans-serif)",
        }}
      >
        Parceiros
      </span>

      {/* Logo + name */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div
          style={{
            width: logoWidth,
            height: logoHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            key={partner?.logoUrl}
            src={partner?.logoUrl}
            alt={partner?.name}
            style={{
              userSelect: "none",
              pointerEvents: "none",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              marginBottom: 5,
              filter: partner?.monochrome
                ? "brightness(0) invert(1)"
                : undefined,
            }}
          />
        </div>
      </div>

      {/* Dots */}
      {partners.length > 1 && (
        <div style={{ display: "flex", gap: 5 }}>
          {partners.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeIndex ? 16 : 5,
                height: 5,
                borderRadius: 999,
                background:
                  i === activeIndex
                    ? `${accent}E6`
                    : "rgba(255,255,255,0.2)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnersPanel;
