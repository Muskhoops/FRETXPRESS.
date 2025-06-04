import React, { useState } from 'react';
import { Mail, Phone, MapPin, X } from 'lucide-react';
import Logo from '../assets/logo.svg';

const legalTexts = {
  "Mentions légales": `
**Éditeur du site**  
Le site FretXpress.com est édité par la société BeeDigital.fr.

**Responsable de la publication**  
Monsieur MOKHFI

**Responsable développement**  
Monsieur AL MASRI

**Hébergement**  
GANDI SAS  
63-65 boulevard Masséna, 75013 Paris  
https://www.gandi.net

**Coordonnées de contact**  
Place Roger Salengro, 31000 Toulouse  
Téléphone : +33 7 81 38 64 59 / +33 7 69 07 81 86  
Email : contact@fretxpress.fr  
WhatsApp : +33 7 81 38 64 59  

**Propriété intellectuelle**  
Le contenu de ce site (textes, images, logo, design) est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction sans autorisation est interdite.

**Crédits**  
Développement & design : BeeDigital.fr
  `,
  "Politique de confidentialité": `
**Données collectées**  
Le site ne collecte aucune donnée personnelle automatiquement. Les seules données collectées sont celles que vous fournissez volontairement via les formulaires de contact.

**Utilisation des données**  
Les informations recueillies sont exclusivement utilisées pour répondre à vos demandes. Aucune donnée n’est transmise à des tiers ni utilisée à des fins commerciales.

**Durée de conservation**  
Vos messages et coordonnées peuvent être conservés jusqu’à 3 ans dans un cadre de suivi client.

**Vos droits**  
Vous pouvez exercer vos droits d’accès, de rectification ou de suppression de vos données en nous contactant à : contact@fretxpress.fr

**Sécurité des données**  
Les données sont stockées de manière sécurisée chez notre hébergeur Gandi.net.
  `,
  "CGV": `
**Nature du site**  
FretXpress.com est un site vitrine. Il ne permet ni commande en ligne, ni paiement, ni contractualisation à distance.

**Prestations proposées**  
Le site présente les services de transport de marchandises offerts par FretXpress. Toute prestation fait l’objet d’un échange direct avec le client par téléphone, email ou rendez-vous physique.

**Engagements**  
Les engagements (prix, délais, modalités) sont définis par devis personnalisé. Le site ne génère aucun tarif ni contrat automatique.

**Responsabilité**  
FretXpress décline toute responsabilité pour une mauvaise interprétation des informations affichées. Pour toute question, veuillez nous contacter directement.

**Droit applicable**  
Les présentes mentions sont régies par le droit français. En cas de litige, les tribunaux de Toulouse seront compétents.
  `
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const closeModal = () => setModalOpen(null);

  return (
    <>
      {/* Modal Overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white text-black rounded-lg border-4 border-orange-500 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-orange-500 hover:text-orange-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{modalOpen}</h2>
              <div className="overflow-y-auto max-h-[65vh] pr-2 text-sm text-gray-700 whitespace-pre-line">
                {legalTexts[modalOpen]}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Content */}
      <footer className="bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo and about */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-16 h-16 relative">
                  <img src={Logo} alt="Logo" className="absolute inset-0 w-full h-full p-2" />
                </div>
                <span className="text-2xl font-bold">
                  <span>Fret</span>
                  <span className="text-primary-500">Xpress</span>
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                FretXpress, votre partenaire de confiance pour le transport de marchandises à travers la France.
              </p>
              <div className="flex space-x-4">
                {/* Icônes réseaux sociaux ici */}
              </div>
            </div>

            {/* Liens rapides */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-3">
                {['Accueil', 'À propos', 'Services', 'Confiance', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase().replace('à', 'a').replace(' ', '-')}`}
                      className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Nos services</h3>
              <ul className="space-y-3">
                {['Transport national', 'Livraison express', 'Suivi en temps réel', 'Logistique sur-mesure'].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h3 className="text-xl font-semibold mb-4">Nous contacter</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-primary-500 mt-1 mr-3" />
                  <span className="text-gray-400">contact@fretxpress.fr</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary-500 mt-1 mr-3" />
                  <span className="text-gray-400">+33 7 81 38 64 59</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary-500 mt-1 mr-3" />
                  <span className="text-gray-400">Place Roger Salengro<br />31000 Toulouse, France</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} FretXpress. Tous droits réservés. <br /> Propulsé par BeeDigital.fr
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {['Mentions légales', 'Politique de confidentialité', 'CGV'].map((label) => (
                  <button
                    key={label}
                    onClick={() => setModalOpen(label)}
                    className="text-gray-400 hover:text-primary-500 text-sm transition-colors duration-300"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
