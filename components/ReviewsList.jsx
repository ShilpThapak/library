import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Box, Rating } from "@mui/material";

const ReviewsList = ({ bookID }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/reviews/${bookID}`);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [bookID]);

    return (
        <Card
            sx={{
                maxWidth: "90vw",
                width: "100%",
                margin: "auto",
                padding: 3,
                overflow: "hidden",
                mt: 4
            }}
        >
            <Typography variant="h5" sx={{ mb: 2 }}>
                Customer Reviews
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                {reviews.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        No reviews yet.
                    </Typography>
                ) : (
                    reviews.map((review) => (
                        <Card key={review.id} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
                            <Box display="grid" gridTemplateColumns="50px 1fr" gap={2} alignItems="center">
                                <Avatar>{review.user.charAt(0)}</Avatar>
                                <Box>
                                    <Typography variant="subtitle1">{review.user}</Typography>
                                    <Rating value={review.rating} readOnly precision={0.5} />
                                    <Typography variant="body2" sx={{ mt: 1 }}>{review.comment}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    ))
                )}
            </Box>
        </Card>
    );
};

export default ReviewsList;
