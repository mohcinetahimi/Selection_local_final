import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';

// Define translations
const translations = {
  french: {
    title: 'Avis de Résolution de Contrat',
    paragraph1: `Vous pouvez résoudre ce contrat, pour n’importe quelle raison, durant les 
                10 JOURS suivant celui ou chacune des parties a obtenue un exemplaire du contrat. 
                Si le commerçant ne vous fournit pas un service prévu au contrat dans les 30 jours 
                qui suivent la date convenue, vous avez 1 an pour résoudre le contrat. Toutefois, 
                vous perdez ce droit de résolution si vous acceptez le service après cette période 
                de 30 jours. Le délai d’exercice du droit de résolution peut aussi être porté à 1 an 
                pour d’autres raisons, notamment pour absence de permis, pour absence ou pour 
                déficience de cautionnement ou pour non-conformité du contrat.`,
    paragraph2: `Pour de plus amples renseignements, communiquez avec un conseiller juridique ou 
                l’office de la protection du consommateur. Lorsque le contrat est résolu, le 
                commerçant de service de règlements de dettes doit vous rembourser toutes les sommes 
                que vous lui avez versées et vous restituer tout bien qu’il a reçu en paiement, en 
                échange ou en acompte: s’il ne peut restituer ce bien, le commerçant de service de 
                règlement de dettes doit vous remettre le plus élevé d’une somme correspondant au 
                prix de ce bien indiqué au contrat ou la valeur de ce bien dans les 15 jours de la 
                résolution. Dans le même délai, vous devez remettre au commerçant de service de 
                règlement de dettes les biens que vous avez reçus du commerçant, le cas échéant.`,
    paragraph3: `Pour résoudre le contrat, il suffit de retourner au commerçant le formulaire 
                annexé au contrat ou de lui envoyer un autre avis écrit à cet effet. Le formulaire 
                ou l’avis doit être adressé au commerçant de service de règlement de dettes indiqué 
                dans le contrat. L’avis peut être remis en personne, il peut aussi être donné par 
                tout autre moyen.`,
    paragraph4: `Il est recommandé d’utiliser un moyen qui permet au consommateur de prouver son 
                envoi: par poste recommandée, par courrier électronique, par télécopieur ou par un 
                service de messagerie.`,
    footer: 'PERMIS DE L’OPC : 122347',
  },
  english: {
    title: 'Notice of Contract Termination',
    paragraph1: `You may terminate this contract for any reason within 
                10 DAYS following the day on which either party obtained a copy of the contract. 
                If the merchant does not provide you with a service stipulated in the contract within 
                30 days of the agreed date, you have 1 year to terminate the contract. However, you 
                lose this right if you accept the service after this 30-day period. The right to 
                terminate may also be extended to 1 year for other reasons, including lack of a permit, 
                lack or deficiency of bonding, or non-compliance with the contract.`,
    paragraph2: `For more information, contact a legal advisor or the consumer protection office. 
                When the contract is terminated, the debt settlement service merchant must refund all 
                amounts you have paid and return any property he has received as payment, in exchange, 
                or as a deposit: if he cannot return this property, the debt settlement service 
                merchant must provide you with the higher of an amount corresponding to the price of 
                this property indicated in the contract or the value of this property within 15 days 
                of the termination. In the same period, you must return to the debt settlement service 
                merchant any property you received from the merchant, if applicable.`,
    paragraph3: `To terminate the contract, simply return the attached form to the merchant or send 
                him another written notice to that effect. The form or notice must be addressed to the 
                debt settlement service merchant indicated in the contract. The notice can be delivered 
                in person or given by any other means.`,
    paragraph4: `It is recommended to use a method that allows the consumer to prove the sending: by 
                registered mail, by email, by fax, or by a courier service.`,
    footer: 'OPC PERMIT: 122347',
  }
};

const ContractResolutionNotice: React.FC = () => {
  const { client } = useProductContext();
  const {language} = client;
  const content = language === 'Francais' ? translations.french : translations.english;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-white to-gray-100 border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        {content.title}
      </h1>
      <p className="text-gray-700 leading-loose mb-6">
        {content.paragraph1}
      </p>
      <p className="text-gray-700 leading-loose mb-6">
        {content.paragraph2}
      </p>
      <p className="text-gray-700 leading-loose mb-6">
        {content.paragraph3}
      </p>
      <p className="text-gray-700 leading-loose mb-6">
        {content.paragraph4}
      </p>
      <p className="text-gray-900 font-semibold mt-8 text-center">
        {content.footer}
      </p>
    </div>
  );
};

export default ContractResolutionNotice;
