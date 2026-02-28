type HeaderProps = {
    onLogout?: () => void;
};

export function Header({ onLogout }: HeaderProps) {
    return (
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">BetterMe</h1>
                <span className="dark-tag ml-1 mt-1 inline-block rounded bg-black px-2 py-1 text-[10px] text-white sm:ml-2 sm:text-xs">Tax Department</span>
            </div>
            <div className="flex w-full items-center gap-3 sm:w-auto sm:gap-4">
                {/* <div className="relative w-full sm:w-64">
                    <svg
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full rounded-full border border-transparent bg-white py-2 pl-10 pr-4 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 sm:pr-5"
                    />
                </div> */}
                <div className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-sm">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#FCE4D6] text-[10px] font-bold text-[#8E5E41]">
                        F
                        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-white bg-[#FF4D4D]" />
                    </div>
                    <div className="hidden text-left leading-tight sm:block">
                        <p className="text-[10px] font-bold text-[#2D2823]">Admin User</p>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#A39E98]">Manager</p>
                    </div>
                </div>
                {onLogout && (
                    <button
                        type="button"
                        onClick={onLogout}
                        className="rounded-full bg-[#2D2823] px-4 py-2 text-xs font-bold text-white transition hover:cursor-pointer hover:bg-black"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}
