// PdfPrintableContent.tsx
import React from 'react';
import InformationClientpdf from './InformationClientpdf';
import MenuBase from './MenuBase';
import PaymentComponentpdf from './PaymentComponentpdf';
import FormResilation from './FormResilation';
import PdfHead from './PdfHead'
import SummaryTable from './SummaryTable';
import { useProductContext } from '../../contexts/ProductContext';
import FoodServiceSummary from './FoodServiceSummary';
const PdfPrintableContent: React.FC = () => {

  const { client } = useProductContext();
  return (
    <div>
      <PdfHead />
      <InformationClientpdf />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ul>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'BOEUF'} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'POULET'} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'PORC'} />
        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'POISSON'} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'CONGÉLATEURS'} />
        </li>

      </ul>
      <br /><br /><br />
      <FoodServiceSummary></FoodServiceSummary>
      
      <br /><br />
      <PaymentComponentpdf />


      <FormResilation />
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

      { (
        <div className="flex flex-col items-center mt-10">
          <h3 className="text-lg font-semibold mb-4">Signature Client 1 </h3>
          <div className="border border-gray-300 p-4">
            <img
              src={client.signature1}
              alt="Client Signature"
              className="border border-gray-300"
            />
          </div>
        </div>
      )}
      { (
        <div className="flex flex-col items-center mt-10">
          <h3 className="text-lg font-semibold mb-4"> Conseiller </h3>
          <div className="border border-gray-300 p-4">
            <img
              src={client.signature2}
              alt="Client Signature"
              className="border border-gray-300"
            />
          </div>
        </div>
      )}

      
    </div>

  );
};

export default PdfPrintableContent;
