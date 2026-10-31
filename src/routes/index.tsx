import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import maxPhoto from "@/assets/max.png.asset.json";
import { Cempasuchil, Hoja, Paw, PawTrail, PicadoStrips, Petals, Reveal, Sparkles, Veladora } from "@/components/altar/Decor";
import { MaxIlustrado } from "@/components/altar/MaxIlustrado";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Max · Día de Muertos" },
      { name: "description", content: "Un altar digital lleno de cempasúchil, veladoras y amor para Max, nuestro gatito siamés de ojos azules." },
      { property: "og:title", content: "Altar de Max · Día de Muertos" },
      { property: "og:description", content: "Un pequeño homenaje para un gatito muy amado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHOTO = maxPhoto.url;

function Intro({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);
  const [booped, setBooped] = useState(false);
  const enter = () => {
    if (opening || booped) return;
    setBooped(true);
    setTimeout(() => setOpening(true), 550);
    setTimeout(onEnter, 2000);
  };
  const flowers = [
    { x: 4, y: 78, s: 64 }, { x: 14, y: 50, s: 46 }, { x: 22, y: 92, s: 52 },
    { x: 96, y: 74, s: 60 }, { x: 86, y: 46, s: 42 }, { x: 80, y: 94, s: 50 },
  ];
  return (
    <div
      className={`amate fixed inset-0 z-50 flex flex-col items-center overflow-hidden transition-all duration-[1400ms] ${opening ? "scale-105 opacity-0" : ""}`}
    >
      <PicadoStrips />
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 pb-6">
        <div className="relative" style={{ width: "min(400px, 82vw, 46vh)", aspectRatio: "1 / 1" }}>
          <div className="absolute -inset-10 rounded-full opacity-50" style={{ background: "radial-gradient(circle, oklch(0.85 0.15 75 / .7), transparent 65%)" }} />
          <MaxIlustrado booped={booped} onBoop={enter} />
        </div>
        <p className="mt-1 font-script text-2xl text-terracota sm:text-3xl">Bienvenido</p>
        <h1 className="text-center font-display text-4xl leading-tight text-foreground sm:text-5xl">Un altar para Max</h1>
        <p className="mt-2 flex items-center gap-2 text-center text-base text-muted-foreground sm:text-lg">
          <Paw className="h-4 w-4 text-rosa" /> Toca su naricita para entrar
        </p>
      </div>
      {booped && <Petals count={45} />}
    </div>
  );
}

function Hero({ scroll }: { scroll: number }) {
  const arc = Array.from({ length: 15 });
  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden pb-20">
      <div className="absolute inset-0" style={{ transform: `translateY(${scroll * 0.3}px)` }}>
        <Sparkles count={50} />
      </div>
      <div className="absolute top-[30%] h-[600px] w-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, var(--cempasuchil), transparent 70%)", filter: "blur(60px)" }} />
      <div className="relative z-10 w-full"><PicadoStrips /></div>

      <div className="relative z-10 mt-6 px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <p className="font-script text-2xl text-terracota sm:text-3xl">En memoria de</p>
        <h1 className="font-display text-7xl leading-none text-fiesta drop-shadow-[0_4px_30px_oklch(0.76_0.18_60/0.4)] sm:text-9xl">Max</h1>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">Un pequeño homenaje para un gatito muy amado</p>
      </div>

      <div className="relative z-10 mt-24 flex justify-center">
        {/* arco */}
        <div className="pointer-events-none absolute -inset-x-16 -top-12 bottom-24 sm:-inset-x-24">
          {arc.map((_, i) => {
            const a = Math.PI - (i / (arc.length - 1)) * Math.PI;
            return (
              <div key={i} className="pointer-events-auto absolute anim-float" style={{ left: `${50 + Math.cos(a) * 48}%`, top: `${48 - Math.sin(a) * 46}%`, transform: "translate(-50%,-50%)", animationDelay: `${i * 0.2}s` }}>
                <Cempasuchil size={i % 2 ? 46 : 60} />
              </div>
            );
          })}
        </div>
        <div className="group relative">
          <div className="absolute -inset-4 rounded-t-full bg-gradient-to-b from-oro/50 to-rosa/30 blur-2xl transition-all duration-700 group-hover:-inset-8 group-hover:from-oro/80" />
          <div className="relative h-[380px] w-[260px] overflow-hidden rounded-t-full border-[6px] border-oro bg-terracota sm:h-[460px] sm:w-[320px]">
            <img src={PHOTO} alt="Retrato de Max" className="h-full w-full object-cover object-[50%_28%] transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-terracota/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 w-full text-center font-script text-3xl text-crema">Max</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-end gap-6 sm:gap-10">
        <Veladora /><Veladora big /><Cempasuchil size={56} /><Veladora big /><Veladora />
      </div>
      <a href="#nuestro-max" className="relative z-10 mt-12 flex flex-col items-center gap-2 text-terracota transition-transform hover:scale-110">
        <span className="text-sm tracking-widest">RECORDARLO</span>
        <Paw className="anim-float h-6 w-6" />
      </a>
    </section>
  );
}

