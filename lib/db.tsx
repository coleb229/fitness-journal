'use server'
import prisma from './prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const createRecord = async (formData: any) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        // Extract form data and convert to appropriate types
        const date = formData.get('date');
        const calories = parseInt(formData.get('calories'));
        const fat = parseInt(formData.get('fat'));
        const protein = parseInt(formData.get('protein'));
        const carbs = parseInt(formData.get('carbs'));
        const abs = formData.get('abs') === 'on' ? true : false;
        const cardio = formData.get('cardio') === 'on' ? true : false;
        const training = formData.get('training');
        const tFat = parseInt(formData.get('tFat'));
        const tProtein = parseInt(formData.get('tProtein'));
        const tCarbs = parseInt(formData.get('tCarbs'));
        const tCalories = parseInt(formData.get('tCalories'));
        const weight = parseInt(formData.get('weight'));
        const notes = formData.get('notes');

        // Check if a record already exists for the given date

        // Create a new record if no existing record is found
        const record = await prisma.dailyLog.create({
            data: {
                date,
                calories,
                fat,
                protein,
                carbs,
                abs,
                cardio,
                training,
                tFat,
                tProtein,
                tCarbs,
                tCalories,
                weight,
                notes,
                user: email as string,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/');

        return { message: 'Record created successfully.', record };
    } catch (error) {
        console.error('Error creating record:', error);
        return { message: 'Error creating record.' };
    }
};