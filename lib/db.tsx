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

export const deleteRecord = async (formData:any) => {
    try {
        const record = await prisma.dailyLog.delete({
            where: {
                id: formData.get('id'),
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/');

        return { message: 'Record deleted successfully.', record };
    } catch (error) {
        console.error('Error deleting record:', error);
        return { message: 'Error deleting record.' };
    }
};

export const createTrainingRow = async (formData:any) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        // Extract form data and convert to appropriate types
        const exercise = formData.get('exercise');
        const weight = parseInt(formData.get('weight'));

        const record = await prisma.training.create({
            data: {
                exercise,
                weight,
                user: email as string,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/journal/training');

        return { message: 'Record created successfully.', record };
    } catch (error) {
        console.error('Error creating record:', error);
        return { message: 'Error creating record.' };
    }
};

export const updateTargetFat = async (formData: any) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        const tFat = parseInt(formData.get('tFat'));

        const userPreference = await prisma.userPreferences.update({
            where: {
                user: email as string,
            },
            data: {
                tFat,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/');

        return { message: 'Target fat updated successfully.', userPreference };
    } catch (error) {
        console.error('Error updating target fat:', error);
        return { message: 'Error updating target fat.' };
    }
}

export const updateTargetProtein = async (formData: any) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        const tProtein = parseInt(formData.get('tProtein'));

        const userPreference = await prisma.userPreferences.update({
            where: {
                user: email as string,
            },
            data: {
                tProtein,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/');

        return { message: 'Target protein updated successfully.', userPreference };
    } catch (error) {
        console.error('Error updating target protein:', error);
        return { message: 'Error updating target protein.' };
    }
}

export const updateTargetCarbs = async (formData: any) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        const tCarbs = parseInt(formData.get('tCarbs'));

        const userPreference = await prisma.userPreferences.update({
            where: {
                user: email as string,
            },
            data: {
                tCarbs,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/');

        return { message: 'Target carbs updated successfully.', userPreference };
    } catch (error) {
        console.error('Error updating target carbs:', error);
        return { message: 'Error updating target carbs.' };
    }
}

export const updateTargetCalories = async (formData: any) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        const tCalories = parseInt(formData.get('tCalories'));

        const userPreference = await prisma.userPreferences.update({
            where: {
                user: email as string,
            },
            data: {
                tCalories,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/');

        return { message: 'Target calories updated successfully.', userPreference };
    } catch (error) {
        console.error('Error updating target calories:', error);
        return { message: 'Error updating target calories.' };
    }
}

export const getUserPreferences = async () => {
    const session = await getServerSession(authOptions);
    const userPreferences = await prisma.userPreferences.findUnique({
        where: {
        user: session?.user?.email as string
        }
    })
    return userPreferences;
}

export const toggleTenByThree = async (formData: any) => {
    try {
        const completed = formData.get('tenByThree') === 'true' ? true : false;
        const record = await prisma.training.update({
            where: {
                id: formData.get('id'),
            },
            data: {
                tenByThree: !completed,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/journal/training');

        return { message: 'Record updated successfully.', record };
    } catch (error) {
        console.error('Error updating record:', error);
        return { message: 'Error updating record.' };
    }
}

export const toggleSevenByFive = async (formData: any) => {
    try {
        const completed = formData.get('sevenByFive') === 'true' ? true : false;
        const record = await prisma.training.update({
            where: {
                id: formData.get('id'),
            },
            data: {
                sevenByFive: !completed,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/journal/training');

        return { message: 'Record updated successfully.', record };
    } catch (error) {
        console.error('Error updating record:', error);
        return { message: 'Error updating record.' };
    }
}

export const toggleFiveBySeven = async (formData: any) => {
    try {
        const completed = formData.get('fiveBySeven') === 'true' ? true : false;
        const record = await prisma.training.update({
            where: {
                id: formData.get('id'),
            },
            data: {
                fiveBySeven: !completed,
            },
        });

        // Revalidate the path to ensure the cache is updated
        revalidatePath('/journal/training');

        return { message: 'Record updated successfully.', record };
    } catch (error) {
        console.error('Error updating record:', error);
        return { message: 'Error updating record.' };
    }
}