import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ResponsiveGrid from "./ResponsiveGrid";
import SearchBar from "./SearchBarBooks";
import { useEffect, useState } from "react";

const QUERY = gql`
  query Books {
    books{
      id
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
  const [searchResult, setSearchResults] = useState()

  useEffect(() => {
    if (data) {
      setSearchResults(data.books);
    }
  }, [data]);
  

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  

  return (
    <>
      <SearchBar onResults={setSearchResults} allBooks={data.books}/>
      <br></br>
      <br></br>
      <div className={styles.grid}>
        <ResponsiveGrid gridArray={searchResult} itemType="book"/>
      </div>
    </>
    
  );
}