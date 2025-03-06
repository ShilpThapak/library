import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ResponsiveGridBooks from "./ResponsiveGrid";

const QUERY = gql`
  query Authors {
    authors {
        id
        name
        biography
    }
}
`;

export default function AllAuthors() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

//   const books = data.books;

  return (
    <div className={styles.grid}>
      <ResponsiveGridBooks gridArray={data.authors}/>
    </div>
  );
}