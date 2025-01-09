import React, { useState, useRef, useEffect } from 'react';
import { useProductContext } from '../contexts/ProductContext';
import LivraisonButtons from '../components/CreateCommand/LivraisonButtons';
import ListofProducts from '../components/CreateCommand/ListofProducts';
import NavbarCommande from '../components/CreateCommand/NavbarCommande';
import ResumeBon from '../components/CreateCommand/ResumeBon';
import InformationClient from '../components/CreateCommand/InformationClient';
import ButtonDivider from '../components/CreateCommand/ButtonDivider';
import FraisMention from '../components/CreateCommand/FraisMention';
import PaymentComponent from '../components/CreateCommand/PaymentComponent';
import Livraison from '../components/CreateCommand/Livraison';
import MenuBase from '../components/CreateCommand/MenuBase';
import ModalResume from '../components/CreateCommand/ModalResume';
import FoodCategory from '../components/CreateCommand/FoodCategory';
import ResetButton from '../components/CreateCommand/ResetButton';
import ResetToBasicButton from '../components/CreateCommand/ResetToBasicButtonProps';
import FormResilation from '../components/CreateCommand/FormResilation';
import OrderControl from '../components/CreateCommand/OrderControl';
import FoodServiceSummary from '../components/CreateCommand/FoodServiceSummary';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PdfPrintableContent from '../components/CreateCommand/PdfPrintableContent';
import { useNavigate } from 'react-router-dom';
import ContractResolutionNotice from '../components/CreateCommand/ContractResolutionNotice';

import '../components/CreateCommand/tailwind.output.css';
import GlobalLoader from '../common/Loader/GlobalLoader';
import ConditionsAndModalities from '../components/CreateCommand/ConditionsAndModalities';


