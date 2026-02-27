import {type FormEvent, useEffect, useState} from 'react';
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
    const ADMIN_LOGIN = 'admin';
    const ADMIN_PASSWORD = 'admin123';
    const [orders, setOrders] = useState<Order[]>(() => {
        const savedOrders = localStorage.getItem('myList');
        if(savedOrders){
            return JSON.parse(savedOrders)
        } else return []
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin-auth') === 'true');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const[isModalOpen, setIsModalOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [retryingOrderIds, setRetryingOrderIds] = useState<string[]>([]);
    const [baselineOrdersCount] = useState(orders.length);

    useEffect(() => {
        localStorage.setItem('myList',JSON.stringify(orders))
    }, [orders])
    
    const handleAddOrder = (newOrder: Order) => {
        setOrders([newOrder, ...orders]);
    };
    const handleImportSuccess = (importedOrders: Order[]) => {
        setOrders([...importedOrders, ...orders]); 
    };
    const handleRetryOrder = (orderId: string) => {
        if (retryingOrderIds.includes(orderId)) return;

        setRetryingOrderIds((prev) => [...prev, orderId]);
        window.setTimeout(() => {
            setOrders((prevOrders) =>
                prevOrders.map((order) => {
                    if (order.id !== orderId) return order;

                    const nextLatitude = Number((34 + Math.random() * 15).toFixed(4));
                    const nextLongitude = Number((-120 + Math.random() * 40).toFixed(4));
                    const taxAmount = Number((order.subtotal * order.composite_tax_rate).toFixed(2));
                    const totalAmount = Number((order.subtotal + taxAmount).toFixed(2));

                    return {
                        ...order,
                        status: 'completed',
                        latitude: nextLatitude,
                        longitude: nextLongitude,
                        tax_amount: taxAmount,
                        total_amount: totalAmount
                    };
                })
            );
            setRetryingOrderIds((prev) => prev.filter((id) => id !== orderId));
        }, 1200);
    };

    const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
            localStorage.setItem('admin-auth', 'true');
            setIsAuthenticated(true);
            setLoginError('');
            setPassword('');
            return;
        }

        setLoginError('Невірний логін або пароль');
    };

    const handleLogout = () => {
        localStorage.removeItem('admin-auth');
        setIsAuthenticated(false);
        setLogin('');
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#F5F2EB] p-4 font-sans text-[#2D2823] sm:p-6 lg:p-8">
                <div className="mx-auto mt-20 max-w-md rounded-4xl bg-white p-6 shadow-xl sm:p-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl">Admin Login</h1>
                    <p className="mt-2 text-sm text-gray-500">Вхід до адмін-панелі BetterMe</p>

                    <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
                        <input
                            type="text"
                            placeholder="Login"
                            value={login}
                            onChange={(event) => setLogin(event.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        {loginError && <p className="text-xs font-semibold text-red-500">{loginError}</p>}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#2D2823] px-4 py-2.5 text-sm font-bold text-white transition hover:cursor-pointer hover:bg-black"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="mt-4 text-xs text-gray-500">
                        Default: <span className="font-bold">admin / admin123</span>
                    </p>
                </div>
            </div>
        );
    }

    if (selectedOrder) {
        return <TaxBreakdownDetailsPage order={selectedOrder} onClose={() => setSelectedOrder(null)} />;
    }

    const totalOrdersChangePercent = baselineOrdersCount === 0
        ? (orders.length > 0 ? 100 : 0)
        : ((orders.length - baselineOrdersCount) / baselineOrdersCount) * 100;

    return (
        <div className="min-h-screen bg-[#F5F2EB] p-4 font-sans text-[#2D2823] sm:p-6 lg:p-8">
            
            
            <Header onLogout={handleLogout} />

            <DashboardStats totalOrdersCount={orders.length} totalOrdersChangePercent={totalOrdersChangePercent} />

            <div className="relative z-10 mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="mb-1 inline-flex rounded-2xl bg-[#2D2823] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#A39E98] sm:mb-4 sm:rounded-[20px] sm:px-6 sm:py-3 sm:text-[11px]">
                    Order List & Tax Details
                </div>
                <div className="mb-2 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-3">
                    <ImportCSV onOpen={() => setIsImportOpen(true)} />
                    <button
                        type="button"
                        onClick={() => setOrders([])}
                        className="flex items-center justify-center gap-2 rounded-full border border-[#E5E1D8] bg-white px-5 py-2.5 text-[12px] font-bold text-[#2D2823] transition-all hover:cursor-pointer hover:bg-[#f7f4ee] sm:text-[13px]"
                    >
                        Clear All Orders
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 rounded-full bg-[#FF4D4D] px-5 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-red-100 transition-all hover:cursor-pointer hover:bg-[#ff3b3b] sm:text-[13px]"
                    >
                        Manual Entry
                    </button>
                </div>
            </div>

            <div className="relative -mt-4 z-0">
                <OrdersTable
                    orders={orders}
                    onInfoClick={setSelectedOrder}
                    onRetryOrder={handleRetryOrder}
                    retryingOrderIds={retryingOrderIds}
                />
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
