export const typeDefs = `#graphql
    type Book {
    id: ID!
    title: String!
    description: String!
    published_date: String!
    author_id: Int!
    createdAt: String!
    updatedAt: String!
    author: Author!
    }

    type Author {
    id: ID!
    name: String!
    biography: String!
    createdAt: String!
    updatedAt: String!
    books: [Book!]
    }

    type Query {
    books: [Book]
    authors: [Author]
    book (id: ID!): Book
    author (id: ID!): Author
    }

    type Mutation {
    addBook(book: AddBookInput!): Book
    deleteBook(id: ID!): String
    editBook(id: ID!, edits: EditBookInput): Book
    }

    input AddBookInput {
    title: String!
    description: String!
    published_date: String!
    author_id: Int!
    }

    input EditBookInput {
    title: String
    description: String
    published_date: String
    author_id: Int
    }
`;
