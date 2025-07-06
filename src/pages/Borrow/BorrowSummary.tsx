import Loader from "@/components/loader/Loader";
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
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { BorrowedBook } from "@/types";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);
  const borrowed = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Failed to load borrowed book data</h2>;
  }

  return (
      <Card className="my-5">
        <CardHeader>Borrowed Book List</CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of Borrowed Books</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Total Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowed?.map((data: BorrowedBook) => (
                <TableRow key={data._id}>
                  <TableCell>{data.book.title}</TableCell>
                  <TableCell>{data.book.isbn}</TableCell>
                  <TableCell>{data.totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
