import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ReviewOutput } from "@/modules/reviews/types";
import { StarPicker } from "@/components/star-picker";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";

interface Props {
  initialData: ReviewOutput;
  productId: string;
}

const formSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  description: z
    .string()
    .min(1, "Description must be at least 1 character")
    .max(500, "Description must be at most 500 characters"),
});

const ReviewForm = ({ initialData, productId }: Props) => {
  const [isPreview, setIsPreview] = useState(!!initialData);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createReview = useMutation(
    trpc.reviews.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({ productId })
        );
        setIsPreview(true);
      },
      onError: (error) =>
        toast.error(error.message || "Failed to create review"),
    })
  );
  const updateReview = useMutation(
    trpc.reviews.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({ productId })
        );
        setIsPreview(true);
      },
      onError: (error) =>
        toast.error(error.message || "Failed to update review"),
    })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialData?.rating || 0,
      description: initialData?.description || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: values.rating,
        description: values.description,
      });
    } else {
      createReview.mutate({
        productId,
        rating: values.rating,
        description: values.description,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="font-medium">
          {isPreview ? "Your rating:" : "Liked it? Give it a rating:"}
        </p>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Want to leave a written review?"
                  disabled={isPreview}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isPreview && (
          <Button
            variant="elevated"
            disabled={createReview.isPending || updateReview.isPending}
            type="submit"
            size="lg"
            className="bg-black text-white hover:bg-primary hover:text-primary-foreground w-fit"
          >
            {initialData ? "Update review" : "Post review"}
          </Button>
        )}
      </form>
      {isPreview && (
        <Button
          onClick={() => setIsPreview(false)}
          size="lg"
          type="button"
          variant="elevated"
          className="w-fit mt-4"
        >
          Edit review
        </Button>
      )}
    </Form>
  );
};

export default ReviewForm;

export const ReviewFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-medium">Liked it? Give it a rating:</p>

      <StarPicker disabled />
      <Textarea placeholder="Want to leave a written review?" disabled />
      <Button
        variant="elevated"
        disabled
        type="button"
        size="lg"
        className="bg-black text-white hover:bg-primary hover:text-primary-foreground w-fit"
      >
        Post review
      </Button>
    </div>
  );
};
