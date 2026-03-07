This is a [Next.js](https://nextjs.org) project with an AI-powered Markdown editor.

## Features

- **Live Markdown Editor** with Monaco Editor
- **AI-Powered Structure** - Convert messy notes into structured Markdown using Google Gemini
- **Live Preview** with syntax highlighting
- **Slash Commands** and toolbar formatting
- **Drag & Drop** image uploads

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Set up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Generative AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
```

To get a Google Gemini API key:

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy it to your `.env.local` file

### 3. Run Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Try the AI Structure Feature

1. Navigate to [http://localhost:3000/editor](http://localhost:3000/editor)
2. Paste some messy notes into the editor
3. Click the **✨ Structure** button in the toolbar
4. Watch as AI converts it into properly structured Markdown!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
