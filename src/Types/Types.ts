export type AuthorType = {
    // necessary
    first_name: string,
    last_name: string,
    // optional
    date_of_birth?: number,
    date_of_death?: number,
    id?: string
}


export type BookType = {
    // necessary
    title: string,
    author: string,
    genre: string
    // optional
    year?: number,
    summary?: string,
}