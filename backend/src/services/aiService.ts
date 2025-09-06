import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { GenerateQuestionsRequest, GeneratedQuestion } from '../types';

const prisma = new PrismaClient();

export class AIService {
  private static openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  }) : null;

  // Generate questions using OpenAI
  static async generateQuestions(request: GenerateQuestionsRequest): Promise<GeneratedQuestion[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const { topic, count, difficulty, type, style } = request;

    const systemPrompt = `You are an expert educational content creator specializing in communication assessment questions. 
    Generate ${count} ${type} questions about "${topic}" at ${difficulty} difficulty level.
    
    IMPORTANT: Return ONLY valid JSON in this exact format:
    {
      "items": [
        {
          "text": "Question text here",
          "type": "${type}",
          ${type === 'mcq' ? '"choices": [{"text": "Option A", "isCorrect": true}, {"text": "Option B", "isCorrect": false}],' : ''}
          ${type !== 'mcq' ? '"answer": "Expected answer or key points"' : ''}
        }
      ]
    }
    
    Guidelines:
    - For MCQ: Provide 4 choices, only one correct
    - For short: Provide expected answer or key points
    - For speaking/listening: Focus on communication skills
    - For nonverbal: Focus on body language, gestures, expressions
    - Make questions realistic and practical
    - Ensure questions are appropriate for ${difficulty} level
    ${style ? `- Style: ${style}` : ''}
    
    Return ONLY the JSON, no other text.`;

    try {
      const completion = await this.openai!.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate ${count} ${type} questions about "${topic}" at ${difficulty} difficulty.` }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse JSON response
      const parsed = JSON.parse(content);
      
      if (!parsed.items || !Array.isArray(parsed.items)) {
        throw new Error('Invalid response format from OpenAI');
      }

      return parsed.items;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate questions');
    }
  }

  // Save generated questions to assessment
  static async saveQuestionsToAssessment(
    assessmentId: string, 
    questions: GeneratedQuestion[]
  ): Promise<number> {
    try {
      let savedCount = 0;

      for (const question of questions) {
        // Create question
        const createdQuestion = await prisma.question.create({
          data: {
            assessmentId,
            text: question.text,
            type: question.type as any,
            timeLimitSeconds: 60, // Default time limit
            answerKey: question.answer || null
          }
        });

        // Create choices for MCQ questions
        if (question.type === 'mcq' && question.choices) {
          for (const choice of question.choices) {
            await prisma.choice.create({
              data: {
                questionId: createdQuestion.id,
                text: choice.text,
                isCorrect: choice.isCorrect
              }
            });
          }
        }

        savedCount++;
      }

      return savedCount;
    } catch (error) {
      console.error('Error saving questions:', error);
      throw new Error('Failed to save questions to assessment');
    }
  }
}
