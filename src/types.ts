export interface IBOOK {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BorrowedBook {
  _id: string;
  totalQuantity: string;
  book: {
    title: string;
    isbn: string;
  };
}
