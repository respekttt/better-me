interface ReloadTableButtonProps {
	onReload: () => void;
	isLoading?: boolean;
}

export function ReloadTableButton({ onReload, isLoading = false }: ReloadTableButtonProps) {
	return (
		<button
			onClick={onReload}
			disabled={isLoading}
			className="flex items-center justify-center gap-2 rounded-full border border-[#E5E1D8] bg-white px-5 py-2.5 text-[12px] font-bold shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70 sm:text-[13px]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={`size-5 ${isLoading ? 'animate-spin' : ''}`}
			>
				<path d="M21 12a9 9 0 1 1-2.64-6.36" />
				<path d="M21 3v6h-6" />
			</svg>
			
		</button>
	);
}
