import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Phone, Package, Star } from "lucide-react";
import { WHATSAPP_PHONE } from "../config";

// Paleta: base neutral + acentos originales del logo
// (mismos keys para no romper nada)
const COLORS = {
  midnight: "#141416",   // antes #0d112d → ahora grafito
  navy: "#2b3036",       // antes #002155 → ahora gris pizarra
  gold: "#d2983a",       // SE MANTIENE el dorado original del logo
  sand: "#EDE5DA",       // SE MANTIENE arena (ajuste de mayúsculas en hex)
};

// Utilidad local (si ya la tenés global, quitá esta y usá la tuya)
const buildWhatsAppLink = (message = "", phone?: string) => {
  const digits = (phone || "").replace(/\D/g, "");
  const base = digits ? `https://wa.me/${digits}` : "https://wa.me/";
  const params = new URLSearchParams({ text: message });
  return `${base}?${params.toString()}`;
};

export interface HeroProps {
  headline?: string;
  subhead?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  whatsappMessage?: string;
  secondaryHref?: string; // Ej: "#packages"
  backgroundImageUrl?: string; // Opcional: coloca una imagen de fondo
  stats?: Array<{ label: string; value: string }>;
}

// Hero minimalista, rápido y con animación súper ligera (respeta reduced-motion)
export default function Hero({
  headline = "Soluciones claras. Resultados medibles.",
  subhead =
    "Presentá tu propuesta con una estética prolija y confiable, sin humo y con foco en lo que importa.",
  primaryCtaText = "Escribinos por WhatsApp",
  secondaryCtaText = "Ver paquetes",
  whatsappMessage = "¡Hola! Quiero info de los paquetes.",
  secondaryHref = "#packages",
  backgroundImageUrl,
  stats = [
    { value: "+500", label: "clientes satisfechos" },
    { value: "4.9/5", label: "calificación promedio" },
    { value: "24h", label: "respuesta rápida" },
  ],
}: HeroProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden"
      style={{
        // Base neutral (pizarra → grafito), no azul fuerte
        background: `radial-gradient(1200px 600px at 10% -10%, ${COLORS.navy} 0%, ${COLORS.midnight} 60%)`,
        border: `12px solid rgba(237, 229, 218, 0.24)`, // sand
        borderRadius: 200,
        margin: "5vh 10px 30px 10px",
        height: "85vh",
      }}
    >
      {/* Fondo opcional con imagen + velo */}
      {backgroundImageUrl && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: backgroundImageUrl
            ? `linear-gradient(180deg, rgba(20,22,23,0.8), rgba(20,22,23,0.9))` // velo sobre imagen (midnight neutral)
            : "transparent",
        }}
      />

      {/* Decoración sutil en dorado (identidad del logo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-25"
        style={{ background: COLORS.gold }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex min-h-[80vh] flex-col items-center justify-center gap-8 py-20 text-center"
        >
          {/* Badge superior */}
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md"
            style={{
              borderColor: COLORS.gold,
              color: COLORS.sand,
              backgroundColor: "rgba(210, 152, 58, 0.10)", // dorado suave
            }}
          >
            <Star className="h-3.5 w-3.5" />
            <span>Calidad que se nota desde el primer scroll</span>
          </div>

          {/* Headline con degradado arena → dorado (como el logo) */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${COLORS.sand}, ${COLORS.gold})`,
              }}
            >
              {headline}
            </span>
          </h1>

          {/* Subhead en arena para buena lectura */}
          <p className="max-w-2xl text-base sm:text-lg lg:text-xl" style={{ color: COLORS.sand }}>
            {subhead}
          </p>

          {/* CTAs */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={buildWhatsAppLink(whatsappMessage, WHATSAPP_PHONE)}
              target="_blank"
              className="group inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm ring-1 transition-all hover:shadow-lg"
              style={{
                backgroundColor: COLORS.gold, // botón principal dorado (identidad)
                color: COLORS.midnight,
                // ringColor sólo funciona via class; en inline lo compensamos con boxShadow
                boxShadow: `0 0 0 1px ${COLORS.gold} inset`,
              }}
            >
              <Phone className="mr-2 h-4 w-4" /> {primaryCtaText}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href={secondaryHref}
              className="group inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all hover:shadow-lg"
              style={{
                backgroundColor: "transparent",
                color: COLORS.sand,
                borderColor: COLORS.sand,
                boxShadow: `inset 0 0 0 1px ${COLORS.sand}`,
              }}
            >
              <Package className="mr-2 h-4 w-4" /> {secondaryCtaText}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Stats / confianza */}
          {!!stats?.length && (
            <div className="mt-8 grid w-full max-w-3xl grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-4 text-center"
                  style={{ borderColor: "rgba(237, 229, 218, 0.25)" }} // sand
                >
                  <div className="text-xl font-extrabold" style={{ color: COLORS.sand }}>
                    {s.value}
                  </div>
                  <div className="text-xs opacity-80" style={{ color: COLORS.sand }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hint para scrollear */}
          <a
            href="#about"
            className="mt-8 inline-flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100"
            style={{ color: COLORS.sand }}
          >
            Deslizá para conocer más
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Separador inferior suave en arena */}
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        className="-mb-px block w-full"
        aria-hidden
      >
        <path
          d="M0,64 C240,128 480,0 720,32 C960,64 1200,160 1440,96 L1440,120 L0,120 Z"
          fill={COLORS.sand}
          fillOpacity={0.08}
        />
      </svg>
    </section>
  );
}

