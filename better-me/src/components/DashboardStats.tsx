interface DashboardStatsProps{
    totalOrdersCount: number;
}

export function DashboardStats({ totalOrdersCount }: DashboardStatsProps) {
    return (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-3 sm:gap-6">
            <div className="relative rounded-[24px] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
                <span className="absolute right-5 top-5 text-xs font-bold text-[#4CAF50] sm:right-6 sm:top-6 sm:text-sm">+12.5%</span>
                <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Total Orders</p>
                <h2 className="text-3xl font-black text-black sm:text-4xl">{totalOrdersCount}</h2>
            </div>
            <div className="rounded-[24px] border-2 border-dashed border-[#E5E1D8] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6"></div>
            <div className="relative rounded-[24px] bg-white p-5 shadow-sm sm:rounded-[30px] sm:p-6">
                <span className="absolute right-5 top-5 rounded bg-black px-2 py-0.5 text-[9px] font-bold text-white sm:right-6 sm:top-6">URGENT</span>
                <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Pending Sync</p>
                <h2 className="text-3xl font-black text-black sm:text-4xl">1</h2>
            </div>
        </div>
    );
}
