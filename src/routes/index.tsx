import App from "@/App";
import AddBook from "@/pages/Book/AddBook";
import AllBooks from "@/pages/Book/AllBooks";
import BookDetails from "@/pages/Book/BookDetails";
import EditBook from "@/pages/Book/EditBook";
import BorrowBook from "@/pages/Borrow/BorrowBook";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
      {
        path: "create-book",
        Component: AddBook,
      },
      {
        path: "edit-book/:id",
        Component: EditBook,
      },
      {
        path: "book-details/:id",
        Component: BookDetails,
      },
      {
        path: "borrow/:id",
        Component: BorrowBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);
