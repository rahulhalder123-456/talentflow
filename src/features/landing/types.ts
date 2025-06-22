
import { z } from 'zod';

export const FeaturedProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  projectUrl: z.string().url("Please enter a valid website URL.").optional().or(z.literal('')),
  appStoreUrl: z.string().url("Please enter a valid App Store URL.").optional().or(z.literal('')),
  playStoreUrl: z.string().url("Please enter a valid Play Store URL.").optional().or(z.literal('')),
});

export type FeaturedProjectFormValues = z.infer<typeof FeaturedProjectSchema>;

export type FeaturedProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  createdAt: any; // Firestore timestamp
};
