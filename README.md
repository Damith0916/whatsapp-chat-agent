# WhatsApp Bot with OpenAI Integration

A NestJS-based WhatsApp bot that uses the OpenAI API to generate intelligent replies to incoming WhatsApp messages.

## Features
- Receives WhatsApp messages via webhook
- Uses OpenAI (GPT-3.5-turbo) to generate AI-powered responses
- Sends replies back to the sender on WhatsApp
- Modular code structure with services for WhatsApp and OpenAI logic

## Project Structure
```
whatsapp_bot/
├── package.json
├── tsconfig.json
├── nest-cli.json
├── eslint.config.mjs
├── README.md
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── config/
│   │   └── AppConfig.ts
│   ├── openai/
│   │   └── openai.service.spec.ts
│   └── whatsapp/
│       ├── openai.service.ts
│       ├── whatsapp.controller.ts
│       ├── whatsapp.controller.spec.ts
│       ├── whatsapp.service.ts
│       └── whatsapp.service.spec.ts
└── test/
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

## Key Files
- `src/whatsapp/whatsapp.controller.ts`: Handles incoming WhatsApp webhooks and message flow.
- `src/whatsapp/whatsapp.service.ts`: Sends messages to WhatsApp using the Graph API.
- `src/whatsapp/openai.service.ts`: Handles communication with the OpenAI API.
- `src/config/AppConfig.ts`: Loads environment variables for configuration.
- `src/app.module.ts`: Registers controllers and providers.

## Environment Variables
Create a `.env` file in the project root with the following:
```
WHATSAPP_CHALLENGE_KEY=your_webhook_verify_token
WHATSAPP_ACCESS_TOKEN=your_whatsapp_graph_api_token
WHATSAPP_PHONE_ID=your_whatsapp_phone_id
OWN_PHONE_NUMBER=your_whatsapp_test_number
OPENAI_API_KEY=your_openai_api_key
```

## Installation
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Build the project:
   ```powershell
   npm run build
   ```
3. Start the server (development):
   ```powershell
   npm run start:dev
   ```

## Usage
- Expose your server to the internet (e.g., using [ngrok](https://ngrok.com/)) and set the webhook URL in your WhatsApp Business settings.
- When a WhatsApp message is received, the bot will reply with an AI-generated response.

## Testing
- Unit tests are in `*.spec.ts` files. Run all tests with:
   ```powershell
   npm test
   ```

## Dependencies
- [NestJS](https://nestjs.com/)
- [OpenAI Node.js SDK](https://www.npmjs.com/package/openai)
- [Axios](https://www.npmjs.com/package/axios)

## License
This project is for educational/demo purposes.
#
