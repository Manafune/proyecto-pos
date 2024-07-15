import supabase from '../supabase';
interface InsertSaleAndDetailsTypes {
	sale: { id_customer: number; total: number };
	saleDetails: { product_id: number; quantity: number; price: number }[];
}
export const insertSaleAndDetails = async ({ sale, saleDetails }: InsertSaleAndDetailsTypes) => {
	try {
		const { data: dataSale, error: saleError } = await supabase
			.from('sale')
			.insert([{ customer_id: sale.id_customer, total: sale.total }])
			.select('id');

		if (saleError) throw saleError;
		const result: { id: number } = dataSale[0];
		const salesToSave = saleDetails.map((datailsSale) => ({ ...datailsSale, sale_id: result.id }));
		const { error } = await supabase.from('sale_detail').insert(salesToSave);
		if (error) throw saleError;
		return true;
	} catch (error) {
		console.error('Error inserting and selecting from "sale" table:');
		return null;
	}
};
