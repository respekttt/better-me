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
                <div className="flex h-12 items-center gap-3 rounded-full bg-white px-3 shadow-sm">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCE4D6] text-[13px] font-bold text-[#8E5E41]">
                        A
                        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#FF4D4D]" />
                    </div>
                    <div className="hidden text-left leading-tight sm:block pr-2">
                        <p className="text-[13px] font-bold text-[#2D2823]">Admin</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#A39E98]">Manager</p>
                    </div>
                </div>
                {onLogout && (
                    <button
                        type="button"
                        onClick={onLogout}
                        className="flex h-12 items-center rounded-full bg-[#2D2823] px-8 text-[14px] font-bold text-white transition hover:cursor-pointer hover:bg-black shadow-md"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}
