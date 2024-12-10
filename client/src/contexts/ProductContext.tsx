import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
// Define the types for Product, Client, and related structures
interface Product {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  format: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  category: string;
  quantities: number[];
  basicQuantities: number[];
}




interface Appointment {
  date: string;
  time: string;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
}

interface PhoneNumbers {
  phone1: string;
  phone2: string;
}

interface Freezer {
  hasExtraFreezer: boolean;
  currentState: string;
  hasSpaceForExtraFreezer: boolean;
}

interface WeeklyBudget {
  meat: number;
}

interface SubClient {
  fullName: string;
  _id: string;
}

interface Client {
  _id?: string;
  fullName?: string;
  email?: string | null;
  appointment?: Appointment;
  address?: Address;
  phoneNumbers?: PhoneNumbers;
  freezer?: Freezer;
  weeklyBudget?: WeeklyBudget;
  note?: string;
  language?: string;
  clients?: SubClient[];
  beenConsulted?: boolean;
  commandId?: string | null;
  consultantId?: string | null;
  signature1?: string | null;
  signature2?: string | null;
  signatureConsultant?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  CommandNumber: number | null;
}

interface ProductContextType {
  products: Product[];
  nombreOfLivraison: number;
  client: Client; // Client data in context
  commandIsConfirmed: boolean; // New state for command confirmation
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; // Correct type here  updateProduct: (id: number, updates: Partial<Product>) => void;
  updateNombreOfLivraison: (newNombreOfLivraison: number) => void;
  updateClient: (newClient: Partial<Client>) => void; // Function to update client
  updateCommandStatus: (status: boolean) => void; // Function to update command status
  getProductsByCategory: () => Record<string, Product[]>;
  resetQuantitiesByCategory: (category: string) => void;
  resetToBasicQuantitiesByCategory: (category: string) => void;
  calculateTotalFoodService: () => { totalService: number; maintenanceExpenses: number; totalProductsPrice: number; };

}

// Create the ProductContext
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Create the ProductProvider component
interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>();

  const [nombreOfLivraison, setNombreOfLivraison] = useState<number>(4);
  const [client, setClient] = useState<Client>({}); // Initialize with an empty object
  const [commandIsConfirmed, setCommandIsConfirmed] = useState<boolean>(false); // New state

  
    
    const fetchProducts = async ()=>{
      try{
        const response = await axios.get("http://localhost:7070/api/consultant/products") ; 
        setProducts(response.data)
      }catch{
    
      }
    }
    fetchProducts() ; 


  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const updateNombreOfLivraison = (newNombreOfLivraison: number) => {
    const clampedValue = Math.max(0, Math.min(4, newNombreOfLivraison));
    setNombreOfLivraison(clampedValue);

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const updatedQuantities = product.quantities.slice(0, clampedValue);
        while (updatedQuantities.length < clampedValue) {
          updatedQuantities.push(0);
        }
        return { ...product, quantities: updatedQuantities };
      })
    );
  };

  const updateClient = (newClient: Partial<Client>) => {
    setClient((prevClient) => ({
      ...prevClient,
      ...newClient,
    }));
  };

  const getProductsByCategory = (): Record<string, Product[]> => {
    return products.reduce<Record<string, Product[]>>((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const resetQuantitiesByCategory = (category: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.category === category
          ? {
            ...product,
            quantities: product.quantities
              .slice(0, nombreOfLivraison)
              .map(() => 0),
          }
          : product
      )
    );
  };

  const resetToBasicQuantitiesByCategory = (category: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.category === category
          ? {
            ...product,
            quantities: [
              ...product.basicQuantities.slice(0, nombreOfLivraison),
            ],
          }
          : product
      )
    );
  };
  const updateCommandStatus = (status: boolean) => {
    setCommandIsConfirmed(status);
  };
  const calculateTotalFoodService = (): {
    totalService: number;
    maintenanceExpenses: number;
    totalProductsPrice: number
  } => {
    const totalProductsPrice = products.reduce((total, product) => {
      const applicableQuantities = product.quantities.slice(0, nombreOfLivraison);
      const productTotal = applicableQuantities.reduce((sum, q) => sum + q, 0) * product.price;
      return total + productTotal;
    }, 0);

    const maintenanceExpenses = totalProductsPrice * 0.56;
    const totalService = totalProductsPrice + maintenanceExpenses;

    return { totalService, maintenanceExpenses, totalProductsPrice };
  };


  return (
    <ProductContext.Provider
      value={{
        products,
        nombreOfLivraison,
        client, // Include client in the context
        commandIsConfirmed,
        setProducts,
        updateProduct,
        updateNombreOfLivraison,
        updateClient, // Include the client update function in the context
        updateCommandStatus, // Include the command status update function in the context
        getProductsByCategory,
        resetQuantitiesByCategory,
        resetToBasicQuantitiesByCategory,
        calculateTotalFoodService,  // Add this line

      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook to use the ProductContext
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

