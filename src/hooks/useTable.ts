import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../types/table";

const useTable = () => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const itemsPerPage = 5;
  const visiblePageRange = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Fetch data from API
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result: Product[] = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get paginated data
  const paginatedData = useMemo(
    () =>
      data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [data, currentPage, itemsPerPage]
  );

  // Calculate visible pages for pagination
  const getVisiblePages = useCallback(() => {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(visiblePageRange / 2)
    );
    const endPage = Math.min(totalPages, startPage + visiblePageRange - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages, visiblePageRange]);

  return {
    paginatedData,
    currentPage,
    totalPages,
    getVisiblePages,
    setCurrentPage,
    loading,
  };
};

export default useTable;
