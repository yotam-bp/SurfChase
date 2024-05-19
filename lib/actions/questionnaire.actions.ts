'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Questionnaire from '@/lib/database/models/questionnaire.model'
import { handleError } from '@/lib/utils'

export const getQuestionnaire = async () => {
  
  try {
    await connectToDatabase();
    const questionnaire = await Questionnaire.find();
    console.log(questionnaire);
    return JSON.parse(JSON.stringify(questionnaire));
  } catch (error) {
    handleError(error);
  }
};

