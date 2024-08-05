import supabase from '@/lib/supabase';
import { ResponseProduct } from '@/types/products';
export interface SaleMonth {
	month: string;
	sales_count: number;
}
export const getRangeSales = async (year: number) => {
	const result = await supabase.rpc('get_monthly_sales', {
		year
	});
	if (result.error) throw new Error(result.error.message);
	const data: SaleMonth[] = result.data;
	return data;
};
export const getStockProducts = async (limitproducts: number) => {
	const response = await supabase.rpc('get_stock_product', {
		limitproducts
	});
	if (response.error) throw new Error(response.error.message);
	const data: Omit<ResponseProduct, 'id' | 'created_at' | 'status'>[] = response.data;
	return data;
};
