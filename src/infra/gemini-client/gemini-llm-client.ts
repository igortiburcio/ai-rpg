import { GoogleGenAI, HarmCategory, HarmBlockThreshold as HarmBlockThresholdGenAI } from '@google/genai';
import { z } from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { InteropZodType } from '@langchain/core/utils/types';
import zodToJsonSchema from 'zod-to-json-schema';
import { injectable } from 'tsyringe';
import { config } from '../../config';

@injectable()
export class GeminiLLMClient {
  private googleGenAI: GoogleGenAI;

  constructor() {
    this.googleGenAI = new GoogleGenAI({
      apiKey: config.GEMINI_API_KEY,
    });
  }

  async generateObject<T>({
    prompt,
    outputSchema,
    model,
    maxOutputTokens,
    temperature,
    topP,
  }: {
    prompt: string;
    outputSchema: z.ZodType<T>;
    model: string;
    maxOutputTokens: number;
    temperature: number;
    topP: number;
  }) {
    const response = await this.googleGenAI.models.generateContent({
      model,
      contents: prompt,
      config: {
        candidateCount: 1,
        maxOutputTokens,
        temperature,
        topP,
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThresholdGenAI.OFF,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThresholdGenAI.OFF,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThresholdGenAI.OFF,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThresholdGenAI.OFF,
          },
        ],
        responseMimeType: 'application/json',
        responseSchema: zodToJsonSchema(outputSchema, { $refStrategy: 'none' }),
      },
    });

    const parser = StructuredOutputParser.fromZodSchema(outputSchema as unknown as InteropZodType<T>);

    const object = await parser.parse(response.text!);

    return object;
  }
}
