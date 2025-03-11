import { useQuery, gql } from "@apollo/client";
import ResponsiveGrid from "../layout/ResponsiveGrid";
import BasicBreadcrumbs from "@/components/layout/BasicBreadcrumbs";
import SingleBookDescription from "./SingleBookDescription";
import ReviewsList from "@/components/common/ReviewsList"

const QUERY = gql`
    query Book($bookId: ID!) {
        book(id: $bookId) {
            id
            title
            description
            author {
                id
                name
            }
        }
    }
`;

export default function SingleBookPage({ bookID }) {
    const { data, loading, error } = useQuery(QUERY, { variables: { "bookId": bookID } });

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return <>{error.message}</>;
    }

    const books = data.book;
    return (
        <div>
            <BasicBreadcrumbs parentPathName={"Books"} parentPath={"/books"} childPathName={data.book.title} />
            <br></br>
            <SingleBookDescription bookInfo={books} />
            <ReviewsList bookID={bookID} />
        </div>
    );
}