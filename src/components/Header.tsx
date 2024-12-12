import React from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 pt-20 pb-32 text-center relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent)] pointer-events-none" />
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Truck size={64} className="mx-auto text-blue-600 mb-6" />
      </motion.div>
      
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-display">
        Vairuotojų poilsio analizė
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Efektyviai valdykite ir analizuokite vairuotojų poilsio periodus
      </p>
    </motion.div>
  );
};