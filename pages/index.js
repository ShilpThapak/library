import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function Home() {
    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Library
            </Typography>
            <Typography variant="h6" gutterBottom>
                Explore our collection of books and authors.
            </Typography>
            <Box mt={3}>
                <Link href="/books" passHref>
                    <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
                        Browse Books
                    </Button>
                </Link>
                <Link href="/authors" passHref>
                    <Button variant="contained" color="secondary">
                        View Authors
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
