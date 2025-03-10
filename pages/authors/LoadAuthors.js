import { gql, useQuery } from '@apollo/client';
import useAuthorStore from '@/store/authorStore';

const GET_AUTHORS_QUERY = gql`
  query Authors {
    authors {
      authors {
        id
        name
      }
    }
  }
`;

const LoadAuthors = () => {
  const { setAuthors } = useAuthorStore();

  const { data, loading, error } = useQuery(GET_AUTHORS_QUERY, {
    onCompleted: (data) => {
      setAuthors(data.authors.authors); 
    },
  });

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return null; 
};

export default LoadAuthors;
