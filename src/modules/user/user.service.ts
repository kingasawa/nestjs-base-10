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

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-turbo',
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
    } catch (error) {
      console.log('error', error);
    }
  }
}
