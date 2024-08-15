// components/Pagination/usePagination.ts
import { useState } from 'react';

interface UsePaginationProps {
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
}

export const usePagination = ({ totalCount, pageSize, siblingCount = 1 }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const paginationRange = () => {
        const totalPageNumbers = siblingCount + 5;
        const pages: number[] = [];

        if (totalPageNumbers >= totalPageCount) {
            return Array.from({ length: totalPageCount }, (_, i) => i + 1);
        }

        // Calculate range
        // Add "..." where necessary
        // Logic to generate pagination array goes here...

        return pages;
    };

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPageCount));
    };

    const previousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return { currentPage, totalPageCount, paginationRange: paginationRange(), nextPage, previousPage, goToPage };
};
