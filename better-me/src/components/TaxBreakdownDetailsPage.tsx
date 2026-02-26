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
        <div className="min-h-screen bg-[#ECE9EB] flex items-center justify-center p-3 sm:p-5">
            <div className="w-full max-w-165 rounded-2xl border border-[#E9E5E7] bg-[#F7F7F8] shadow-[0_10px_24px_rgba(35,31,32,0.12)]">
                <div className="px-4 pt-4 pb-3 border-b border-[#ECE8EA] sm:px-6 sm:pt-6 sm:pb-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="text-[26px] leading-[1.08] font-black tracking-[-0.02em] text-[#1A1F2F] sm:text-[34px]">
                                Tax Breakdown Details
                            </h1>
                            <p className="mt-1.5 text-[12px] font-semibold text-[#738096] sm:text-[14px]">
                                Detailed tax calculation for Order ID: <span className="text-[#2D3345]">{order.id}</span>
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

                <div className="px-4 py-3 sm:px-6 sm:py-4">
                    <div className="space-y-0">
                        <TaxRateRow
                            label="State Rate"
                            value={`${stateRate.toFixed(3)}%`}
                            icon={
                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                                    <path d="M12 2 2 7h20L12 2Zm-8 8h2v8H4v-8Zm5 0h2v8H9v-8Zm5 0h2v8h-2v-8Zm5 0h2v8h-2v-8ZM2 20h20v2H2v-2Z" />
                                </svg>
                            }
                        />
                        <TaxRateRow
                            label="County Rate"
                            value={`${countyRate.toFixed(3)}%`}
                            icon={
                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                                    <path d="M12 2a7 7 0 0 0-7 7c0 4.88 7 13 7 13s7-8.12 7-13a7 7 0 0 0-7-7Zm0 9.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z" />
                                </svg>
                            }
                        />
                        <TaxRateRow
                            label="City Rate"
                            value={`${cityRate.toFixed(3)}%`}
                            icon={
                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                                    <path d="M3 21h18v-2h-1V8h-6V3H4v16H3v2Zm3-16h6v14H6V5Zm8 5h4v9h-4v-9ZM8 7h2v2H8V7Zm0 4h2v2H8v-2Zm0 4h2v2H8v-2Z" />
                                </svg>
                            }
                        />
                        <TaxRateRow
                            isLast
                            label="Special Rates"
                            value={`${specialRates.toFixed(3)}%`}
                            icon={
                                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                                    <path d="M8.5 5A2.5 2.5 0 1 1 8.5 10 2.5 2.5 0 0 1 8.5 5Zm7 9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM18 5.4 6.4 17l-1.4-1.4L16.6 4 18 5.4Z" />
                                </svg>
                            }
                        />
                    </div>

                    <div className="mt-4 rounded-xl border border-[#F4CFCF] bg-[#FFF3F3] px-4 py-3 flex flex-col items-start gap-3 sm:px-5 sm:py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div>
                            <p className="text-[20px] leading-none font-black text-[#1A1F2F] sm:text-[24px]">Total Composite Rate</p>
                            <p className="mt-1.5 text-xs font-semibold text-[#9B8D8F]">Combined rate applied to subtotal</p>
                        </div>
                        <div className="text-[34px] leading-none font-black text-[#FF4D4D] sm:text-[44px]">
                            {(order.composite_tax_rate * 100).toFixed(3)}%
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-[16px] font-black uppercase tracking-wide text-[#1A1F2F] sm:text-[18px]">Applied Jurisdictions</p>
                        <div className="mt-2.5 flex flex-wrap gap-2.5">
                            {jurisdictions.map((jurisdiction) => (
                                <span
                                    key={jurisdiction}
                                    className="inline-flex items-center rounded-full border border-[#D9DEE6] bg-[#E8EDF4] px-3 py-1.5 text-xs font-bold text-[#647286]"
                                >
                                    {jurisdiction}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-b-2xl border-t border-[#ECE8EA] bg-[#EEF1F5] px-4 py-3 flex flex-col-reverse gap-2 sm:px-6 sm:py-4 sm:flex-row sm:justify-end sm:gap-3">
                    <button className="w-full rounded-xl border border-[#C9D0DB] bg-[#E5EAF1] px-4 py-2 text-xs font-bold text-[#617087] hover:bg-[#dae1ea] hover:cursor-pointer sm:w-auto">
                        Download PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full rounded-xl bg-[#FF4D4D] px-5 py-2 text-xs font-bold text-white hover:bg-[#ef3f3f] hover:cursor-pointer sm:w-auto"
                    >
                        Done
                    </button>
                </div>
            </div>
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
        <div className={`flex items-center justify-between gap-3 py-3 sm:py-4 ${!isLast ? "border-b border-dashed border-[#E5E8EE]" : ""}`}>
            <div className="flex min-w-0 items-center gap-2.5 text-[#FF6A6A] sm:gap-3">
                {icon}
                <span className="truncate text-[15px] font-bold text-[#667386] sm:text-[18px]">{label}</span>
            </div>
            <span className="shrink-0 text-[18px] font-black text-[#2B3243] sm:text-[22px]">{value}</span>
        </div>
    );
}
