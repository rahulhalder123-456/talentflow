import { z } from 'zod';

export const ReviewSchema = z.object({
  rating: z.number().min(1, "Rating is required.").max(5, "Rating cannot exceed 5."),
  comment: z.string().min(10, "Review must be at least 10 characters long.").max(500, "Review cannot exceed 500 characters."),
  projectId: z.string(),
  userId: z.string(),
  userName: z.string(),
});

export type ReviewFormValues = z.infer<typeof ReviewSchema>;

export type Review = {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};
