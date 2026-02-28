# jotjotjot ✨

A beautiful rich text editor with viral-ready sharing capabilities. Write beautifully, share everywhere.

## Features

- 🎨 **Beautiful Design** - Cyan gradient theme with glassmorphism effects
- ✍️ **Rich Text Editing** - Bold, italic, headings, lists, quotes, code blocks, links
- 🔗 **Shareable Links** - One-click sharing with beautiful link previews
- 🖼️ **Auto-Generated OG Images** - Beautiful cards for iMessage, Twitter, Slack, Discord, LinkedIn
- ⌨️ **Keyboard Shortcuts** - ⌘B (bold), ⌘I (italic), ⌘U (underline)
- 📱 **Responsive** - Works on all devices

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel KV** - Redis storage for shares
- **Radix UI** - Accessible components
- **Lucide React** - Icons

## Setup

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Set Up Vercel KV

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new KV database (Storage > KV > Create)
3. Copy the environment variables

### 3. Configure Environment Variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Add your Vercel KV credentials:

```env
KV_URL=your_kv_url
KV_REST_API_URL=your_rest_api_url
KV_REST_API_TOKEN=your_token
KV_REST_API_READ_ONLY_TOKEN=your_read_only_token

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

### Creating & Sharing

1. **Write** - Use the rich text editor to create your content
2. **Click Share** - Generates a unique shareable link
3. **Link Copied** - Paste anywhere (iMessage, Twitter, Slack, etc.)
4. **Beautiful Preview** - Auto-generated card with your content

### Link Previews

When you share a link, recipients see:
- Your content with the cyan gradient background
- "Created with JotJot" branding
- Beautiful card preview in all apps

### Storage

- Shares stored in Vercel KV (Redis)
- 30-day expiration
- No authentication required
- Read-only for viewers

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel Dashboard
4. Deploy!

```bash
vercel
```

### Update Base URL

After deployment, update `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## API Routes

- `POST /api/share` - Create a new share
- `GET /api/share/[id]` - Get share content
- `GET /api/og` - Generate OG image

## File Structure

```
app/
├── api/
│   ├── share/
│   │   ├── route.ts          # Create share
│   │   └── [id]/route.ts     # Get share
│   └── og/
│       └── route.tsx          # OG image generation
├── s/
│   └── [id]/
│       ├── page.tsx           # Shared view page
│       └── shared-view.tsx    # Shared view component
├── layout.tsx
└── page.tsx

components/
└── rich-text-editor.tsx       # Main editor component
```

## Future Ideas

- 🤖 AI writing assistant (GPT-4)
- 🎤 Voice-to-text input
- 📸 Export as image (PNG/JPEG)
- 🎨 Custom themes
- 📊 Analytics for shares
- 🔐 Password-protected shares
- ⏰ Custom expiration times

## License

MIT

---

Built with ❤️ using Next.js and Vercel

