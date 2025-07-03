// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private apiKey = process.env.OPENROUTER_API_KEY;

  private async callOpenRouter(prompt: string, model: string, context: string): Promise<string> {
    console.log(`🟡 Using OpenRouter Key: ${this.apiKey?.slice(0, 8)}...`);
    console.log(`🟡 Model: ${model}`);
    console.log(`🟡 Prompt: ${prompt}`);

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model,
          messages: [
            {
              role: 'system',
              content: context,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://visamate.vercel.app', // Update this if your frontend URL is different
            'X-Title': 'VisaMate',
          },
        },
      );

      const result = response.data.choices?.[0]?.message?.content?.trim();
      console.log('✅ OpenRouter Response:', result);
      return result || '⚠️ Empty response from model.';
    } catch (error: any) {
      console.error('❌ OpenRouter Error:', error.response?.data || error.message);
      throw new Error('AI generation failed.');
    }
  }

  async generateSOP(prompt: string): Promise<string> {
    return this.callOpenRouter(
      prompt,
      'mistralai/mistral-7b-instruct:free',
      'You are a professional SOP writer helping students with university applications.'
    );
  }

  async generateLOR(prompt: string): Promise<string> {
    return this.callOpenRouter(
      prompt,
      'mistralai/mistral-7b-instruct:free',
      'You are a university professor writing professional Letters of Recommendation for students.'
    );
  }
}
