import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WhatsappService } from './whatsapp.service';
import { OpenAIService } from './openai.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly openAIService: OpenAIService
  ) {}

  @Get('test')
  test() {
    return 'Damith';
  }

  @Get('webhook')
challengeWebhook(@Req() req: Request, @Res() res: Response) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (
      mode === 'subscribe' &&
      token === process.env.WHATSAPP_CHALLENGE_KEY
    ) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge); // 👉 VERY IMPORTANT!
    } else {
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(400);
}


  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      const entry = req.body.entry?.[0];
      const changes = entry?.changes?.[0]?.value;

      const senderNumber = changes?.contacts?.[0]?.wa_id;
      const senderName = changes?.contacts?.[0]?.profile?.name;
      const messageText = changes?.messages?.[0]?.text?.body;

      if (!senderNumber || !messageText) {
        console.log("Missing sender number or message text.");
        return res.sendStatus(400);
      }

      console.log("Sender Name:", senderName);
      console.log("Sender Number:", senderNumber);
      console.log("Message Text:", messageText);

      // Use OpenAIService to generate a reply
      const aiReply = await this.openAIService.generateCompletion(messageText);
      await this.whatsappService.sendMessage(senderNumber, aiReply);

      res.sendStatus(200);
    } catch (error) {
      console.error("Error handling webhook:", error);
      res.sendStatus(400);
    }
  }
}
