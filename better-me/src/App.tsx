import {useState} from 'react';
import {type Order} from './types';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [orders] = useState<Order[]>([
        {
            id: '#ORD-9921',
            timestamp: '10:45 AM TODAY',
            latitude: 40.7128,
            longitude: -74.0060,
            subtotal: 120.00,
            composite_tax_rate: 0.08875,
            tax_amount: 10.65,
            total_amount: 130.65,
            status: 'completed',
            breakdown: { state_rate: 0.04, county_rate: 0.0475, city_rate: 0, special_rates: 0.00125 }
        },
        {
            id: '#ORD-9919',
            timestamp: '10:15 AM TODAY',
            latitude: 0,
            longitude: 0,
            subtotal: 250.00,
            composite_tax_rate: 0,
            tax_amount: 0,
            total_amount: 250.00,
            status: 'processing',
            breakdown: { state_rate: 0, county_rate: 0, city_rate: 0, special_rates: 0 }
        }
    ]);

    return (
        <div className="min-h-screen bg-[#F5F2EB] p-8 font-sans text-[#2D2823]">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter italic">BetterMe</h1>
                    <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">Tax Department</span>
                </div>
                <div className="flex items-center gap-4">
                    <input type="text" placeholder="Search orders..." className="bg-white px-5 py-2 rounded-full border border-transparent shadow-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-300" />
                    <div className="w-10 h-10 bg-[#FCE4D6] rounded-xl flex items-center justify-center font-bold text-[#8E5E41]">AU</div>
                </div>
            </header>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[32px] shadow-sm relative">
                    <span className="text-[#4CAF50] absolute top-6 right-6 font-bold text-sm">+12.5%</span>
                    <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Total Orders</p>
                    <h2 className="text-4xl font-black text-black">12,450</h2>
                </div>
                <div className="bg-white p-6 rounded-[32px] shadow-sm border-2 border-dashed border-[#E5E1D8]"></div>
                <div className="bg-white p-6 rounded-[32px] shadow-sm relative">
                    <span className="bg-black text-white text-[9px] absolute top-6 right-6 px-2 py-0.5 rounded font-bold">URGENT</span>
                    <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Pending Sync</p>
                    <h2 className="text-4xl font-black text-black">1</h2>
                </div>
            </div>

            <div className="flex justify-between items-end mb-0">
                <div className="bg-[#2D2823] text-[#A39E98] px-6 py-3 rounded-t-[20px] text-[11px] font-bold uppercase tracking-widest">
                    Order List & Tax Details
                </div>
                <div className="flex gap-3 mb-4">
                    <button className="bg-white px-5 py-2.5 rounded-full flex items-center gap-2 text-[13px] font-bold shadow-sm border border-[#E5E1D8] hover:bg-gray-50 transition-colors">
                        <span className="text-lg">☁️</span> Import CSV [cite: 23]
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF4D4D] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-[13px] font-bold shadow-lg shadow-red-100 hover:bg-[#ff3b3b] transition-all"
                    >
                        <span className="text-lg">⊕</span> Manual Entry [cite: 27]
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-b-[32px] rounded-tl-[32px] shadow-sm overflow-hidden border border-[#E5E1D8]">
                <table className="w-full text-left">
                    <thead className="bg-[#2D2823] text-[#A39E98] text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                        <th className="px-8 py-5">Order ID & Time</th>
                        <th className="px-8 py-5">Location [cite: 36]</th>
                        <th className="px-8 py-5">Subtotal [cite: 37]</th>
                        <th className="px-8 py-5">Tax Rate [cite: 42]</th>
                        <th className="px-8 py-5">Tax Amount [cite: 43]</th>
                        <th className="px-8 py-5">Total [cite: 44]</th>
                        <th className="px-8 py-5">Info</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F2EB]">
                    {orders.map((order) => (
                        <tr key={order.id} className={`${order.status === 'processing' ? 'bg-[#FFF5F5]' : ''} hover:bg-gray-50 transition-colors`}>
                            <td className="px-8 py-5">
                                <div className="font-bold text-black">{order.id}</div>
                                <div className="text-[10px] text-[#A39E98] font-bold uppercase">{order.timestamp}</div>
                            </td>
                            <td className="px-8 py-5 text-[12px] font-bold text-[#A39E98]">
                                {order.status === 'processing' ? (
                                    <span className="text-[#FF4D4D] animate-pulse">Locating Unit...</span>
                                ) : (
                                    <span className="flex items-center gap-1">📍 {order.latitude}, {order.longitude}</span>
                                )}
                            </td>
                            <td className="px-8 py-5 font-black text-black text-lg">${order.subtotal.toFixed(2)}</td>
                            <td className="px-8 py-5">
                                {order.status === 'processing' ? (
                                    <span className="bg-[#FF4D4D] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Processing</span>
                                ) : (
                                    <span className="bg-[#E7F7EF] text-[#27AE60] px-3 py-1 rounded-full text-[10px] font-bold italic">
                      {(order.composite_tax_rate * 100).toFixed(3)}%
                    </span>
                                )}
                            </td>
                            <td className="px-8 py-5 text-[#A39E98] font-bold">
                                {order.status === 'processing' ? '--' : `$${order.tax_amount.toFixed(2)}`}
                            </td>
                            <td className="px-8 py-5 font-black text-lg">
                   <span className={order.status === 'processing' ? 'text-[#A39E98]' : 'text-[#FF4D4D]'}>
                     ${order.total_amount.toFixed(2)}{order.status === 'processing' && '*'}
                   </span>
                            </td>
                            <td className="px-8 py-5">
                                <button className="text-[#E5E1D8] hover:text-black transition-colors">ⓘ</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="p-6 border-t border-[#F5F2EB] flex justify-between items-center text-[#A39E98] font-bold text-[11px] uppercase tracking-widest">
                    <div>Displaying 1-5 of 12,450 units</div>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50">←</button>
                        <button className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50">→</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl">
                        <h2 className="text-3xl font-black mb-8 tracking-tighter italic text-black">Create Order</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" step="any" placeholder="Latitude" className="w-full p-4 bg-[#F5F2EB] rounded-[20px] font-bold focus:outline-none" />
                                <input type="number" step="any" placeholder="Longitude" className="w-full p-4 bg-[#F5F2EB] rounded-[20px] font-bold focus:outline-none" />
                            </div>
                            <input type="number" step="any" placeholder="Subtotal ($)" className="w-full p-4 bg-[#F5F2EB] rounded-[20px] font-bold focus:outline-none" />
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-black text-[#A39E98] uppercase tracking-widest text-[12px]">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-black text-white rounded-full font-black uppercase tracking-widest text-[12px] shadow-lg shadow-gray-200">Calculate Tax</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}