import ClientOnly from "@/components/ClientOnly";
import BooksGrid from "@/components/AllBooks";
import { Button, Stack, Typography } from "@mui/material";
// import Button from "@mui/material";
import BasicModal from "@/components/BasicModal";
import CreateBookForm from "@/components/CreateBookForm"

export default function Books() {
  return (
    <div style={{padding: "25px"}}>
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
            <BasicModal btnName="Add Book" innerContent={<CreateBookForm />}/>
        </Stack>

        <br></br>

        <ClientOnly>
            <BooksGrid />
        </ClientOnly>
      
     </div>
  );
}
