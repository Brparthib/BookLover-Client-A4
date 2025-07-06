import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";

export default function BorrowBook() {
  const form = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookQuery(id);
  const [borrowBook, { data: borrowedBook, isLoading: isBorrowBookLoading }] =
    useBorrowBookMutation();

  const book = data?.data;
  console.log("Data: ", book);
  console.log("Borrowed Book: ", borrowedBook);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      data.quantity = parseInt(data.quantity);
      const newBook = { book: id, ...data };
      await borrowBook(newBook);

      toast.success("Book borrowed Successfully");

      navigate("/borrow-summary");
      form.reset();
    } catch (error) {
      toast.error("Failed to borrow book");
      console.error("Failed to borrow book: ", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Failed to load book data</h2>;
  }

  return (
    <Card className="md:w-2xl mx-auto my-5">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl">Borrow Book</CardTitle>
        <div className="text-left flex flex-col gap-2 mt-4">
          <h4 className="text-xl font-bold">{book?.title}</h4>
          <p>{book?.description}</p>
          <p>
            <span className="font-bold text-sky-600">Author:</span>{" "}
            {book?.author}
          </p>
          <p>
            <span className="font-bold text-sky-600">ISBN:</span> {book?.isbn}
          </p>
          <p>
            <span className="font-bold text-sky-600">Copies:</span>{" "}
            {book?.copies}
          </p>
          <p className={book?.available ? "text-green-700" : "text-rose-700"}>
            <span className="font-bold text-sky-600">Availability:</span>{" "}
            {book?.available ? "Available" : "Unavailable"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="quantity"
              rules={{
                required: "Number of quantity is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "quantity must be a positive number",
                },
                validate: (value) =>
                  parseInt(value) <= book.copies ||
                  `We have ${book.copies} copies of this book available.`,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              rules={{
                required: "Due date is required",
                validate: (value) =>
                  !isBefore(value, startOfDay(new Date())) ||
                  "Due date can't be before today",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "ppp")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex justify-end">
              <Button type="submit" disabled={isBorrowBookLoading}>
                {isBorrowBookLoading ? "Loading..." : "Borrow Book"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
