import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateCompletion(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
      });
      return response.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'Sorry, I could not process your request.';
    }
  }
}
