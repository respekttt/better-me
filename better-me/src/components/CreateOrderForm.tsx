import {useState} from "react";
import type {Order} from "../types";

interface CreateOrderFormProps {
  onAddOrder: (newOrder: Order) => void;
  onClose: () => void;
}
// kibarashka huesos
export function CreateOrderForm({ onAddOrder, onClose }: CreateOrderFormProps) {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    subtotal: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude || !formData.subtotal) return;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      timestamp: new Date().toISOString(),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      subtotal: Number(formData.subtotal),
      composite_tax_rate: 0.08875,
      tax_amount: Number(formData.subtotal) * 0.08875,
      total_amount: Number(formData.subtotal) * 1.08875,
      breakdown: {
        state_rate: 0.04,
        county_rate: 0,
        city_rate: 0.045,
        special_rates: 0.00375,
      },
      jurisdictions: ["New York State", "New York City"],
      status: "processing",
    };

    onAddOrder(newOrder);
    onClose();
  };

  return (
    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-[#2D2A2A] px-3 py-1 text-[11px] font-bold text-white">
          Manual Order Entry
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#A6A9B1] hover:text-[#7A7E89] transition-colors hover:cursor-pointer"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <p className="text-[12px] leading-5 font-semibold text-[#8A8E99]">
        Enter order details below to calculate the wellness tax for your delivery.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#A4A8B2]">Latitude</span>
          <span className="flex items-center gap-2 rounded-2xl bg-[#F3F3F5] px-3.5 py-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#BEC2CA]" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 4.88 7 13 7 13s7-8.12 7-13a7 7 0 0 0-7-7Zm0 9.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z" />
            </svg>
            <input
              type="number" step="any" placeholder="34.0522"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              className="w-full bg-transparent text-[13px] font-semibold text-[#4E5564] placeholder:text-[#BABFC9] focus:outline-none"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#A4A8B2]">Longitude</span>
          <span className="flex items-center gap-2 rounded-2xl bg-[#F3F3F5] px-3.5 py-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#BEC2CA]" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm4.67 8.75h-3.42a16.3 16.3 0 0 0-.62-4.18 8.02 8.02 0 0 1 4.04 4.18ZM12 4.5c.55 0 1.5 1.96 1.82 6.25h-3.64C10.5 6.46 11.45 4.5 12 4.5ZM5.33 10.75a8.02 8.02 0 0 1 4.04-4.18 16.3 16.3 0 0 0-.62 4.18H5.33Zm0 2.5h3.42c.1 1.45.33 2.88.62 4.18a8.02 8.02 0 0 1-4.04-4.18Zm6.67 6.25c-.55 0-1.5-1.96-1.82-6.25h3.64c-.32 4.29-1.27 6.25-1.82 6.25Zm.63-2.07c.29-1.3.52-2.73.62-4.18h3.42a8.02 8.02 0 0 1-4.04 4.18Z" />
            </svg>
            <input
              type="number" step="any" placeholder="-118.2437"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              className="w-full bg-transparent text-[13px] font-semibold text-[#4E5564] placeholder:text-[#BABFC9] focus:outline-none"
            />
          </span>
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#A4A8B2]">
          Subtotal (Wellness Kit Price)
        </span>
        <span className="flex items-center justify-between gap-2 rounded-2xl bg-[#F3F3F5] px-3.5 py-3">
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-[22px] leading-none font-black text-[#D0D3DA]">$</span>
            <input
              type="number" step="any" placeholder="0.00"
              value={formData.subtotal}
              onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
              className="w-full min-w-0 bg-transparent text-[16px] font-bold text-[#4E5564] placeholder:text-[#BABFC9] focus:outline-none"
            />
          </span>
          <span className="rounded-full bg-[#DCDEE2] px-2.5 py-0.5 text-[10px] font-bold text-[#A3A8B3]">USD</span>
        </span>
      </label>

      <div className="rounded-2xl bg-[#F3F3F5] px-3.5 py-3">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 inline-flex size-4 items-center justify-center rounded-full bg-[#FF4D4D] text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-2.5" aria-hidden="true">
              <path d="M11 10h2v7h-2v-7Zm0-3h2v2h-2V7Zm1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
            </svg>
          </span>
          <p className="text-[10px] leading-4 font-semibold text-[#8D929E]">
            Tax rates are calculated based on precise GPS coordinates. Please ensure accuracy for correct wellness tax compliance.
          </p>
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <button
          type="submit"
          className="w-full rounded-full bg-[#FF4141] px-5 py-3 text-[12px] font-black uppercase tracking-wide text-white shadow-[0_10px_18px_rgba(255,65,65,0.35)] hover:bg-[#f23737] transition-colors hover:cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M4 4h16v16H4V4Zm4 2v2h2V6H8Zm3 0v2h2V6h-2Zm3 0v2h2V6h-2ZM8 10v2h8v-2H8Zm0 4v2h8v-2H8Z" />
            </svg>
            Calculate Tax & Save
          </span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 text-[11px] font-black uppercase tracking-widest text-[#A3A8B3] hover:text-[#4E5564] transition-colors hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
