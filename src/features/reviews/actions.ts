'use server';

import { db, collection, getDocs, query, orderBy, limit } from "@/lib/firebase/client";
import type { Review } from './types';
import { revalidatePath } from "next/cache";

export async function getRecentReviews(): Promise<Review[]> {
    try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return [];
        }

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate().toISOString(),
            } as Review;
        });
    } catch (error) {
        console.error("Error fetching recent reviews:", error);
        return [];
    }
}

export async function revalidateReviewsPaths() {
    revalidatePath('/');
    revalidatePath('/dashboard/reviews');
}
