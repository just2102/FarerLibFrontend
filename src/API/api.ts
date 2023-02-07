import axios from "axios" 

export type Author = {
    // necessary
    first_name: string,
    last_name: string,
    // optional
    date_of_birth?: number,
    date_of_death?: number,
    id?: string
}


export type Book = {
    // necessary
    title: string,
    author: string,
    genre: string
    // optional
    year?: number,
    summary?: string,
}

const instance = axios.create({
    baseURL: "https://farerlib.onrender.com/api/",
    withCredentials: true
})


export const booksAPI = {
    getAllBooks() {
        return instance.get(`books`)
    },
    postBook(newBook:Book) {
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
    postAuthor(newAuthor:Author) {
        return instance.post(`authors`, {newAuthor})
    },

    getAuthorById(authorId:string) {
        return instance.get(`authors/${authorId}`)
    }

}