interface Title {
  step: number;
  category: string;
  categoryEn: string;
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

const CreateCommande: React.FC = () => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const { updateClient,client } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('BEEF');
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(true);
  const [isFraisMentionVisible, setIsFraisMentionVisible] = useState<boolean>(true);
  const [isPaymentVisible, setIsPaymentVisible] = useState<boolean>(true);
  const [isLivraison,setIsLivraisonVisible]=useState<boolean>(true);
  const [isConditions,setIsConditionsVisible]=useState<boolean>(true);
  const [isMenuBase, setIsMenuBase] = useState<boolean>(true);
  const [isFormulaire, setIsFormulaire] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isContract, setIscontract] = useState<boolean>(true);
  const [isfirstLoading, setIsfirstLoading] = useState<boolean>(false);
  const { clientId } = useParams<{ clientId: string }>(); // Get the id from the URL params
  const  {language}=client;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchClientData = async () => {
      console.log("i am fetching and reintialize state")
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get(`http://localhost:7070/api/consultant/getClientById/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;
        updateClient(data); // Update the context with the fetched client data
        setIsLoading(false);
        setIsfirstLoading(true)
      } catch (error) {
        console.error(error);
        navigate("/")
      }
    };

    fetchClientData();
  }, []);
  const titles: Title[] = [
    {
      step: 1,
      category: 'BOEUF',
      categoryEn: 'BEEF',
      icon: '🐄',
      title: "BOEUF CANADIEN DE L'OUEST",
      titleEn: "WESTERN CANADIAN BEEF",
      description: "Passionnés par l’alimentation, les défis et l’action, nous sommes fières de compter plus de 25 années combinées d'expertise dans le domaine alimentaire animés par le désir de répondre à vos besoins alimentaires essentiels.",
      descriptionEn: "Passionate about food, challenges, and action, we proudly have over 25 years of combined expertise in the food industry, driven by the desire to meet your essential dietary needs."
    },
    {
      step: 2,
      category: 'POULET',
      categoryEn: 'CHICKEN',
      icon: '🐔',
      title: "POULET DE GRAINREFROIDIT À L'AIR",
      titleEn: "AIR-COOLED GRAIN-FED CHICKEN",
      description: "Nous sélectionnons des poulets nourris aux grains, refroidis à l'air, pour garantir une qualité supérieure et un goût authentique.",
      descriptionEn: "We select grain-fed, air-cooled chickens to ensure superior quality and authentic taste."
    },
    {
      step: 3,
      category: 'PORC',
      categoryEn: 'PORK',
      icon: '🐖',
      title: "JEUNE PORC DU QUÉBEC/CANADA",
      titleEn: "YOUNG PORK FROM QUEBEC/CANADA",
      description: "Nos porcs sont élevés dans des conditions respectueuses pour assurer une viande tendre et savoureuse.",
      descriptionEn: "Our pigs are raised in respectful conditions to ensure tender and flavorful meat."
    },
    {
      step: 4,
      category: 'POISSON',
      categoryEn: 'FISH',
      icon: '🐟',
      title: "PÊCHERIE RESPONSABLE",
      titleEn: "RESPONSIBLE FISHERY",
      description: "Nous privilégions des pêcheries responsables pour vous offrir des produits de la mer de qualité, tout en respectant l'environnement.",
      descriptionEn: "We prioritize responsible fisheries to offer you quality seafood while respecting the environment."
    },
    {
      step: 5,
      category: 'ÉPICERIE',
      categoryEn: 'GROCERY',
      icon: '🛒',
      title: "ÉPICERIE",
      titleEn: "GROCERY",
      description: "Découvrez notre sélection d'épicerie fine pour accompagner vos plats et régaler vos papilles.",
      descriptionEn: "Discover our selection of fine groceries to complement your dishes and delight your taste buds."
    },
    {
      step: 6,
      category: 'CONGÉLATEURS',
      categoryEn: 'FREEZERS',
      icon: '❄️',
      title: "CONGÉLATEURS",
      titleEn: "FREEZERS",
      description: "Vous avez besoin d'un congélateur ? Voici les modèles que nous vous offrons.",
      descriptionEn: "Need a freezer? Here are the models we offer."
    },
  ];
  

  const handleCategoryChange = (category: string) => {
    const translater = {
      "BOEUF": "BEEF",
      "POULET": "CHICKEN",
      "PORC": "PORK",
      "POISSON": "FISH",
      "ÉPICERIE": "GROCERY",
      "CONGÉLATEURS": "FREEZERS", 
      "BEEF" : "BEEF" , 
      "CHICKEN" : "CHICKEN" , 
      "PORK" : "PORK" , 
      "FISH" : "FISH",
      "GROCERY": "GROCERY",
      "FREEZERS": "FREEZERS", 
      "FIN" : "FIN"
  };
    setSelectedCategory(translater[category]);
  };
  const toggleContract =  () => {
    setIscontract(prev => !prev);
  }
  const toggleFormulaire = () => {
    setIsFormulaire(prev => !prev);
  };

  const toggleMenuBase = () => {
    setIsMenuBase(prev => !prev);
  };

  const toggleInformationClient = () => {
    setIsInfoVisible(prev => !prev);
  };

  const togglePayment = () => {
    setIsPaymentVisible(prev => !prev);
  };
  const toggleLivraison = () => {
    setIsLivraisonVisible(prev =>!prev);
  }

  const toggleConditions = () => {
    setIsConditionsVisible(prev=>!prev);
  }

  const toggleFraisMention = () => {
    setIsFraisMentionVisible(prev => !prev);
  };

  // Find the title object that matches the selected category
  const selectedTitle = titles.find(title => title.category === selectedCategory || title.categoryEn == selectedCategory);


  return (
    <div className="bg-white">



      {isLoading ? (
        <GlobalLoader /> // Show loader while fetching data
      ) : (
        <>
          <NavbarCommande onCategoryChange={handleCategoryChange} />
          {selectedCategory !== 'FIN' && selectedTitle && (
          <>
            <br />
            <br />

            <br />
            <div className="flex justify-between items-center my-4 px-6">
              <LivraisonButtons />
              <div className="flex space-x-4">
                <ResetButton category={selectedCategory} />
                <ResetToBasicButton category={selectedCategory} />
              </div>
            </div>
            <FoodCategory
              icon={selectedTitle.icon}
              step={selectedTitle.step.toString()}
              title={language === 'Anglais' ? selectedTitle.titleEn : selectedTitle.title}
              description={language === 'Anglais' ? selectedTitle.descriptionEn : selectedTitle.description}
              note={language === 'Anglais' ? "PLEASE NOTE THAT IMAGES ARE FOR ILLUSTRATIVE PURPOSES ONLY. THANK YOU" : "VEUILLEZ NOTER QUE LES IMAGES SONT À TITRES INDICATIVES SEULEMENT. MERCI"}
            />
              <ListofProducts category={selectedCategory} />
              <ModalResume />
          </>
        )}
          {selectedCategory === 'FIN' && (
            <>
              <ResumeBon />

              <ButtonDivider
                onClick={toggleInformationClient}
                title="Information du Client"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isInfoVisible ? 'bg-blue-100' : ''}`}
              />
              {isInfoVisible && <InformationClient />}

              <ButtonDivider
                onClick={toggleMenuBase}
                title="Open Menu"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isMenuBase ? 'bg-blue-100' : ''}`}
              />
              {isMenuBase && <MenuBase />}

              <ButtonDivider
                onClick={toggleFraisMention}
                title="Frais de Manutention"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isFraisMentionVisible ? 'bg-blue-100' : ''}`}
              />
              {isFraisMentionVisible && <FraisMention />}

              <ButtonDivider
                onClick={togglePayment}
                title="Paiement"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isPaymentVisible ? 'bg-blue-100' : ''}`}
              />
              {isPaymentVisible && <PaymentComponent />}
              {isPaymentVisible && <FoodServiceSummary />}
              <ButtonDivider onClick={toggleLivraison}
                              title='Livraison'
                              className={`my-3 hover:bg-gray-200 transition duration-300 ${isLivraison ? 'bg-blue-100' : ''}`}/>
              {isLivraison && <Livraison/>}

              <ButtonDivider onClick={toggleConditions}
                              title='ConditionsAndModalities'
                              className={`my-3 hover:bg-gray-200 transition duration-300 ${isConditions ? 'bg-blue-100' : ''}`}/>
              {isConditions && <ConditionsAndModalities/>}
              <ButtonDivider onClick={toggleContract}
                            title="ContractResolutionNotice"
                            className={`my-3 hover:bg-gray-200 transition duration-300 ${isFormulaire ? 'bg-blue-100' : ''}`}
                            />
              {isContract && <ContractResolutionNotice />}
              



              <ButtonDivider
                onClick={toggleFormulaire}
                title="Énoncé des droits de résolution du consommateur"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isFormulaire ? 'bg-blue-100' : ''}`}
              />
              {isFormulaire && <FormResilation />}
              <OrderControl setIsLoading={setIsLoading} printRef={printRef} />
              <br />
              <br /><br /><br />
            </>

          )}
        </>
      )}


{isfirstLoading && (
  <div
    ref={printRef}
    style={{
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: '1155px',
    }}
  >
    <PdfPrintableContent />
  </div>
)}



    </div>
  );
};

export default CreateCommande;
