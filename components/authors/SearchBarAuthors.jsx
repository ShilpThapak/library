import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBarAuthors({ value, onSearch }) {
    return (
        <TextField
            label="Search Authors"
            variant="outlined"
            fullWidth
            value={value}
            autoFocus // ✅ Ensures the blinking cursor remains in the input field
            onChange={(e) => onSearch(e.target.value)}
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
