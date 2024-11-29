import React from 'react';
import garantyImage from '../../images/garantyClientGarantie.png';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS
import { useProductContext } from '../../contexts/ProductContext';


const ResumeBon: React.FC = () => {
  const {client} = useProductContext();
  const {language} = client;
  return (
    <div className="bg-gray-50 px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[45rem] text-center">
        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === 'Francais' ? 'RÉSUMÉ DE VOTRE BON DE COMMANDE' : 'ORDER SUMMARY'}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-gray-700">
          {language === 'Francais'
            ? `Les épiceries ont depuis longtemps le monopole en matière d'alimentation des familles québécoises. La famille Québec Alimentation offre la meilleure alternative au Supermarché et met tout en œuvre pour vous offrir des produits de qualité supérieure à 100%. Les paiements débuteront selon la méthode que vous aurez sélectionnée, soit à la livraison ou selon les versements convenus avec notre partenaire financier Lendcare Capital Inc. Vous aurez donc l'occasion de faire vos conclusions sur notre excellente qualité.`
            : `Grocery stores have long monopolized family food supplies in Quebec. Quebec Alimentation Family offers the best alternative to the Supermarket and strives to provide you with 100% superior quality products. Payments will begin according to the method you selected, either upon delivery or according to the installments agreed with our financial partner, Lendcare Capital Inc. You will therefore have the opportunity to draw your conclusions about our excellent quality.`}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          {language === 'Francais'
            ? `Dans votre service, nous vous offrons une alimentation saine et variée pour une famille moyenne de 4 personnes. Toujours selon vos habitudes alimentaires et votre budget, il sera possible de modifier le contenu de votre commande en consultant notre menu boucherie et poissonnerie.`
            : `In your service, we offer healthy and varied food for an average family of 4 people. Always according to your eating habits and your budget, it will be possible to modify the content of your order by consulting our butcher and fishmonger menu.`}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          {language === 'Francais'
            ? `C'est maintenant le temps de révolutionner votre alimentation en planifiant votre commande avec les précieux conseils de notre représentant.`
            : `It's now time to revolutionize your diet by planning your order with the valuable advice of our representative.`}
        </p>
        <p className="mt-6 text-xl font-semibold text-gray-900">
          {language === 'Francais' ? 'Merci' : 'Thank you'}
        </p>
        <p className="mt-4 text-base font-medium text-gray-800">
          {language === 'Francais'
            ? `LA FAMILLE QUEBEC ALIMENTATION INC
                3035 AVENUE MARICOURT, SUITE 110
                QUEBEC, QC G1W 0E9
                Tel. sans frais: 1-888-228-2251`
            : `THE QUEBEC FOOD FAMILY INC
                3035 MARICOURT AVENUE, SUITE 110
                QUEBEC, QC G1W 0E9
                Toll Free: 1-888-228-2251`}
        </p>
        <div className="mt-10 flex justify-center">
          <img
            src={garantyImage}
            alt={language === 'Francais' ? 'Garantie Client' : 'Client Guarantee'}
            className="rounded-lg shadow-lg w-full max-w-[200px]"
          />
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-extrabold text-gray-800">
            {language === 'Francais' ? 'Bon de commande' : 'Order Form'}
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            {language === 'Francais' ? `N° : ${client.CommandNumber ? client.CommandNumber : "N/A"}` : `No: ${client.CommandNumber ? client.CommandNumber : "N/A"}`}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ResumeBon;
