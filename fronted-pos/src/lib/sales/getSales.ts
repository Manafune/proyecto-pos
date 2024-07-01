import supabase from '@/lib/supabase';
import { type SaleData } from '@/types/sales';



export const getAllSales = async ({ current, pageSize }: { current: number; pageSize: number }) => {
    try {
        const pageCurrent = (current - 1) * pageSize;
        const offset = pageCurrent + pageSize - 1;
        const { data, error } = await supabase
            .from('sale')
            .select(`id,customer:customer_id(first_name),sale_date,total,status,detail_sales:sale_detail(products:product(name), quantity, price, subtotal)`)
            // .select(`id,products:product(name), quantity, price, subtotal,sales:sale(id,customer(first_name),sale_date,total,status)`)
            .range(pageCurrent, offset);
            if (error) throw new Error(error.message);
            console.log(data)

        return data as unknown as SaleData[];
    } catch (error) {
       throw new Error(`Error fetching sales:${error}`)
    }
};