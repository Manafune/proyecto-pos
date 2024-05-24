import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { ProductsPagination } from '@/routes/_authenticated/(products)/products';
import { Link, getRouteApi } from '@tanstack/react-router';
interface BasePagination {
	total: number;
}
const route = getRouteApi('/_authenticated/products');
export const BasePagination = ({ total }: BasePagination) => {
	const { pageSize, current } = route.useSearch();
	const numberPages = Math.ceil(total / pageSize);
	const prevPage = current - 1;
	const nextPage = current + 1;
	const isDisabledNextPage = prevPage >= 1;
	const isDisabledPrevPage = nextPage <= numberPages;
	const messageTitle = 'Fuera de Rango';
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Link
						disabled={isDisabledPrevPage}
						to='/products'
						className={cn('', { 'cursor-not-allowed': isDisabledPrevPage })}
						search={(prev) => {
							const data = prev as ProductsPagination;
							return { ...data, current: prevPage };
						}}
						{...(isDisabledPrevPage && { title: messageTitle })}
					>
						<PaginationPrevious />
					</Link>
				</PaginationItem>

				{Array(numberPages)
					.fill('')
					.map((_, id) => (
						<PaginationItem className='cursor-pointer' key={id}>
							<Link
								to='/products'
								search={(prev) => {
									const data = prev as ProductsPagination;
									return { ...data, current: id + 1 };
								}}
								disabled={id + 1 === current}
							>
								<PaginationLink>{id + 1}</PaginationLink>
							</Link>
						</PaginationItem>
					))}
				<PaginationItem>
					<Link
						disabled={isDisabledNextPage}
						to='/products'
						className={cn('', { 'cursor-not-allowed': isDisabledNextPage })}
						search={(prev) => {
							const data = prev as ProductsPagination;
							return { ...data, current: nextPage };
						}}
						{...(isDisabledNextPage && { title: messageTitle })}
					>
						<PaginationNext />
					</Link>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
