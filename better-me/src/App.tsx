import {type FormEvent, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {type Order, type ApiPagination, type ApiResponse} from './types';
import {Header} from './components/Header';
import {DashboardStats} from './components/DashboardStats';
import {OrdersTable} from './components/OrdersTable';
import {CreateOrderForm} from './components/CreateOrderForm';
import {ImportCSV} from './components/ImportCSV';
import {ReloadTableButton} from './components/ReloadTableButton';
import {TaxBreakdownDetailsPage} from './components/TaxBreakdownDetailsPage';
import {ImportCsvProcessingPage} from './components/ImportCsvProcessingPage';
import {mapApiOrderToOrder} from './utils';

export default function App() {
    const ADMIN_LOGIN = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    const [apiOrders, setApiOrders] = useState<Order[]>([]);
    const [pagination, setPagination] = useState<ApiPagination | null>(null);
    const [globalTotal, setGlobalTotal] = useState<ApiResponse['globalTotal'] | null>(null);
    const [last24h, setLast24h] = useState<ApiResponse['last24h'] | null>(null);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin-auth') === 'true');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [toastMessage, setToastMessage] = useState<{title: string, desc?: string} | null>(null);
    const [isToastVisible, setIsToastVisible] = useState(false);
    
    const [filters, setFilters] = useState({ state: '', county: '', city: '', from: '', to: '' });
    const [appliedFilters, setAppliedFilters] = useState({ state: '', county: '', city: '', from: '', to: '' });

    const [baselineOrdersCount, setBaselineOrdersCount] = useState<number | null>(null);

    const fetchOrders = useCallback(async (page: number) => {
        setIsLoadingOrders(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: '10'
            });
            if (appliedFilters.state) params.append('state', appliedFilters.state);
            if (appliedFilters.county) params.append('county', appliedFilters.county);
            if (appliedFilters.city) params.append('city', appliedFilters.city);
            if (appliedFilters.from) params.append('from', appliedFilters.from);
            if (appliedFilters.to) params.append('to', appliedFilters.to);

            const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_API_URL}/orders?${params.toString()}`);
            setApiOrders(response.data.orders.map(mapApiOrderToOrder));
            setPagination(response.data.pagination);
            setGlobalTotal(response.data.globalTotal);
            setLast24h(response.data.last24h);
            setCurrentPage(response.data.pagination.page);
            
            const isNoFilters = Object.values(appliedFilters).every(v => !v);
            if (baselineOrdersCount === null && isNoFilters) {
                setBaselineOrdersCount(response.data.globalTotal.orders);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setIsLoadingOrders(false);
        }
    }, [baselineOrdersCount, appliedFilters]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders(1);
        }
    }, [isAuthenticated, fetchOrders]);
    
    const showToast = (title: string, desc?: string) => {
        setToastMessage({ title, desc });
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
            setTimeout(() => setToastMessage(null), 300); // Wait for transition
        }, 6000); // Display for 6 seconds
    };

    const handleAddOrder = () => {
        showToast('Order added successfully!', 'Your new order has been created and synced.');
        fetchOrders(1);
    };
    
    const handleImportSuccess = () => {
        showToast('File processing started', 'Your file has started processing, it may take some time...');
        fetchOrders(1);
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

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        setAppliedFilters(filters);
    };

    const clearFilters = () => {
        const empty = { state: '', county: '', city: '', from: '', to: '' };
        setFilters(empty);
        setAppliedFilters(empty);
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

    const currentTotalOrders = globalTotal?.orders || 0;
    const totalOrdersChangePercent = baselineOrdersCount === null || baselineOrdersCount === 0
        ? (currentTotalOrders > 0 ? 100 : 0)
        : ((currentTotalOrders - baselineOrdersCount) / baselineOrdersCount) * 100;

    return (
        <div className="min-h-screen bg-[#F5F2EB] p-4 font-sans text-[#2D2823] sm:p-6 lg:p-8">
            <Header onLogout={handleLogout} />

            <DashboardStats 
                totalOrdersCount={currentTotalOrders} 
                totalOrdersChangePercent={totalOrdersChangePercent}
                taxTotal={globalTotal?.tax || '0'}
                grandTotal={globalTotal?.grand || '0'}
                last24h={last24h}
            />

            <div className="relative z-10 mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="mb-1 inline-flex rounded-2xl bg-[#2D2823] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#A39E98] sm:mb-4 sm:rounded-[20px] sm:px-6 sm:py-3 sm:text-[11px]">
                    Order List & Tax Details
                </div>
                <div className="mb-2 flex flex-col gap-2 sm:mb-4 sm:gap-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                        <ReloadTableButton onReload={() => fetchOrders(currentPage)} isLoading={isLoadingOrders} />
                        <ImportCSV onOpen={() => setIsImportOpen(true)} />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center gap-2 rounded-full bg-[#FF4D4D] px-5 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-red-100 transition-all hover:cursor-pointer hover:bg-[#ff3b3b] sm:text-[13px]"
                        >
                            Manual Entry
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-4 grid gap-3 rounded-[20px] border border-[#E5E1D8] bg-white p-4 shadow-sm z-10 relative">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input type="text" name="state" placeholder="State" value={filters.state} onChange={handleFilterChange} className="w-full rounded-xl border border-[#E5E1D8] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-gray-300" />
                    <input type="text" name="county" placeholder="County" value={filters.county} onChange={handleFilterChange} className="w-full rounded-xl border border-[#E5E1D8] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-gray-300" />
                    <input type="text" name="city" placeholder="City" value={filters.city} onChange={handleFilterChange} className="w-full rounded-xl border border-[#E5E1D8] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-gray-300" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-center">
                    <label className="flex items-center gap-2 text-xs text-[#8E8B85] font-semibold w-full">
                        <span>From:</span>
                        <input type="date" name="from" value={filters.from} onChange={handleFilterChange} className="flex-1 rounded-xl border border-[#E5E1D8] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-gray-300" />
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#8E8B85] font-semibold w-full">
                        <span>To:</span>
                        <input type="date" name="to" value={filters.to} onChange={handleFilterChange} className="flex-1 rounded-xl border border-[#E5E1D8] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-gray-300" />
                    </label>
                    <div className="flex gap-2 h-full">
                        <button onClick={applyFilters} className="px-6 rounded-xl bg-[#2D2823] text-xs font-bold text-white transition-colors hover:cursor-pointer hover:bg-black h-full py-2">Apply</button>
                        <button onClick={clearFilters} className="px-6 rounded-xl border border-[#E5E1D8] text-xs font-bold text-[#2D2823] transition-colors hover:cursor-pointer hover:bg-gray-50 h-full py-2">Clear</button>
                    </div>
                </div>
            </div>

            <div className="relative mt-2 z-0">
                <OrdersTable
                    orders={apiOrders}
                    onInfoClick={setSelectedOrder}
                    currentPage={currentPage}
                    totalPages={pagination?.totalPages || 1}
                    totalItems={pagination?.total || 0}
                    onPageChange={fetchOrders}
                    isLoading={isLoadingOrders}
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

            {selectedOrder && (
                <TaxBreakdownDetailsPage 
                    order={selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                />
            )}

            {toastMessage && (
                <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ease-in-out transform ${
                    isToastVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    <div className="flex items-start gap-3 rounded-2xl bg-[#2D2823] p-4 pr-12 shadow-2xl ring-1 ring-white/10 max-w-sm relative">
                        <div className="mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-[#DFF7EA]/10 p-1.5 text-[#27AE60]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-[13px] font-bold text-white">{toastMessage.title}</h3>
                            {toastMessage.desc && (
                                <p className="mt-1 text-[11px] font-medium leading-relaxed text-[#A39E98]">{toastMessage.desc}</p>
                            )}
                        </div>
                        <button onClick={() => setIsToastVisible(false)} className="absolute right-4 top-4 text-[#A39E98] hover:text-white transition-colors hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
