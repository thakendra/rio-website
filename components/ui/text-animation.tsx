"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Lightweight class name combiner (no external dependencies required).
 */
export function cn(...inputs: (string | number | boolean | undefined | null)[]): string {
  return inputs
    .filter((val): val is string => typeof val === "string" && val.trim().length > 0)
    .join(" ");
}

const STYLE_ID = "text-animation-block-reveal-styles";
const CSS = `
.tr-line-wrapper {
  position: relative;
  width: fit-content;
  max-width: 100%;
  display: block;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
.tr-line {
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
}
.tr-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 101%;
  height: 101%;
  pointer-events: none;
  will-change: transform;
  z-index: 1;
}
`;

/**
 * Injects self-contained CSS into the document head for 100% portable 21st.dev copy-paste.
 */
export function injectStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Returns fluid, responsive font-size clamp values across all screen sizes.
 */
export function getFontSize(size: string = "display"): string {
  switch (size) {
    case "sm":
      return "clamp(0.875rem, 1.5vw, 1.125rem)";
    case "base":
      return "clamp(1rem, 2vw, 1.375rem)";
    case "lg":
      return "clamp(1.375rem, 3vw, 2rem)";
    case "xl":
      return "clamp(1.75rem, 4vw, 2.75rem)";
    case "2xl":
    case "display":
      return "clamp(2rem, 5.5vw, 4.25rem)";
    case "huge":
      return "clamp(2.5rem, 7vw, 5.5rem)";
    default:
      return size;
  }
}

/**
 * Returns ideal proportional line-height based on font scale.
 */
