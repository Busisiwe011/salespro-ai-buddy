# Sales Copilot Pro

Build a web application called "SalesPro AI" — an AI Productivity Copilot for retail brand promoters and field sales representatives. Build the full application in one pass, including working AI functionality for all three core features.

DESIGN

Clean, professional SaaS style — white/light background, dark text, one accent colour (amber #F97316), rounded cards, clear hierarchy. Left sidebar navigation on desktop, collapsible on mobile. Keep styling clean but simple — prioritize functionality over decoration.

LAYOUT

Sidebar: app name "SalesPro AI", nav items — Overview, Research Assistant, Copilot, Communication Studio. Top greeting: "Good morning, Busisiwe 👋"

PAGE 1: OVERVIEW

Simple welcome section plus 3 buttons linking to each of the 3 tools. Include a small dismissible banner: "AI-generated content — review before use. AI may produce inaccurate or incomplete information."

PAGE 2: RESEARCH ASSISTANT (fully functional with real AI)

Title: "Sales Research Assistant." Mode selector: Product Brief | Competitor Comparison | Promotion Briefing | Sales Insights. Text input area. "Generate Brief" button with loading state.

Use this system instruction for the AI:

"You are a retail sales research assistant helping brand promoters and field sales representatives quickly understand products, competitors, and promotions before customer interactions. RULES: Only use information provided by the user. Never invent product specs, prices, promotions, or claims not given. If information is missing, explicitly state what's missing rather than guessing. Keep language simple and practical for live sales conversations. No medical, legal, or financial claims."

Structure Product Brief output as: Product / Key Benefits / Target Customer / Top Selling Points / Potential Objections / Suggested Responses / Information to verify. Structure the other 3 modes similarly with relevant sections. Add a working "Copy" button. Show a friendly message if the user generates with empty input.

PAGE 3: COPILOT (fully functional with real AI)

Title: "SalesPro Copilot." Chat interface with message bubbles, input box, send button, loading indicator, and conversation history within the session.

4 quick-action chips that pre-fill the input: "Handle an objection", "Explain a product", "Prepare a sales pitch", "Write a manager update".

System instruction: "You are SalesPro Copilot, helping retail sales reps with objection handling, product explanations, sales pitch prep, and manager communication. Never invent product specs, prices, or claims not given in the conversation — if you don't have the info, say so and ask for it. Keep responses short, practical, and usable in the moment. Ask one clarifying question if a request is ambiguous. No medical, legal, or financial claims."

PAGE 4: COMMUNICATION STUDIO (fully functional with real AI)

Title: "Sales Communication Studio." Form: Email Type dropdown (Client Follow-up, Manager Update, Store Report, Product Enquiry, Customer Response), Audience dropdown (Customer, Store Manager, Sales Manager, Team Member), Tone (Professional, Friendly, Persuasive, Concise), text area for key info. "Generate Email" button with loading state.

System instruction: "You are a professional sales communication assistant. Write clear, appropriate emails based only on the information given. Never invent facts, prices, or commitments not provided by the user. Match the selected tone and audience."

Output: Subject line + email body, with a working "Copy" button.

RESPONSIBLE AI

Include a small reusable "review before use" note near each AI output, not just on the Overview page.

IMPORTANT

Build this efficiently in as few generation steps as possible. Prioritize working functionality over visual polish. All three features must actually call the AI and return real responses — no static placeholders.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://salespro-ai-buddy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c840fa6e-d003-4858-be88-6f3fe7e25410).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
