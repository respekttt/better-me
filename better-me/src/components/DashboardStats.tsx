interface DashboardStatsProps{
    totalOrdersCount: number;
}

export function DashboardStats({ totalOrdersCount }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-4xl shadow-sm relative rounded-[30px]">
                <span className="text-[#4CAF50] absolute top-6 right-6 font-bold text-sm">+12.5%</span>
                <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Total Orders</p>
                <h2 className="text-4xl font-black text-black">{totalOrdersCount}</h2>
            </div>
            <div className="bg-white p-6 shadow-sm border-2 border-dashed border-[#E5E1D8] rounded-[30px]"></div>
            <div className="bg-white p-6 rounded-4xl shadow-sm relative rounded-[30px]">
                <span className="bg-black text-white text-[9px] absolute top-6 right-6 px-2 py-0.5 rounded font-bold">URGENT</span>
                <p className="text-[#A39E98] text-[10px] uppercase font-bold tracking-widest mb-1">Pending Sync</p>
                <h2 className="text-4xl font-black text-black">1</h2>
            </div>
        </div>
    );
}