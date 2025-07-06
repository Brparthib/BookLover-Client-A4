import { useGetBookQuery } from "@/redux/api/baseApi";
import { Link, useParams } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import bookImg from "../../assets/book.png";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader/Loader";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookQuery(id);

  const book = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log("Error: ", isError);
  }

  return (
    <Card className="mt-5">
      <CardContent className="flex flex-col md:flex-row items-center gap-4">
        <div>
          <img className="w-60" src={bookImg} alt="book" />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <h4 className="text-xl font-bold">{book.title}</h4>
          <p>{book.description}</p>
          <p>
            <span className="font-bold text-sky-600">Author:</span>{" "}
            {book.author}
          </p>
          <p>
            <span className="font-bold text-sky-600">ISBN:</span> {book.isbn}
          </p>
          <p>
            <span className="font-bold text-sky-600">Copies:</span>{" "}
            {book.copies}
          </p>
          <p className={book.available ? "text-green-700" : "text-rose-700"}>
            <span className="font-bold text-sky-600">Availability:</span>{" "}
            {book.available ? "Available" : "Unavailable"}
          </p>
        </div>
        <div className="ml-auto">
          <Link className="cursor-pointer" to={`/borrow/${id}`}>
            <Button>Borrow</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
