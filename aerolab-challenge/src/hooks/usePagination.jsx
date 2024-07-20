import { useState, useEffect } from 'react';

const usePagination = (data = [], itemsPerPage) => {
	if (itemsPerPage <= 0) {
        throw new Error('itemsPerPage must be greater than 0');
    }
    const [currentPage, setCurrentPage] = useState(1);
	// Calculate the maximum number of pages based on data length and items per page
    const maxPage = Math.ceil(data.length / itemsPerPage);

	// Effect to reset the current page to 1 whenever the data changes
    useEffect(() => {
        setCurrentPage(1); // Reset page to 1 when data changes
    }, [data]);

    function currentData() {
		// Calculate the start and end index of the slice
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function jumpToPage(page) {
		// Ensure the page number is within bounds
        const pageNumber = Math.max(1, page); 
        setCurrentPage(() => {
            const newPage = Math.min(pageNumber, maxPage);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
            return newPage;
        });
    }

    return {
        jumpToPage,
        currentData,
        currentPage,
        maxPage
    };
};

export default usePagination;
