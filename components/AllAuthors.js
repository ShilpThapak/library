import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ResponsiveGridBooks from "./ResponsiveGrid";
import SearchBar from "./SearchBarAuthors";
import { useEffect, useState } from "react";

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
  const [searchResult, setSearchResults] = useState()

  useEffect(() => {
    if (data) {
      setSearchResults(data.authors);
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
    <div className={styles.grid}>
      <SearchBar onResults={setSearchResults} allAuthors={data.authors}/>
      <br></br>
      <br></br>
      <ResponsiveGridBooks gridArray={searchResult}/>
    </div>
  );
}