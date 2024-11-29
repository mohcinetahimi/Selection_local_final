import React from 'react';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS
import topImage from './../../images/fraismention1.png';
import bottomImage from './../../images/fraismention2.png';
import { useProductContext } from '../../contexts/ProductContext';

interface Stat {
  label: string;
  value: string;
}

const stats: Stat[] = [
  { label: 'Founded', value: '2021' },
  { label: 'Employees', value: '37' },
  { label: 'Countries', value: '12' },
  { label: 'Raised', value: '$25M' },
];

const translations = {
  french: {
    title: 'Frais de Manutention',
    heading: 'Détails des services',
    summaryTitle: 'Résumé',
    summaryContent: `Les frais de manutention comprennent: Coupe, dégraissage, préparation, emballage sous vide,
      surgélation, gel de prix pour (12 mois), garantie sur l'emballage et le produit (18 mois),
      livraisons associées au contrat, service à la clientèle, publicité, administration et profit. Le
      tout est pour 12 mois de service.`,
    additionalTitle: 'Détails Complémentaires',
    additionalContent: `Les produits de qualité supérieurs que vous avez sélectionnés ont été préparés, mis sous vide et
      surgelés avec une grande précaution, tel que discuté lors de votre rencontre avec notre
      représentant. Le poids des différents produits peut varier. Chaque plan alimentaire est construit
      selon les habitudes de consommation et le budget des différentes familles.`,
    guaranteeTitle: 'Garantie:',
    guaranteeContent: `Lors de votre livraison, si vous trouvez un ou des morceaux descellés ou encore des viandes dont
      vous n'aimez pas les goûts, ces produits seront remplacés sous forme d'un crédit que vous pourrez appliquer sur les produits de votre choix lors de votre prochaine livraison. Si par erreur vous avez commandé trop d'un produit ex: 5 boites de bœuf haché par livraison et vous en avez seulement consommé 3 boites, lors de la livraison suivante, nous échangerons les boites à venir par un autre produit de valeur équivalente.`,
  },
  english: {
    title: 'Handling Fees',
    heading: 'Service Details',
    summaryTitle: 'Summary',
    summaryContent: `Handling fees include: Cutting, degreasing, preparation, vacuum packaging,
      freezing, price freeze for (12 months), packaging and product guarantee (18 months),
      deliveries associated with the contract, customer service, advertising, administration, and profit. All of this is for 12 months of service.`,
    additionalTitle: 'Additional Details',
    additionalContent: `The superior quality products you selected have been prepared, vacuum-sealed, and
      frozen with great care, as discussed during your meeting with our representative. The weight of the different products may vary. Each meal plan is built according to the consumption habits and budget of different families.`,
    guaranteeTitle: 'Guarantee:',
    guaranteeContent: `Upon delivery, if you find any unsealed pieces or meats you do not like the taste of, these products will be replaced in the form of a credit that you can apply to products of your choice during your next delivery. If by mistake you ordered too much of a product, e.g., 5 boxes of ground beef per delivery and you only consumed 3 boxes, during the next delivery, we will exchange the upcoming boxes for another product of equivalent value.`,
  }
};

const FraisMention: React.FC = () => {
  const { client } = useProductContext();
  const { language } = client;
  
  const content = language === 'Francais' ? translations.french : translations.english;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24">
            <div className="flex flex-col justify-center">
              <div className="text-base leading-7 text-gray-700">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  {content.title}
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {content.heading}
                </h1>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">{content.summaryTitle}</h2>
                  <p className="mt-4">{content.summaryContent}</p>
                  <p className="mt-4">
                    *Le poids total des boîtes est toujours le même. Cependant, le nombre de pièces peut varier selon
                    leur poids.
                  </p>
                  <h2 className="text-xl font-semibold text-gray-900 mt-8">{content.additionalTitle}</h2>
                  <p className="mt-4">{content.additionalContent}</p>
                  <p className="mt-4">
                    Le consommateur devient responsable à partir du moment où il reçoit la commande. Toutes les pièces
                    sont garanties à 100%. Il est entendu que les parties acceptent le fait que l’achat d’une épicerie
                    comprend tous les avantages et services mentionnés dans les conditions. Seules les déclarations
                    écrites du programme consommateur (clair et sans risque).
                  </p>
                  <p className="mt-4">
                    Avec ce concept, vous trouverez les 5 groupes de protéine suivante: viande rouge (bœuf et gibier),
                    porc, poulet et volaille, poisson et fruits de mers. Vous aurez la chance de modifier le concept
                    selon vos habitudes alimentaires. Vous pourrez donc enlever ou ajouter des produits à chaque
                    livraison à l'exception du gel de prix qui n'est ni monnayable ni échangeable. Toute partie non
                    livrée à la demande du client ne peut être annulée ni remboursée, sous aucune considération. De plus
                    le montant des paiements ne pourra être modifié au cours de l'année. Vous acceptez de recevoir des
                    SMS et/ou courriels pendant la durée de votre contrat.
                  </p>
                  <p className="mt-4">
                    Si des produits ne sont pas disponibles lors de votre première livraison, ils seront automatiquement
                    remis sur votre deuxième livraison, vous pourrez communiquer avec notre service à la clientèle si
                    besoin. Il est possible d'annuler ce contrat jusqu'à 10 jours après la réception de votre première
                    livraison.
                  </p>
                  <p className="mt-4 font-bold">{content.guaranteeTitle}</p>
                  <p className="mt-4">{content.guaranteeContent}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative overflow-hidden rounded-t-3xl bg-gray-900 shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src={topImage}
                  alt="Top Image"
                />
              </div>
              <div className="relative overflow-hidden rounded-b-3xl bg-gray-900 shadow-2xl mt-8">
                <img
                  className="w-full h-full object-cover"
                  src={bottomImage}
                  alt="Bottom Image"
                />
              </div>
            </div>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">
            {stats.map((stat, statIdx) => (
              <div key={statIdx} className="text-center">
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex justify-center">
            <a href="#" className="text-base font-semibold leading-7 text-indigo-600">
              Learn more about our company <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraisMention;
