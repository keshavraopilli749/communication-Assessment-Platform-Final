import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@commquest.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@commquest.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create modules
  const modules = [
    {
      slug: 'speaking',
      title: 'Speaking Skills',
      description: 'Develop your verbal communication abilities through various speaking exercises and assessments.',
      icon: '🎤'
    },
    {
      slug: 'writing',
      title: 'Writing Skills',
      description: 'Enhance your written communication skills with structured writing tasks and evaluations.',
      icon: '✍️'
    },
    {
      slug: 'listening',
      title: 'Listening Skills',
      description: 'Improve your listening comprehension and active listening abilities.',
      icon: '👂'
    },
    {
      slug: 'nonverbal',
      title: 'Non-Verbal Communication',
      description: 'Master body language, facial expressions, and other non-verbal communication cues.',
      icon: '🤝'
    }
  ];

  const createdModules = [];
  for (const moduleData of modules) {
    const module = await prisma.module.upsert({
      where: { slug: moduleData.slug },
      update: {},
      create: moduleData
    });
    createdModules.push(module);
    console.log(`✅ Module created: ${module.title}`);
  }

  // Create sections for each module
  const sectionsData = [
    // Speaking sections
    {
      moduleSlug: 'speaking',
      sections: [
        {
          title: 'Pronunciation & Clarity',
          description: 'Focus on clear pronunciation and articulation of words and phrases.',
          questionCount: 10,
          timeLimitSeconds: 600
        },
        {
          title: 'Conversational Skills',
          description: 'Practice engaging in natural conversations and dialogue.',
          questionCount: 8,
          timeLimitSeconds: 480
        },
        {
          title: 'Presentation Skills',
          description: 'Develop skills for delivering effective presentations.',
          questionCount: 6,
          timeLimitSeconds: 900
        },
        {
          title: 'Public Speaking',
          description: 'Build confidence in speaking to larger audiences.',
          questionCount: 5,
          timeLimitSeconds: 720
        },
        {
          title: 'Interview Skills',
          description: 'Prepare for job interviews and professional conversations.',
          questionCount: 7,
          timeLimitSeconds: 540
        }
      ]
    },
    // Writing sections
    {
      moduleSlug: 'writing',
      sections: [
        {
          title: 'Grammar & Syntax',
          description: 'Master proper grammar rules and sentence structure.',
          questionCount: 15,
          timeLimitSeconds: 900
        },
        {
          title: 'Business Writing',
          description: 'Learn to write professional emails, reports, and documents.',
          questionCount: 8,
          timeLimitSeconds: 600
        },
        {
          title: 'Creative Writing',
          description: 'Develop creative expression through various writing styles.',
          questionCount: 6,
          timeLimitSeconds: 720
        },
        {
          title: 'Academic Writing',
          description: 'Practice formal academic writing and research skills.',
          questionCount: 10,
          timeLimitSeconds: 1200
        },
        {
          title: 'Technical Writing',
          description: 'Learn to write clear technical documentation and instructions.',
          questionCount: 7,
          timeLimitSeconds: 540
        }
      ]
    },
    // Listening sections
    {
      moduleSlug: 'listening',
      sections: [
        {
          title: 'Active Listening',
          description: 'Develop skills for attentive and engaged listening.',
          questionCount: 12,
          timeLimitSeconds: 600
        },
        {
          title: 'Comprehension Skills',
          description: 'Improve understanding of spoken content and context.',
          questionCount: 10,
          timeLimitSeconds: 480
        },
        {
          title: 'Note-Taking',
          description: 'Learn effective note-taking techniques during listening.',
          questionCount: 8,
          timeLimitSeconds: 720
        },
        {
          title: 'Accent Recognition',
          description: 'Practice understanding different accents and dialects.',
          questionCount: 9,
          timeLimitSeconds: 540
        },
        {
          title: 'Audio Analysis',
          description: 'Analyze audio content for key information and details.',
          questionCount: 6,
          timeLimitSeconds: 360
        }
      ]
    },
    // Non-verbal sections
    {
      moduleSlug: 'nonverbal',
      sections: [
        {
          title: 'Body Language',
          description: 'Understand and interpret body language cues.',
          questionCount: 10,
          timeLimitSeconds: 480
        },
        {
          title: 'Facial Expressions',
          description: 'Learn to read and express emotions through facial cues.',
          questionCount: 8,
          timeLimitSeconds: 360
        },
        {
          title: 'Gestures & Posture',
          description: 'Master appropriate gestures and professional posture.',
          questionCount: 7,
          timeLimitSeconds: 420
        },
        {
          title: 'Eye Contact',
          description: 'Develop proper eye contact skills for effective communication.',
          questionCount: 6,
          timeLimitSeconds: 300
        },
        {
          title: 'Personal Space',
          description: 'Understand cultural differences in personal space and proximity.',
          questionCount: 5,
          timeLimitSeconds: 240
        }
      ]
    }
  ];

  for (const moduleData of sectionsData) {
    const module = createdModules.find(m => m.slug === moduleData.moduleSlug);
    if (!module) continue;

    for (const sectionData of moduleData.sections) {
      await prisma.section.create({
        data: {
          moduleId: module.id,
          ...sectionData
        }
      });
      console.log(`✅ Section created: ${sectionData.title} (${module.title})`);
    }
  }

  // Create sample assessments
  const speakingModule = createdModules.find(m => m.slug === 'speaking');
  if (speakingModule) {
    const pronunciationSection = await prisma.section.findFirst({
      where: {
        moduleId: speakingModule.id,
        title: 'Pronunciation & Clarity'
      }
    });

    if (pronunciationSection) {
      const sampleAssessment = await prisma.assessment.create({
        data: {
          sectionId: pronunciationSection.id,
          title: 'Basic Pronunciation Test',
          description: 'A comprehensive test covering basic pronunciation and clarity skills.',
          difficulty: 'easy',
          durationSeconds: 300,
          createdById: adminUser.id
        }
      });

      // Add sample questions
      const questions = [
        {
          text: 'Listen to the audio and choose the correct pronunciation of the word "pronunciation".',
          type: 'mcq' as const,
          timeLimitSeconds: 30,
          choices: [
            { text: 'pro-nun-ci-a-tion', isCorrect: true },
            { text: 'pro-noun-ci-a-tion', isCorrect: false },
            { text: 'pro-nun-shi-a-tion', isCorrect: false },
            { text: 'pro-noun-shi-a-tion', isCorrect: false }
          ]
        },
        {
          text: 'Record yourself saying the following sentence clearly: "The quick brown fox jumps over the lazy dog."',
          type: 'speaking' as const,
          timeLimitSeconds: 60
        },
        {
          text: 'Write a short paragraph (50-100 words) about your favorite hobby.',
          type: 'short' as const,
          timeLimitSeconds: 120
        }
      ];

      for (const questionData of questions) {
        const question = await prisma.question.create({
          data: {
            assessmentId: sampleAssessment.id,
            text: questionData.text,
            type: questionData.type,
            timeLimitSeconds: questionData.timeLimitSeconds
          }
        });

        if (questionData.choices) {
          for (const choice of questionData.choices) {
            await prisma.choice.create({
              data: {
                questionId: question.id,
                text: choice.text,
                isCorrect: choice.isCorrect
              }
            });
          }
        }
      }

      console.log(`✅ Sample assessment created: ${sampleAssessment.title}`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Admin Credentials:');
  console.log('Email: admin@commquest.com');
  console.log('Password: admin123');
  console.log('\n🔗 You can now start the server with: npm run dev');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
