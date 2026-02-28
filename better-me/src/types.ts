export interface CreateOrderRequest{
    latitude: number;
    longitude: number;
    subtotal: number;
}
export interface TaxBreakdown {
    state_rate: number;
    county_rate: number;
    city_rate: number;
    special_rates: number;
}

export interface Order {
    id: string;
    timestamp: string;
    latitude: number;
    longitude: number;
    subtotal: number;
    composite_tax_rate: number;
    tax_amount: number;
    total_amount: number;
    status: 'completed' | 'processing';
    breakdown: TaxBreakdown;
    jurisdictions?: string[];
}

export interface ApiOrder {
    id: string;
    latitude: number;
    longitude: number;
    subtotal: string;
    compositeTaxRate: string;
    taxAmount: string;
    totalAmount: string;
    breakdown: {
        stateRate: string;
        countyRate: string;
        cityRate: string;
        specialRate: string;
    };
    jurisdiction: {
        state: string;
        county: string;
        city: string;
        special: string;
    };
    timestamp: string;
}

export interface ApiPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiResponse {
    orders: ApiOrder[];
    pagination: ApiPagination;
    globalTotal: {
        orders: number;
        tax: string;
        grand: string;
    };
}

