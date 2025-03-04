import Book from '@/models/book'
import Author from '@/models/author'

export const resolvers = {
    Query: {
      books: async () => {
        return await Book.findAll();
      },
      authors: async () => {
        return await Author.findAll();
      },
      book: async (_, args) => {
        return await Book.findByPk(args.id);
      },
      author: async (_, args) => {
        return await Author.findByPk(args.id);
      }
    },
    Book: {
      author: async (parent) => {
        return await Author.findByPk(parent.author_id); 
      },
    },
    Author: {
      books: async (parent) => {
        return await Book.findAll(
          {where: {author_id: parent.id}}
        )
      }
    },
    Mutation: {
      addBook: async (_, args) => {
        let book = {
          ...args.book,
        }
        const newBook = await Book.create(book);
        return Book.findByPk(newBook.id);
      },
      deleteBook: async(_, arg) => {
        await Book.destroy({where: {id: arg.id}})
        return "Deleted Book ID:" + arg.id
      },
      editBook: async(_, args) => {
        let book = await Book.findByPk(args.id)
        await book.update(args.edits)
        return await book.save()
      }
    }
  };
