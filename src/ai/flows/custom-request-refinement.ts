'use server';

/**
 * @fileOverview This file defines a Genkit flow for refining custom service requests using AI-enhanced recommendations.
 *
 * The flow takes initial request parameters as input and uses an LLM to provide nuanced recommendations,
 * helping potential customers better define their needs and receive more tailored and accurate quotations.
 *
 * @interface CustomRequestRefinementInput - The input type for the customRequestRefinement function.
 * @interface CustomRequestRefinementOutput - The output type for the customRequestRefinement function.
 * @function customRequestRefinement - A function that handles the custom request refinement process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomRequestRefinementInputSchema = z.object({
  eventScale: z.string().describe('The scale of the event (e.g., local, regional, national).'),
  budget: z.string().describe('The budget allocated for the event.'),
  region: z.string().describe('The region where the event will take place.'),
  additionalRequirements: z
    .string()
    .optional()
    .describe('Any additional requirements or preferences for the service.'),
});
export type CustomRequestRefinementInput = z.infer<typeof CustomRequestRefinementInputSchema>;

const CustomRequestRefinementOutputSchema = z.object({
  refinedParameters: z
    .string()
    .describe(
      'Refined service request parameters based on AI recommendations, providing a more tailored and accurate quotation.'
    ),
});
export type CustomRequestRefinementOutput = z.infer<typeof CustomRequestRefinementOutputSchema>;

export async function customRequestRefinement(input: CustomRequestRefinementInput): Promise<CustomRequestRefinementOutput> {
  return customRequestRefinementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customRequestRefinementPrompt',
  input: {schema: CustomRequestRefinementInputSchema},
  output: {schema: CustomRequestRefinementOutputSchema},
  prompt: `You are an AI assistant helping customers refine their custom service requests for B-Pulse Pro, a cycling event support company.

  Based on the customer's initial requirements, provide specific and actionable recommendations to help them better define their needs and receive a more tailored and accurate quotation.
  Consider factors such as event scale, budget, region, and any additional requirements.
  Output the refined service request parameters in a concise and clear manner.

  Initial Requirements:
  - Event Scale: {{{eventScale}}}
  - Budget: {{{budget}}}
  - Region: {{{region}}}
  - Additional Requirements: {{{additionalRequirements}}}

  Refined Parameters:`,
});

const customRequestRefinementFlow = ai.defineFlow(
  {
    name: 'customRequestRefinementFlow',
    inputSchema: CustomRequestRefinementInputSchema,
    outputSchema: CustomRequestRefinementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {refinedParameters: output!.refinedParameters};
  }
);
