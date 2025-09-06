# CommQuest API Examples

This document provides comprehensive examples for all API endpoints with sample requests and responses.

## 🔐 Authentication Examples

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "CANDIDATE"
    }
  },
  "message": "User registered successfully"
}
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@commquest.com",
    "password": "admin123"
  }'
```

### 3. Get Current User Profile
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📖 Modules & Sections Examples

### 4. Get All Modules
```bash
curl -X GET http://localhost:5000/api/modules
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "module_1",
      "slug": "speaking",
      "title": "Speaking Skills",
      "description": "Develop your verbal communication abilities through various speaking exercises and assessments.",
      "icon": "🎤"
    },
    {
      "id": "module_2",
      "slug": "writing",
      "title": "Writing Skills",
      "description": "Enhance your written communication skills with structured writing tasks and evaluations.",
      "icon": "✍️"
    }
  ]
}
```

### 5. Get Module Sections
```bash
curl -X GET http://localhost:5000/api/modules/speaking/sections
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "section_1",
      "title": "Pronunciation & Clarity",
      "description": "Focus on clear pronunciation and articulation of words and phrases.",
      "questionCount": 10,
      "timeLimitSeconds": 600
    }
  ]
}
```

### 6. Get Section Rules
```bash
curl -X GET http://localhost:5000/api/sections/section_1/rules
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sectionId": "section_1",
    "title": "Pronunciation & Clarity",
    "timeLimitSeconds": 600,
    "marksPerQuestion": 1,
    "guidelines": [
      "Read each question carefully before answering",
      "Ensure your answers are clear and concise",
      "For speaking questions, speak clearly and at a moderate pace"
    ],
    "helpNotes": [
      "You can navigate between questions using the navigation buttons",
      "Your progress is automatically saved"
    ]
  }
}
```

## 📝 Assessment Examples

### 7. Create Assessment (Admin Only)
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "sectionId": "section_1",
    "title": "Advanced Speaking Test",
    "description": "Comprehensive test for advanced speaking skills",
    "difficulty": "hard",
    "durationSeconds": 900
  }'
```

### 8. Get Assessment Details
```bash
curl -X GET http://localhost:5000/api/assessments/assessment_1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "assessment_1",
    "title": "Basic Pronunciation Test",
    "durationSeconds": 300,
    "difficulty": "easy",
    "section": {
      "id": "section_1",
      "title": "Pronunciation & Clarity"
    }
  }
}
```

### 9. Add Questions to Assessment (Admin Only)
```bash
curl -X POST http://localhost:5000/api/assessments/assessment_1/questions \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "questions": [
      {
        "text": "What is the correct pronunciation of 'pronunciation'?",
        "type": "mcq",
        "timeLimitSeconds": 45,
        "choices": [
          {"text": "pro-nun-ci-a-tion", "isCorrect": true},
          {"text": "pro-noun-ci-a-tion", "isCorrect": false},
          {"text": "pro-nun-shi-a-tion", "isCorrect": false},
          {"text": "pro-noun-shi-a-tion", "isCorrect": false}
        ]
      },
      {
        "text": "Record yourself saying: 'The quick brown fox jumps over the lazy dog.'",
        "type": "speaking",
        "timeLimitSeconds": 60
      },
      {
        "text": "Write a short paragraph about your favorite hobby (50-100 words).",
        "type": "short",
        "timeLimitSeconds": 120
      }
    ]
  }'
```

### 10. Get Assessment Questions (One at a time)
```bash
curl -X GET "http://localhost:5000/api/assessments/assessment_1/questions?page=1&limit=1"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "question_1",
        "text": "What is the correct pronunciation of 'pronunciation'?",
        "type": "mcq",
        "timeLimitSeconds": 45,
        "choices": [
          {"id": "choice_1", "text": "pro-nun-ci-a-tion"},
          {"id": "choice_2", "text": "pro-noun-ci-a-tion"},
          {"id": "choice_3", "text": "pro-nun-shi-a-tion"},
          {"id": "choice_4", "text": "pro-noun-shi-a-tion"}
        ],
        "metadata": null
      }
    ],
    "page": 1,
    "limit": 1,
    "total": 3
  }
}
```

## 💾 Response Examples

### 11. Save Response
```bash
curl -X POST http://localhost:5000/api/responses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "question_1",
    "answerText": "choice_1",
    "answerMediaUrl": null
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "responseId": "response_1",
    "savedAt": "2025-01-06T12:00:00.000Z"
  }
}
```

### 12. Save Audio Response
```bash
curl -X POST http://localhost:5000/api/responses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "question_2",
    "answerText": null,
    "answerMediaUrl": "http://localhost:5000/uploads/audio-1234567890.mp3"
  }'
```

