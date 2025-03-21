import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import BasicModal from "@/components/common/BasicModal"
import EditAuthorForm from "@/components/authors/EditAuthorForm"
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import useAuthorStore from "@/store/authorStore";

const DELETE_MUTATION_QUERY = gql`
    mutation DeleteAuthor($deleteAuthorId: ID!) {
  deleteAuthor(id: $deleteAuthorId)
}`

export default function SingleAuthorDescription({authorInfo}) {
    const router = useRouter()
    const { deleteAuthorFromCache } = useAuthorStore()
    const [deleteAuthor, 
                { data: deleteAuthorData, loading: deleteAuthorLoading, error: deleteAuthorError }
            ] = useMutation(DELETE_MUTATION_QUERY, {onCompleted: () => {
                deleteAuthorFromCache(authorInfo.id);
                router.push("/authors")
            }});
    
    function deleteAuthorHandler(e){
        e.preventDefault();
        deleteAuthor({
            variables: {"deleteAuthorId": authorInfo.id}
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
          image="https://platform.polygon.com/wp-content/uploads/sites/2/2024/09/04-037.wizard-leomund.png" // Replace with actual book image URL
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
            {authorInfo.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {authorInfo.born_date}
          </Typography>
          <Typography variant="body1" paragraph>
            {authorInfo.biography}
          </Typography>
          {/* <BasicModal btnName={"Edit/Delete Author"} innerContent={<EditBookForm />}/> */}

            <Box display="flex" gap={2} mt={2}>
                <BasicModal btnName={"Edit Author"} innerContent={<EditAuthorForm authorInfo={authorInfo}/>} />
                <Button variant="contained" color="error" onClick={deleteAuthorHandler}>
                    Delete Author
                </Button>
            </Box>

        </CardContent>
      </Box>
    </Card>
  );
}
