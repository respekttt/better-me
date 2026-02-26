import {useEffect, useState} from 'react';
import {type Order} from './types';
import {Header} from './components/Header';
import {DashboardStats} from './components/DashboardStats';
import {OrdersTable} from './components/OrdersTable';
import {CreateOrderForm} from './components/CreateOrderForm';
import {ImportCSV} from './components/ImportCSV';
import {TaxBreakdownDetailsPage} from './components/TaxBreakdownDetailsPage';
import {ImportCsvProcessingPage} from './components/ImportCsvProcessingPage';

// const fakeOrders: Order[] =[
//     {
//         id: '#ORD-9921',
//         timestamp: '10:45 AM TODAY',
//         latitude: 40.7128,
//         longitude: -74.0060,
//         subtotal: 120.00,
//         composite_tax_rate: 0.08875,
//         tax_amount: 10.65,
//         total_amount: 130.65,
//         status: 'completed',
//         breakdown: { state_rate: 0.04, county_rate: 0.0475, city_rate: 0, special_rates: 0.00125 },
//         jurisdictions: ["New York State", "New York City"]
//     }
// ];

export default function App() {
    const [orders, setOrders] = useState<Order[]>(() => {
        const savedOrders = localStorage.getItem('myList');
        if(savedOrders){
            return JSON.parse(savedOrders)
        } else return []
    });
    const[isModalOpen, setIsModalOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        localStorage.setItem('myList',JSON.stringify(orders))
    }, [orders])
    
    const handleAddOrder = (newOrder: Order) => {
        setOrders([newOrder, ...orders]);
    };
    const handleImportSuccess = (importedOrders: Order[]) => {
        setOrders([...importedOrders, ...orders]); 
    };

    if (selectedOrder) {
        return <TaxBreakdownDetailsPage order={selectedOrder} onClose={() => setSelectedOrder(null)} />;
    }

    return (
        <div className="min-h-screen bg-[#F5F2EB] p-4 font-sans text-[#2D2823] sm:p-6 lg:p-8">
            
            
            <Header />

            <DashboardStats totalOrdersCount={orders.length} />

            <div className="relative z-10 mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="mb-1 inline-flex rounded-2xl bg-[#2D2823] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#A39E98] sm:mb-4 sm:rounded-[20px] sm:px-6 sm:py-3 sm:text-[11px]">
                    Order List & Tax Details
                </div>
                <div className="mb-2 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-3">
                    <ImportCSV onOpen={() => setIsImportOpen(true)} />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 rounded-full bg-[#FF4D4D] px-5 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-red-100 transition-all hover:cursor-pointer hover:bg-[#ff3b3b] sm:text-[13px]"
                    >
                        Manual Entry
                    </button>
                </div>
            </div>

            <div className="relative -mt-4 z-0">
                <OrdersTable orders={orders} onInfoClick={setSelectedOrder} />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#F5F2EB] rounded-[40px] p-6 sm:p-8 max-w-md w-full shadow-2xl">
                        <CreateOrderForm
                            onAddOrder={handleAddOrder}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}

            {isImportOpen && (
                <ImportCsvProcessingPage
                    onClose={() => setIsImportOpen(false)}
                    onImportSuccess={handleImportSuccess}
                />
            )}
        </div>
    );
}
