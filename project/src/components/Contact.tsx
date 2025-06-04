import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/marwan200406@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        throw new Error("Échec de l'envoi. Veuillez réessayer.");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500 opacity-5 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-primary-500 opacity-5 rounded-full"></div>

      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Contact / Devis</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Besoin d'un devis ou d'informations supplémentaires ? Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-gray-50 p-8 rounded-xl"
          >
            <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Téléphone</h4>
                  <p className="text-gray-600 mt-1">+33 7 81 38 64 59</p>
                  <p className="text-gray-600">+33 7 69 07 81 86</p>
                  <p className="text-sm text-gray-500">Lun-Ven, 8h30-18h00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600 mt-1">contact@fretxpress.com</p>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Adresse</h4>
                  <p className="text-gray-600 mt-1">Place Roger Salengro</p>
                  <p className="text-sm text-gray-500">31000 TOULOUSE</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">WhatsApp</h4>
                  <p className="text-gray-600 mt-1">+33 7 81 38 64 59</p>
                  <p className="text-sm text-gray-500">Assistance rapide</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            id="devis"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Demande de devis</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input type="text" name="name" required className="input-field" placeholder="Jean Dupont" />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
                  <input type="text" name="company" required className="input-field" placeholder="Votre entreprise" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
                  <input type="email" name="email" required className="input-field" placeholder="jean.dupont@entreprise.fr" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" name="phone" className="input-field" placeholder="+33 6 XX XX XX XX" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea name="message" required rows={5} className="input-field resize-none" placeholder="Décrivez vos besoins de transport..."></textarea>
              </div>

              <div className="flex justify-end items-center space-x-4">
                {loading ? (
                  <div className="text-primary-500 animate-pulse font-medium">Envoi en cours...</div>
                ) : (
                  <button type="submit" className="btn-primary flex items-center">
                    Envoyer ma demande
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>

              {submitted && (
                <p className="text-green-600 font-medium mt-4">
                  Merci ! Votre demande a bien été envoyée.
                </p>
              )}

              {error && (
                <p className="text-red-600 font-medium mt-4">
                  {error}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
