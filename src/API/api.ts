import axios from "axios" 
import { AuthorType, BookType } from "../Types/Types"



const instance = axios.create({
    baseURL: "https://farerlib.onrender.com/api/",
    // baseURL: "http://localhost:3000/api/",
    headers: {
        'Content-Type': "application/json"
    }
    // add later when there is user authentication
    // withCredentials: true
})


export const booksAPI = {
    getAllBooks() {
        return instance.get(`books`)
    },
    postBook(newBook:BookType) {
        return instance.post(`books/`, newBook)
    },
    getBookById(bookId:string|undefined) {
        return instance.get(`books/${bookId}`)
    },
    deleteBookById(bookId:string) {
        return instance.delete(`books/${bookId}`)
    },
    updateBookById(book:BookType) {
        return instance.put(`books/${book._id}`, book)
    }
}

export const authorsAPI = {
    getAllAuthors() {
        return instance.get(`authors`)
    },
    postAuthor(newAuthor:AuthorType) {
        return instance.post(`authors`, newAuthor)
    },
    getAuthorById(authorId:string) {
        return instance.get(`authors/${authorId}`)
    }

}



