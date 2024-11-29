import React, { useState } from "react";
import { useProductContext } from '../../contexts/ProductContext';

const translations = {
  en: {
    formTitle: "CANCELLATION FORM",
    merchantSection: "To be completed by the merchant",
    merchantName: "MERCHANT NAME",
    address: "ADDRESS",
    contact: "CONTACT AT THIS NUMBER",
    email: "EMAIL",
    consumerSection: "To be completed by the consumer",
    formDate: "FORM SEND DATE",
    cancellationText: "Under section 59 of the Consumer Protection Act, I cancel the following contract:",
    contractNumber: "CONTRACT NUMBER",
    paymentOption: "PAYMENT OPTION",
    creditCard: "CREDIT CARD",
    interac: "INTERAC",
    financing: "FINANCING",
    concludedDate: "CONCLUDED ON",
    customerName: "NAME",
    customerAddress: "ADDRESS",
    deliveryDate: "DELIVERY DATE",
    signature: "SIGNATURE"
  },
  Francais: {
    formTitle: "FORMULAIRE DE RÉSILIATION",
    merchantSection: "À remplir par le commerçant",
    merchantName: "NOM DU COMMERÇANT",
    address: "ADRESSE",
    contact: "CONTACTER À CE NUMÉRO",
    email: "COURRIEL",
    consumerSection: "À remplir par le consommateur",
    formDate: "DATE D'ENVOI DU FORMULAIRE",
    cancellationText: "En vertu de l’article 59 de la loi sur la protection du consommateur, j’annule le contrat suivant :",
    contractNumber: "NUMÉRO DE CONTRAT",
    paymentOption: "OPTION DE PAIEMENT",
    creditCard: "CARTE DE CRÉDIT",
    interac: "INTERAC",
    financing: "FINANCEMENT",
    concludedDate: "CONCLU LE",
    customerName: "NOM",
    customerAddress: "ADRESSE",
    deliveryDate: "DATE DE LIVRAISON",
    signature: "SIGNATURE"
  }
};

const FormResilation = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [concludedDate, setConcludedDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [signature, setSignature] = useState("");

  const { client } = useProductContext();
  const  {language}  = client;
  const t = translations[language] || translations.en;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto border border-gray-300">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          {t.formTitle}
        </h1>

        <div className="text-center mb-6">
          <p className="text-lg font-medium text-red-700">
            {t.merchantSection}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 font-semibold mb-1">
              {t.merchantName}
            </label>
            <input
              type="text"
              id="name"
              className="border rounded w-full px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-800 font-semibold mb-1">
              {t.address}
            </label>
            <input
              type="text"
              id="address"
              className="border rounded w-full px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-800 font-semibold mb-1">
              {t.contact}
            </label>
            <input
              type="text"
              id="contact"
              className="border rounded w-full px-3 py-2"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-1">
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              className="border rounded w-full px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center mb-6">
            <p className="text-lg font-medium text-red-700">
              {t.consumerSection}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-800 font-semibold mb-1">
              {t.formDate}
            </label>
            <input
              type="date"
              id="date"
              className="border rounded w-full px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-800 font-semibold mb-2">
              {t.cancellationText}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="contractNumber" className="block text-gray-800 font-semibold mb-1">
              {t.contractNumber}
            </label>
            <input
              type="text"
              id="contractNumber"
              className="border rounded w-full px-3 py-2"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-1">
              {t.paymentOption}
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="carteDeCredit"
                  name="paymentOption"
                  value="carteDeCredit"
                  checked={paymentOption === "carteDeCredit"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="form-radio"
                />
                <span>{t.creditCard}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="interac"
                  name="paymentOption"
                  value="interac"
                  checked={paymentOption === "interac"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="form-radio"
                />
                <span>{t.interac}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="financement"
                  name="paymentOption"
                  value="financement"
                  checked={paymentOption === "financement"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="form-radio"
                />
                <span>{t.financing}</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="concludedDate" className="block text-gray-800 font-semibold mb-1">
              {t.concludedDate}
            </label>
            <input
              type="date"
              id="concludedDate"
              className="border rounded w-full px-3 py-2"
              value={concludedDate}
              onChange={(e) => setConcludedDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customerName" className="block text-gray-800 font-semibold mb-1">
              {t.customerName}
            </label>
            <input
              type="text"
              id="customerName"
              className="border rounded w-full px-3 py-2"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customerAddress" className="block text-gray-800 font-semibold mb-1">
              {t.customerAddress}
            </label>
            <input
              type="text"
              id="customerAddress"
              className="border rounded w-full px-3 py-2"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="deliveryDate" className="block text-gray-800 font-semibold mb-1">
              {t.deliveryDate}
            </label>
            <input
              type="date"
              id="deliveryDate"
              className="border rounded w-full px-3 py-2"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="signature" className="block text-gray-800 font-semibold mb-1">
              {t.signature}
            </label>
            <input
              type="text"
              id="signature"
              className="border rounded w-full px-3 py-2"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormResilation;
