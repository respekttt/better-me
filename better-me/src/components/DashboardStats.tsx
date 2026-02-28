interface DashboardStatsProps {
    totalOrdersCount: number;
    totalOrdersChangePercent: number;
    taxTotal: string;
    grandTotal: string;
    last24h: {
        orders: number;
        tax: string;
        grand: string;
    } | null;
}

export function DashboardStats({ totalOrdersCount, taxTotal, grandTotal, last24h }: DashboardStatsProps) {

    const formatCurrency = (value: string) => {
        const num = parseFloat(value);
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    return (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-3 sm:gap-6">
            <div className="relative rounded-[24px] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1F3]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-6 w-6 text-[#FF4D4D]"
                            >
                                <path d="M6 7h12l-1.2 9H7.2L6 7Z" />
                                <path d="M9 7a3 3 0 1 1 6 0" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Total Orders</p>
                    <h2 className="text-3xl font-black text-black sm:text-4xl">{totalOrdersCount.toLocaleString()}</h2>
                </div>
                {last24h && (
                    <div className="absolute right-5 top-5 text-right sm:right-6 sm:top-6">
                        <p className="text-[9px] font-bold text-[#A39E98] uppercase tracking-wider mb-0.5">Last 24h</p>
                        <p className="text-lg font-black text-[#27AE60]">+{last24h.orders.toLocaleString()}</p>
                    </div>
                )}
            </div>

            <div className="relative rounded-[24px] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
                <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F4FD] text-[#3498DB]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                            <path d="M12 2v20M17 5H9.5a4.5 4.5 0 1 0 0 9h5a4.5 4.5 0 1 1 0 9H6" />
                        </svg>
                    </div>
                    <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Grand Total</p>
                    <h2 className="text-2xl font-black text-black sm:text-3xl">{formatCurrency(grandTotal)}</h2>
                </div>
                {last24h && (
                    <div className="absolute right-5 top-5 text-right sm:right-6 sm:top-6">
                        <p className="text-[9px] font-bold text-[#A39E98] uppercase tracking-wider mb-0.5">Last 24h</p>
                        <p className="text-lg font-black text-[#27AE60]">+{formatCurrency(last24h.grand)}</p>
                    </div>
                )}
            </div>

            <div className="relative rounded-[24px] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
                <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D2823] text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-6 w-6">
                            <path d="M8 3h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                            <path d="M14 3v5h5" />
                            <path d="M9 12h6" />
                            <path d="M9 16h6" />
                        </svg>
                    </div>
                    <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Total Tax</p>
                    <h2 className="text-2xl font-black text-black sm:text-3xl">{formatCurrency(taxTotal)}</h2>
                </div>
                {last24h && (
                    <div className="absolute right-5 top-5 text-right sm:right-6 sm:top-6">
                        <p className="text-[9px] font-bold text-[#A39E98] uppercase tracking-wider mb-0.5">Last 24h</p>
                        <p className="text-lg font-black text-[#27AE60]">+{formatCurrency(last24h.tax)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
