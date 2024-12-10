import React from "react";
import { useProductContext } from '../../contexts/ProductContext';
import FoodServiceSummary from "./FoodServiceSummary";

// Translation data
const translations = {
    english: {
    conditionsTitle: "CONDITIONS",
    conditionsText: `If the client defaults on paying any or all installments due under this contract, La Famille Québec Alimentation Inc may demand payment of the balance owed under this contract following the conditions of the acceleration clause. 
    Before invoking this clause, La Famille Québec Alimentation Inc must send a written notice allowing the client to remedy the situation within 30 days of the notice.`,
    signedAt: "SIGNED AT",
    date: "DATE",
    conditionsNote: `The handling fees are included in the total amount of the contract. The explanation of the sales contract is entirely satisfactory to me. 
    The client hereby accepts the order under the conditions stated above.`,
    modalitiesTitle: "MODALITIES",
    modalitiesText1: `This food service is payable upon delivery or by bank draft: weekly, bi-weekly, or monthly.`,
    modalitiesText2: `With this service, you will find the following 5 protein groups: red meat (beef and game), pork, poultry, chicken, fish, and seafood. 
    You will have the chance to modify the concept according to your dietary habits. You can add or remove products at each delivery. 
    However, payment amounts cannot be changed during the year.`,
    modalitiesText3: `Your food service will be delivered in two or three parts according to your capacity and availability to receive the order. 
    Future deliveries will be made according to the dates indicated in the delivery section.`,
    promoCodeLabel: "Promo Code",
    guaranteeTitle: "Guarantee",
    guaranteeText: `During your first delivery, if you find any unsealed packages or meats with spices or marinades you do not like, 
    these products will be replaced during the next delivery with other products of equivalent value of your choice. 
    If you mistakenly ordered too much of a product (e.g., 5 boxes of ground beef per delivery but only consumed 3 boxes), 
    during the next delivery, we will exchange the remaining boxes for another product of equivalent value.`,
  },
  Francais: {
    conditionsTitle: "CONDITIONS",
    conditionsText: `Si le client fait défaut de payer tout ou en partie tout versement devenu échu, La Famille Québec Alimentation Inc pourra exiger le paiement du solde dû en vertu du présent contrat suivant les conditions d'exercice de la clause de déchéance du bénéfice du terme. 
    Avant de se prévaloir de cette clause, La Famille Québec Alimentation Inc devra envoyer un avis écrit permettant au client de remédier à la situation dans les 30 jours qui suivent cet avis.`,
    signedAt: "SIGNÉ À",
    date: "DATE",
    conditionsNote: `Les frais de manutention sont inclus dans le montant total du contrat. L'explication du contrat de vente est à mon entière satisfaction. 
    Par la présente, le client accepte la commande selon les conditions citées ci-haut.`,
    modalitiesTitle: "MODALITÉS",
    modalitiesText1: `Ce service alimentaire est payable à la livraison ou par prélèvement bancaire; hebdomadaire, bi-hebdomadaire ou mensuel.`,
    modalitiesText2: `Avec ce service, vous trouverez les 5 groupes de protéine suivante : viande rouge (bœuf et gibier), porc, poulet et volaille, poisson et fruits de mers. 
    Vous aurez la chance de modifier le concept selon vos habitudes alimentaires. Vous pourrez donc enlever ou ajouter des produits à chaque livraison. 
    Toutefois le montant des paiements ne pourra être modifié au cours de l'année.`,
    modalitiesText3: `Votre service alimentaire sera livré en deux ou trois parties selon votre capacité et disponibilité à recevoir la commande. 
    Les livraisons à venir seront effectuées selon les dates indiquées à la section livraison.`,
    promoCodeLabel: "Code Promo",
    guaranteeTitle: "Garantie",
    guaranteeText: `Lors de votre première livraison, si vous trouvez un ou des morceaux descellés ou encore des viandes dont vous n'aimez pas les épices ou la marinade, 
    ces produits seront remplacés lors de la prochaine livraison par d'autres produits de valeur équivalente à votre choix. 
    Si par erreur vous avez commandé trop d'un produit ex: 5 boites de bœuf haché par livraison et vous en avez seulement consommé 3 boites, 
    lors de la livraison suivante, nous échangerons les boites à venir par un autre produit de valeur équivalente.`,
  },
};

const ConditionsAndModalities: React.FC = () => {
  const { client } = useProductContext();
  const { language } = client;

  // Default to French if the language is not set
  const t = language === 'Francais' ? translations.Francais : translations.english;

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
      {/* Conditions Section */}
      <section className="mb-10">
        <h1 className="text-2xl font-bold text-center mb-6">{t.conditionsTitle}</h1>
        <p className="text-justify text-gray-800 leading-relaxed mb-4">
          {t.conditionsText}
        </p>
        <div className="flex justify-between items-center mt-6">
          <div className="text-left">
            <p className="font-semibold">{t.signedAt}</p>
            <p>________</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{t.date}</p>
            <p>__________</p>
          </div>
        </div>
        <p className="mt-6 text-sm italic text-center">{t.conditionsNote}</p>
      </section>

      {/* Modalities Section */}
      <section>
        <h1 className="text-2xl font-bold text-center mb-6">{t.modalitiesTitle}</h1>
        <p className="text-justify text-gray-800 leading-relaxed mb-6">
          {t.modalitiesText1}
        </p>
        <p className="text-justify text-gray-800 leading-relaxed mb-6">
          {t.modalitiesText2}
        </p>
        <p className="text-justify text-gray-800 leading-relaxed mb-6">
          {t.modalitiesText3}
        </p>

        {/* Total Section */}
        <FoodServiceSummary />

        {/* Promo Code */}
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2">
            {t.promoCodeLabel}
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </section>

      {/* Guarantee Section */}
      <section>
        <h1 className="text-2xl font-bold text-center mb-6">{t.guaranteeTitle}</h1>
        <p className="text-justify text-gray-800 leading-relaxed mb-6">
          {t.guaranteeText}
        </p>
      </section>
    </div>
  );
};

export default ConditionsAndModalities;
