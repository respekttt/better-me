import { useState } from 'react';
import { type Order } from './types';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { OrdersTable } from './components/OrdersTable';
import { CreateOrderForm } from './components/CreateOrderForm';
import { ImportCSV } from './components/ImportCSV';

const fakeOrders: Order[] =[
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
        breakdown: { state_rate: 0.04, county_rate: 0.0475, city_rate: 0, special_rates: 0.00125 },
        jurisdictions: ["New York State", "New York City"]
    }
];

export default function App() {
    const [orders, setOrders] = useState<Order[]>(fakeOrders);
    const[isModalOpen, setIsModalOpen] = useState(false);

    const handleAddOrder = (newOrder: Order) => {
        setOrders([newOrder, ...orders]);
    };
    const handleImportSuccess = (importedOrders: Order[]) => {
        setOrders([...importedOrders, ...orders]); 
    };

    return (
        <div className="min-h-screen bg-[#F5F2EB] p-8 font-sans text-[#2D2823]">
            
            
            <Header />

            <DashboardStats totalOrdersCount={orders.length} />

            <div className="flex justify-between items-end mb-0 z-10 relative">
                <div className="bg-[#2D2823] text-[#A39E98] px-6 py-3 mb-4 rounded-t-[20px] text-[11px] font-bold uppercase tracking-widest">
                    Order List & Tax Details
                </div>
                <div className="flex gap-3 mb-4">
                    <ImportCSV onImportSuccess={handleImportSuccess} />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF4D4D] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-[13px] font-bold shadow-lg shadow-red-100 hover:bg-[#ff3b3b] transition-all hover:cursor-pointer"
                    >
                        Manual Entry
                    </button>
                </div>
            </div>

            <div className="relative -mt-4 z-0">
                <OrdersTable orders={orders} />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl">
                        <h2 className="text-3xl font-black mb-8 tracking-tighter italic text-black">Create Order</h2>
                        <CreateOrderForm
                            onAddOrder={handleAddOrder}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}