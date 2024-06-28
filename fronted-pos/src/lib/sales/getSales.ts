import supabase from '@/lib/supabase';
import { Sale } from '@/types/sales';

export interface SaleData extends Omit<Sale, 'id'> {
	id: number;
}

export const getAllSales = async ({ current, pageSize }: { current: number; pageSize: number }) => {
    try {
        const pageCurrent = (current - 1) * pageSize;
        const offset = pageCurrent + pageSize - 1;
        const { data, error } = await supabase
            .from('sale')
            .select(`id, customer_id, sale_date, total, status, sale_details(*)`)
            .range(pageCurrent, offset);

        if (error) throw new Error(error.message);

        return data as SaleData[];
    } catch (error) {
        console.error('Error fetching sales:', error);
        return [];
    }
};