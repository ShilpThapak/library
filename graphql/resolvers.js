import Book from '@/models/book'
import Author from '@/models/author'
import { Op } from '@sequelize/core';

export const resolvers = {
  Query: {
    books: async (_, args) => {
      const where = {};

      if (args.filter) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${args.filter}%` } },
          { description: { [Op.iLike]: `%${args.filter}%` } },
        ];
      }

      const { count, rows } = await Book.findAndCountAll({
        where,
        limit: args.limit,
        offset: args.offset
      });
      return { books: rows, totalCount: count };
    },
    authors: async (_, args) => {
      const where = {};

      if (args.filter) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${args.filter}%` } },
          { biography: { [Op.iLike]: `%${args.filter}%` } },
        ];
      }
      const { count, rows } = await Author.findAndCountAll({
        where,
        limit: args.limit,
        offset: args.offset
      });
      return { authors: rows, totalCount: count };
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
        { where: { author_id: parent.id } }
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
    deleteBook: async (_, arg) => {
      await Book.destroy({ where: { id: arg.id } })
      return "Deleted Book ID:" + arg.id
    },
    editBook: async (_, args) => {
      let book = await Book.findByPk(args.id)
      await book.update(args.edits)
      return await book.save()
    },
    addAuthor: async (_, args) => {
      let author = {
        ...args.author,
      }
      const newAuthor = await Author.create(author);
      return Author.findByPk(newAuthor.id);
    },
    deleteAuthor: async (_, arg) => {
      await Author.destroy({ where: { id: arg.id } })
      return "Deleted Author ID:" + arg.id
    },
    editAuthor: async (_, args) => {
      let author = await Author.findByPk(args.id)
      await author.update(args.edits)
      return await author.save()
    },
  }
};
