import supabase from '@/lib/supabase';
import { type SaleData } from '@/types/sales';

interface SalesParams {
  current: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
}

export const getAllSales = async ({ current, pageSize, startDate, endDate }: SalesParams) => {
  try {
    const pageCurrent = (current - 1) * pageSize;
    const offset = pageCurrent + pageSize - 1;

    let query = supabase
      .from('sale')
      .select(
        `id,customer:customer_id(first_name,last_name),sale_date,total,status,detail_sale:sale_detail(products:product(id,name,stock), quantity, price, subtotal)`
      )
      .order('sale_date', { ascending: false })
      .range(pageCurrent, offset);

    if (startDate) {
      query = query.gte('sale_date', startDate);
    }
    if (endDate) {
      query = query.lte('sale_date', endDate);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return data as unknown as SaleData[];
  } catch (error) {
    throw new Error(`Error fetching sales: ${error}`);
  }
};

export const getCountSales = async () => {
  const { data } = await supabase.rpc('total_sales');
  return data;
};

export const getSaleById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('sale')
      .select(
        `id,customer:customer_id(first_name,last_name),sale_date,total,status,detail_sale:sale_detail(products:product(id,name,stock), quantity, price, subtotal)`
      )
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);

    return data as unknown as SaleData;
  } catch (error) {
    throw new Error(`Error fetching sale by ID: ${error}`);
  }
};
