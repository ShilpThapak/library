import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers"
import sequelize from "@/models/db";
import Book from "@/models/book"
import Author from "@/models/author"


// Author.hasMany(Book, 
//     { 
//         foreignKey: 'author_id',
//         onDelete: 'CASCADE',  
//         onUpdate: 'CASCADE'
//      }
// );
// Book.belongsTo(Author, 
//     { 
//         foreignKey: 'author_id',
//         onDelete: 'CASCADE',  
//         onUpdate: 'CASCADE'
//     }
// );

// await sequelize.sync({ force: true });

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Export the handler
export default startServerAndCreateNextHandler(server);
