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
        <div className="min-h-screen bg-brand-beige p-8 font-sans text-[#2D2823]">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-black flex items-center gap-2">BetterMe</h1>
                    <span className="dark-tag">Tax Department</span>
                </div>
                <div className="flex items-center gap-4">
                    <input type="text" placeholder="Search orders..." className="bg-white px-5 py-2 rounded-full border border-transparent shadow-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-300" />
                    <div className="w-10 h-10 bg-[#FCE4D6] rounded-xl flex items-center justify-center font-bold text-[#8E5E41]">AU</div>
                </div>
            </header>

            <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-4xl shadow-sm relative">
                    <span className="text-[#4CAF50] absolute top-6 right-6 font-bold text-sm">+12.5%</span>
                    <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Total Orders</p>
                    <h2 className="text-4xl font-black text-black">12,450</h2>
                </div>
                <div className="bg-white p-6 rounded-4xl shadow-sm border-2 border-dashed border-[#E5E1D8]"></div>
                <div className="bg-white p-6 rounded-4xl shadow-sm relative">
                    <span className="bg-black text-white text-[9px] absolute top-6 right-6 px-2 py-0.5 rounded font-bold">URGENT</span>
                    <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Pending Sync</p>
                    <h2 className="text-4xl font-black text-black">1</h2>
                </div>
            </div>

            <div className="flex justify-between items-end mb-0">
                <div className="bg-[#2D2823] text-[#A39E98] px-6 py-3 mb-4 rounded-[20px] text-[11px] font-bold uppercase tracking-widest">
                    Order List & Tax Details
                </div>
                <div className="flex gap-3 mb-4">
                    <button className="bg-white px-5 py-2.5 rounded-full flex items-center gap-2 text-[13px] font-bold shadow-sm border border-[#E5E1D8] hover:bg-gray-50 transition-colors hover:cursor-pointer">
                        <span className="text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                                  <path fill-rule="evenodd"
                                        d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.25 6a.75.75 0 0 0-1.5 0v4.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V9.75Z"
                                        clip-rule="evenodd"/>
                                </svg>
                        </span>
                        Import CSV
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF4D4D] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-[13px] font-bold shadow-lg shadow-red-100 hover:bg-[#ff3b3b] transition-all hover:cursor-pointer"
                    >
                        <span className="text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                              <path fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                    clip-rule="evenodd"/>
                            </svg>
                        </span>
                        Manual Entry
                    </button>
                </div>
            </div>

            <div
                className="bg-white rounded-b-4xl rounded-tl-4xl shadow-sm overflow-hidden border border-[#E5E1D8]">
                <table className="w-full text-left">
                    <thead
                        className="bg-[#2D2823] text-[#A39E98] text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                        <th className="px-8 py-5">Order ID & Time</th>
                        <th className="px-8 py-5">Location</th>
                        <th className="px-8 py-5">Subtotal</th>
                        <th className="px-8 py-5">Tax Rate</th>
                        <th className="px-8 py-5">Tax Amount</th>
                        <th className="px-8 py-5">Total</th>
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
                                    <span
                                        className="text-[#FF4D4D] animate-pulse flex gap-1">

                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="currentColor"
                                             className="size-4">
                                          <path fill-rule="evenodd"
                                                d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                                                clip-rule="evenodd"/>
                                        </svg>

                                        Locating Unit...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="currentColor"
                                             className="size-4 text-[#FF4D4D]">
                                          <path fill-rule="evenodd"
                                                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                clip-rule="evenodd"/>
                                        </svg>
                                        {order.latitude}, {order.longitude}</span>
                                )}
                            </td>
                            <td className="px-8 py-5 font-black text-black text-lg">${order.subtotal.toFixed(2)}</td>
                            <td className="px-8 py-5">
                                {order.status === 'processing' ? (
                                    <span
                                        className="bg-[#FF4D4D] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Processing</span>
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
                                <button
                                    className="text-[#A39E98] hover:text-black transition-colors hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24" fill="currentColor"
                                         className="size-6">
                                        <path fill-rule="evenodd"
                                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div
                    className="p-6 border-t border-[#F5F2EB] flex justify-between items-center text-[#A39E98] font-bold text-[11px] uppercase tracking-widest">
                    <div>Displaying 1-5 of 12,450 units</div>
                    <div className="flex gap-2">
                        <button
                            className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50 hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="currentColor"
                                 className="size-4">
                                <path fill-rule="evenodd"
                                      d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                                      clip-rule="evenodd"/>
                            </svg>

                        </button>
                        <button
                            className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50 hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="currentColor"
                                 className="size-4">
                                <path fill-rule="evenodd"
                                      d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                                      clip-rule="evenodd"/>
                            </svg>

                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div
                        className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl">
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