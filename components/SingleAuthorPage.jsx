import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import ResponsiveGrid from "./ResponsiveGrid";
import BasicBreadcrumbs from "@/components/BasicBreadcrumbs";
import SingleAuthorDescription from "./SingleAuthorDescription";

const QUERY = gql`
    query Author($authorId: ID!) {
      author(id: $authorId) {
        id
        name
        biography
        born_date
      }
    }
`;

export default function SingleAuthorPage({ authorId }) {
    const { data, loading, error } = useQuery(QUERY, { variables: { "authorId": authorId } });

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return <>{error.message}</>;
    }

    return (
        <div className={styles.grid}>
            <BasicBreadcrumbs parentPathName={"Authors"} parentPath={"/authors"} childPathName={data.author.name} />
            <br></br>
            <SingleAuthorDescription authorInfo={data.author} />
        </div>
    );
}