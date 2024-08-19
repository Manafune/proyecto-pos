import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

interface BasePaginationProps<Params> {
	total: number;
	currentPage: number;
	pageSize: number;
	routePath: string;
	messageTitle?: string;
	toSearchParams: (prev: Params, newPage: number) => Params;
}

export const BasePagination = <Params,>({
	total,
	currentPage,
	pageSize,
	routePath,
	messageTitle = 'Fuera de Rango',
	toSearchParams
}: BasePaginationProps<Params>) => {
	const totalPages = Math.ceil(total / pageSize);
	const prevPage = currentPage - 1;
	const nextPage = currentPage + 1;

	const isDisabledPrevPage = prevPage < 1;
	const isDisabledNextPage = nextPage > totalPages;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Link
						disabled={isDisabledPrevPage}
						to={routePath}
						className={cn('', { 'cursor-not-allowed': isDisabledPrevPage })}
						search={(prev) => toSearchParams(prev as Params, prevPage)}
						{...(isDisabledPrevPage && { title: messageTitle })}
					>
						<PaginationPrevious />
					</Link>
				</PaginationItem>

				{Array(totalPages)
					.fill('')
					.map((_, id) => (
						<PaginationItem className='cursor-pointer rounded-md' key={id}>
							<Link to={routePath} search={(prev) => toSearchParams(prev as Params, id + 1)} disabled={id + 1 === currentPage}>
								<PaginationLink className='bg-gray-200 hover:bg-gray-300/65'>{id + 1}</PaginationLink>
							</Link>
						</PaginationItem>
					))}
				<PaginationItem>
					<Link
						disabled={isDisabledNextPage}
						to={routePath}
						className={cn('', { 'cursor-not-allowed': isDisabledNextPage })}
						search={(prev) => toSearchParams(prev as Params, nextPage)}
						{...(isDisabledNextPage && { title: messageTitle })}
					>
						<PaginationNext />
					</Link>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
