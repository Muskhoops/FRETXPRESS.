import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, Clock, LineChart, Settings, ArrowRight } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  delay: number;
}

interface ServiceCardProps extends Omit<Service, 'details'> {
  onLearnMore: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay, onLearnMore }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="card card-hover group"
    >
      <div className="bg-primary-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
        <div className="text-primary-500 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-500 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <button onClick={onLearnMore} className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors duration-300">
          En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Transport régional et national",
      description: "Livraison de vos marchandises partout en France avec un suivi en temps réel et des délais optimisés.",
      details: "Nous couvrons l'ensemble du territoire national avec une flotte réactive et un système de tracking avancé.",
      delay: 0.1
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Livraison express",
      description: "Service de transport urgent pour répondre aux imprévus avec des délais garantis dès J+1.",
      details: "Nos solutions express vous assurent une livraison rapide avec une priorité de traitement.",
      delay: 0.2
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Suivi des expéditions",
      description: "Possibilité de contacter le transporteur à tout moment pour suivre vos colis en temps réel.",
      details: "Le livreur est contactable tout au long de la livraison à des fins de transparence de procédure.",
      delay: 0.3
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Services sur-mesure",
      description: "Solutions logistiques personnalisées adaptées aux spécificités de votre secteur d'activité.",
      details: "Nos experts conçoivent avec vous des prestations logistiques ajustées à vos contraintes métiers.",
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Nos Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FretXpress vous propose une gamme complète de services de transport adaptés aux besoins des professionnels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              onLearnMore={() => setSelectedService(service)}
            />
          ))}
        </div>

        {selectedService && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="bg-white border-4 border-orange-500/70 rounded-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-2 right-3 text-primary-500 hover:text-primary-600 text-2xl"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4">{selectedService.title}</h3>
              <p className="text-gray-700">{selectedService.details}</p>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-8 bg-primary-50 rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-2/3">
              <h3 className="text-2xl font-semibold mb-3">Besoin d'une solution logistique spécifique ?</h3>
              <p className="text-gray-600">
                Notre équipe d'experts est à votre disposition pour élaborer des solutions de transport sur-mesure adaptées à vos contraintes.
              </p>
            </div>
            <div>
              <a href="#devis" className="btn-primary">Obtenir un devis</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;