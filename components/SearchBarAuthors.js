import { useState, useEffect } from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { gql, useQuery } from "@apollo/client";

const SEARCH_AUTHOR_QUERY = gql`
  query Authors($filter: String) {
    authors(filter: $filter) {
        id
        name
        biography
    }
}
`;

export default function SearchBarAuthors({ onResults, allAuthors }) {
  const [query, setQuery] = useState("");

  const { data, loading } = useQuery(SEARCH_AUTHOR_QUERY, {
    variables: { filter: query },
    skip: query.length < 2,
  });

  useEffect(() => {
    if (query.length < 2) {
      onResults(allAuthors); 
    } else if (data) {
      onResults(data.authors);
    }
  }, [data, query, allAuthors, onResults]);

  return (
    <TextField
      label="Search Authors"
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
