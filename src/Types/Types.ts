export type AuthorType = {
  // necessary
  first_name: string;
  last_name: string;
  books: BookType[];
  // optional
  _id?: string;
  date_of_birth?: Date;
  date_of_death?: Date;
};

export type BookType = {
  // necessary
  title: string;
  author: AuthorType | string
  genre: string;
  available: boolean
  // optional
  _id?: string;
  year?: number;
  summary?: string;
  cover?: any
};

export type UserType = {
  username: string,
  role: string,
  id: string,
  books: any[]
}
