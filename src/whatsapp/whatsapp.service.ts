import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OpenAIService } from './openai.service'; // Adjust the import path as needed

@Injectable()
export class WhatsappService {

    constructor(private openaiService: OpenAIService) {}



  async sendMessage(to: string, message: string) {
    let data = JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "text",
      text: {
        preview_url: false,
        body: message
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        console.log('API Error:', error.response.data);
      } else {
        console.log(error);
      }
    }
  }
}
