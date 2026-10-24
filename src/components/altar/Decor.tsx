import { useEffect, useRef, useState, type ReactNode } from "react";

const rand = (i: number, s = 1) => {
  const x = Math.sin(i * 9301 + s * 49297) * 233280;
  return x - Math.floor(x);
};

export function Petals({ count = 28 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = 8 + rand(i, 2) * 14;
        return (
          <span
            key={i}
            className="anim-fall absolute -top-10 block rounded-[60%_40%_60%_40%]"
            style={{
              left: `${rand(i) * 100}%`,
              width: size,
              height: size * 0.8,
              background: i % 5 === 0 ? "var(--rosa)" : i % 3 === 0 ? "var(--oro)" : "var(--cempasuchil)",
              animationDuration: `${9 + rand(i, 3) * 10}s`,
              animationDelay: `${-rand(i, 4) * 18}s`,
              ["--drift" as string]: `${(rand(i, 5) - 0.5) * 200}px`,
              opacity: 0.85,
            }}
          />
        );
      })}
    </div>
  );
}

export function Sparkles({ count = 30 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="anim-twinkle absolute h-1 w-1 rounded-full bg-oro"
          style={{
            left: `${rand(i, 7) * 100}%`,
            top: `${rand(i, 8) * 100}%`,
            animationDelay: `${rand(i, 9) * 3}s`,
            boxShadow: "0 0 8px var(--oro)",
          }}
        />
      ))}
    </div>
  );
}

const PICADO_COLORS = ["var(--rosa)", "var(--cempasuchil)", "var(--crema)", "var(--oro)", "var(--cielo)"];

function PicadoFlag({ color, i }: { color: string; i: number }) {
  return (
    <div
      className="anim-sway relative shrink-0 transition-transform duration-300 hover:scale-110"
      style={{ animationDelay: `${i * 0.25}s`, animationDuration: `${3 + (i % 3)}s` }}
    >
      <svg viewBox="0 0 80 100" className="h-20 w-16 drop-shadow-lg sm:h-28 sm:w-24">
        <defs>
          <mask id={`m${i}`}>
            <rect width="80" height="100" fill="white" />
            <circle cx="40" cy="38" r="12" fill="black" />
            <circle cx="35" cy="36" r="3" fill="white" />
            <circle cx="45" cy="36" r="3" fill="white" />
            <path d="M37 44 L40 41 L43 44" fill="white" />
            {[15, 30, 50, 65].map((x) => (
              <path key={x} d={`M${x} 68 l5 -6 l5 6 l-5 6z`} fill="black" />
            ))}
            {[12, 26, 40, 54, 68].map((x) => (
              <circle key={x} cx={x} cy="14" r="3" fill="black" />
            ))}
          </mask>
        </defs>
        <path d="M0 0 H80 V86 L70 100 L60 86 L50 100 L40 86 L30 100 L20 86 L10 100 L0 86 Z" fill={color} mask={`url(#m${i})`} />
      </svg>
    </div>
  );
}

export function PapelPicado({ flags = 14 }: { flags?: number }) {
  return (
    <div aria-hidden className="relative w-full overflow-hidden">
      <div className="absolute left-0 right-0 top-1 h-0.5 bg-oro/70" />
      <div className="flex justify-center gap-1 sm:gap-2">
        {Array.from({ length: flags }).map((_, i) => (
          <PicadoFlag key={i} i={i} color={PICADO_COLORS[i % PICADO_COLORS.length]} />
        ))}
      </div>
    </div>
  );
}

export function Cempasuchil({ size = 64, className = "" }: { size?: number; className?: string }) {
  const rings = [
    { n: 16, r: 0.46, c: "var(--cempasuchil)" },
    { n: 12, r: 0.34, c: "oklch(0.8 0.17 70)" },
    { n: 9, r: 0.22, c: "var(--oro)" },
  ];
  return (
    <div
      className={`group inline-block transition-transform duration-500 hover:scale-125 hover:rotate-45 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="-50 -50 100 100" className="h-full w-full drop-shadow-[0_4px_10px_oklch(0.76_0.18_60/0.5)]">
        {rings.map((ring, ri) =>
          Array.from({ length: ring.n }).map((_, i) => {
            const a = (i / ring.n) * Math.PI * 2 + ri;
            return (
              <ellipse
                key={`${ri}-${i}`}
                cx={Math.cos(a) * ring.r * 50}
                cy={Math.sin(a) * ring.r * 50}
                rx={ring.r * 30}
                ry={ring.r * 18}
                transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * ring.r * 50} ${Math.sin(a) * ring.r * 50})`}
                fill={ring.c}
                stroke="oklch(0.6 0.17 45)"
                strokeWidth="0.8"
              />
            );
          }),
        )}
        <circle r="7" fill="oklch(0.6 0.17 45)" />
      </svg>
    </div>
  );
}

export function Veladora({ lit = true, big = false, onClick }: { lit?: boolean; big?: boolean; onClick?: () => void }) {
  const [boost, setBoost] = useState(false);
  return (
    <button
      type="button"
      aria-label="Veladora"
      onClick={() => {
        setBoost(true);
        setTimeout(() => setBoost(false), 1500);
        onClick?.();
      }}
      className="group relative flex flex-col items-center transition-transform duration-300 hover:-translate-y-1"
    >
      <div className={`relative ${big ? "h-14 w-8" : "h-10 w-6"}`}>
        {lit && (
          <>
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cempasuchil/40 blur-xl transition-all duration-500 ${boost ? "h-40 w-40" : "h-16 w-16 group-hover:h-24 group-hover:w-24"}`}
            />
            <div
              className="anim-flicker absolute bottom-0 left-1/2 -ml-[30%] h-full w-[60%] rounded-[50%_50%_50%_50%/60%_60%_40%_40%]"
              style={{ background: "radial-gradient(ellipse at 50% 80%, var(--crema), var(--oro) 35%, var(--cempasuchil) 70%, transparent)" }}
            />
          </>
        )}
      </div>
      <div className="h-1.5 w-0.5 bg-noche" />
      <div
        className={`${big ? "h-20 w-14" : "h-14 w-10"} rounded-b-md rounded-t-sm border border-oro/40`}
        style={{ background: "linear-gradient(180deg, var(--crema), oklch(0.85 0.06 80))", boxShadow: lit ? "0 -6px 20px oklch(0.76 0.18 60 / .5)" : undefined }}
      >
        <div className="mx-auto mt-3 h-1/2 w-3/4 rounded-sm bg-rosa/80" />
      </div>
    </button>
  );
}

export function Paw({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="16" cy="21" rx="7" ry="6" />
      <circle cx="7" cy="13" r="3" />
      <circle cx="12" cy="8" r="3" />
      <circle cx="20" cy="8" r="3" />
      <circle cx="25" cy="13" r="3" />
    </svg>
  );
}

export function PawTrail() {
  const [pops, setPops] = useState<number[]>([]);
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => setPops((p) => [...p, Date.now() + i])}
          style={{ transform: `translateY(${i % 2 ? -10 : 10}px) rotate(${i % 2 ? 15 : -15}deg)` }}
        >
          <Paw className="h-8 w-8 text-rosa/70 transition-all duration-300 hover:scale-125 hover:text-cempasuchil" />
          {pops.slice(-3).map((k) => (
            <Paw key={k} className="anim-paw-pop pointer-events-none absolute inset-0 h-8 w-8 text-oro" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setV(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${v ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
