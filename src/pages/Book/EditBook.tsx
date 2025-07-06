import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { useEffect } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function EditBook() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookQuery(id);
  const [editBook, { isLoading: isUpdateLoading }] = useEditBookMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: "",
      description: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title || "",
        author: data.data.author || "",
        genre: data.data.genre || "",
        isbn: data.data.isbn || "",
        copies: data.data.copies || "",
        description: data.data.description || "",
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      data.copies = parseInt(data.copies, 10);
      const updatedBook = {
        ...data,
        available: data.copies === 0 ? false : true,
      };
      await editBook({ id, ...updatedBook }).unwrap();

      toast.success("Book Updated successfully");

      navigate("/");
      form.reset();
    } catch (error) {
      toast.error("Failed to update book");
      console.error("Failed to update book: ", error);
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
        <CardTitle className="font-bold text-2xl">Edit Book</CardTitle>
        <CardDescription>Enter your input below to Edit book</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="genre"
                rules={{ required: "Genre is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <select
                      {...field}
                      className="w-full border rounded-md p-2 bg-background text-foreground"
                    >
                      <option value="">Select book genre</option>
                      <option value="FICTION">FICTION</option>
                      <option value="NON_FICTION">NON_FICTION</option>
                      <option value="SCIENCE">SCIENCE</option>
                      <option value="HISTORY">HISTORY</option>
                      <option value="BIOGRAPHY">BIOGRAPHY</option>
                      <option value="FANTASY">FANTASY</option>
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isbn"
                rules={{
                  required: "ISBN is required",
                  pattern: {
                    value: /^[0-9]{13}$/,
                    message: "ISBN must 13 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Number of copies is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Copies must be a positive number",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-4 flex justify-end">
              <Button type="submit" disabled={isUpdateLoading}>
                {isUpdateLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
