import { Product } from "../types/table";
import useTable from "../hooks/useTable";
import "./table.css";

const Table = () => {
  const {
    paginatedData,
    currentPage,
    totalPages,
    getVisiblePages,
    setCurrentPage,
    loading,
  } = useTable();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h1 className="title">Paginated Data Table</h1>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage funded</th>
              <th>Amount pledged</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: Product, index: number) => (
              <tr key={index}>
                <td>{item["s.no"]}</td>
                <td>{item["percentage.funded"]}</td>
                <td>{item["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="no-data">No data available</div>
        )}
      </div>
      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <div className="pagination" role="navigation">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>

        {getVisiblePages().map((page: number) => (
          <button
            key={page}
            className={`pagination-button ${
              page === currentPage ? "active" : ""
            }`}
            onClick={() => setCurrentPage(page)}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
