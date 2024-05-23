import { StockStepsProducts } from '@/components/Products/Stock/StockStepsProducts';
import { SelectedAddProduct } from '@/components/Products/add/SelectedAddProduct';
import { CardAddProduct } from '@/components/Card/CardAddProduct';
import { ProductsAddStore } from '@/components/store/ProductsAddStore';

export const ProductsAdd = () => {
	return (
		<ProductsAddStore>
			<div className='grid max-w-screen-xl flex-1 auto-rows-max gap-4'>
				<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-6'>
					<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6'>
						<SelectedAddProduct />
						<CardAddProduct />
					</div>
					<StockStepsProducts />
				</div>
			</div>
		</ProductsAddStore>
	);
};
