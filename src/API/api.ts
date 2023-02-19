import axios from "axios";
import { AuthorType, BookType } from "../Types/Types";

const instance = axios.create({
  // baseURL: "https://farerlib.onrender.com/api/",
  baseURL: "http://localhost:3000/api/",
  // headers: {
  //     'Content-Type': "application/json"
  // }
  // add later when there is user authentication
  // withCredentials: true
});

export const booksAPI = {
  getAllBooks() {
    return instance.get(`books`);
  },
  generateBookCover(bookId: string,summary:string) {
    return instance.post(`dalle`, {bookId, summary} )
  },
  postBook(newBook: BookType) {
    return instance.post(
      `books/`,
      newBook
      // {
      //     headers: {
      //         'Content-Type' : 'multipart/form-data'
      //     }
      // }
    );
  },
  getBookById(bookId: string | undefined) {
    return instance.get(`books/${bookId}`);
  },
  deleteBookById(bookId: string) {
    return instance.delete(`books/${bookId}`);
  },
  updateBookById(book: BookType) {
    return instance.put(`books/${book._id}`, book);
  },
  toggleBookStatus(book: BookType) {
    return instance.patch(`books/${book._id}`, book);
  },
};

export const authorsAPI = {
  getAllAuthors() {
    return instance.get(`authors`);
  },
  postAuthor(newAuthor: AuthorType) {
    return instance.post(`authors`, newAuthor);
  },
  getAuthorById(authorId: string) {
    return instance.get(`authors/${authorId}`);
  },
};

export const authAPI = {
  whoAmI() {
    return instance.get(`auth/whoAmI`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
  },
  register(username: string, password: string) {
    return instance.post(`auth/register`, { username, password });
  },
// returns the token (requires launching whoAmI for proper login)
  login(username: string, password: string) {
    return instance.post(`auth/login`, { username, password });
  },
  logout() {
    return instance.post(`auth/logout`)
  },
  getUsers() {
    return instance.get(`auth/users`);
  },
};
