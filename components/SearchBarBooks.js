import { useState, useEffect } from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { gql, useQuery } from "@apollo/client";

const SEARCH_BOOKS_QUERY = gql`
  query Books($filter: String) {
    books(filter: $filter) {
        id
        title
        description
        published_date
        author {
            name
        }
    }
    }
`;

export default function SearchBarBooks({ onResults, allBooks }) {
  const [query, setQuery] = useState("");

  const { data, loading } = useQuery(SEARCH_BOOKS_QUERY, {
    variables: { filter: query },
    skip: query.length < 2,
  });

  useEffect(() => {
    if (query.length < 2) {
      onResults(allBooks); 
    } else if (data) {
      onResults(data.books);
    }
  }, [data, query, allBooks, onResults]);

  return (
    <TextField
      label="Search Books"
      variant="outlined"
      fullWidth
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: loading ? <CircularProgress size={20} /> : null,
      }}
    />
  );
}
