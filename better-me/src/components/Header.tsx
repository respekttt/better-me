export function Header() {
    return (
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">BetterMe</h1>
                <span className="dark-tag ml-1 mt-1 inline-block rounded bg-black px-2 py-1 text-[10px] text-white sm:ml-2 sm:text-xs">Tax Department</span>
            </div>
            <div className="flex w-full items-center gap-3 sm:w-auto sm:gap-4">
                <input type="text" placeholder="Search orders..." className="w-full rounded-full border border-transparent bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 sm:w-64 sm:px-5" />
                <div className="w-10 h-10 bg-[#FCE4D6] rounded-xl flex items-center justify-center font-bold text-[#8E5E41]">AU</div>
            </div>
        </header>
    );
}
