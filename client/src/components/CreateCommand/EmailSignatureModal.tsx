import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import SignatureCanvas from 'react-signature-canvas';
import { useProductContext } from '../../contexts/ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

interface TransformedProduct {
  name: string;
  quantity: number[];
  price: number;
}

interface ProductsByCategory {
  [category: string]: TransformedProduct[];
}

interface EmailSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string | null) => void;
  initialEmail: string;
}

const EmailSignatureModal: React.FC<EmailSignatureModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialEmail,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [nameConsultant, setnameConsultant] = useState("");
  const signatureRef1 = useRef<SignatureCanvas>(null);
  const signatureRef2 = useRef<SignatureCanvas>(null);
  const signatureConsRef = useRef<SignatureCanvas>(null);
  const { clientId } = useParams<{ clientId: string }>();
  const { updateClient, products, nombreOfLivraison, client } = useProductContext();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSaveSignature = (): { dataUrl1: string, dataUrl2: string, dataUrl3: string } => {
    let dataUrl1;
    let dataUrl2;
    let dataUrl3;
    if (signatureRef1.current) {
      dataUrl1 = signatureRef1.current.toDataURL();
    }
    if (signatureRef2.current) {
      dataUrl2 = signatureRef2.current.toDataURL();
    }
    if (signatureConsRef.current) {
      dataUrl3 = signatureConsRef.current.toDataURL();
    }
    return { dataUrl1, dataUrl2, dataUrl3 };
  };

  const productsByCategory = (): ProductsByCategory => {

    const newproducts: ProductsByCategory = {};
    try {
      products.forEach((product) => {
        let sommeofcommands = 0;
        for (let i = 0; i < nombreOfLivraison; i++) {
          sommeofcommands += product.quantities[i];
        }

        if (sommeofcommands === 0) {
          return;
        }

        if (!newproducts[product.category]) {
          newproducts[product.category] = [
            { name: product.name, quantity: product.quantities, price: product.price },
          ];
        } else {
          newproducts[product.category].push({
            name: product.name,
            quantity: product.quantities,
            price: product.price,
          });
        }
      });

      return newproducts;
    } catch (err) {
      console.error(err);
    }
    return newproducts;
  };



  useEffect(()=>{
      const nameOfConsultant = localStorage.getItem("nameConsultant") ; 
      if(!nameOfConsultant){
        localStorage.setItem("nameConsultant", "");
      }else{
        setnameConsultant(nameOfConsultant) ; 
      }
  },[])

  const handleNameConsultant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnameConsultant(event.target.value);
    localStorage.setItem("nameConsultant", event.target.value);
  };




  const handleConfirm = async () => {
    const savedSignatures = handleSaveSignature();
    if (savedSignatures) {
      updateClient({ signature1: savedSignatures.dataUrl1, signature2: savedSignatures.dataUrl2, signatureConsultant: savedSignatures.dataUrl3 });
      updateClient({ email: email ? email : null });

      try {
        const token = localStorage.getItem('token');
        const productsByCategoris = productsByCategory();
        const dataToSend = {
          clientId: clientId,
          object: { NL: nombreOfLivraison, products: productsByCategoris },

        };
        console.log("button clicked")
        const response = await axios.post("http://localhost:7070/api/consultant/createCommand", dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        updateClient({ CommandNumber: response.data.savedCommand.orderNumber })

        toast.success("Command created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        onConfirm(email);
        onClose();
      } catch (error) {
        toast.error("Error creating Command!!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Email and Signature Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      overlayClassName="fixed inset-0"
      ariaHideApp={false}
    >
      <div className="bg-white p-6 rounded shadow-md max-w-lg mx-4">
        <h2 className="text-lg font-semibold mb-4">Confirm Email and Sign</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nameConsultant" className="block text-sm font-medium text-gray-700">name Consultant</label>
          <input
            type="text"
            id="nameConsultant"
            value={nameConsultant}
            onChange={handleNameConsultant}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="col-span-1 p-4">
            <h2 className="text-lg font-semibold mb-2">Signature Client 1</h2>
            <SignatureCanvas
              ref={signatureRef1}
              penColor="black"
              canvasProps={{
                className: 'border border-gray-300',
                width: 600,
                height: 300,
              }}
              backgroundColor="white"
            />
          </div>
          
          {/* First row */}
          <div className="col-span-1 p-4">
            <h2 className="text-lg font-semibold mb-2">Signature Consultant</h2>
            <SignatureCanvas
              ref={signatureConsRef}
              penColor="black"
              canvasProps={{
                className: 'border border-gray-300',
                width: 600,
                height: 300,
              }}
              backgroundColor="white"
            />
          </div>
          {/* Second row */}
          <div className="col-span-1 p-4">
            {client.clients[0].fullName !== "*" ? (
              <>
                <h2 className="text-lg font-semibold mb-2">Signature Client 2</h2>
                <SignatureCanvas
                  ref={signatureRef2}
                  penColor="black"
                  canvasProps={{
                    className: 'border border-gray-300',
                    width: 600,
                    height: 300,
                  }}
                  backgroundColor="white"
                />
              </>
            ) : (<></>)}
          </div>


        </div>



        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleConfirm}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailSignatureModal;
