import type { Order, ApiOrder } from "./types";

export const mapApiOrderToOrder = (apiOrder: ApiOrder): Order => {
    const date = new Date(apiOrder.timestamp);
    const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return {
        id: apiOrder.id,
        timestamp: `${timeString} ${dateString}`.toUpperCase(),
        latitude: apiOrder.latitude,
        longitude: apiOrder.longitude,
        subtotal: parseFloat(apiOrder.subtotal),
        composite_tax_rate: parseFloat(apiOrder.compositeTaxRate),
        tax_amount: parseFloat(apiOrder.taxAmount),
        total_amount: parseFloat(apiOrder.totalAmount),
        status: 'completed',
        breakdown: {
            state_rate: parseFloat(apiOrder.breakdown.stateRate),
            county_rate: parseFloat(apiOrder.breakdown.countyRate),
            city_rate: parseFloat(apiOrder.breakdown.cityRate),
            special_rates: parseFloat(apiOrder.breakdown.specialRate)
        },
        jurisdictions: [
            apiOrder.jurisdiction.state,
            apiOrder.jurisdiction.county,
            apiOrder.jurisdiction.city,
            apiOrder.jurisdiction.special
        ].filter(Boolean)
    };
};

export const formatToApiTimestamp = (date: Date): string => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
