import React, { useRef, useState, useEffect } from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import EmailSignatureModal from './EmailSignatureModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const initialTabs = [
  { name: 'Confirm', href: '#', current: true, disabled: false },
  { name: 'Download PDF', href: '#', current: false, disabled: true },
  { name: 'Send PDF via Email', href: '#', current: false, disabled: true },
  { name: 'Go Home', href: '#', current: true, disabled: false },
];

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const OrderControl: React.FC<{ setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, printRef: React.RefObject<HTMLDivElement> }> = ({ setIsLoading, printRef }) => {

  const [currentTab, setCurrentTab] = useState(initialTabs[0].name);
  const [tabs, setTabs] = useState(initialTabs);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { updateCommandStatus, commandIsConfirmed, client: contextClient } = useProductContext();

  const [email, setEmail] = useState<string>(contextClient?.email || ''); // Initialize with contextClient

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (commandIsConfirmed) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.name !== 'Confirm') {
            return { ...tab, disabled: false };
          }
          return tab;
        })
      );
    }
  }, [commandIsConfirmed]);

  useEffect(() => {
    if (contextClient) {
      setEmail(contextClient.email || ''); // Initialize email from context client
    }
  }, [contextClient]);

  const handleTabClick = async (tabName: string) => {

    if (tabName === 'Confirm') {
      setModalIsOpen(true);
    } else if (tabName === 'Download PDF' && commandIsConfirmed) {
      setIsLoading(true);
      const pdfBase64 = await generatePDF();
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = `invoice_${contextClient.fullName}.pdf`;
      link.click();
      setIsLoading(false);
    } else if (tabName === 'Send PDF via Email' && commandIsConfirmed) {
      setIsLoading(true);
      const pdfBase64 = await generatePDF();
      await uploadPDF(pdfBase64);
      setIsLoading(false);
    } else if (tabName === 'Go Home') {
      navigate("/"); // Use navigate function for programmatic navigation
    } else {
    }

    setCurrentTab(tabName);
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        current: tab.name === tabName,
      }))
    );
  };

  const generatePDF = async (): Promise<string> => {
    if (printRef.current) {
      const canvas = await html2canvas(printRef.current, { scale: 1.75 });
      const imgData = canvas.toDataURL('image/jpeg', 0.55);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      const pdfData = pdf.output('datauristring');
      const base64String = pdfData.split(',')[1];
      return base64String;
    }
    throw new Error('Reference to printRef is not available');
  };

  const uploadPDF = async (pdfBase64: string) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:7070/api/consultant/sendInvoiceToClient',
        { pdf: pdfBase64, email: email, userName: contextClient.fullName , language : contextClient.language , commandNumber: contextClient.CommandNumber },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      toast.success("PDF sent successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Failed to send PDF.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const handleConfirm = (updatedEmail: string) => {
    updateCommandStatus(true);
    setEmail(updatedEmail);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="hidden sm:block">
        <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              className={classNames(
                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tab.disabled ? 'opacity-50 cursor-not-allowed' : '',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => {
                if (!tab.disabled) {
                  handleTabClick(tab.name);
                }
              }}
              disabled={tab.disabled}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* PdfPrintableContent for PDF Generation */}


      {/* Email and Signature Modal */}
      <EmailSignatureModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={handleConfirm}
        initialEmail={email}
      />
    </div>
  );
};

export default OrderControl;
