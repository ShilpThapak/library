import { useQuery, gql } from "@apollo/client";
import ResponsiveGrid from "../layout/ResponsiveGrid";
// import SearchBar from "../SearchBarBooks";
import SearchBar from "./SearchBarBooks";
import { useEffect, useState, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const QUERY = gql`
  query Books($offset: Int, $limit: Int, $filter: String) {
    books(offset: $offset, limit: $limit, filter: $filter) {
      books {
        id
        title
        description
        published_date
        author {
          name
        }
      }
      totalCount
    }
  }
`;

const ITEMS_PER_PAGE = 8;

export default function AllBooks() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // Raw search input
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Delayed query for fetching
    const [searchResults, setSearchResults] = useState([]);

    const { data, loading, error, refetch } = useQuery(QUERY, {
        variables: { limit: ITEMS_PER_PAGE, offset: (page - 1) * ITEMS_PER_PAGE, filter: debouncedQuery },
    });

    useEffect(() => {
        if (data) {
            setSearchResults(data.books.books);
        }
    }, [data]);

    // ✅ Debounce Effect: Updates `debouncedQuery` after 500ms delay
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setPage(1); // Reset page when new search starts
            refetch({ limit: ITEMS_PER_PAGE, offset: 0, filter: searchQuery });
        }, 500); // 500ms delay

        return () => clearTimeout(handler); // Cleanup timeout on new input
    }, [searchQuery, refetch]);

    const handlePageChange = (event, value) => {
        setPage(value);
        refetch({ limit: ITEMS_PER_PAGE, offset: (value - 1) * ITEMS_PER_PAGE, filter: debouncedQuery });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const searchBarComponent = useMemo(() => {
        return <SearchBar value={searchQuery} onSearch={handleSearch} />;
    }, [searchQuery]);

    if (error) return <h2>Error loading books</h2>;

    return (
        <>
            {searchBarComponent}
            <br />
            <br />
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <div >
                        <ResponsiveGrid gridArray={searchResults} itemType="book" />
                    </div>
                    <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
                        <Pagination
                            count={Math.ceil(data.books.totalCount / ITEMS_PER_PAGE)}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </>
            )}
        </>
    );
}
