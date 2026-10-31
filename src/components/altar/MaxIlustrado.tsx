import { useState } from "react";
import maxKawaii from "@/assets/max-kawaii.png.asset.json";

/** Ilustración de Max (PNG del usuario) con hotspot invisible sobre la nariz. */
export function MaxIlustrado({ booped, onBoop }: { booped: boolean; onBoop: () => void }) {
  const [near, setNear] = useState(false);
  return (
    <div className={`relative h-full w-full transition-transform duration-300 ease-out ${booped ? "max-boop" : near ? "scale-[1.02]" : ""}`}>
      <img src={maxKawaii.url} alt="Ilustración de Max, gatito siamés rodeado de cempasúchil" className="pointer-events-none h-full w-full select-none object-contain" draggable={false} />
      <button
        type="button"
        aria-label="Tocar la naricita de Max para entrar a su altar"
        onClick={onBoop}
        onMouseEnter={() => setNear(true)}
        onMouseLeave={() => setNear(false)}
        onFocus={() => setNear(true)}
        onBlur={() => setNear(false)}
        className="absolute h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
        style={{ left: "47.7%", top: "43.3%" }}
      >
        <span
          className={`pointer-events-none absolute inset-[15%] rounded-full transition-all duration-300 ${near || booped ? "opacity-100" : "opacity-0"} ${booped ? "nose-boop" : ""}`}
          style={{ background: "radial-gradient(circle, oklch(0.88 0.13 75 / .55), transparent 70%)" }}
        />
      </button>
    </div>
  );
}
