# Office Hours - Iterative Retreat

An AI-powered office hours booking app that allows users to have real-time voice conversations with AI clones of Brian and Hsu Ken using ElevenLabs Conversational AI.

## Features

- **Voice Conversations**: Real-time voice chat powered by ElevenLabs Conversational AI
- **Live Transcripts**: Follow along with text transcripts during the conversation
- **Session Timer**: Track conversation duration
- **Minimal UI**: Clean, dark interface focused on the conversation
- **No Authentication**: Instant access - just click and start talking

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure ElevenLabs

1. Create agents on [ElevenLabs](https://elevenlabs.io/app/agents):

   - Create one agent for Brian
   - Create one agent for Hsu Ken
   - Configure their personalities and knowledge bases on the ElevenLabs platform

2. Get your API key from [ElevenLabs API Settings](https://elevenlabs.io/app/settings/api-keys)

3. Copy the agent IDs from your created agents

### 3. Set Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
NEXT_PUBLIC_BRIAN_AGENT_ID=your_brian_agent_id
NEXT_PUBLIC_HSU_KEN_AGENT_ID=your_hsu_ken_agent_id
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom dark theme
- **@elevenlabs/react** - ElevenLabs voice AI SDK
- **pnpm** - Package manager

## Usage

1. Navigate to the home page
2. Choose either Brian or Hsu Ken
3. Click "Start Conversation" and allow microphone access
4. Speak naturally - the AI will respond in real-time
5. Watch the live transcript appear as you chat
6. End the conversation when you're done

## Deployment

Deploy to Vercel:

```bash
vercel
```

Make sure to add your environment variables in the Vercel project settings.

## Project Structure

```
/app
  /conversation/[agent]
    page.tsx          # Dynamic conversation route
  page.tsx            # Landing page
  layout.tsx          # Root layout
  globals.css         # Global styles
/components
  ConversationInterface.tsx  # Main conversation component
/lib
  elevenlabs.ts       # Agent configuration
```
