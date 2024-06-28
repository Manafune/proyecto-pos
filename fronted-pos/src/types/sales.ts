export const enum SaleStatus {
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}
export interface DetailSales {
  id: number
  quantity: number
  price: number
  subtotal: number
  products: Products
  details_sales: SaleData
}

export interface Products {
  id: number
  name: string
}

export interface SaleData {
  id: number
  total: number
  status: string
  customer: Customer
  sale_date: string
}

export interface Customer {
  first_name: string
}
