import supabase from '@/lib/supabase';

export const getAllProducts = async () => {
    const { data: product, error } = await supabase
  .from('product')
  .select('*')
  return product;
}



