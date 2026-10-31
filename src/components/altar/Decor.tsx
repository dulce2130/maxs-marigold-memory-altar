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

const PICADO_COLORS = ["var(--rosa)", "var(--cempasuchil)", "var(--turquesa)", "var(--oro)", "var(--verde)"];

function PicadoFlag({ color, i, s, h }: { color: string; i: number; s: number; h: string }) {
  const j = (k: number, amt = 3) => (rand(i * 7 + k, s) - 0.5) * amt;
  const id = `pm${s}-${i}`;
  const design = i % 3;
  return (
    <div
      className="anim-sway relative shrink-0"
      style={{ animationDelay: `${-rand(i, s) * 6}s`, animationDuration: `${6 + rand(i, s + 1) * 4}s`, rotate: `${j(1, 4)}deg` }}
    >
      <svg viewBox="0 0 80 100" className={`${h} drop-shadow-[0_3px_3px_oklch(0.4_0.08_40/0.2)]`}>
        <defs>
          <mask id={id}>
            <rect width="80" height="100" fill="white" />
            {design === 0 && (
              <g fill="black">
                {[0, 1, 2, 3, 4, 5].map((p) => (
                  <ellipse key={p} cx={40 + j(2)} cy={44} rx="5" ry="11" transform={`rotate(${p * 60 + j(p)} 40 44) translate(0 -9)`} />
                ))}
                <circle cx="40" cy="44" r="3" fill="white" />
              </g>
            )}
            {design === 1 && (
              <path fill="black" d={`M40 ${60 + j(3)} C${18 + j(4)} 44 ${26 + j(5)} 24 40 36 C${54 + j(6)} 24 ${62 + j(7)} 44 40 ${60 + j(3)}Z`} />
            )}
            {design === 2 && (
              <g fill="black">
                <path d={`M40 22 L${52 + j(8)} 44 L40 66 L${28 + j(9)} 44Z`} />
                <circle cx="40" cy="44" r="5" fill="white" />
              </g>
            )}
            {[12, 26, 40, 54, 68].map((x, k) => (
              <circle key={x} cx={x + j(k + 10, 2)} cy={12 + j(k + 20, 2)} r={2 + rand(i + k, s) * 1.5} fill="black" />
            ))}
            {[16, 32, 48, 64].map((x, k) => (
              <path key={x} d={`M${x} ${76 + j(k + 30, 2)} l4 -5 l4 5 l-4 5z`} fill="black" />
            ))}
          </mask>
        </defs>
        <path d={`M0 0 H80 V${86 + j(40)} L70 98 L60 ${86 + j(41)} L50 98 L40 ${86 + j(42)} L30 98 L20 ${86 + j(43)} L10 98 L0 86 Z`} fill={color} mask={`url(#${id})`} opacity=".93" />
      </svg>
    </div>
  );
}

export function PapelPicado({ flags = 14, seed = 1, size = "h-20 w-16 sm:h-28 sm:w-24", offset = 0 }: { flags?: number; seed?: number; size?: string; offset?: number }) {
  return (
    <div aria-hidden className="relative w-full overflow-hidden">
      <div className="absolute left-0 right-0 top-0.5 h-px bg-terracota/60" />
      <div className="flex justify-center gap-0.5 sm:gap-1">
        {Array.from({ length: flags }).map((_, i) => (
          <PicadoFlag key={i} i={i} s={seed} h={size} color={PICADO_COLORS[(i + offset) % PICADO_COLORS.length]!} />
        ))}
      </div>
    </div>
  );
}

/** Varias tiras superpuestas de distintos tamaños. */
export function PicadoStrips() {
  return (
    <div aria-hidden className="pointer-events-none relative h-24 w-full shrink-0 sm:h-36">
      <div className="absolute inset-x-0 top-0 z-30"><PapelPicado seed={1} flags={22} size="h-12 w-9 sm:h-16 sm:w-12" /></div>
      <div className="absolute inset-x-0 top-3 z-20 -translate-x-4 opacity-95 sm:top-5"><PapelPicado seed={2} flags={16} offset={2} size="h-16 w-12 sm:h-24 sm:w-[4.5rem]" /></div>
      <div className="absolute inset-x-0 top-1 z-10 translate-x-6 opacity-80"><PapelPicado seed={3} flags={12} offset={4} size="h-20 w-16 sm:h-32 sm:w-24" /></div>
    </div>
  );
}

export function Hoja({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M4 28 C4 12 14 4 28 4 C28 18 20 28 4 28Z" fill="var(--verde)" />
      <path d="M6 26 L24 8" stroke="oklch(0.4 0.08 145)" strokeWidth="1" />
    </svg>
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
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setV(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${v ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
