
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// NUEVA PALETA (mismos keys, nuevos valores)
// midnight → grafito oscuro, navy → gris pizarra, gold → rojo acento, sand → gris claro
const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#C1121F", // acento rojo
  sand: "#EDEDED", // gris claro
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("#about");

  const navItems = [
    { name: "Nosotros", href: "#about" },
    { name: "Remeras", href: "#packages" },
/*      { name: "Contacto", href: "#contact" }, */
  ];

  const toggleMenu = () => setIsOpen((v) => !v);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(`#${id}`);
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={[
        "fixed top-0 left-0 right-0 z-50",
        // Gradiente neutro (grafito → pizarra) y sutil borde inferior amarillo
        "bg-gradient-to-b from-[#ffffff] to-[#b6b6b6]/95",
        "backdrop-blur-xl",
        "shadow-lg",
        "border-b",
        "[border-bottom-color:#d2983a]", // amarillo
      ].join(" ")}
      style={{ color: COLORS.sand }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          {/* Asegurate de que la ruta apunte a /public */}
          <img
            src={`${process.env.PUBLIC_URL}/img/logos/svg/puente_amarillo.svg`}
            alt="Globalis Logo"
            className="logoNavBar h-10vh w-auto select-none"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href.substring(1))}
                className={[
                  "relative group font-medium transition-colors duration-300",
                  "text-[#070942]/90 hover:text-[#d2983a]",
                  isActive ? "text-[#0c158d]" : "",
                ].join(" ")}
              >
                {item.name}
                {/* Indicador inferior rojo */}
                <span
                  className={[
                    "absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0",
                    "bg-[#d2983a] transition-transform duration-300",
                    "group-hover:scale-x-100",
                    isActive ? "scale-x-100" : "",
                  ].join(" ")}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-xl text-[#EDEDED] hover:text-[#d2983a] focus:outline-none focus:ring-2 focus:ring-[#C1121F]/60 focus:ring-offset-2 [--ring-offset-color:transparent]"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t [border-color:rgba(193,18,31,0.25)]"
          >
            <div className="bg-gradient-to-b from-[#141416]/95 to-[#2b3036]/95 backdrop-blur-xl">
              <div className="flex flex-col items-stretch py-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href.substring(1))}
                    className="px-6 py-3 text-lg font-medium text-[#EDEDED] hover:text-[#d2983a] hover:bg-white/5 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Franja inferior en gris claro para contraste */}
              <div className="h-1 w-full" style={{ background: COLORS.sand }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
