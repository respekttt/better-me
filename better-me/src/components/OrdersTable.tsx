import type { Order } from "../types";

interface OrdersTableProps {
    orders: Order[];
    onInfoClick: (order: Order) => void;
    onRetryOrder: (orderId: string) => void;
    retryingOrderIds: string[];
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
}

export function OrdersTable({
    orders,
    onInfoClick,
    onRetryOrder,
    retryingOrderIds,
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    onPageChange,
    isLoading = false
}: OrdersTableProps) {
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * 10 + 1;
    const endItem = Math.min(currentPage * 10, totalItems);

    return (
        <div className="overflow-hidden rounded-b-3xl rounded-tl-3xl border border-[#E5E1D8] bg-white shadow-sm sm:rounded-b-4xl sm:rounded-tl-4xl">
            <div className="overflow-x-auto relative">
                {isLoading && (
                    <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4D4D]"></div>
                    </div>
                )}
            <table className="min-w-[980px] w-full text-left">
                <thead
                    className="bg-[#2D2823] text-[#A39E98] text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                        <th className="px-4 py-4 sm:px-8 sm:py-5">Order ID & Time</th>
                        <th className="px-4 py-4 sm:px-8 sm:py-5">Location</th>
                        <th className="px-4 py-4 sm:px-8 sm:py-5">Subtotal</th>
                        <th className="px-4 py-4 sm:px-8 sm:py-5">Tax Rate</th>
                        <th className="px-4 py-4 sm:px-8 sm:py-5">Tax Amount</th>
                        <th className="px-4 py-4 sm:px-8 sm:py-5">Total</th>
                        <th className="px-4 py-4 sm:px-8 sm:py-5">Info</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EB]">
                    {orders.map((order) => (
                        <tr key={order.id} className={`${order.status === 'processing' ? 'bg-[#FFF5F5]' : ''} hover:bg-gray-50 transition-colors`}>
                            <td className="px-4 py-4 sm:px-8 sm:py-5">
                                <div className="font-bold text-black">{order.id}</div>
                                <div className="text-[10px] text-[#A39E98] font-bold uppercase">{order.timestamp}</div>
                            </td>
                            <td className="px-4 py-4 text-[12px] font-bold text-[#A39E98] sm:px-8 sm:py-5">
                                {order.status === 'processing' ? (
                                    <span
                                        className="text-[#FF4D4D] animate-pulse flex gap-1">

                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4">
                                            <path fillRule="evenodd"
                                                d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                                                clipRule="evenodd" />
                                        </svg>

                                        Locating Unit...
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F3EFE6] px-2.5 py-1 text-[#2D2823]">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4 text-[#FF4D4D]">
                                            <path fillRule="evenodd"
                                                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                clipRule="evenodd" />
                                        </svg>
                                        {order.latitude}, {order.longitude}</span>
                                )}
                            </td>
                            <td className="px-4 py-4 text-base font-black text-black sm:px-8 sm:py-5 sm:text-lg">${order.subtotal.toFixed(2)}</td>
                            <td className="px-4 py-4 sm:px-8 sm:py-5">
                                {order.status === 'processing' ? (
                                    <span
                                        className="bg-[#FF4D4D] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Processing</span>
                                ) : (
                                    <span className="rounded-full bg-[#DFF7EA] px-3 py-1 text-[10px] font-bold text-[#27AE60]">
                                        {(order.composite_tax_rate * 100).toFixed(3)}%
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-4 font-bold text-[#A39E98] sm:px-8 sm:py-5">
                                {order.status === 'processing' ? '--' : `$${order.tax_amount.toFixed(2)}`}
                            </td>
                            <td className="px-4 py-4 text-base font-black sm:px-8 sm:py-5 sm:text-lg">
                                <span className={order.status === 'processing' ? 'text-[#A39E98]' : 'text-[#FF4D4D]'}>
                                    ${order.total_amount.toFixed(2)}{order.status === 'processing' && '*'}
                                </span>
                            </td>
                            <td className="px-4 py-4 sm:px-8 sm:py-5">
                                {order.status === 'processing' ? (
                                    <button
                                        type="button"
                                        onClick={() => onRetryOrder(order.id)}
                                        disabled={retryingOrderIds.includes(order.id)}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4D4D] text-white shadow-md shadow-red-200 transition hover:cursor-pointer hover:bg-[#ff3b3b] disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={`h-4 w-4 ${retryingOrderIds.includes(order.id) ? 'animate-spin' : ''}`}
                                        >
                                            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                                            <path d="M21 3v6h-6" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onInfoClick(order)}
                                        className="text-[#A39E98] transition-colors hover:cursor-pointer hover:text-black"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" fill="currentColor"
                                            className="size-6">
                                            <path fillRule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && !isLoading && (
                        <tr>
                            <td colSpan={7} className="px-4 py-8 text-center text-[#A39E98] font-bold">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>

            {totalItems > 0 && (
                <div
                    className="flex flex-col gap-3 border-t border-[#F5F2EB] p-4 text-[11px] font-bold uppercase tracking-widest text-[#A39E98] sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>Displaying {startItem}-{endItem} of {totalItems} units</div>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => onPageChange && onPageChange(currentPage - 1)}
                            className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" fill="currentColor"
                                className="size-4">
                                <path fillRule="evenodd"
                                    d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            disabled={currentPage >= totalPages}
                            onClick={() => onPageChange && onPageChange(currentPage + 1)}
                            className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" fill="currentColor"
                                className="size-4">
                                <path fillRule="evenodd"
                                    d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}



