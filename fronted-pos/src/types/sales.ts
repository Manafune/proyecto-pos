export const enum SaleStatus {
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}
export interface SaleDetail {
    id: number;
    sale_id: number;
    product_id: number;
    quantity: number;
    price: number;
    subtotal: number;
}


export interface Sale {
    id: number;
    customer_id: number;
    sale_date: Date;
    total: number;
    status: SaleStatus; 
    sale_details: SaleDetail[];
}