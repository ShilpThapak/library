import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ResponsiveGrid from "./ResponsiveGrid";

const QUERY = gql`
    query Book($bookId: ID!) {
        book(id: $bookId) {
            id
            title
        }
    }
`;

export default function SingleBookPage({bookID}) {
    console.log(bookID, typeof(bookID))
  const { data, loading, error } = useQuery(QUERY, {variables: {"bookId": bookID}});

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <>{error.message}</>;
  }

  const books = data.books;

  return (
    <div className={styles.grid}>
      {/* <ResponsiveGrid gridArray={books} itemType="book"/> */}
      {data.book.id}
      {data? data.book.title: ""}
    </div>
  );
}