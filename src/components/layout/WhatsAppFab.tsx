"use client";

import { motion } from "framer-motion";
import { whatsappGeneral } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappGeneral()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed bottom-6 right-6 z-50 group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1eb757] text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-black/30 transition-all hover:scale-105"
      aria-label="Contactar por WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline text-sm font-medium">Cotizar por WhatsApp</span>
    </motion.a>
  );
}
