import { useState } from "react";

/** Ilustración editorial de Max (siamés) con nariz interactiva invisible. */
export function MaxIlustrado({ booped, onBoop }: { booped: boolean; onBoop: () => void }) {
  const [near, setNear] = useState(false);
  const blink = near || booped;
  return (
    <div
      className={`max-cat relative h-full w-full ${near ? "is-near" : ""} ${booped ? "is-booped" : ""}`}
      onMouseEnter={() => setNear(true)}
      onMouseLeave={() => setNear(false)}
    >
      <svg viewBox="0 0 200 230" className="h-full w-full drop-shadow-[0_10px_18px_oklch(0.45_0.1_45/0.25)]" aria-hidden>
        <defs>
          <radialGradient id="mask" cx="50%" cy="58%" r="55%">
            <stop offset="0%" stopColor="var(--cafe)" />
            <stop offset="65%" stopColor="var(--cafe)" stopOpacity=".85" />
            <stop offset="100%" stopColor="var(--cafe)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.96 0.03 85)" />
            <stop offset="100%" stopColor="oklch(0.88 0.05 75)" />
          </linearGradient>
        </defs>
        {/* cola */}
        <g className="cat-tail">
          <path d="M138 212 C185 214 196 170 172 140" fill="none" stroke="var(--cafe)" strokeWidth="13" strokeLinecap="round" />
        </g>
        {/* cuerpo */}
        <path d="M62 222 C48 180 58 128 100 118 C142 128 152 180 138 222 Z" fill="url(#fur)" stroke="oklch(0.7 0.06 60)" strokeWidth="1.2" />
        <path d="M84 132 C92 150 108 150 116 132" fill="none" stroke="oklch(0.78 0.05 65)" strokeWidth="1.2" />
        {/* patitas */}
        <ellipse cx="84" cy="220" rx="13" ry="8" fill="var(--cafe)" />
        <ellipse cx="116" cy="220" rx="13" ry="8" fill="var(--cafe)" />
        {/* orejas */}
        <g className="cat-ear-l"><path d="M56 70 L60 20 L94 46 Z" fill="var(--cafe)" /><path d="M64 60 L66 32 L86 48 Z" fill="oklch(0.6 0.1 20)" opacity=".5" /></g>
        <g className="cat-ear-r"><path d="M144 70 L140 20 L106 46 Z" fill="var(--cafe)" /><path d="M136 60 L134 32 L114 48 Z" fill="oklch(0.6 0.1 20)" opacity=".5" /></g>
        {/* cabeza */}
        <ellipse cx="100" cy="82" rx="50" ry="44" fill="url(#fur)" stroke="oklch(0.7 0.06 60)" strokeWidth="1.2" />
        <ellipse cx="100" cy="94" rx="34" ry="31" fill="url(#mask)" />
        {/* ojos */}
        <g className="cat-eyes" style={{ transform: blink ? "scaleY(0.08)" : undefined }}>
          <path d="M72 82 Q82 72 92 82 Q82 90 72 82Z" fill="var(--cielo)" stroke="oklch(0.25 0.04 40)" strokeWidth="1.2" />
          <path d="M108 82 Q118 72 128 82 Q118 90 108 82Z" fill="var(--cielo)" stroke="oklch(0.25 0.04 40)" strokeWidth="1.2" />
          <ellipse cx="82" cy="81.5" rx="2.2" ry="4.6" fill="oklch(0.2 0.03 260)" />
          <ellipse cx="118" cy="81.5" rx="2.2" ry="4.6" fill="oklch(0.2 0.03 260)" />
          <circle cx="84" cy="79" r="1.2" fill="white" />
          <circle cx="120" cy="79" r="1.2" fill="white" />
        </g>
        {/* nariz + boca */}
        <g className="cat-nose">
          <path d="M95 99 Q100 97 105 99 L100 105 Z" fill="oklch(0.55 0.1 20)" />
        </g>
        <path d="M100 105 Q96 111 91 109 M100 105 Q104 111 109 109" fill="none" stroke="oklch(0.22 0.03 40)" strokeWidth="1.3" strokeLinecap="round" />
        {/* bigotes */}
        <g stroke="oklch(0.95 0.02 85)" strokeWidth=".9" strokeLinecap="round" opacity=".85">
          <path d="M84 104 L56 100 M84 107 L58 110" />
          <path d="M116 104 L144 100 M116 107 L142 110" />
        </g>
      </svg>
      {/* área táctil invisible sobre la nariz */}
      <button
        type="button"
        aria-label="Tocar la naricita de Max para entrar a su altar"
        onClick={onBoop}
        onFocus={() => setNear(true)}
        onBlur={() => setNear(false)}
        className="nose-hit absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
        style={{ left: "50%", top: "44%" }}
      >
        <span className="nose-glow pointer-events-none absolute inset-2 rounded-full" />
      </button>
    </div>
  );
}
