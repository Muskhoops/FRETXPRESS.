import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Rocket, Truck, BadgeEuro } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-md"
    >
      <div className="mb-4 text-primary-500">
        {icon}
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2"
      >
        {value}
      </motion.h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const Trust: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      value: "98%",
      label: "Satisfaction client",
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      value: "120%",
      label: "d'Implication des équipes",
    },
    {
      icon: <Truck className="w-10 h-10" />,
      value: "24/7",
      label: "Suivi temps réel",
    },
    
    {
      icon: <BadgeEuro className="w-10 h-10" />,
      value: "100%",
      label: "Tarifs transparents",
    }
  ];

  return (
    <section id="confiance" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background design element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Pourquoi nous faire confiance ?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FretXpress s'engage à vous offrir un service de qualité supérieure, avec des résultats mesurables et une satisfaction client exceptionnelle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        {/* CEO Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-white p-8 rounded-xl shadow-lg relative"
        >
          <div className="absolute -top-5 left-10 w-10 h-10 bg-primary-500 transform rotate-45"></div>
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6">Le mot du Directeur</h3>
              <p className="text-lg text-gray-700 italic">
                "Chez FretXpress, notre plus grande satisfaction est de voir nos clients réussir grâce à nos services de transport. Chaque jour, nous nous efforçons d'offrir un service d'excellence, car votre succès est notre priorité. C'est un véritable plaisir d'être au service de votre entreprise."
              </p>
              <div className="mt-6">
                <p className="font-semibold">M. MOKHFI</p>
                <p className="text-gray-500">Co-Fondateur, FretXpress</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Trust;