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