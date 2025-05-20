import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService
  ) {}

  public async talkToBot(payload: any): Promise<any> {
    console.log('payload', payload);
    const { conversation } = payload;
    const API_KEY = this.configService.get('OPENAI_API_KEY');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini-2024-07-18',
        messages: conversation,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('response.data.choices[0]', response.data.choices[0]);
    return response.data.choices[0].message.content;
  }
}
