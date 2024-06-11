'use server'
import prisma from './prisma'
import { revalidatePath } from 'next/cache'

export const createRecord = async (formData: any) => {
    try {
        const abs = formData.get('abs') === 'on' ? true : false
        const cardio = formData.get('cardio') === 'on' ? true : false
        const record = await prisma.dailyLog.create({
            data: {
                date: formData.get('date'),
                calories: parseInt(formData.get('calories')),
                fat: parseInt(formData.get('fat')),
                protein: parseInt(formData.get('protein')),
                carbs: parseInt(formData.get('carbs')),
                abs: abs,
                cardio: cardio,
                training: formData.get('training'),
                tFat: parseInt(formData.get('tFat')),
                tProtein: parseInt(formData.get('tProtein')),
                tCarbs: parseInt(formData.get('tCarbs')),
                tCalories: parseInt(formData.get('tCalories')),
                weight: parseInt(formData.get('weight')),
                notes: formData.get('notes'),
            },
        })
        revalidatePath('/')
    } catch (error) {
        console.error(error)
    }
}