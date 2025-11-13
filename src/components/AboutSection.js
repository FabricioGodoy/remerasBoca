import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, Heart } from "lucide-react";

const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#d2983a",
  sand: "#EDE5DA",
};

const AboutSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const FeatureCard = ({ Icon, title, desc, delay = 0 }) => (
    <div
      variants={itemVariants}
      transition={{ delay }}
      className="relative rounded-2xl p-8 bg-gradient-to-b from-[#2b3036]/95 to-[#141416]/95 text-[#EDE5DA] border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <span className="absolute inset-x-2 -top-px h-[2px] bg-[#d2983a] rounded-t-2xl" />
      <div className="w-16 h-16 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Icon className="w-8 h-8" color={COLORS.gold} />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-[#EDE5DA]">{title}</h3>
      <p className="text-[#EDE5DA]/80 leading-relaxed">{desc}</p>
    </div>
  );

  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-[#EDE5DA] via-white to-[#2b3036]/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d2983a]/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#d2983a]/30" />

      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-center text-[#141416] mb-6"
        >
          Sobre{" "}
          <span className="inline-flex items-center gap-2 px-3 py-1 text-[#d2983a]">
            Nosotros
          </span>
        </h2>

        <div variants={itemVariants} className="flex justify-center mb-10">
          <span className="h-[2px] w-24 bg-[#d2983a] rounded-full" />
        </div>

        <p
          variants={itemVariants}
          className="mx-auto max-w-[72ch] text-[#141416]/80 text-lg md:text-xl leading-7 md:leading-8 mb-14 text-center px-4 md:px-0"
        >
          <span>
            Somos dos hinchas de Boca que un día se miraron y dijeron: “¿Por qué
            no hacemos algo nuestro, algo bien bostero, hecho con amor y con el
            corazón puesto en estos colores?”.
          </span>
          <br /><br />
          <span>
            Cada diseño, cada remera, cada detalle está pensado con la pasión de
            quienes crecimos gritando goles, secándonos las lágrimas con la camiseta
            y viviendo la vida al ritmo de La Bombonera. No somos una gran marca:
            somos hinchas. Y eso se nota.
          </span>
          <br /><br />
          <span>
            Acá no vas a encontrar producción masiva. Acá hay dedicación,
            esfuerzo, noches de laburo y ganas de que cada prenda te haga sentir
            lo mismo que sentimos nosotros cuando vemos esos colores mezclarse:
            orgullo, piel de gallina y amor eterno.
          </span>
          <br /><br />
          <span>
            Esto es para vos, que llevás a Boca todos los días. Esto es para
            nosotros, que hacemos todo con el alma. Y esto recién empieza.
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            Icon={Globe}
            title="Para hinchas de todo el país"
            desc="No importa dónde estés: si sos bostero, sos de la familia. Enviamos a todas las provincias."
            delay={0.1}
          />
          <FeatureCard
            Icon={Users}
            title="Hecho por hinchas"
            desc="No somos una marca fría. Somos dos xeneizes que diseñan con amor, criterio propio y mucho sentimiento."
            delay={0.2}
          />
          <FeatureCard
            Icon={Heart}
            title="Pasión en cada detalle"
            desc="Cada remera se piensa, se ajusta y se revisa como si fuera para nosotros mismos. Porque lo es."
            delay={0.3}
          />
        </div>
      </div>

      <a
        href="https://wa.me/+5491133779222"
        className="btn-flotante"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="https://img.icons8.com/office/40/whatsapp--v1.png" alt="wpp" />
      </a>
    </section>
  );
};

export default AboutSection;
