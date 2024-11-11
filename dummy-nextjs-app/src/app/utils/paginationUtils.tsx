export const handleNextPage = (page: number, totalImages: number, imagesPerPage: number, setPage: (page: number) => void) => {
    if (page < Math.ceil(totalImages / imagesPerPage)) {
        setPage(page + 1);
    }
};

export const handlePreviousPage = (page: number, setPage: (page: number) => void) => {
    if (page > 1) {
        setPage(page - 1);
    }
};