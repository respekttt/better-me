import type { Order } from "../types";

interface OrdersTableProps{
    orders: Order[]
}


export function OrdersTable({orders}: OrdersTableProps) {
    return (
        <div className="bg-white rounded-b-4xl rounded-tl-4xl shadow-sm overflow-hidden border border-[#E5E1D8]">
            <table className="w-full text-left">
                <thead
                    className="bg-[#2D2823] text-[#A39E98] text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                        <th className="px-8 py-5">Order ID & Time</th>
                        <th className="px-8 py-5">Location</th>
                        <th className="px-8 py-5">Subtotal</th>
                        <th className="px-8 py-5">Tax Rate</th>
                        <th className="px-8 py-5">Tax Amount</th>
                        <th className="px-8 py-5">Total</th>
                        <th className="px-8 py-5">Info</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EB]">
                    {orders.map((order) => (
                        <tr key={order.id} className={`${order.status === 'processing' ? 'bg-[#FFF5F5]' : ''} hover:bg-gray-50 transition-colors`}>
                            <td className="px-8 py-5">
                                <div className="font-bold text-black">{order.id}</div>
                                <div className="text-[10px] text-[#A39E98] font-bold uppercase">{order.timestamp}</div>
                            </td>
                            <td className="px-8 py-5 text-[12px] font-bold text-[#A39E98]">
                                {order.status === 'processing' ? (
                                    <span
                                        className="text-[#FF4D4D] animate-pulse flex gap-1">

                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4">
                                            <path fill-rule="evenodd"
                                                d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                                                clip-rule="evenodd" />
                                        </svg>

                                        Locating Unit...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-4 text-[#FF4D4D]">
                                            <path fill-rule="evenodd"
                                                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        {order.latitude}, {order.longitude}</span>
                                )}
                            </td>
                            <td className="px-8 py-5 font-black text-black text-lg">${order.subtotal.toFixed(2)}</td>
                            <td className="px-8 py-5">
                                {order.status === 'processing' ? (
                                    <span
                                        className="bg-[#FF4D4D] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Processing</span>
                                ) : (
                                    <span className="bg-[#E7F7EF] text-[#27AE60] px-3 py-1 rounded-full text-[10px] font-bold italic">
                                        {(order.composite_tax_rate * 100).toFixed(3)}%
                                    </span>
                                )}
                            </td>
                            <td className="px-8 py-5 text-[#A39E98] font-bold">
                                {order.status === 'processing' ? '--' : `$${order.tax_amount.toFixed(2)}`}
                            </td>
                            <td className="px-8 py-5 font-black text-lg">
                                <span className={order.status === 'processing' ? 'text-[#A39E98]' : 'text-[#FF4D4D]'}>
                                    ${order.total_amount.toFixed(2)}{order.status === 'processing' && '*'}
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <button
                                    className="text-[#A39E98] hover:text-black transition-colors hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="currentColor"
                                        className="size-6">
                                        <path fill-rule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div
                className="p-6 border-t border-[#F5F2EB] flex justify-between items-center text-[#A39E98] font-bold text-[11px] uppercase tracking-widest">
                <div>Displaying 1-5 of 12,450 units</div>
                <div className="flex gap-2">
                    <button
                        className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50 hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="currentColor"
                            className="size-4">
                            <path fill-rule="evenodd"
                                d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                                clip-rule="evenodd" />
                        </svg>

                    </button>
                    <button
                        className="w-8 h-8 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-gray-50 hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="currentColor"
                            className="size-4">
                            <path fill-rule="evenodd"
                                d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                                clip-rule="evenodd" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    );
}



