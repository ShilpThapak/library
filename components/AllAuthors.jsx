import { useQuery, gql } from "@apollo/client";
import { useEffect, useState, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "../styles/Home.module.css";
import ResponsiveGrid from "./ResponsiveGrid";
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
    const [searchResults, setSearchResults] = useState([]);

    const { data, loading, error, refetch } = useQuery(QUERY, {
        variables: { limit: ITEMS_PER_PAGE, offset: 0, filter: searchQuery },
    });

    useEffect(() => {
        if (data) {
            setSearchResults(data.authors.authors);
        }
    }, [data]);

    const handlePageChange = (event, value) => {
        setPage(value);
        refetch({ limit: ITEMS_PER_PAGE, offset: (value - 1) * ITEMS_PER_PAGE, filter: searchQuery });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setPage(1);
        refetch({ limit: ITEMS_PER_PAGE, offset: 0, filter: query });
    };

    const searchBarComponent = useMemo(() => {
        return <SearchBar value={searchQuery} onSearch={handleSearch} />;
    }, [searchQuery, handleSearch]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error loading authors</h2>;

    return (
        <>
            {searchBarComponent}
            <br />
            <br />
            <div className={styles.grid}>
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
    );
}
