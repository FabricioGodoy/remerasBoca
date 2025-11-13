import React from "react";
import { useReducedMotion, motion } from "framer-motion";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export default function HeroModern() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative bg-black"
      style={{ marginTop: "2vh" }} // separa del navbar fixed
    >
      {/* Banner de imagen arriba */}
      <div className="relative h-[85vh] min-h-[520px]">
        <img
          src={`${process.env.PUBLIC_URL}/img/banner/MP9.jpg`}
          alt="Banner principal"
          className="h-full w-full object-cover"
        />

        {/* Fade para integrar la card */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
      </div>

      {/* Card de contenido montada sobre la imagen */}
      <div className="relative -mt-24 pb-20">
        <div
          className="mx-auto max-w-5xl rounded-3xl border px-10 py-12 shadow-xl bg-[#141416]/96 backdrop-blur-md"
          style={{ borderColor: "rgba(237, 229, 218, 0.25)" }}
        >
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-6 text-center"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md"
              style={{
                borderColor: "#d2983a",
                color: "#EDE5DA",
                backgroundColor: "rgba(210, 152, 58, 0.10)",
              }}
            >
              <span>Pasión xeneize en cada detalle</span>
            </div>

            {/* Headline */}
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #EDE5DA, #d2983a)",
                }}
              >
                Vestite como late La Bombonera.
              </span>
            </h1>

            {/* Subhead */}
            <p
              className="max-w-2xl text-base sm:text-lg lg:text-xl"
              style={{ color: "#EDE5DA" }}
            >
              Diseños exclusivos, calidad premium y la esencia del Xeneize en
              cada prenda. Elegí tu remera y llevá los colores más grandes del
              mundo en el pecho.
            </p>

            {/* Botones */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#remeras"
                className="rounded-xl px-5 py-3 text-sm font-semibold shadow-md"
                style={{ backgroundColor: "#d2983a", color: "#141416" }}
              >
                Ver colección xeneize
              </a>

              <a
                href="#modelos"
                className="rounded-xl px-5 py-3 text-sm font-semibold border"
                style={{ borderColor: "#EDE5DA", color: "#EDE5DA" }}
              >
                Todos los modelos
              </a>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-3xl">
              <div
                className="rounded-2xl border p-4"
                style={{ borderColor: "rgba(237, 229, 218, 0.25)" }}
              >
                <div
                  className="text-xl font-extrabold"
                  style={{ color: "#EDE5DA" }}
                >
                  +3.000
                </div>
                <div
                  className="text-xs opacity-80"
                  style={{ color: "#EDE5DA" }}
                >
                  Hinchas vistiendo nuestros diseños
                </div>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{ borderColor: "rgba(237, 229, 218, 0.25)" }}
              >
                <div
                  className="text-xl font-extrabold"
                  style={{ color: "#EDE5DA" }}
                >
                  5/5
                </div>
                <div
                  className="text-xs opacity-80"
                  style={{ color: "#EDE5DA" }}
                >
                  Calidad en confección
                </div>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{ borderColor: "rgba(237, 229, 218, 0.25)" }}
              >
                <div
                  className="text-xl font-extrabold"
                  style={{ color: "#EDE5DA" }}
                >
                  24/48 hs
                </div>
                <div
                  className="text-xs opacity-80"
                  style={{ color: "#EDE5DA" }}
                >
                  Envíos a todo el país
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
