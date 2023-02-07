import axios from "axios" 
import { AuthorType, BookType } from "../Types/Types"



const instance = axios.create({
    baseURL: "https://farerlib.onrender.com/api/",
    // add later when there is user authentication
    // withCredentials: true
})


export const booksAPI = {
    getAllBooks() {
        return instance.get(`books`)
    },
    postBook(newBook:BookType) {
        return instance.post(`books`, {newBook})
    },
    getBookById(bookId:string) {
        return instance.get(`books/${bookId}`)
    },
    deleteBookById(bookId:string) {
        return instance.delete(`books/${bookId}`)
    }
}

export const authorsAPI = {
    getAllAuthors() {
        return instance.get(`authors`)
    },
    postAuthor(newAuthor:AuthorType) {
        return instance.post(`authors`, {newAuthor})
    },

    getAuthorById(authorId:string) {
        return instance.get(`authors/${authorId}`)
    }

}



