import { useState } from "react";
import type { Order } from "../types";


interface CreateOrderFormProps {
  onAddOrder: (newOrder: Order) => void; 
  onClose: () => void;                  
}

export function CreateOrderForm({ onAddOrder, onClose }: CreateOrderFormProps) {
  const[formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    subtotal: ''
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
      jurisdictions:["New York State", "New York City"],
      status: "processing", 
    };

    onAddOrder(newOrder); 
    onClose();            
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number" step="any" placeholder="Latitude"
          value={formData.latitude}
          onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          className="w-full p-4 bg-[#F5F2EB] rounded-[20px] font-bold focus:outline-none"
        />
        <input
          type="number" step="any" placeholder="Longitude"
          value={formData.longitude}
          onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          className="w-full p-4 bg-[#F5F2EB] rounded-[20px] font-bold focus:outline-none"
        />
      </div>
      <input
        type="number" step="any" placeholder="Subtotal ($)"
        value={formData.subtotal}
        onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
        className="w-full p-4 bg-[#F5F2EB] rounded-[20px] font-bold focus:outline-none"
      />
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose} // Вызываем функцию закрытия от родителя
          className="flex-1 py-4 font-black text-[#A39E98] uppercase tracking-widest text-[12px] hover:text-black transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-4 bg-black text-white rounded-full font-black uppercase tracking-widest text-[12px] shadow-lg shadow-gray-200 hover:bg-gray-800 transition-colors"
        >
          Calculate Tax
        </button>
      </div>
    </form>
  );
}