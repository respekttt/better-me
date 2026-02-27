interface DashboardStatsProps{
    totalOrdersCount: number;
    totalOrdersChangePercent: number;
}

export function DashboardStats({ totalOrdersCount, totalOrdersChangePercent }: DashboardStatsProps) {
    const isPositive = totalOrdersChangePercent >= 0;
    const formattedPercent = `${isPositive ? '+' : ''}${totalOrdersChangePercent.toFixed(1)}%`;

    return (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-3 sm:gap-6">
            <div className="relative rounded-[24px] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
                <div className="mb-4 flex items-center justify-between">
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
                    <span className={`rounded-full px-2 py-1 text-[10px] font-bold sm:text-xs ${isPositive ? 'bg-[#DFF7EA] text-[#27AE60]' : 'bg-[#FDEBEC] text-[#E74C3C]'}`}>
                        {formattedPercent}
                    </span>
                </div>
                <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Total Orders</p>
                <h2 className="text-3xl font-black text-black sm:text-4xl">{totalOrdersCount}</h2>
            </div>
            <div className="rounded-[24px] border-2 border-dashed border-[#E5E1D8] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6"></div>
            <div className="relative rounded-[24px] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D2823] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-6 w-6">
                        <path d="M8 3h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                        <path d="M14 3v5h5" />
                        <path d="M9 12h6" />
                        <path d="M9 16h6" />
                    </svg>
                </div>
                <span className="absolute right-5 top-5 rounded bg-black px-2 py-0.5 text-[9px] font-bold text-white sm:right-6 sm:top-6">URGENT</span>
                <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Pending Sync</p>
                <h2 className="text-3xl font-black text-black sm:text-4xl">1</h2>
            </div>
        </div>
    );
}

