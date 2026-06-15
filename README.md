# InterviewIQ

InterviewIQ is an AI-powered mock interview platform that helps users practice interviews, get detailed feedback, and track their improvement over time.

The platform generates interview questions based on the user's resume, conducts voice-based interviews, and provides AI-generated performance reports. Users can also purchase additional interview credits through Razorpay.

## Features

- Google Authentication using Firebase
- Resume upload and analysis
- AI-generated interview questions
- Voice-based interview experience
- Detailed interview reports
- Interview history tracking
- Credit-based usage system
- Razorpay payment integration

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer

### Services
- Firebase Authentication
- OpenRouter API
- Razorpay

## How It Works

1. Sign in using Google.
2. Upload your resume.
3. The AI analyzes your resume and generates interview questions.
4. Answer questions through voice input.
5. Receive a detailed report with strengths, weaknesses, and suggestions for improvement.
6. Review previous interviews from the history section.

## Running Locally

### Clone the repository

```bash
git clone https://github.com/yourusername/InterviewIQ.git
cd InterviewIQ
```

### Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=
MONGODB_URL=
JWT_SECRET=
OPENROUTER_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Create a `.env` file inside the client folder.

```env
VITE_RAZORPAY_KEY_ID=
```

### Start the project

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## Future Improvements

- Company-specific interview preparation
- Webcam-based interview mode
- ATS resume scoring
- Coding interview mode
- Personalized learning roadmap

## Author

Archit Dhingra
