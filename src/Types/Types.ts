export type AuthorType = {
  // necessary
  first_name: string;
  last_name: string;
  books: BookType[];
  // optional
  _id?: string;
  date_of_birth?: number;
  date_of_death?: number;
};

export type BookType = {
  // necessary
  title: string;
  author: AuthorType | string;
  genre: string;
  // optional
  _id?: string;
  year?: number;
  summary?: string;
};
