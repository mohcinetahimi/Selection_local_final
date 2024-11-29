import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useProductContext } from '../../contexts/ProductContext';
import '../CreateCommand/tailwind.output.css'; // Or the correct path to your compiled CSS

interface Product {
  quantities: number[];
  price: number;
  basicQuantities: number[];
}

interface ProductContextType {
  products: Product[];
}

export default function ModalResume() {
  const [show, setShow] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false); // State to toggle details
  const { products } = useProductContext() as ProductContextType;

  // Calculate totals per delivery (livraison) and overall
  const totalPerLivraison = products[0].quantities.map((_, index) => {
    let totalQuantity = 0;
    let totalPrice = 0;

    products.forEach(product => {
      totalQuantity += product.quantities[index];
      totalPrice += product.quantities[index] * product.price;
    });

    return { totalQuantity, totalPrice };
  });

  const totalCredit = totalPerLivraison.reduce((acc, livraison) => acc + livraison.totalPrice + livraison.totalPrice*0.56, 0);
  const totalAjout = totalPerLivraison.reduce((acc, livraison, index) => {
    const basicTotalPrice = products.reduce((acc, product) => acc + product.basicQuantities[index] * product.price + product.basicQuantities[index] * product.price*0.56 , 0);
    return acc + (livraison.totalPrice - basicTotalPrice);
  }, 0);

  const dynamicTotal = totalPerLivraison.reduce((acc, livraison) => acc + livraison.totalPrice + livraison.totalPrice*0.56, 0);
  const pi3Values: string[] = ["3 pi³", "3 pi³"];

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end justify-end px-4 py-6 sm:p-6"
        style={{ zIndex: 9999 }} // Set a high z-index value
      >
        <div className="flex w-full max-w-sm">
          <Transition
            show={show}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="pointer-events-auto w-full overflow-hidden rounded-lg bg-black shadow-lg ring-1 ring-black ring-opacity-5 relative cursor-pointer"
              onClick={() => setShowDetails(!showDetails)} // Toggle showDetails state on click
            >
              <div className="p-4 text-white">
                <div className="grid grid-cols-2 text-center gap-4">
                  {totalPerLivraison.map((livraison, index) => (
                    <div key={index} className={`relative ${index % 2 === 0 ? 'pr-4' : 'pl-4'}`}>
                      {index % 2 === 1 && (
                        <div className="absolute inset-y-0 left-0 w-px bg-gray-100" />
                      )}
                      <p className="font-bold text-lg">LIV {index + 1}</p>
                      <p className="text-lg">
                        {livraison.totalQuantity} <span className="text-base">({pi3Values[index]})</span>
                      </p>
                    </div>
                  ))}
                </div>

                <Transition
                  show={showDetails}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div>
                    <div className="mt-4 text-center font-bold text-3xl">
                      {(dynamicTotal / 52).toFixed(2)}$ <span className="text-xl">SEM</span>
                    </div>
                    <div className="border-t border-gray-100 mt-4 pt-4 grid grid-cols-2 text-center">
                      <div>
                        <p className="text-base">CRÉDITS</p>
                        <p className="font-bold text-lg">{totalCredit.toFixed(2)}$</p>
                      </div>
                      <div>
                        <p className="text-base">AJOUTS</p>
                        <p className="font-bold text-lg">{totalAjout.toFixed(2)}$</p>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
              <div className="absolute top-2 right-2">

              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
