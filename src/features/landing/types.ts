
import { z } from 'zod';

export const FeaturedProjectSchema = z.object({
  projectType: z.enum(['website', 'mobile'], {
    required_error: "You must select a project type.",
  }),
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  projectUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  appStoreUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  playStoreUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
}).refine((data) => {
  if (data.projectType === 'website') {
    return !!data.projectUrl && data.projectUrl.length > 0;
  }
  return true;
}, {
  message: "Website URL is required.",
  path: ["projectUrl"],
}).refine((data) => {
  if (data.projectType === 'mobile') {
    const hasAppStore = !!data.appStoreUrl && data.appStoreUrl.length > 0;
    const hasPlayStore = !!data.playStoreUrl && data.playStoreUrl.length > 0;
    return hasAppStore || hasPlayStore;
  }
  return true;
}, {
  message: "At least one app store URL is required.",
  path: ["appStoreUrl"], // Apply error to the first of the mobile fields
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
  projectType: 'website' | 'mobile';
  createdAt: any; // Firestore timestamp
};
