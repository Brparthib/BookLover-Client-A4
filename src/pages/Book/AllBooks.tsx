import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBookMutation, useGetAllBookQuery } from "@/redux/api/baseApi";
import type { IBOOK } from "@/types";
import { BookOpen, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function AllBooks() {
  const { data, isLoading, isError } = useGetAllBookQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error("Failed to delete book");
      console.error("Error: ", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Failed to load book data</h2>;
  }

  return (
    <Card className="my-5">
      <CardHeader>Book List</CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of Books</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((book: IBOOK) => (
              <TableRow key={book._id}>
                <TableCell>
                  <Link
                    className="text-blue-500"
                    to={`book-details/${book._id}`}
                  >
                    {book.title}
                  </Link>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell
                  className={book.available ? `text-green-400` : `text-red-400`}
                >
                  {book.available ? `Available` : `Unavailable`}
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`borrow/${book._id}`}>
                    <Button className="text-sky-700 bg-transparent hover:bg-sky-700 hover:text-white cursor-pointer">
                      <BookOpen />
                    </Button>
                  </Link>
                  <Link to={`edit-book/${book._id}`}>
                    <Button className="text-green-700 bg-transparent hover:bg-green-700 hover:text-white cursor-pointer">
                      <Edit2 />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteHandler(book._id)}
                    className="text-rose-700 bg-transparent hover:bg-rose-700 hover:text-white cursor-pointer"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
