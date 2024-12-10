import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import '../CreateCommand/tailwind.output.css';

const InformationClient: React.FC = () => {
  const { client } = useProductContext();
  console.log(client);
  const { appointment, address, phoneNumbers, freezer, weeklyBudget, fullName, note, language, clients } = client;

  return (
    <div className="px-6 sm:px-8 lg:px-12 mx-auto max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">
          {language === 'Francais' ? 'Information du Client' : 'Client Information'}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'Francais' ? 'Détails personnels et informations du représentant.' : 'Personal details and representative information.'}
        </p>
      </div>
      <div className="px-6 py-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Nom complet' : 'Full Name'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{fullName}</dd>
          </div>
          {clients[0].fullName != "*" ? (
            <div className="border-t border-gray-100 pt-6">
              <dt className="text-sm font-medium text-gray-800">
                {language === 'Francais' ? 'Nom complet 2' : 'Full Name 2'}
              </dt>
              <dd className="mt-1 text-sm text-gray-700">{clients[0].fullName}</dd>
            </div>) :
            (<></>)}

          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Note' : 'Note'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{note}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Date de rendez-vous' : 'Appointment Date'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{new Date(appointment.date).toLocaleDateString()}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Heure de rendez-vous' : 'Appointment Time'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{appointment.time}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Adresse' : 'Address'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{address.street}, {address.city}, {address.postalCode}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Téléphone 1' : 'Phone 1'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{phoneNumbers.phone1}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Téléphone 2' : 'Phone 2'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{phoneNumbers.phone2}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Congélateur actuel' : 'Current Freezer'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{freezer.currentState}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Congélateur supplémentaire' : 'Extra Freezer'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{freezer.hasExtraFreezer ? "Oui" : "No"}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'Budget hebdomadaire pour la viande' : 'Weekly Meat Budget'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{weeklyBudget.meat}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">
              {language === 'Francais' ? 'nom du consultant' : 'consultant name'}
            </dt>
            <dd className="mt-1 text-sm text-gray-700">{localStorage.getItem("nameConsultant") ? localStorage.getItem("nameConsultant") : ""}</dd>
          </div>
          
          
        </dl>
      </div>
    </div>
  );
};

export default InformationClient;
