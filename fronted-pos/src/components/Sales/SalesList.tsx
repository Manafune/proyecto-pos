import { cn } from '@/lib/utils';
import { ProductsSelectionType } from './SalesAdd';
import { useSalesStore } from '@/hooks/useSales';

export const SalesList = ({ productsSelection }: { productsSelection: ProductsSelectionType[] }) => {
	const { onAddProductTotal } = useSalesStore();

	return (
		productsSelection.length >= 1 && (
			<ul className='p-1 [margin-block:0.75rem] h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] grid gap-1'>
				{productsSelection.map((selection) => (
					<li
						key={selection.name}
						className={cn(
							'relative flex cursor-default select-none items-center rounded-sm  text-sm outline-none transition-colors border-2 ring-offset-background focus:bg-accent-foreground hover:cursor-pointer hover:text-accent-foreground focus:text-accent-foreground',
							{ 'ring-offset-red-700  bg-red-200': selection.selected === true }
						)}
						onClick={() => onAddProductTotal({ id: selection.id })}
					>
						<button
							className='size-full [padding-inline:1em] [padding-block:0.5em] disabled:cursor-not-allowed'
							disabled={selection.selected === true}
						>
							{selection.name}
						</button>
					</li>
				))}
			</ul>
		)
	);
};
