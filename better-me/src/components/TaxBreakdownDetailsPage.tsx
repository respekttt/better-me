import type {ReactNode} from "react";
import type {Order} from "../types";

interface TaxBreakdownDetailsPageProps {
    order: Order;
    onClose: () => void;
}

export function TaxBreakdownDetailsPage({ order, onClose }: TaxBreakdownDetailsPageProps) {
    const stateRate = order.breakdown.state_rate * 100;
    const countyRate = order.breakdown.county_rate * 100;
    const cityRate = order.breakdown.city_rate * 100;
    const specialRates = order.breakdown.special_rates * 100;
    const jurisdictions = order.jurisdictions ?? [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-lg overflow-hidden rounded-[32px] border border-[#E9E5E7] bg-[#F5F2EB] shadow-2xl sm:rounded-[40px] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col max-h-[80vh]">
                <div className="shrink-0 px-6 pt-6 pb-4 border-b border-[#ECE8EA] sm:px-8 sm:pt-8 sm:pb-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <span className="inline-flex items-center rounded-full bg-[#2D2A2A] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-2">
                                Tax Analysis
                            </span>
                            <h1 className="text-[28px] leading-tight font-black tracking-tight text-[#1A1F2F] sm:text-[32px]">
                                Breakdown Details
                            </h1>
                            <p className="mt-1 text-[11px] font-semibold text-[#738096] uppercase tracking-wide">
                                Order ID: <span className="text-[#2D3345] font-bold">{order.id}</span>
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#8FA1BA] hover:text-[#5D6A80] transition-colors hover:cursor-pointer"
                            aria-label="Close tax details"
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
                                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="relative flex-1 overflow-hidden flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 py-4 sm:px-8 sm:py-6 custom-scrollbar">
                        <div className="space-y-0">
                            <TaxRateRow
                                label="State Rate"
                                value={`${stateRate.toFixed(3)}%`}
                                icon={
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                                        <path d="M12 2 2 7h20L12 2Zm-8 8h2v8H4v-8Zm5 0h2v8H9v-8Zm5 0h2v8h-2v-8Zm5 0h2v8h-2v-8ZM2 20h20v2H2v-2Z" />
                                    </svg>
                                }
                            />
                            <TaxRateRow
                                label="County Rate"
                                value={`${countyRate.toFixed(3)}%`}
                                icon={
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                                        <path d="M12 2a7 7 0 0 0-7 7c0 4.88 7 13 7 13s7-8.12 7-13a7 7 0 0 0-7-7Zm0 9.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z" />
                                    </svg>
                                }
                            />
                            <TaxRateRow
                                label="City Rate"
                                value={`${cityRate.toFixed(3)}%`}
                                icon={
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                                        <path d="M3 21h18v-2h-1V8h-6V3H4v16H3v2Zm3-16h6v14H6V5Zm8 5h4v9h-4v-9ZM8 7h2v2H8V7Zm0 4h2v2H8v-2Zm0 4h2v2H8v-2Z" />
                                    </svg>
                                }
                            />
                            <TaxRateRow
                                isLast
                                label="Special Rates"
                                value={`${specialRates.toFixed(3)}%`}
                                icon={
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                                        <path d="M8.5 5A2.5 2.5 0 1 1 8.5 10 2.5 2.5 0 0 1 8.5 5Zm7 9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM18 5.4 6.4 17l-1.4-1.4L16.6 4 18 5.4Z" />
                                    </svg>
                                }
                            />
                        </div>

                        <div className="mt-6 rounded-[24px] border border-[#F4CFCF] bg-[#FFF3F3] p-5 flex flex-col items-center justify-center text-center gap-2">
                            <p className="text-[12px] font-black uppercase tracking-widest text-[#FF4D4D]">Total Composite Rate</p>
                            <div className="text-[48px] leading-none font-black text-[#FF4D4D] sm:text-[56px]">
                                {(order.composite_tax_rate * 100).toFixed(3)}%
                            </div>
                        </div>

                        <div className="mt-8 pb-10">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[11px] font-black uppercase tracking-widest text-[#A39E98]">Applied Jurisdictions</p>
                                <div className="h-[1px] flex-1 bg-[#E5E1D8] ml-4"></div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {jurisdictions.map((jurisdiction) => (
                                    <span
                                        key={jurisdiction}
                                        className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#2D2823] shadow-sm ring-1 ring-[#E5E1D8]"
                                    >
                                        {jurisdiction}
                                    </span>
                                ))}
                                {jurisdictions.length === 0 && (
                                    <p className="text-xs italic text-[#A39E98]">No specific jurisdictions listed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F2EB] to-transparent z-10 flex items-end justify-center pb-2">
                    </div>
                </div>

                <div className="shrink-0 bg-[#ECEDEF] px-6 py-5 flex justify-end sm:px-8 sm:py-6 relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                    <button
                        onClick={onClose}
                        className="w-full rounded-full bg-[#2D2823] px-8 py-3 text-[12px] font-black uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-black hover:cursor-pointer sm:w-auto"
                    >
                        Done
                    </button>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E5E1D8;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #BEC2CA;
                }
            `}</style>
        </div>
    );
}

interface TaxRateRowProps {
    label: string;
    value: string;
    icon: ReactNode;
    isLast?: boolean;
}

function TaxRateRow({ label, value, icon, isLast = false }: TaxRateRowProps) {
    return (
        <div className={`flex items-center justify-between gap-3 py-4 sm:py-5 ${!isLast ? "border-b border-dashed border-[#E5E8EE]" : ""}`}>
            <div className="flex min-w-0 items-center gap-3 text-[#FF4D4D]">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#FFF1F3]">
                    {icon}
                </div>
                <span className="truncate text-[15px] font-extrabold text-[#2D2823] sm:text-[16px]">{label}</span>
            </div>
            <span className="shrink-0 text-[18px] font-black text-[#2D2823] sm:text-[20px]">{value}</span>
        </div>
    );
}
