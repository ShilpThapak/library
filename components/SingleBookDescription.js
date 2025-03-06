import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import BasicModal from "@/components/BasicModal"
import EditBookForm from "@/components/EditBookForm"
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const DELETE_MUTATION_QUERY = gql`
    mutation DeleteBook($deleteBookId: ID!) {
    deleteBook(id: $deleteBookId)
}`

export default function SingleBookDescription({bookInfo}) {
    const router = useRouter()
    const [deleteBook, 
            { data: deleteBookData, loading: deleteBookLoading, error: deleteBookError }
        ] = useMutation(DELETE_MUTATION_QUERY, {onCompleted: () => {router.push("/books")}});

    function deleteBookHandler(e){
        e.preventDefault();
        deleteBook({
            variables: {"deleteBookId": bookInfo.id}
        })
    }
  return (
    <Card 
      sx={{ 
        maxWidth: "90vw", // Makes it occupy more width 
        width: "100%", // Ensures full width within parent
        margin: "auto", // Centers the card
        padding: 3, 
        overflow: "hidden" 
      }}
    >
      <Box 
        display="grid" 
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} 
        gap={3} 
        alignItems="center"
      >
        {/* Book Image */}
        <CardMedia
          component="img"
          image="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781683834588/harry-potter-hogwarts-school-of-witchcraft-and-wizardry-tiny-book-9781683834588_hr.jpg" // Replace with actual book image URL
          alt="Book Cover"
          sx={{ 
            width: "100%", 
            height: "auto", 
            maxHeight: 400, // Increased height for better visibility
            objectFit: "cover", 
            borderRadius: 2 
          }}
        />

        {/* Book Details */}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {bookInfo.title}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {bookInfo.author.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {bookInfo.description}
          </Typography>
          {/* <BasicModal btnName={"Edit Book"} innerContent={<EditBookForm />}/> */}
          <Box display="flex" gap={2} mt={2}>
            <BasicModal btnName={"Edit Book"} innerContent={<EditBookForm />} />
            <Button variant="contained" color="error" onClick={deleteBookHandler}>
              Delete Book
            </Button>
          </Box>

        </CardContent>
      </Box>
    </Card>
  );
}
