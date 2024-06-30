import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { type ClientsPagination } from '@/routes/_authenticated/(clients)/clients';
import { Link, getRouteApi } from '@tanstack/react-router';
interface BasePagination {
	total: number;
}
const route = getRouteApi('/_authenticated/clients');
export const ClientPagination = ({ total }: BasePagination) => {
	const { pageSize, current } = route.useSearch();
	const { prevPage, nextPage, totalPages } = {
		prevPage: current - 1,
		nextPage: current + 1,
		totalPages: Math.ceil(total / pageSize)
	};

	const isDisabledPrevPage = prevPage < 1;
	const isDisabledNextPage = nextPage > totalPages;
	const messageTitle = 'Fuera de Rango';
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Link
						disabled={isDisabledPrevPage}
						to='/clients'
						className={cn('', { 'cursor-not-allowed': isDisabledPrevPage })}
						search={(prev) => {
							const data = prev as ClientsPagination;
							return { ...data, current: prevPage };
						}}
						{...(isDisabledPrevPage && { title: messageTitle })}
					>
						<PaginationPrevious />
					</Link>
				</PaginationItem>

				{Array(totalPages)
					.fill('')
					.map((_, id) => (
						<PaginationItem className='cursor-pointer  rounded-md' key={id}>
							<Link
								to='/clients'
								search={(prev) => {
									const data = prev as ClientsPagination;
									return { ...data, current: id + 1 };
								}}
								disabled={id + 1 === current}
							>
								<PaginationLink className='bg-gray-200 hover:bg-gray-300/65'>{id + 1}</PaginationLink>
							</Link>
						</PaginationItem>
					))}
				<PaginationItem>
					<Link
						disabled={isDisabledNextPage}
						to='/clients'
						className={cn('', { 'cursor-not-allowed': isDisabledNextPage })}
						search={(prev) => {
							const data = prev as ClientsPagination;
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
