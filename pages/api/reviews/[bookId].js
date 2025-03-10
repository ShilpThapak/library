import { connectToDatabase } from "@/utils/mongodb";
import Review from "@/models/reviews";

export default async function handler(req, res) {
    await connectToDatabase();

    const { bookId } = req.query;

    if (req.method === "GET") {
        try {
            const reviews = await Review.find({ bookId });
            return res.status(200).json(reviews);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch reviews" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
