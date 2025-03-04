import React, { useState } from "react";

interface PaginationProps {
  totalFeedbacks: number;
  feedbacksPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const FeedbackPagination: React.FC<PaginationProps> = ({
  totalFeedbacks,
  feedbacksPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const [pageRange, setPageRange] = useState<[number, number]>([1, 3]); // Tracks the current visible range of pages

  const totalPages = Math.ceil(totalFeedbacks / feedbacksPerPage); // Total number of pages
  const startPage = pageRange[0]; // Starting page number in the range
  const endPage = pageRange[1]; // Ending page number in the range

  // Generate the page buttons for the current range
  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Handle "next" button click
  const nextPage = () => {
    if (endPage < totalPages) {
      setPageRange([startPage + 1, endPage + 1]);
    }
  };

  // Handle "prev" button click
  const prevPage = () => {
    if (startPage > 1) {
      setPageRange([startPage - 1, endPage - 1]);
    }
  };

  return (
    <div className="flex gap-5 w-fit">
      <button onClick={prevPage} disabled={startPage === 1}>
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${page === currentPage ? "active" : ""} p-1`}
          
        >
          {page}
        </button>
      ))}
      <button onClick={nextPage} disabled={endPage >= totalPages}>
        {" >"}
      </button>
    </div>
  );
};

export default FeedbackPagination;