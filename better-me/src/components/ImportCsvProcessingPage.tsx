import {useRef, useState} from "react";
import type {Order} from "../types";

interface ImportCsvProcessingPageProps {
  onClose: () => void;
  onImportSuccess: (newOrders: Order[]) => void;
}

export function ImportCsvProcessingPage({ onClose, onImportSuccess }: ImportCsvProcessingPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile || isUploading) return;
    setIsUploading(true);

    setTimeout(() => {
      const now = Date.now();
      const mockImportedOrders: Order[] = [
        {
          id: `ord_csv_${now}_1`,
          timestamp: new Date().toISOString(),
          latitude: 40.758,
          longitude: -73.9855,
          subtotal: 45.0,
          composite_tax_rate: 0.08875,
          tax_amount: 3.99,
          total_amount: 48.99,
          breakdown: { state_rate: 0.04, county_rate: 0, city_rate: 0.045, special_rates: 0.00375 },
          status: "completed",
        },
        {
          id: `ord_csv_${now}_2`,
          timestamp: new Date().toISOString(),
          latitude: 40.7829,
          longitude: -73.9654,
          subtotal: 15.5,
          composite_tax_rate: 0.08875,
          tax_amount: 1.37,
          total_amount: 16.87,
          breakdown: { state_rate: 0.04, county_rate: 0, city_rate: 0.045, special_rates: 0.00375 },
          status: "processing",
        },
      ];

      onImportSuccess(mockImportedOrders);
      setIsUploading(false);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-155 overflow-hidden rounded-[24px] bg-[#F5F2EB] shadow-2xl sm:rounded-[30px]">
        <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#2D2A2A] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white sm:text-[10px]">
                Import CSV
              </span>
              <h2 className="text-[28px] font-black leading-none text-[#2E2B2C] sm:text-[34px]">Order Processing</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[#97A5BD] transition-colors hover:cursor-pointer hover:text-[#6F7F98]"
              aria-label="Close import csv"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className="mt-4 text-[12px] font-semibold leading-5 text-[#86817D] sm:text-[13px]">
            Upload your bulk order data to automatically calculate taxes and generate reports. Ensure your file matches the{" "}
            <span className="text-[#FF4D4D]">standard template.</span>
          </p>

          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 block w-full rounded-[24px] border-2 border-dashed border-[#F0B8B8] bg-[#F8F3F4] px-4 py-8 text-center transition-colors hover:bg-[#f3ecee] sm:py-12 hover:cursor-pointer"
          >
            <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border border-[#F1DDDD] bg-[#F6F3F3] sm:size-18">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-8 text-[#FF4D4D]" aria-hidden="true">
                <path d="M12 2a5 5 0 0 0-4.9 4.02A4.5 4.5 0 0 0 8 15h3v-4H9.5L12 8l2.5 3H13v4h3a4.5 4.5 0 0 0 .9-8.98A5 5 0 0 0 12 2Z" />
                <path d="M11 14h2v7h-2v-7Z" />
              </svg>
            </span>
            <span className="block text-[18px] font-black text-[#2F2C2D] sm:text-[26px]">Drag & Drop your .csv file here</span>
            <span className="mt-1 block text-sm font-semibold text-[#8A8582] sm:text-base">
              or <span className="text-[#FF4D4D] underline">Browse files</span>
            </span>
            {selectedFile && (
              <span className="mt-3 block truncate text-xs font-bold text-[#6B6764] sm:text-sm">{selectedFile.name}</span>
            )}
          </button>

          <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#B4AFAC] sm:text-[11px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#BCB8B6]" />
              Max size: 25mb
            </span>
            <span>Formats: CSV, XLS</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-[#ECEDEF] px-4 py-4 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-[12px] font-black uppercase tracking-widest text-[#838B97] transition-colors hover:text-[#5f6977] sm:w-auto sm:px-5 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`w-full rounded-xl px-5 py-3 text-[12px] font-black uppercase tracking-wide text-white shadow-[0_10px_18px_rgba(255,77,77,0.35)] sm:w-auto ${
              !selectedFile || isUploading ? "bg-[#ff8b8b] cursor-not-allowed" : "bg-[#FF4D4D] hover:bg-[#f33f3f] hover:cursor-pointer"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                <path d="M4 4h16v16H4V4Zm7 3v4H8l4 4 4-4h-3V7h-2Z" />
              </svg>
              {isUploading ? "Uploading..." : "Upload & Process"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
