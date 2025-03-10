import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useEffect } from "react";

export default function SearchBarBooks({ value, onSearch }) {
    const inputRef = useRef(null);

    // useEffect(() => {
    //   if (inputRef.current) {
    //     inputRef.current.focus();
    //   }
    // }, [value]);

    const handleSearch = (e) => {
        const query = e.target.value;
        onSearch(query);
    };

    return (
        <TextField
            label="Search Books"
            variant="outlined"
            fullWidth
            value={value}
            autoFocus
            onChange={handleSearch}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}
