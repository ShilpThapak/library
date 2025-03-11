import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ResponsiveGrid from "./ResponsiveGrid";
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
    const [searchQuery, setSearchQuery] = useState(""); // Store search term
    const [searchResults, setSearchResults] = useState([]);

    const { data, loading, error, refetch } = useQuery(QUERY, {
        variables: { limit: ITEMS_PER_PAGE, offset: 0, filter: searchQuery },
    });

    useEffect(() => {
        if (data) {
            setSearchResults(data.books.books);
        }
    }, [data]);

    const handlePageChange = (event, value) => {
        setPage(value);
        refetch({ limit: ITEMS_PER_PAGE, offset: (value - 1) * ITEMS_PER_PAGE, filter: searchQuery });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setPage(1); // Reset to first page when searching
        refetch({ limit: ITEMS_PER_PAGE, offset: 0, filter: query });
    };

    const searchBarComponent = useMemo(() => {
        return <SearchBar value={searchQuery} onSearch={handleSearch} />;
    }, [searchQuery, handleSearch]);

    // if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error loading books</h2>;


    return (
        <>
            {/* <SearchBar value={searchQuery} onSearch={handleSearch} /> */}
            {searchBarComponent}
            <br></br>
            <br></br>
            {loading? <></>:<>
                <div className={styles.grid}>
                    <ResponsiveGrid gridArray={searchResults} itemType="book" />
                </div>

                <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
                    <Pagination
                        count={Math.ceil(data.books.totalCount / ITEMS_PER_PAGE)}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Stack>
            </>}
            
        </>

    );
}