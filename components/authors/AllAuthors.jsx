import { useQuery, gql } from "@apollo/client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ResponsiveGrid from "../layout/ResponsiveGrid";
import SearchBar from "./SearchBarAuthors";

const QUERY = gql`
  query Authors($offset: Int, $limit: Int, $filter: String) {
    authors(offset: $offset, limit: $limit, filter: $filter) {
      authors {
        id
        name
        biography
      }
      totalCount
    }
  }
`;

const ITEMS_PER_PAGE = 8;

export default function AllAuthors() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(""); // ✅ Debounced version of searchQuery
    const [searchResults, setSearchResults] = useState([]);

    const { data, loading, error, refetch } = useQuery(QUERY, {
        variables: { limit: ITEMS_PER_PAGE, offset: (page - 1) * ITEMS_PER_PAGE, filter: debouncedQuery },
    });

    useEffect(() => {
        if (data) {
            setSearchResults(data.authors.authors);
        }
    }, [data]);

    // ✅ Debounce Effect: Updates `debouncedQuery` after 500ms delay
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setPage(1); // Reset page when new search starts
            refetch({ limit: ITEMS_PER_PAGE, offset: 0, filter: searchQuery });
        }, 500); // 500ms delay

        return () => clearTimeout(handler); // Cleanup timeout on unmount or new input
    }, [searchQuery, refetch]);

    const handlePageChange = (event, value) => {
        setPage(value);
        refetch({ limit: ITEMS_PER_PAGE, offset: (value - 1) * ITEMS_PER_PAGE, filter: debouncedQuery });
    };

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    const searchBarComponent = useMemo(() => {
        return <SearchBar value={searchQuery} onSearch={handleSearch} />;
    }, [searchQuery, handleSearch]);

    if (error) return <h2>Error loading authors</h2>;

    return (
        <>
            {searchBarComponent}
            <br />
            <br />
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <div>
                        <ResponsiveGrid gridArray={searchResults} itemType="author" />
                    </div>
                    <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
                        <Pagination
                            count={Math.ceil(data.authors.totalCount / ITEMS_PER_PAGE)}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </>
            )}
        </>
    );
}
