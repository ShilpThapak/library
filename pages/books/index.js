import ClientOnly from "@/components/common/ClientOnly";
import AllBooks from "@/components/books/AllBooks";
import { Stack, Typography } from "@mui/material";
import BasicModal from "@/components/common/BasicModal";
import CreateBookForm from "@/components/books/CreateBookForm"
import LoadAuthors from "@/pages/authors/LoadAuthors";
import useAuthorStore from "@/store/authorStore";

export default function Books() {
    const { authors } = useAuthorStore();
    return (
        <>
            
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h3" >
                    Books
                </Typography>
                <BasicModal btnName="Add Book" innerContent={<CreateBookForm />} />
            </Stack>

            <br></br>
            <ClientOnly>
                <AllBooks />
            </ClientOnly>
            {authors.length == 0? <LoadAuthors />:<></>}

        </>
    );
}
