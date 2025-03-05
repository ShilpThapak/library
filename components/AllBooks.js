import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ResponsiveGrid from "./ResponsiveGrid";

const QUERY = gql`
  query Books {
    books{
      title
      description
      published_date
      author {
        name
      }
    }
  }
`;

export default function AllBooks() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const books = data.books;

  return (
    <div className={styles.grid}>
      <ResponsiveGrid gridArray={books}/>
    </div>
  );
}