### 13. Get User Responses
```bash
curl -X GET "http://localhost:5000/api/responses?userId=user_1&assessmentId=assessment_1" \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "questionId": "question_1",
      "answerText": "choice_1",
      "answerMediaUrl": null,
      "isCorrect": true,
      "recordedAt": "2025-01-06T12:00:00.000Z"
    },
    {
      "questionId": "question_2",
      "answerText": null,
      "answerMediaUrl": "http://localhost:5000/uploads/audio-1234567890.mp3",
      "isCorrect": null,
      "recordedAt": "2025-01-06T12:05:00.000Z"
    }
  ]
}
```

## 📊 Submission & Results Examples

### 14. Submit Assessment
```bash
curl -X POST http://localhost:5000/api/assessments/assessment_1/submit \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "responses": [
      {
        "questionId": "question_1",
        "answerText": "choice_1"
      },
      {
        "questionId": "question_2",
        "answerMediaUrl": "http://localhost:5000/uploads/audio-1234567890.mp3"
      },
      {
        "questionId": "question_3",
        "answerText": "My favorite hobby is reading books. I enjoy exploring different genres and learning new things through literature."
      }
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "resultId": "result_1",
    "score": 66.67,
    "total": 100,
    "details": {
      "perQuestion": [
        {
          "questionId": "question_1",
          "isCorrect": true,
          "feedback": "Correct answer"
        },
        {
          "questionId": "question_2",
          "isCorrect": false,
          "feedback": "Requires manual grading"
        },
        {
          "questionId": "question_3",
          "isCorrect": false,
          "feedback": "Requires manual grading"
        }
      ]
    },
    "submittedAt": "2025-01-06T12:10:00.000Z"
  }
}
```

### 15. Get Assessment Results
```bash
curl -X GET "http://localhost:5000/api/assessments/assessment_1/results?userId=user_1" \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_1",
    "assessmentId": "assessment_1",
    "score": 66.67,
    "total": 100,
    "details": {
      "perQuestion": [
        {
          "questionId": "question_1",
          "isCorrect": true,
          "feedback": "Correct answer"
        }
      ]
    },
    "submittedAt": "2025-01-06T12:10:00.000Z"
  }
}
```

## 🤖 AI Generation Examples

### 16. Generate Questions (Admin Only)
```bash
curl -X POST http://localhost:5000/api/ai/generate-questions \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Business Communication",
    "count": 3,
    "difficulty": "medium",
    "type": "mcq",
    "style": "professional",
    "saveToAssessmentId": "assessment_1"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "text": "What is the most appropriate way to start a business email?",
        "type": "mcq",
        "choices": [
          {"text": "Hey there!", "isCorrect": false},
          {"text": "Dear Sir/Madam,", "isCorrect": true},
          {"text": "Yo!", "isCorrect": false},
          {"text": "Hi buddy!", "isCorrect": false}
        ]
      }
    ],
    "savedCount": 3
  }
}
```

## 📁 File Upload Examples

### 17. Upload Audio File
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@/path/to/recording.mp3"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:5000/uploads/file-1234567890.mp3"
  }
}
```

### 18. Upload Video File
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@/path/to/video.mp4"
```

## 🔍 Error Examples

### 19. Validation Error
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "123"
  }'
```

**Response:**
```json
{
  "error": "Validation failed",
  "data": {
    "errors": [
      "email: Invalid email format",
      "password: Password must be at least 6 characters"
    ]
  }
}
```

### 20. Authentication Error
```bash
curl -X GET http://localhost:5000/api/auth/me
```

**Response:**
```json
{
  "error": "Access token required"
}
```

### 21. Not Found Error
```bash
curl -X GET http://localhost:5000/api/assessments/non-existent-id
```

**Response:**
```json
{
  "error": "Assessment not found"
}
```

## 🧪 Testing with Postman

### Import Collection
1. Create a new Postman collection
2. Add the base URL: `http://localhost:5000/api`
3. Set up environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (set after login)
   - `admin_token`: (set after admin login)

### Pre-request Scripts
For authenticated requests, add this pre-request script:
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

### Test Scripts
Add this test script to save tokens:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.data && response.data.token) {
        pm.environment.set('token', response.data.token);
    }
}
```

## 📋 Frontend Integration Checklist

- [ ] **Hero/ModulesGrid**: `GET /api/modules` ✅
- [ ] **SectionList**: `GET /api/modules/:slug/sections` ✅
- [ ] **RulesPage**: `GET /api/sections/:id/rules` ✅
- [ ] **QuestionsPage**: `GET /api/assessments/:id/questions?page=1&limit=1` ✅
- [ ] **Save Response**: `POST /api/responses` ✅
- [ ] **Submit Assessment**: `POST /api/assessments/:id/submit` ✅
- [ ] **ResultsPage**: `GET /api/assessments/:id/results?userId=` ✅
- [ ] **File Upload**: `POST /api/upload` ✅
- [ ] **AI Generation**: `POST /api/ai/generate-questions` ✅

All endpoints are ready for frontend integration with exact field names and response formats as specified.
