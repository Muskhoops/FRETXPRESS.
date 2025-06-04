import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TruckIcon, Star, Clock, Users } from 'lucide-react';
import MonLogo from '../assets/favicon.svg';
import CamionImage from '../assets/camionarreter.png';
import CamionRoule from '../assets/camionquiroule.png';
import Polo from '../assets/polo.png';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="a-propos" className="bg-gray-50 py-20 lg:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left column with images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-2"
              >
                <div className="h-64 rounded-xl overflow-hidden shadow-lg">
  <img
    src={CamionImage}
    alt="Camion Arreter FretXpress"
    className="w-full h-full object-cover"
  />
</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                   <img
    src={CamionRoule}
    alt="Camion FretXpress qui Roule"
    className="w-full h-full object-cover"
  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="h-48 rounded-xl overflow-hidden shadow-lg relative group">
                  <div className="absolute inset-0 bg-primary-500 opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
                       <img
    src={Polo}
    alt="Polo FretXpress"
    className="w-full h-full object-cover"
  />
                </div>
              </motion.div>
            </div>
            
            {/* Logo overlay */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
             <img 
  src={MonLogo} 
  alt="Mon logo" 
  className="w-16 h-16" 
/>
            </div>
          </div>
          
          {/* Right column with text */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">À propos de FretXpress</h2>
              <p className="text-lg text-gray-700 mb-6">
              FretXpress incarne une nouvelle génération de transporteurs : fiables, réactifs et transparents. Grâce à des outils modernes et une vision claire, nous offrons aux entreprises un service logistique à la hauteur de leurs ambitions.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Basée en région Toulousaine, notre équipe de professionnels passionnés met son expertise au service de votre activité. Nous comprenons que chaque minute compte pour votre entreprise, c'est pourquoi nous nous engageons à vous fournir des solutions logistiques adaptées à vos besoins spécifiques.
              </p>
              
              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Proximité</h3>
                  <p className="text-gray-600">Un interlocuteur dédié à votre écoute</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Réactivité</h3>
                  <p className="text-gray-600">Des solutions rapides à vos besoins</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                    <Star className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Transparence</h3>
                  <p className="text-gray-600">Une communication claire et directe</p>
                </motion.div>
              </div>
              
              <div className="mt-8">
                <a href="#services" className="btn-primary inline-flex items-center">
                  Découvrir nos services
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;