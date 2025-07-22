'use server';

import { customRequestRefinement, CustomRequestRefinementInput, CustomRequestRefinementOutput } from '@/ai/flows/custom-request-refinement';

export async function refineCustomRequest(input: CustomRequestRefinementInput): Promise<CustomRequestRefinementOutput> {
  try {
    const output = await customRequestRefinement(input);
    return output;
  } catch (error) {
    console.error('Error refining custom request:', error);
    throw new Error('Failed to get refinement from AI.');
  }
}
