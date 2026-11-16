import { readJson, reply } from '@/lib/server/http';
import { errorMessage } from '@/utils/errors';
import OpenAI from 'openai';

export async function aiBriefBuilder(request: Request): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = ((await readJson(request)) ?? {}) as Record<string, any>;

  const { 
    projectType, 
    industry, 
    targetAudience, 
    projectGoals, 
    budget, 
    timeline,
    additionalDetails 
  } = body;

  // Validate required fields
  if (!projectType || !industry || !targetAudience || !projectGoals) {
    return reply({ 
      message: 'Missing required fields: projectType, industry, targetAudience, projectGoals' 
    }, 400);
  }

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is missing');
    return reply({ 
      message: 'AI service is currently unavailable. Please try again later.' 
    }, 500);
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create a comprehensive prompt for the AI
    const prompt = `
As a client seeking to engage an agency through PAAN (Pan-African Agency Network), create a comprehensive project brief that will help match you with the ideal agency partner.

PROJECT DETAILS:
- Project Type: ${projectType}
- Industry: ${industry}
- Target Audience: ${targetAudience}
- Project Goals: ${projectGoals}
- Budget: ${budget || 'Not specified'}
- Timeline: ${timeline || 'Not specified'}
- Additional Details: ${additionalDetails || 'None provided'}

First, provide a 3-4 sentence summary of your project needs for quick agency matching.
Then, provide a detailed project brief with the following sections:
1. PROJECT BACKGROUND & OBJECTIVES
2. TARGET AUDIENCE INSIGHTS
3. DESIRED OUTCOMES & DELIVERABLES
4. TIMELINE & MILESTONES
5. BUDGET ALLOCATION
6. AGENCY REQUIREMENTS & PREFERENCES
7. EVALUATION CRITERIA

Format your response as:
SUMMARY:
[summary here]

BRIEF:
[full brief here]
`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI request timed out')), 55000)
    );

    const completion = await Promise.race([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a business leader seeking agency services through PAAN. You understand your business needs well and can articulate project requirements clearly. Your goal is to create a comprehensive brief that will help PAAN match you with the most suitable agency partner from their network across Africa."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 900,
        temperature: 0.7,
      }),
      timeoutPromise
    ]);

    const text = (completion as { choices: { message: { content: string } }[] }).choices[0].message.content;
    // Split summary and brief
    const summaryMatch = text.match(/SUMMARY:(.*)BRIEF:/s);
    const summary = summaryMatch ? summaryMatch[1].trim() : '';
    const brief = text.split('BRIEF:')[1]?.trim() || '';

    return reply({
      success: true,
      brief: brief,
      summary: summary,
      timestamp: new Date().toISOString(),
      projectDetails: {
        projectType,
        industry,
        targetAudience,
        projectGoals,
        budget,
        timeline
      }
    });

  } catch (error) {
    if (errorMessage(error) && errorMessage(error).includes('timed out')) {
      return reply({
        message: 'AI service timed out. Please try again or reduce your input size.',
      }, 504);
    }
    console.error('OpenAI API error:', error);

    // Always return JSON, and include error details in development
    return reply({ 
      message: 'An error occurred while generating your brief. Please try again.',
      error: typeof error === 'string' ? error : errorMessage(error) || String(error),
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    }, 500);
  }
} 