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
    born_date: String!
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

    addAuthor(author: AddAuthorInput!): Author
    deleteAuthor(id: ID!): String
    editAuthor(id: ID!, edits: EditAuthorInput): Author
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

    input AddAuthorInput {
    name: String!
    biography: String!
    born_date: String!
    }

    input EditAuthorInput {
    name: String!
    biography: String!
    born_date: String!
    }
`;
