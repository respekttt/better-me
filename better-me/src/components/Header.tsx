export function Header() {
    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-black flex items-center gap-2">BetterMe</h1>
                <span className="dark-tag bg-black text-white px-2 py-1 rounded text-xs ml-2">Tax Department</span>
            </div>
            <div className="flex items-center gap-4">
                <input type="text" placeholder="Search orders..." className="bg-white px-5 py-2 rounded-full border border-transparent shadow-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-300" />
                <div className="w-10 h-10 bg-[#FCE4D6] rounded-xl flex items-center justify-center font-bold text-[#8E5E41]">AU</div>
            </div>
        </header>
    );
}