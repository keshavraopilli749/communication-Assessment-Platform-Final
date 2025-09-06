# CommQuest Backend API

A comprehensive TypeScript backend for the CommQuest Communication Assessment Platform, built with Node.js, Express, PostgreSQL, and Prisma ORM.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone and setup**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://username:password@localhost:5432/commquest_db?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"
   JWT_EXPIRES_IN="7d"
   OPENAI_API_KEY="your-openai-api-key-here"
   FRONTEND_ORIGIN="http://localhost:3000"
   UPLOAD_PROVIDER="local"
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH="./uploads"
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # Seed the database
   npm run db:seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

Error responses:
```json
{
  "error": "Error message"
}
```

## 🔐 Authentication Endpoints

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User Profile
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your-token>"
```

## 📖 Modules & Sections

### Get All Modules
```bash
curl -X GET http://localhost:5000/api/modules
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "module_id",
      "slug": "speaking",
      "title": "Speaking Skills",
      "description": "Develop your verbal communication abilities...",
      "icon": "🎤"
    }
  ]
}
```

### Get Module Sections
```bash
curl -X GET http://localhost:5000/api/modules/speaking/sections
```

### Get Section Rules
```bash
curl -X GET http://localhost:5000/api/sections/section_id/rules
```

## 📝 Assessments & Questions

### Create Assessment (Admin Only)
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sectionId": "section_id",
    "title": "Basic Speaking Test",
    "description": "Test basic speaking skills",
    "difficulty": "easy",
    "durationSeconds": 300
  }'
```

### Get Assessment
```bash
curl -X GET http://localhost:5000/api/assessments/assessment_id
```

### Add Questions to Assessment (Admin Only)
```bash
curl -X POST http://localhost:5000/api/assessments/assessment_id/questions \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "questions": [
      {
        "text": "What is your name?",
        "type": "short",
        "timeLimitSeconds": 30
      },
      {
        "text": "Choose the correct answer:",
        "type": "mcq",
        "timeLimitSeconds": 45,
        "choices": [
          {"text": "Option A", "isCorrect": true},
          {"text": "Option B", "isCorrect": false}
        ]
      }
    ]
  }'
```

### Get Assessment Questions (One at a time)
```bash
curl -X GET "http://localhost:5000/api/assessments/assessment_id/questions?page=1&limit=1"
```

Response:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "question_id",
        "text": "What is your name?",
        "type": "short",
        "timeLimitSeconds": 30,
        "choices": null,
        "metadata": null
      }
    ],
    "page": 1,
    "limit": 1,
    "total": 5
  }
}
```

## 💾 Responses & Submission

### Save Response
```bash
curl -X POST http://localhost:5000/api/responses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "question_id",
    "answerText": "My name is John Doe",
    "answerMediaUrl": null
  }'
```

### Get User Responses
```bash
curl -X GET "http://localhost:5000/api/responses?userId=user_id&assessmentId=assessment_id" \
  -H "Authorization: Bearer <token>"
```

### Submit Assessment
```bash
curl -X POST http://localhost:5000/api/assessments/assessment_id/submit \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "responses": [
      {
        "questionId": "question_id",
        "answerText": "My answer here"
      }
    ]
  }'
```

### Get Assessment Results
```bash
curl -X GET "http://localhost:5000/api/assessments/assessment_id/results?userId=user_id" \
  -H "Authorization: Bearer <token>"
```

## 🤖 AI Question Generation

### Generate Questions (Admin Only)
```bash
curl -X POST http://localhost:5000/api/ai/generate-questions \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Business Communication",
    "count": 5,
    "difficulty": "medium",
    "type": "mcq",
    "style": "professional",
    "saveToAssessmentId": "assessment_id"
  }'
```

## 📁 File Upload

### Upload File
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@/path/to/your/file.mp3"
```

Response:
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:5000/uploads/file-1234567890.mp3"
  }
}
```

## 🗄️ Database Schema

### Core Models

- **User**: Authentication and user management
- **Module**: Communication skill categories (Speaking, Writing, etc.)
- **Section**: Subcategories within modules
- **Assessment**: Individual tests within sections
- **Question**: Individual questions with various types
- **Choice**: Multiple choice options for MCQ questions
- **Response**: User answers to questions
- **Result**: Calculated scores and assessment results

### Question Types

- `mcq`: Multiple choice questions
- `short`: Short text answers
- `speaking`: Audio recording questions
- `listening`: Audio comprehension questions
- `nonverbal`: Visual/body language questions

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database (WARNING: deletes all data)
```

### Project Structure

```
src/
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── routes/          # API route definitions
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── server.ts        # Main server file

prisma/
├── schema.prisma    # Database schema
└── seed.ts          # Database seeding script
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS protection
- Input validation with Zod
- File upload restrictions
- SQL injection protection via Prisma

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure all environment variables are properly set:
- `NODE_ENV=production`
- Strong `JWT_SECRET` (32+ characters)
- Valid `DATABASE_URL`
- `FRONTEND_ORIGIN` set to your frontend URL

## 📊 Frontend Integration

This API is designed to work seamlessly with the existing React frontend. The endpoints and response formats match exactly what the frontend expects:

- **Hero/ModulesGrid** → `GET /api/modules`
- **SectionList** → `GET /api/modules/:slug/sections`
- **RulesPage** → `GET /api/sections/:id/rules`
- **QuestionsPage** → `GET /api/assessments/:id/questions?page=1&limit=1`
- **Submit** → `POST /api/responses` and `POST /api/assessments/:id/submit`
- **ResultsPage** → `GET /api/assessments/:id/results?userId=`

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check `DATABASE_URL` in `.env`
   - Ensure database exists

2. **JWT Token Errors**
   - Verify `JWT_SECRET` is set
   - Check token expiration
   - Ensure proper Authorization header format

3. **File Upload Issues**
   - Check `uploads/` directory exists
   - Verify file size limits
   - Ensure proper file types

### Logs

The server logs all requests and errors. Check the console output for detailed error information.

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