export function getLineHeight(size: string = "display"): number {
  switch (size) {
    case "sm":
      return 1.6;
    case "base":
      return 1.5;
    case "lg":
      return 1.35;
    case "xl":
    case "2xl":
    case "display":
    case "huge":
    default:
      return 1.15;
  }
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface TextAnimationProps {
  /** Optional text string to animate. Can also be passed as children. */
  text?: string;
  /** React elements or raw text node — text lines are split at natural word-wrap boundaries. */
  children?: React.ReactNode;
  /** When true, animation fires once the element scrolls into viewport. Default false. */
  animateOnScroll?: boolean;
  /** Seconds before the reveal starts. Default 0. */
  delay?: number;
  /** Background color of the wiping block. Default "#aaff00". */
  blockColor?: string;
  /** Delay between subsequent lines in seconds. Default 0.1. */
  stagger?: number;
  /** Duration of the block wipe in seconds. Default 0.85. */
  duration?: number;
  /** Fluid responsive size preset. Defaults to "display" (clamp(2rem, 5.5vw, 4.25rem)). */
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "display" | "huge" | (string & {});
  /** Semantic HTML tag when rendering text prop or string children. Defaults to "h2". */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** Optional custom class name applied to container. */
  className?: string;
  /** Optional inline styles. */
  style?: React.CSSProperties;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  children,
  animateOnScroll = false,
  delay = 0,
  blockColor = "#aaff00",
  stagger = 0.1,
  duration = 0.85,
  size = "display",
  as: ComponentTag = "h2",
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitRefs = useRef<SplitText[]>([]);
  const linesRef = useRef<HTMLElement[]>([]);
  const blocksRef = useRef<HTMLElement[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const hasPlayed = useRef(false);

  const [ready, setReady] = useState(false);
  const [resizeTick, setResizeTick] = useState(0);

  // Inject self-contained styles once on mount
  useEffect(() => {
    injectStyles();
  }, []);

  // Check for intro screen lock if present
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).__INTRO_BLOCKED__) {
      const handler = () => {
        window.removeEventListener("intro-unblocked", handler);
        setReady(true);
      };
      window.addEventListener("intro-unblocked", handler);
    } else {
      setReady(true);
    }
  }, []);

  // Debounced resize listener: recalculates line wraps responsively on all screens
  useEffect(() => {
    if (!ready) return;
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        hasPlayed.current = false;
        setResizeTick((t) => t + 1);
      }, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  useGSAP(
    async () => {
      if (!ready) return;
      const container = containerRef.current;
      if (!container) return;

      if (document.fonts) await document.fonts.ready;

      // ── Teardown ──────────────────────────────────────────────────────────
      triggersRef.current.forEach((t) => t.kill());
      splitRefs.current.forEach((s) => s.revert());
      container.querySelectorAll(".tr-line-wrapper").forEach((wrapper) => {
        const w = wrapper as HTMLElement;
        const first = w.firstChild as HTMLElement | null;
        if (first && w.parentNode) {
          w.parentNode.insertBefore(first, w);
          w.remove();
        }
      });
      splitRefs.current = [];
      linesRef.current = [];
      blocksRef.current = [];
      triggersRef.current = [];

      // ── Split lines ───────────────────────────────────────────────────────
      const elements = Array.from(container.children) as HTMLElement[];

      elements.forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "tr-line",
        });
        splitRefs.current.push(split);

        split.lines.forEach((line) => {
          const node = line as HTMLElement;
          const parent = node.parentNode as HTMLElement;

          const wrapper = document.createElement("div");
          wrapper.className = "tr-line-wrapper";
          parent.insertBefore(wrapper, node);
          wrapper.appendChild(node);

          const block = document.createElement("div");
          block.className = "tr-block";
          block.style.backgroundColor = blockColor;
          wrapper.appendChild(block);

          linesRef.current.push(node);
          blocksRef.current.push(block);
        });
      });

      // If already played (e.g. after resize), keep text visible
      if (hasPlayed.current) {
        gsap.set(linesRef.current, { opacity: 1 });
        gsap.set(blocksRef.current, { scaleX: 0 });
        return;
      }

      gsap.set(linesRef.current, { opacity: 0 });
      gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left center" });

      const playLine = (block: HTMLElement, line: HTMLElement, index: number) =>
        gsap
          .timeline({ delay: delay + index * stagger })
          .to(block, { scaleX: 1, duration, ease: "power4.inOut" })
          .set(line, { opacity: 1 })
          .set(block, { transformOrigin: "right center" })
          .to(block, { scaleX: 0, duration, ease: "power4.inOut" });

      if (animateOnScroll) {
        const master = gsap.timeline({ paused: true });
        blocksRef.current.forEach((block, i) =>
          master.add(playLine(block, linesRef.current[i], i), 0)
        );

        const trigger = ScrollTrigger.create({
          trigger: container,
          start: "top 85%",
          once: true,
          onEnter: () => {
            hasPlayed.current = true;
            master.play();
          },
        });
        triggersRef.current.push(trigger);
      } else {
        hasPlayed.current = true;
        blocksRef.current.forEach((block, i) =>
          playLine(block, linesRef.current[i], i)
        );
      }

      return () => {
        triggersRef.current.forEach((t) => t.kill());
        splitRefs.current.forEach((s) => s.revert());
        container.querySelectorAll(".tr-line-wrapper").forEach((wrapper) => {
          const w = wrapper as HTMLElement;
          const first = w.firstChild as HTMLElement | null;
          if (first && w.parentNode) {
            w.parentNode.insertBefore(first, w);
            w.remove();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [ready, resizeTick, animateOnScroll, delay, blockColor, stagger, duration],
    }
  );

  const fontSize = getFontSize(size);
  const lineHeight = getLineHeight(size);

  // Render text prop or raw string if passed, otherwise children
  const content =
    text || typeof children === "string" ? (
      <ComponentTag
        style={{
          fontSize,
          lineHeight,
          letterSpacing: "-0.025em",
          margin: 0,
          fontWeight: 700,
          textAlign: "center",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
      >
        {text || children}
      </ComponentTag>
    ) : (
      children
    );

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center",
        className
      )}
      style={{
        width: "100%",
        maxWidth: "min(92vw, 68rem)",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        boxSizing: "border-box",
        overflowX: "hidden",
        ...style,
      }}
    >
      {content}
    </div>
  );
};

// Also export as TextReveal for alias compatibility
export const TextReveal = TextAnimation;
export default TextAnimation;

// ─── Standalone Demo Component ────────────────────────────────────────────────

export function TextAnimationDemo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#09090b",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(2rem, 5vw, 4rem) 1rem",
        gap: "clamp(2.5rem, 5vw, 4rem)",
        fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Eyebrow */}
      <TextAnimation
        size="sm"
        as="p"
        blockColor="#34d399"
        duration={0.7}
        text="Editorial Block-Wipe Reveal"
      />

      {/* Main Big Responsive Headline */}
      <TextAnimation
        size="display"
        as="h1"
        delay={0.15}
        blockColor="#aaff00"
        duration={0.85}
        text="Design is not just what it looks like. It is how it feels."
      />

      {/* Secondary Responsive Subtitle */}
      <TextAnimation
        size="base"
        as="p"
        delay={0.35}
        blockColor="#c084fc"
        duration={0.8}
        text="Craft is the invisible detail separating ordinary from unforgettable experiences."
      />
    </div>
  );
}
