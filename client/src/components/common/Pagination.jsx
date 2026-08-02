function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-between items-center mt-6">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-600"
      >
        Previous
      </button>

      <span className="text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-600"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;