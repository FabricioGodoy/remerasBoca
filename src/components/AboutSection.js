
// import React from "react";
// import { motion } from "framer-motion";
// import { Globe, Users, Heart } from "lucide-react";

// // Paleta
// const COLORS = {
//   midnight: "#0d112d",
//   navy: "#002155",
//   gold: "#d2983a",
//   sand: "#ede5da",
// };

// const AboutSection = () => {
//   const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
//   };

//   const FeatureCard = ({ Icon, title, desc, delay = 0 }) => (
//     <div
//       variants={itemVariants}
//       transition={{ delay }}
//       className="relative rounded-2xl p-8 bg-gradient-to-b from-[#002155]/95 to-[#0d112d]/95 text-[#ede5da] border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//     >
//       <span className="absolute inset-x-2 -top-px h-[2px] bg-[#d2983a] rounded-t-2xl" />
//       <div className="w-16 h-16 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
//         <Icon className="w-8 h-8" color={COLORS.gold} />
//       </div>
//       <h3 className="text-2xl font-bold mb-3 text-[#ede5da]">{title}</h3>
//       <p className="text-[#ede5da]/80 leading-relaxed">{desc}</p>
//     </div>
//   );

//   return (
//     <section
//       id="about"
//       className="relative py-20 overflow-hidden bg-gradient-to-br from-[#ede5da] via-white to-[#002155]/5"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//     >
//       {/* Acabado superior/inferior en dorado muy sutil */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d2983a]/40" />
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#d2983a]/30" />

//       <div className="container mx-auto px-4 max-w-5xl">
//         <h2
//           variants={itemVariants}
//           className="text-4xl md:text-5xl font-extrabold text-center text-[#0d112d] mb-6"
//         >
//           Sobre {" "}
//           <span className="inline-flex items-center gap-2 px-3 py-1 text-[#d2983a]">
//             Globalis
//           </span>
//         </h2>

//         <div variants={itemVariants} className="flex justify-center mb-10">
//           <span className="h-[2px] w-24 bg-[#d2983a] rounded-full" />
//         </div>

//         <p
//           variants={itemVariants}
//           className="mx-auto max-w-[72ch] text-[#0d112d]/80 text-lg md:text-xl leading-7 md:leading-8 mb-14 text-center px-4 md:px-0"
//         >
//           <span>
//             En GLOBALIS Viajes creemos que cada viaje es mucho más que un destino: es un sueño por cumplir. Nuestra razón de ser es acompañar a cada persona en su recorrido, brindando atención personalizada y trabajando en conjunto para diseñar experiencias que superen expectativas.
//           </span>
//           <br />
//           <br />
//           <span>
//             Nuestra prioridad es generar confianza, tranquilidad y seguridad, para que cada experiencia sea única e irrepetible. Con una identidad renovada, nos proyectamos como una agencia moderna, cercana y dinámica, pero siempre con el mismo compromiso: transformar cada viaje en un recuerdo inolvidable.
//           </span>
//           <br />
//           <br />
//           <span>Sigamos soñando juntos. Sigamos viajando.</span>
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//           <FeatureCard
//             Icon={Globe}
//             title="Destinos Globales"
//             desc="Explorá el mundo con una selección que va de selvas exóticas a playas paradisíacas."
//             delay={0.1}
//           />
//           <FeatureCard
//             Icon={Users}
//             title="Asesoramiento Experto"
//             desc="Te guiamos en cada paso para que tu viaje sea perfecto y sin preocupaciones."
//             delay={0.2}
//           />
//           <FeatureCard
//             Icon={Heart}
//             title="Experiencias Únicas"
//             desc="Diseñamos viajes a tu medida, creando recuerdos que duran para toda la vida."
//             delay={0.3}
//           />
//         </div>
//       </div>
//       <a href="https://wa.me/+5492612131392" className="btn-flotante" target="_blank" rel="noopener noreferrer"> <img src="https://img.icons8.com/office/40/whatsapp--v1.png" alt="wpp"></img> </a>
//     </section>
//   );
// };

// export default AboutSection;

import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, Heart } from "lucide-react";

// Paleta: base neutral + acentos originales del logo
const COLORS = {
  midnight: "#141416", // antes #0d112d → grafito
  navy: "#2b3036",     // antes #002155 → gris pizarra
  gold: "#d2983a",     // dorado del logo (se mantiene)
  sand: "#EDE5DA",     // arena del logo (se mantiene)
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
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
      {/* Acabado superior/inferior en dorado muy sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d2983a]/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#d2983a]/30" />

      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-center text-[#141416] mb-6"
        >
          Sobre{" "}
          <span className="inline-flex items-center gap-2 px-3 py-1 text-[#d2983a]">
            Globalis
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
            En GLOBALIS Viajes creemos que cada viaje es mucho más que un destino: es un sueño por cumplir. Nuestra razón de ser es acompañar a cada persona en su recorrido, brindando atención personalizada y trabajando en conjunto para diseñar experiencias que superen expectativas.
          </span>
          <br />
          <br />
          <span>
            Nuestra prioridad es generar confianza, tranquilidad y seguridad, para que cada experiencia sea única e irrepetible. Con una identidad renovada, nos proyectamos como una agencia moderna, cercana y dinámica, pero siempre con el mismo compromiso: transformar cada viaje en un recuerdo inolvidable.
          </span>
          <br />
          <br />
          <span>Sigamos soñando juntos. Sigamos viajando.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            Icon={Globe}
            title="Destinos Globales"
            desc="Explorá el mundo con una selección que va de selvas exóticas a playas paradisíacas."
            delay={0.1}
          />
          <FeatureCard
            Icon={Users}
            title="Asesoramiento Experto"
            desc="Te guiamos en cada paso para que tu viaje sea perfecto y sin preocupaciones."
            delay={0.2}
          />
          <FeatureCard
            Icon={Heart}
            title="Experiencias Únicas"
            desc="Diseñamos viajes a tu medida, creando recuerdos que duran para toda la vida."
            delay={0.3}
          />
        </div>
      </div>

      <a
        href="https://wa.me/+5492612131392"
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
