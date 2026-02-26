import { useRef, useState } from "react";
import type { Order } from "../types";

interface ImportCSVProps {
  onImportSuccess: (newOrders: Order[]) => void;
}

export function ImportCSV({ onImportSuccess }: ImportCSVProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    
    // Тута будет запрос на бэк:
    // const formData = new FormData();
    // formData.append('csv_file', file);
    // fetch('', { method: 'POST', body: formData })
   

    setTimeout(() => {
      const mockImportedOrders: Order[] =[
        {
          id: `ord_csv_${Date.now()}_1`,
          timestamp: new Date().toISOString(),
          latitude: 40.7580,
          longitude: -73.9855,
          subtotal: 45.0,
          composite_tax_rate: 0.08875,
          tax_amount: 3.99,
          total_amount: 48.99,
          breakdown: { state_rate: 0.04, county_rate: 0, city_rate: 0.045, special_rates: 0.00375 },
          status: "completed",
        },
        {
          id: `ord_csv_${Date.now()}_2`,
          timestamp: new Date().toISOString(),
          latitude: 40.7829,
          longitude: -73.9654,
          subtotal: 15.5,
          composite_tax_rate: 0.08875,
          tax_amount: 1.37,
          total_amount: 16.87,
          breakdown: { state_rate: 0.04, county_rate: 0, city_rate: 0.045, special_rates: 0.00375 },
          status: "processing",
        }
      ];

      onImportSuccess(mockImportedOrders); 
      setIsUploading(false); 
      
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" 
      />

      <button
        onClick={handleButtonClick}
        disabled={isUploading}
        className={`bg-white px-5 py-2.5 rounded-full flex items-center gap-2 text-[13px] font-bold shadow-sm border border-[#E5E1D8] transition-colors hover:cursor-pointer ${
          isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
        }`}
      >
        <span className="text-lg">
          {isUploading ? (
            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.25 6a.75.75 0 0 0-1.5 0v4.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V9.75Z" clipRule="evenodd" />
            </svg>
          )}
        </span>
        {isUploading ? 'Uploading...' : 'Import CSV'}
      </button>
    </>
  );
}