function NuestroMax() {
  const traits = [
    { t: "Ojitos azules", d: "Como un pedacito de cielo que nos miraba." },
    { t: "Elegante", d: "Caminaba como si la casa fuera su palacio." },
    { t: "Flojito", d: "Experto en siestas al sol y en cualquier cojín." },
    { t: "Exigente", d: "Solo comía lo que él aprobaba. Un gourmet." },
  ];
  return (
    <section id="nuestro-max" className="textura relative px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="font-script text-3xl text-rosa">Siempre en nuestro corazón</p>
          <h2 className="mt-2 font-display text-5xl text-foreground sm:text-6xl">Nuestro Max</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Max fue un gatito muy especial: un <strong className="text-terracota">siamés mestizo</strong> de hermosos <strong className="text-cielo">ojos azules</strong>, elegante presencia y una personalidad inolvidable. Flojito, adorable y siempre exigente con su comida, dejó huellitas para siempre en nuestro corazón.
          </p>
          <PawTrail />
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {traits.map((x, i) => (
            <Reveal key={x.t} delay={i * 120}>
              <div className="card-altar h-full p-5">
                <Paw className="h-6 w-6 text-cempasuchil" />
                <h3 className="mt-3 font-display text-xl text-terracota">{x.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Recuerdos() {
  const cards = [
    { pos: "50% 30%", q: "Esa mirada que lo decía todo", rot: "-2deg" },
    { pos: "40% 55%", q: "Sentadito, esperando su comida favorita", rot: "1.5deg" },
    { pos: "20% 42%", q: "Su colita siempre presumida", rot: "-1deg" },
  ];
  return (
    <section className="relative px-4 py-24">
      <Reveal className="text-center">
        <p className="font-script text-3xl text-cempasuchil">Momentos especiales</p>
        <h2 className="font-display text-5xl text-foreground">Recuerdos</h2>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 150}>
            <figure className="card-altar group overflow-hidden p-3" style={{ rotate: c.rot }}>
              <div className="relative h-72 overflow-hidden rounded-2xl">
                <img src={PHOTO} alt={c.q} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: c.pos }} />
                <div className="absolute right-2 top-2"><Cempasuchil size={40} /></div>
              </div>
              <figcaption className="px-2 py-4 text-center font-script text-2xl text-foreground">{c.q}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Ofrenda() {
  const [plate, setPlate] = useState(false);
  const items = [
    { e: "veladora", t: "Veladoras", d: "Su luz guía a Max de regreso a casa." },
    { e: "flor", t: "Cempasúchil", d: "Su color y aroma marcan el camino." },
    { e: "picado", t: "Papel picado", d: "El viento que anuncia su visita." },
    { e: "huella", t: "Huellitas", d: "Las que dejó en cada rincón." },
  ];
  return (
    <section className="relative overflow-hidden px-4 py-24" style={{ background: "linear-gradient(180deg, transparent, oklch(0.88 0.07 70 / .6), transparent)" }}>
      <Sparkles count={25} />
      <Reveal className="text-center">
        <p className="font-script text-3xl text-terracota">Lo que le ofrecemos</p>
        <h2 className="font-display text-5xl text-foreground">La ofrenda</h2>
      </Reveal>

      {/* altar escalonado */}
      <Reveal className="mx-auto mt-14 max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-4"><Cempasuchil size={44} /><div className="h-28 w-20 overflow-hidden rounded-t-full border-4 border-oro transition-all duration-500 hover:glow-warm"><img src={PHOTO} alt="Retrato pequeño de Max" className="h-full w-full object-cover object-[60%_30%]" /></div><Cempasuchil size={44} /></div>
          <div className="h-5 w-56 rounded-sm bg-rosa shadow-lg" />
          <div className="flex items-end gap-6 pt-3"><Veladora /><Veladora /><button type="button" onClick={() => setPlate((p) => !p)} className="group relative flex flex-col items-center transition-transform hover:scale-110" aria-label="El platito de Max">
            <span className={`absolute -top-12 whitespace-nowrap rounded-full bg-crema px-3 py-1 text-xs font-bold text-foreground transition-all ${plate ? "opacity-100" : "opacity-0 group-hover:opacity-70"}`}>{plate ? "¡Solo del bueno, como le gustaba!" : "Su platito"}</span>
            <div className="flex gap-1">{[0, 1, 2].map((k) => <span key={k} className="h-3 w-4 rounded-full bg-cempasuchil" />)}</div>
            <div className="h-4 w-20 rounded-b-full bg-cielo" />
          </button><Veladora /><Veladora /></div>
          <div className="h-5 w-80 rounded-sm bg-cempasuchil shadow-lg sm:w-[28rem]" />
          <div className="flex items-end gap-3 pt-3">{Array.from({ length: 7 }).map((_, i) => i % 2 ? <Cempasuchil key={i} size={50} /> : <Veladora key={i} />)}</div>
          <div className="h-5 w-[20rem] rounded-sm bg-turquesa shadow-lg sm:w-[40rem]" style={{ boxShadow: "0 10px 40px oklch(0 0 0 / .5)" }} />
        </div>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 100}>
            <div className="card-altar h-full p-6 text-center">
              <div className="flex h-20 items-end justify-center">
                {it.e === "veladora" && <Veladora />}
                {it.e === "flor" && <Cempasuchil size={60} />}
                {it.e === "picado" && <div className="anim-sway h-16 w-14 bg-rosa [clip-path:polygon(0_0,100%_0,100%_80%,80%_100%,60%_80%,40%_100%,20%_80%,0_100%)]" />}
                {it.e === "huella" && <Paw className="h-14 w-14 text-rosa transition-transform hover:scale-125 hover:rotate-12" />}
              </div>
              <h3 className="mt-4 font-display text-xl text-terracota">{it.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Despedida() {
  const [lit, setLit] = useState(0);
  return (
    <footer className="textura relative overflow-hidden px-4 pb-16 pt-24 text-center">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 transition-all duration-1000" style={{ background: `radial-gradient(ellipse at 50% 100%, oklch(0.76 0.18 60 / ${0.15 + Math.min(lit, 12) * 0.04}), transparent 70%)` }} />
      <Reveal>
        <p className="font-script text-3xl text-rosa">Hasta pronto, pequeño</p>
        <h2 className="mx-auto mt-2 max-w-3xl font-display text-4xl leading-tight text-foreground sm:text-6xl">
          Las huellitas de <span className="text-fiesta">Max</span> siguen con nosotros
        </h2>
        <button
          type="button"
          onClick={() => setLit((n) => n + 1)}
          className="mt-10 rounded-full px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95 glow-warm"
          style={{ background: "var(--gradient-fiesta)" }}
        >
          🕯️ Encender una veladora para Max
        </button>
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {lit === 0 ? "Cada luz es un recuerdo." : `${lit} ${lit === 1 ? "veladora encendida" : "veladoras encendidas"} con amor`}
        </p>
        <div className="mx-auto mt-8 flex min-h-24 max-w-3xl flex-wrap items-end justify-center gap-4">
          {Array.from({ length: lit }).map((_, i) => (
            <div key={i} className="animate-in zoom-in fade-in duration-700"><Veladora /></div>
          ))}
        </div>
        <div className="mt-12 flex justify-center gap-3">{[0, 1, 2, 3, 4].map((i) => <Cempasuchil key={i} size={36} />)}</div>
        <p className="mt-8 font-script text-2xl text-terracota">Gracias por acompañar el recuerdo de Max</p>
      </Reveal>
    </footer>
  );
}

function Index() {
  const [entered, setEntered] = useState(false);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const on = () => setScroll(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
  }, [entered]);

  return (
    <main className="relative">
      {!entered && <Intro onEnter={() => setEntered(true)} />}
      {entered && (
        <div className="animate-in fade-in duration-1000">
          <Petals />
          <Hero scroll={scroll} />
          <NuestroMax />
          <Recuerdos />
          <Ofrenda />
          <Despedida />
        </div>
      )}
    </main>
  );
}
