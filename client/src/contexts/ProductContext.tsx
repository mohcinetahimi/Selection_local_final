import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  CommandNumber:number | null ; 
}

interface ProductContextType {
  products: Product[];
  nombreOfLivraison: number;
  client: Client; // Client data in context
  commandIsConfirmed: boolean; // New state for command confirmation
  updateProduct: (id: number, updates: Partial<Product>) => void;
  updateNombreOfLivraison: (newNombreOfLivraison: number) => void;
  updateClient: (newClient: Partial<Client>) => void; // Function to update client
  updateCommandStatus: (status: boolean) => void; // Function to update command status
  getProductsByCategory: () => Record<string, Product[]>;
  resetQuantitiesByCategory: (category: string) => void;
  resetToBasicQuantitiesByCategory: (category: string) => void;
  calculateTotalFoodService: () => { totalService: number; maintenanceExpenses: number ; totalProductsPrice: number ;};

}

// Create the ProductContext
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Create the ProductProvider component
interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Porc haché 85%',
      nameEn: 'Porc hached 85%',
      description: 'Porc haché 85%',
      format: '10 X 500G',
      price: 91.00,
      imageSrc: '/images/product/1.jpg', // Replace with actual path
      imageAlt: 'Porc haché 85%',
      category: 'PORC',
      quantities: [2, 2, 1, 1], // Delivery quantities
      basicQuantities: [2, 2, 1, 1], // Assuming basic quantities match
    },
    {
      id: 2,
      name: 'Côtelettes de porc demi-lune',
      description: 'Côtelettes de porc demi-lune',
      format: '24 X 110G',
      price: 68.00,
      imageSrc: '/images/product/2.jpg', // Replace with actual path
      imageAlt: 'Côtelettes de porc demi-lune',
      category: 'PORC',
      quantities: [1, 1, 0, 1],
      basicQuantities: [1, 1, 0, 1],
    },
    {
      id: 3,
      name: 'Saucisses déjeuner',
      description: 'Saucisses déjeuner',
      format: '10 X 400G',
      price: 93.00,
      imageSrc: '/images/product/3.jpg', // Replace with actual path
      imageAlt: 'Saucisses déjeuner',
      category: 'PORC',
      quantities: [1, 1, 0, 1],
      basicQuantities: [1, 1, 0, 1],
    },
    {
      id: 4,
      name: 'Filet mignon de porc',
      description: 'Filet mignon de porc',
      format: '5-6 (3 kg)',
      price: 95.00,
      imageSrc: '/images/product/4.jpg', // Replace with actual path
      imageAlt: 'Filet mignon de porc',
      category: 'PORC',
      quantities: [2, 2, 1, 1],
      basicQuantities: [2, 2, 1, 1],
    },
    {
      id: 5,
      name: 'Rôti de porc',
      description: 'Rôti de porc',
      format: '4 X 908G',
      price: 80.00,
      imageSrc: '/images/product/5.jpg', // Replace with actual path
      imageAlt: 'Rôti de porc',
      category: 'PORC',
      quantities: [1, 1, 1, 0],
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 6,
      name: 'Côte de porc manchon',
      description: 'Côte de porc manchon',
      format: 'approx 12 X +/-300G',
      price: 106.00,
      imageSrc: '/images/product/6.png', // Replace with actual path
      imageAlt: 'Côte de porc manchon',
      category: 'PORC',
      quantities: [1, 1, 1, 0],
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 7,
      name: 'AAA Steak minute',
      description: 'AAA Steak minute',
      format: '10 X 454G',
      price: 94.00,
      imageSrc: '/images/product/7.webp', // Replace with actual path
      imageAlt: 'AAA Steak minute',
      category: 'BOEUF',
      quantities: [4, 4, 2, 2], // Delivery quantities
      basicQuantities: [4, 4, 2, 2],
    },
    {
      id: 8,
      name: 'Filet mignon',
      description: 'Filet mignon',
      format: '24 X 110G',
      price: 131.00,
      imageSrc: '/images/product/8.png', // Replace with actual path
      imageAlt: 'Filet mignon',
      category: 'BOEUF',
      quantities: [1, 1, 1, 0],
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 9,
      name: 'Steak Minute AAA',
      description: 'Steak Minute AAA',
      format: '24 X 110G',
      price: 117.00,
      imageSrc: '/images/product/9.jpg', // Replace with actual path
      imageAlt: 'Steak Minute AAA',
      category: 'BOEUF',
      quantities: [1, 1, 0, 1],
      basicQuantities: [1, 1, 0, 1],
    },
    {
      id: 10,
      name: 'Rosbif (Haut de ronde)',
      description: 'Rosbif (Haut de ronde)',
      format: '3 X 1KG',
      price: 120.00,
      imageSrc: '/images/product/10.png', // Replace with actual path
      imageAlt: 'Rosbif (Haut de ronde)',
      category: 'BOEUF',
      quantities: [1, 1, 0, 1],
      basicQuantities: [1, 1, 0, 1],
    },
    {
      id: 11,
      name: 'Cubes de boeuf à ragoût',
      description: 'Cubes de boeuf à ragoût',
      format: '8 X 454G',
      price: 107.00,
      imageSrc: '/images/product/11.jpg', // Replace with actual path
      imageAlt: 'Cubes de boeuf à ragoût',
      category: 'BOEUF',
      quantities: [2, 2, 1, 1],
      basicQuantities: [2, 2, 1, 1],
    },
    {
      id: 12,
      name: 'Haut de surlonge ( Boston )',
      description: 'Haut de surlonge ( Boston )',
      format: '12 x 170 g',
      price: 122.00,
      imageSrc: '/images/product/12.jpg', // Replace with actual path
      imageAlt: 'Haut de surlonge ( Boston )',
      category: 'BOEUF',
      quantities: [1, 1, 1, 0],
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 13,
      name: 'Poitrines de poulet désossées',
      description: 'Poitrines de poulet désossées',
      format: '9-12 (3KG)',
      price: 121.00,
      imageSrc: '/images/product/13.png', // Replace with actual path
      imageAlt: 'Poitrines de poulet désossées',
      category: 'POULET',
      quantities: [4, 4, 2, 2], // Delivery quantities
      basicQuantities: [4, 4, 2, 2],
    },
    {
      id: 14,
      name: 'Cuisses de poulet (Nature)',
      description: 'Cuisses de poulet (Nature)',
      format: '4-5 (2 unités)',
      price: 46.00,
      imageSrc: '/images/product/14.jpg', // Replace with actual path
      imageAlt: 'Cuisses de poulet (Nature)',
      category: 'POULET',
      quantities: [2, 2, 1, 1],
      basicQuantities: [2, 2, 1, 1],
    },
    {
      id: 15,
      name: 'Pilon de poulet',
      description: 'Pilon de poulet',
      format: '4-5 (5 unités)',
      price: 59.00,
      imageSrc: '/images/product/15.png', // Replace with actual path
      imageAlt: 'Pilon de poulet',
      category: 'POULET',
      quantities: [6, 6, 3, 3],
      basicQuantities: [6, 6, 3, 3],
    },
    {
      id: 16,
      name: 'Tournedos de poulet (nature)',
      description: 'Tournedos de poulet (nature)',
      format: '16 X 142G',
      price: 114.00,
      imageSrc: '/images/product/16.jpg', // Replace with actual path
      imageAlt: 'Tournedos de poulet (nature)',
      category: 'POULET',
      quantities: [1, 1, 1, 0],
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 17,
      name: 'Tournedos de poulet (BBQ)',
      description: 'Tournedos de poulet (BBQ)',
      format: '16 X 140G',
      price: 117.00,
      imageSrc: '/images/product/17.jpg', // Replace with actual path
      imageAlt: 'Tournedos de poulet (BBQ)',
      category: 'POULET',
      quantities: [1, 1, 0, 1],
      basicQuantities: [1, 1, 0, 1],
    },
    {
      id: 18,
      name: 'Poulet pop corn',
      description: 'Poulet pop corn',
      format: '2KG',
      price: 71.00,
      imageSrc: '/images/product/18.png', // Replace with actual path
      imageAlt: 'Poulet pop corn',
      category: 'POULET',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 19,
      name: 'Poulet Pané Style maison',
      description: 'Poulet Pané Style maison',
      format: '2,2 Kg',
      price: 48.00,
      imageSrc: '/images/product/19.jpg', // Replace with actual path
      imageAlt: 'Poulet Pané Style maison',
      category: 'POULET',
      quantities: [2, 2, 1, 1],
      basicQuantities: [2, 2, 1, 1],
    },
    {
      id: 20,
      name: 'Filet de doré',
      description: 'Filet de doré',
      format: '(10-13) 2KG',
      price: 117.00,
      imageSrc: '/images/product/20.jpg', // Replace with actual path
      imageAlt: 'Filet de doré',
      category: 'POISSON',
      quantities: [1, 1, 1, 0], // Delivery quantities
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 21,
      name: 'Longe d\'aiglefin',
      description: 'Longe d\'aiglefin',
      format: '16 X 4OZ',
      price: 76.00,
      imageSrc: '/images/product/21.png', // Replace with actual path
      imageAlt: 'Longe d\'aiglefin',
      category: 'POISSON',
      quantities: [1, 1, 0, 1],
      basicQuantities: [1, 1, 0, 1],
    },
    {
      id: 22,
      name: 'Filet de sole',
      description: 'Filet de sole',
      format: '20 X 3OZ',
      price: 70.00,
      imageSrc: '/images/product/22.jpg', // Replace with actual path
      imageAlt: 'Filet de sole',
      category: 'POISSON',
      quantities: [1, 1, 1, 0],
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 23,
      name: 'Bâtonnets de poisson',
      description: 'Bâtonnets de poisson',
      format: '2,27KG',
      price: 58.00,
      imageSrc: '/images/product/23.jpg', // Replace with actual path
      imageAlt: 'Bâtonnets de poisson',
      category: 'POISSON',
      quantities: [2, 2, 1, 1],
      basicQuantities: [2, 2, 1, 1],
    },
    {
      id: 24,
      name: 'Pavé de saumon',
      description: 'Pavé de saumon',
      format: '(12X170G) 2.04 kg',
      price: 126.00,
      imageSrc: '/images/product/24.jpg', // Replace with actual path
      imageAlt: 'Pavé de saumon',
      category: 'POISSON',
      quantities: [1, 1, 1, 0],
      basicQuantities: [1, 1, 1, 0],
    },
    {
      id: 25,
      name: 'Crevettes nordiques',
      description: 'Crevettes nordiques',
      format: '5 X 400G',
      price: 90.00,
      imageSrc: '/images/product/25.jpg', // Replace with actual path
      imageAlt: 'Crevettes nordiques',
      category: 'POISSON',
      quantities: [1, 1, 0, 1],
      basicQuantities: [1, 1, 0, 1],
    },
    {
      id: 26,
      name: 'Congélateur 7 pi cube',
      description: 'Congélateur 7 pi cube',
      format: '0', // No specific format provided
      price: 379.99,
      imageSrc: '/images/product/26.png', // Replace with actual path
      imageAlt: 'Congélateur 7 pi cube',
      category: 'CONGÉLATEURS',
      quantities: [0, 0, 0, 0], // Delivery quantities
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 27,
      name: 'Congélateur Midea 5 pi³ horizontal',
      description: 'Congélateur Midea 5 pi³ horizontal',
      format: '0', // No specific format provided
      price: 295.00,
      imageSrc: '/images/product/27.jpg', // Replace with actual path
      imageAlt: 'Congélateur Midea 5 pi³ horizontal',
      category: 'CONGÉLATEURS',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 28,
      name: 'Congélateur Midea 17 pi³ vertical',
      description: 'Congélateur Midea 17 pi³ vertical',
      format: '0', // No specific format provided
      price: 995.00,
      imageSrc: '/images/product/28.jpg', // Replace with actual path
      imageAlt: 'Congélateur Midea 17 pi³ vertical',
      category: 'CONGÉLATEURS',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 29,
      name: 'Congélateur Frigidaire 15.5 pieds vertical inox',
      description: 'Congélateur Frigidaire 15.5 pieds vertical inox',
      format: '0', // No specific format provided
      price: 1095.00,
      imageSrc: '/images/product/29.jpg', // Replace with actual path
      imageAlt: 'Congélateur Frigidaire 15.5 pieds vertical inox',
      category: 'CONGÉLATEURS',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 30,
      name: 'Congélateur Midea 21 pi³ vertical',
      description: 'Congélateur Midea 21 pi³ vertical',
      format: '0', // No specific format provided
      price: 1195.00,
      imageSrc: '/images/product/30.jpg', // Replace with actual path
      imageAlt: 'Congélateur Midea 21 pi³ vertical',
      category: 'CONGÉLATEURS',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 31,
      name: 'Maïs en grain',
      description: 'Maïs en grain',
      format: '341ML',
      price: 1.21,
      imageSrc: '/images/product/31.jpg', // Replace with actual path
      imageAlt: 'Maïs en grain',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 32,
      name: 'Tomate italienne',
      description: 'Tomate italienne',
      format: '796ML',
      price: 1.21,
      imageSrc: '/images/product/32.jpg', // Replace with actual path
      imageAlt: 'Tomate italienne',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 33,
      name: 'Pâte de tomate',
      description: 'Pâte de tomate',
      format: '12 x 156 ML',
      price: 14.20,
      imageSrc: '/images/product/33.png', // Replace with actual path
      imageAlt: 'Pâte de tomate',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 34,
      name: 'Kraft cheese whiz',
      description: 'Kraft cheese whiz',
      format: '900 G',
      price: 11.15,
      imageSrc: '/images/product/34.jpg', // Replace with actual path
      imageAlt: 'Kraft cheese whiz',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 35,
      name: 'Soupe de tomate',
      description: 'Soupe de tomate',
      format: '284ML',
      price: 0.50,
      imageSrc: '/images/product/35.jpg', // Replace with actual path
      imageAlt: 'Soupe de tomate',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 36,
      name: 'Bovril de boeuf',
      description: 'Bovril de boeuf',
      format: '750ML',
      price: 8.62,
      imageSrc: '/images/product/36.jpg', // Replace with actual path
      imageAlt: 'Bovril de boeuf',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 37,
      name: 'Cassonnade',
      description: 'Cassonnade',
      format: '2KG',
      price: 4.99,
      imageSrc: '/images/product/37.jpg', // Replace with actual path
      imageAlt: 'Cassonnade',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 38,
      name: 'Huile de canola',
      description: 'Huile de canola',
      format: '5L',
      price: 19.27,
      imageSrc: '/images/product/38.jpg', // Replace with actual path
      imageAlt: 'Huile de canola',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 39,
      name: 'Bovril de poulet',
      description: 'Bovril de poulet',
      format: '750ML',
      price: 8.62,
      imageSrc: '/images/product/39.jpg', // Replace with actual path
      imageAlt: 'Bovril de poulet',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 40,
      name: 'Bouillon de poulet',
      description: 'Bouillon de poulet',
      format: '946ML',
      price: 2.02,
      imageSrc: '/images/product/40.png', // Replace with actual path
      imageAlt: 'Bouillon de poulet',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 41,
      name: 'Moutarde French\'s',
      description: 'Moutarde French\'s',
      format: '830ML',
      price: 5.06,
      imageSrc: '/images/product/41.jpg', // Replace with actual path
      imageAlt: 'Moutarde French\'s',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 42,
      name: 'Croque nature',
      description: 'Croque nature',
      format: '1.8KG',
      price: 11.15,
      imageSrc: '/images/product/42.jpg', // Replace with actual path
      imageAlt: 'Croque nature',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 43,
      name: 'Ketchup Heinz',
      description: 'Ketchup Heinz',
      format: '1.25L',
      price: 4.05,
      imageSrc: '/images/product/43.jpg', // Replace with actual path
      imageAlt: 'Ketchup Heinz',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 44,
      name: 'Cheerios miel & noix',
      description: 'Cheerios miel & noix',
      format: '1.51KG',
      price: 10.14,
      imageSrc: '/images/product/44.jpg', // Replace with actual path
      imageAlt: 'Cheerios miel & noix',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 45,
      name: 'Tartinade Noisettes Kirkland',
      description: 'Tartinade Noisettes Kirkland',
      format: '1KG',
      price: 6.59,
      imageSrc: '/images/product/45.jpg', // Replace with actual path
      imageAlt: 'Tartinade Noisettes Kirkland',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 46,
      name: 'Kraft diner',
      description: 'Kraft diner',
      format: '340G',
      price: 1.18,
      imageSrc: '/images/product/46.jpg', // Replace with actual path
      imageAlt: 'Kraft diner',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 47,
      name: 'Maïs en crème',
      description: 'Maïs en crème',
      format: '398ML',
      price: 1.21,
      imageSrc: '/images/product/47.jpg', // Replace with actual path
      imageAlt: 'Maïs en crème',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 48,
      name: 'Macaroni',
      description: 'Macaroni',
      format: '1KG',
      price: 2.02,
      imageSrc: '/images/product/48.jpg', // Replace with actual path
      imageAlt: 'Macaroni',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 49,
      name: 'Grissol melba',
      description: 'Grissol melba',
      format: '1KG',
      price: 10.14,
      imageSrc: '/images/product/49.jpg', // Replace with actual path
      imageAlt: 'Grissol melba',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 50,
      name: 'Mini Wheats',
      description: 'Mini Wheats',
      format: '1.6KG',
      price: 12.17,
      imageSrc: '/images/product/50.jpg', // Replace with actual path
      imageAlt: 'Mini Wheats',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 51,
      name: 'Riz Minute Rice',
      description: 'Riz Minute Rice',
      format: '3KG',
      price: 9.63,
      imageSrc: '/images/product/51.jpg', // Replace with actual path
      imageAlt: 'Riz Minute Rice',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 52,
      name: 'Dare craquelin',
      description: 'Dare craquelin',
      format: '1.15KG',
      price: 13.19,
      imageSrc: '/images/product/52.png', // Replace with actual path
      imageAlt: 'Dare craquelin',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 53,
      name: 'Épices à steak',
      description: 'Épices à steak',
      format: '825G',
      price: 9.12,
      imageSrc: '/images/product/53.png', // Replace with actual path
      imageAlt: 'Épices à steak',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 54,
      name: 'Beurre d\'arachide Naturel',
      description: 'Beurre d\'arachide Naturel',
      format: '1kg',
      price: 7.10,
      imageSrc: '/images/product/54.jpg', // Replace with actual path
      imageAlt: 'Beurre d\'arachide Naturel',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 55,
      name: 'Nutella',
      description: 'Nutella',
      format: '1KG',
      price: 7.10,
      imageSrc: '/images/product/55.jpg', // Replace with actual path
      imageAlt: 'Nutella',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 56,
      name: 'Beurre d\'arachide',
      description: 'Beurre d\'arachide',
      format: '2KG',
      price: 9.12,
      imageSrc: '/images/product/56.jpg', // Replace with actual path
      imageAlt: 'Beurre d\'arachide',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 57,
      name: 'Premium plus craquelin',
      description: 'Premium plus craquelin',
      format: '1.36KG',
      price: 9.63,
      imageSrc: '/images/product/57.jpg', // Replace with actual path
      imageAlt: 'Premium plus craquelin',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 58,
      name: 'Sel sifto',
      description: 'Sel sifto',
      format: '1KG',
      price: 0.97,
      imageSrc: '/images/product/58.jpg', // Replace with actual path
      imageAlt: 'Sel sifto',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 59,
      name: 'Spaghetti',
      description: 'Spaghetti',
      format: '1KG',
      price: 2.02,
      imageSrc: '/images/product/59.jpg', // Replace with actual path
      imageAlt: 'Spaghetti',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 60,
      name: 'Spaghetini',
      description: 'Spaghetini',
      format: '1KG',
      price: 2.02,
      imageSrc: '/images/product/60.png', // Replace with actual path
      imageAlt: 'Spaghetini',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 61,
      name: 'Sauce St-hubert',
      description: 'Sauce St-hubert',
      format: '398ML',
      price: 1.01,
      imageSrc: '/images/product/61.png', // Replace with actual path
      imageAlt: 'Sauce St-hubert',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 62,
      name: 'Confitures de fraise',
      description: 'Confitures de fraise',
      format: '800ML',
      price: 7.60,
      imageSrc: '/images/product/62.jpg', // Replace with actual path
      imageAlt: 'Confitures de fraise',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 63,
      name: 'Sucre',
      description: 'Sucre',
      format: '4KG',
      price: 4.99,
      imageSrc: '/images/product/63.jpg', // Replace with actual path
      imageAlt: 'Sucre',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 64,
      name: 'Huile D\'Olive Terra',
      description: 'Huile D\'Olive Terra',
      format: '1L',
      price: 9.13,
      imageSrc: '/images/product/64.jpg', // Replace with actual path
      imageAlt: 'Huile D\'Olive Terra',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 65,
      name: 'Riz Uncle Ben\'s',
      description: 'Riz Uncle Ben\'s',
      format: '5.44KG',
      price: 13.18,
      imageSrc: '/images/product/65.jpg', // Replace with actual path
      imageAlt: 'Riz Uncle Ben\'s',
      category: 'ÉPICERIE',
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0],
    },
    {
      id: 66,
      name: "Rosette de boeuf",
      description: "Produit Québécois",
      format: "2KG",
      price: 96.00,
      imageSrc: "/images/product/66.png",
      imageAlt: "Rosette de boeuf",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 67,
      name: "Roti d'Épaule de Boeuf",
      description: "Produit Canadien",
      format: "3 X 1KG",
      price: 71.00,
      imageSrc: "/images/product/67.jpg",
      imageAlt: "Roti d'Épaule de Boeuf",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 68,
      name: "Steak châteaubriand",
      description: "Produit Canadien",
      format: "8 X 280G",
      price: 134.00,
      imageSrc: "/images/product/68.png",
      imageAlt: "Steak châteaubriand",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 69,
      name: "Bavette de boeuf",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "12 X 224G",
      price: 217.00,
      imageSrc: "/images/product/69.png",
      imageAlt: "Bavette de boeuf",
      category: "BOEUF",
      quantities: [1, 1, 0, 0],
      basicQuantities: [1, 1, 0, 0]
    },
    {
      id: 70,
      name: "Macreuse de boeuf AAA",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "12 X 190G",
      price: 140.00,
      imageSrc: "/images/product/70.png",
      imageAlt: "Macreuse de boeuf AAA",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 71,
      name: "Smoked Meat",
      description: "Smoked Meat",
      format: "15 x 125g",
      price: 136.00,
      imageSrc: "/images/product/71.png",
      imageAlt: "Smoked Meat",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 72,
      name: "Onglet de Boeuf AAA",
      description: "Produit Canadien",
      format: "12 x 220G",
      price: 145.00,
      imageSrc: "/images/product/72.png",
      imageAlt: "Onglet de Boeuf AAA",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 73,
      name: "Onglet de boeuf AA",
      description: "Produit Canadien",
      format: "12 x 170G",
      price: 120.00,
      imageSrc: "/images/product/73.png",
      imageAlt: "Onglet de boeuf AA",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 74,
      name: "Bifteck ( haut de surlonge )",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "12 x 220g",
      price: 159.00,
      imageSrc: "/images/product/74.jpg",
      imageAlt: "Bifteck ( haut de surlonge )",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 75,
      name: "Filet mignon",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "12 X 170G",
      price: 272.00,
      imageSrc: "/images/product/75.png",
      imageAlt: "Filet mignon",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 76,
      name: "Filet mignon",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "10 X 224G",
      price: 305.00,
      imageSrc: "/images/product/76.png",
      imageAlt: "Filet mignon",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 77,
      name: "Filet mignon",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "8 X 280G",
      price: 305.00,
      imageSrc: "/images/product/77.png",
      imageAlt: "Filet mignon",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 78,
      name: "Bifteck de côte 1''",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "6 x 504 g",
      price: 186.00,
      imageSrc: "/images/product/78.png",
      imageAlt: "Bifteck de côte 1''",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 79,
      name: "Bifteck de côte 1''1/2",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "4 X 1.2KG",
      price: 198.00,
      imageSrc: "/images/product/79.png",
      imageAlt: "Bifteck de côte 1''1/2",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 80,
      name: "Tournedos de boeuf aux trois poivres",
      description: "Tournedos de boeuf aux trois poivres",
      format: "8 X 180G",
      price: 160.00,
      imageSrc: "/images/product/80.png",
      imageAlt: "Tournedos de boeuf aux trois poivres",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },{
      id: 81,
      name: "Contre filet",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "12 X 280G",
      price: 265.00,
      imageSrc: "/images/product/81.png",
      imageAlt: "Contre filet",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 82,
      name: "Contre filet",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "10 X 340G",
      price: 265.00,
      imageSrc: "/images/product/82.png",
      imageAlt: "Contre filet",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 83,
      name: "T-Bone AAA 1'1/2",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "4 X 560G",
      price: 220.00,
      imageSrc: "/images/product/83.png",
      imageAlt: "T-Bone AAA 1'1/2",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 84,
      name: "Rib tomahawk AAA",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "2 X 1.2KG",
      price: 169.00,
      imageSrc: "/images/product/84.png",
      imageAlt: "Rib tomahawk AAA",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 85,
      name: "Faux filet",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "10 X 280G",
      price: 251.00,
      imageSrc: "/images/product/85.png",
      imageAlt: "Faux filet",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 86,
      name: "Contre-filet mariné 3 poivres",
      description: "Contre-filet mariné 3 poivres",
      format: "12 X 220G",
      price: 145.00,
      imageSrc: "/images/product/86.jpg",
      imageAlt: "Contre-filet mariné 3 poivres",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 87,
      name: "T-bone AAA 3/4''",
      description: "Produit Canadien, Boeuf Angus Certifié",
      format: "4x 340G",
      price: 137.00,
      imageSrc: "/images/product/87.png",
      imageAlt: "T-bone AAA 3/4''",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 88,
      name: "Steak Cowboy",
      description: "Produit Canadien",
      format: "4 X 454G",
      price: 169.00,
      imageSrc: "/images/product/88.png",
      imageAlt: "Steak Cowboy",
      category: "BOEUF",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 89,
      name: "Côtes levées de porc entières nature",
      description: "Produit Québécois, cote de dos",
      format: "5 X +/- 850G",
      price: 99.00,
      imageSrc: "/images/product/89.png",
      imageAlt: "Côtes levées de porc entières nature",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 90,
      name: "Côte levée quatre côtes BBQ",
      description: "Côte levée quatre côtes BBQ",
      format: "10 X 250G",
      price: 105.00,
      imageSrc: "/images/product/90.png",
      imageAlt: "Côte levée quatre côtes BBQ",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 91,
      name: "Côtelette de porc avec os",
      description: "Produit Québécois",
      format: "12 X 140G",
      price: 57.00,
      imageSrc: "/images/product/91.jpg",
      imageAlt: "Côtelette de porc avec os",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 92,
      name: "Bacon",
      description: "Bacon",
      format: "6 x 500g",
      price: 72.00,
      imageSrc: "/images/product/92.png",
      imageAlt: "Bacon",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 93,
      name: "Bacon tranché cov",
      description: "Produit Canadien",
      format: "6 x 250G",
      price: 52.00,
      imageSrc: "/images/product/93.png",
      imageAlt: "Bacon tranché cov",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 94,
      name: "Escalope de porc attendri",
      description: "Produit Québécois",
      format: "24 X 110G",
      price: 66.00,
      imageSrc: "/images/product/94.jpg",
      imageAlt: "Escalope de porc attendri",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 95,
      name: "Côte de porc bbq",
      description: "Produit Québécois",
      format: "12 x 250g",
      price: 65.00,
      imageSrc: "/images/product/95.jpg",
      imageAlt: "Côte de porc bbq",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 96,
      name: "Côte de porc érable chipotlé",
      description: "Produit Québécois",
      format: "12 x 250g",
      price: 65.00,
      imageSrc: "/images/product/96.jpg",
      imageAlt: "Côte de porc érable chipotlé",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 97,
      name: "Côte de porc teriyaki",
      description: "Produit Canadien",
      format: "12 x 250g",
      price: 65.00,
      imageSrc: "/images/product/97.jpg",
      imageAlt: "Côte de porc teriyaki",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 98,
      name: "Brochettes de porc souvlaki",
      description: "Produit Canadien",
      format: "9 X 2 X 110G",
      price: 74.00,
      imageSrc: "/images/product/98.jpg",
      imageAlt: "Brochettes de porc souvlaki",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 99,
      name: "Côtelette de porc souvlaki",
      description: "Côtelette de porc souvlaki",
      format: "8 X 400G",
      price: 81.00,
      imageSrc: "/images/product/99.png",
      imageAlt: "Côtelette de porc souvlaki",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 100,
      name: "Côtelette de porc terriaki",
      description: "Côtelette de porc terriaki",
      format: "8 X 400G",
      price: 81.00,
      imageSrc: "/images/product/100.png",
      imageAlt: "Côtelette de porc terriaki",
      category: "PORC",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 101,
      name: "Porc effiloché a la texane",
      description: "Produit Québécois",
      format: "8 x 500g",
      price: 111.00,
      imageSrc: "/images/product/101.jpg",
      imageAlt: "Porc effiloché a la texane",
      category: "PORC",
      quantities: [0, 1, 1, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 102,
      name: "Poulet Haché",
      description: "Produit Québécois",
      format: "6 x 450G",
      price: 68.00,
      imageSrc: "/images/product/102.jpg",
      imageAlt: "Poulet Haché",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 103,
      name: "Haut de cuisse de poulet sans os",
      description: "Produit Québécois",
      format: "6 X 600G",
      price: 80.00,
      imageSrc: "/images/product/103.png",
      imageAlt: "Haut de cuisse de poulet sans os",
      category: "POULET",
      quantities: [1, 2, 1, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 104,
      name: "Poulet de grain entier",
      description: "Produit Québécois",
      format: "1.8 KG",
      price: 19.00,
      imageSrc: "/images/product/104.png",
      imageAlt: "Poulet de grain entier",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 105,
      name: "Poulet Entier",
      description: "Produit Québécois",
      format: "3.0 KG",
      price: 29.00,
      imageSrc: "/images/product/105.png",
      imageAlt: "Poulet Entier",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 106,
      name: "Cubes de brochette de poulet",
      description: "Produit Canadien",
      format: "10 X 224G",
      price: 117.00,
      imageSrc: "/images/product/106.jpg",
      imageAlt: "Cubes de brochette de poulet",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 107,
      name: "Poitrine naturel de grain",
      description: "Produit Québécois",
      format: "10 x 200G",
      price: 99.00,
      imageSrc: "/images/product/107.png",
      imageAlt: "Poitrine naturel de grain",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 108,
      name: "Poitrine de poulet miel et ail",
      description: "Produit Canadien",
      format: "2.04 KG (8 un x 255 g)",
      price: 108.00,
      imageSrc: "/images/product/108.png",
      imageAlt: "Poitrine de poulet miel et ail",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 109,
      name: "Poitrine de poulet et BBQ",
      description: "Produit Canadien",
      format: "12 X 170G",
      price: 108.00,
      imageSrc: "/images/product/109.png",
      imageAlt: "Poitrine de poulet et BBQ",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 110,
      name: "Poitrine de poulet méditerranéenne",
      description: "Produit Canadien",
      format: "12 x 170g",
      price: 108.00,
      imageSrc: "/images/product/110.jpg",
      imageAlt: "Poitrine de poulet méditerranéenne",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 111,
      name: "Tournedos de poulet miel et ail",
      description: "Produit Canadien",
      format: "16 X 140G",
      price: 121.00,
      imageSrc: "/images/product/111.png",
      imageAlt: "Tournedos de poulet miel et ail",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 112,
      name: "Ailes de poulet BBQ",
      description: "Produit Canadien",
      format: "2 X 1KG",
      price: 69.00,
      imageSrc: "/images/product/112.png",
      imageAlt: "Ailes de poulet BBQ",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 113,
      name: "Tournedos de poulet méditerranéen",
      description: "Produit Canadien",
      format: "14 X 170G",
      price: 121.00,
      imageSrc: "/images/product/113.png",
      imageAlt: "Tournedos de poulet méditerranéen",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 114,
      name: "Poulet général tao avec sauce",
      description: "Produit Canadien",
      format: "3KG",
      price: 121.00,
      imageSrc: "/images/product/114.jpg",
      imageAlt: "Poulet général tao avec sauce",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 115,
      name: "Poitrine de poulet farcie jambon fromage",
      description: "Produit Canadien",
      format: "2.04 KG (entre 10-12 unités)",
      price: 107.00,
      imageSrc: "/images/product/115.png",
      imageAlt: "Poitrine de poulet farcie jambon fromage",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 116,
      name: "Poitrine de poulet farcie brocoli fromage",
      description: "Produit Canadien",
      format: "10 X 270G",
      price: 107.00,
      imageSrc: "/images/product/116.png",
      imageAlt: "Poitrine de poulet farcie brocoli fromage",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 117,
      name: "Filet de poulet pané",
      description: "Produit Canadien",
      format: "2kg",
      price: 62.00,
      imageSrc: "/images/product/117.png",
      imageAlt: "Filet de poulet pané",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 118,
      name: "Burger de poulet panné",
      description: "Produit Canadien",
      format: "6 x 113G",
      price: 51.00,
      imageSrc: "/images/product/118.png",
      imageAlt: "Burger de poulet panné",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 119,
      name: "Steak de poulet grillé",
      description: "Produit Canadien",
      format: "10 x 226g",
      price: 79.00,
      imageSrc: "/images/product/119.jpg",
      imageAlt: "Steak de poulet grillé",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 120,
      name: "Ailes de poulet",
      description: "Produit Québécois",
      format: "6 x 450G",
      price: 79.00,
      imageSrc: "/images/product/120.png",
      imageAlt: "Ailes de poulet",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 121,
      name: "Egg roll au poulet",
      description: "Egg roll au poulet",
      format: "36 X 50G",
      price: 75.00,
      imageSrc: "/images/product/121.jpg",
      imageAlt: "Egg roll au poulet",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 122,
      name: "Escalopes de poulet",
      description: "Produit Québécois",
      format: "20 X 110G",
      price: 117.00,
      imageSrc: "/images/product/122.jpg",
      imageAlt: "Escalopes de poulet",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 123,
      name: "Brochettes de poulet souvlaki",
      description: "Brochettes de poulet souvlaki",
      format: "9 X 2 X 110G",
      price: 66.00,
      imageSrc: "/images/product/123.png",
      imageAlt: "Brochettes de poulet souvlaki",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 124,
      name: "Coq au porc érable et chipotle",
      description: "Produit Canadien",
      format: "12 X 275G",
      price: 152.00,
      imageSrc: "/images/product/124.png",
      imageAlt: "Coq au porc érable et chipotle",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    {
      id: 126,
      name: "Croquettes de poulet",
      description: "Croquettes de poulet",
      format: "2 X 1KG",
      price: 49.00,
      imageSrc: "/images/product/126.jpg",
      imageAlt: "Croquettes de poulet",
      category: "POULET",
      quantities: [0, 0, 0, 0],
      basicQuantities: [0, 0, 0, 0]
    },
    // Add more products as needed
  ]);

  const [nombreOfLivraison, setNombreOfLivraison] = useState<number>(4);
  const [client, setClient] = useState<Client>({}); // Initialize with an empty object
  const [commandIsConfirmed, setCommandIsConfirmed] = useState<boolean>(false); // New state

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