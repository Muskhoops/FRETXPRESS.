import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import CamionAutoroute from '../assets/camionautoroute.png';

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
  <section 
  id="accueil" 
  className="relative min-h-screen flex items-center justify-center bg-secondary-900 overflow-hidden pt-28 md:pt-0 pb-20 lg:pb-0"
>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-secondary-800 opacity-90"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDF2MmgtMnYtMWgtMXYtMmgydjFoMXptLTUgMnYxaC0xdi0yaDJ2MWgtMXptLTIgLTF2MWgtMnYtMWgyek0zMCAyN3YyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left lg:w-1/2">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Déposez, <br />
              <span className="text-primary-500">c'est livré.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl lg:max-w-none"
            >
              Transport de messagerie, fret, colis et palettes. <br />
              Service de livraison professionnel<br /> avec véhicule équipés de hayons.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#devis" 
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Obtenir un devis <ArrowRight className="w-4 h-4 ml-1" />
              </a>
              <a 
                href="#services" 
                className="btn-outline w-full sm:w-auto justify-center flex items-center"
              >
                Nos services
              </a>
            </motion.div>
          </motion.div>
          
          {/* Logo/Image */}
          <motion.div 
            variants={itemVariants}
            className="lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <img
    src={CamionAutoroute}
    alt="Camion FretXpress Autoroute"
    className="w-full h-full object-cover"
  />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg transform rotate-3">
                <div className="flex items-center">
                  <div className="bg-primary-500 text-white p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 8h14M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <rect x="1" y="8" width="22" height="8" rx="2" ry="2" />
                      <path d="M5 16v4M19 16v4" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-bold">Livraison J+1</div>
                    <div className="text-xs text-gray-500">sur toute la France</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.5, 
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="text-white text-sm mb-2 hidden md:block">Découvrir</div>
          <div className="w-6 h-9 border-2 border-white rounded-full flex justify-center pt-1">
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: 12 }}
              transition={{ 
                repeat: Infinity,
                repeatType: 'loop',
                duration: 1.5 
              }}
              className="w-1 h-1 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;