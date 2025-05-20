import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';

const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://api.openai.com/v1",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
}
const api = axios.create(axiosConfig);

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService
  ) {}

  public async talkToBot(payload: any): Promise<any> {
    const API_KEY = this.configService.get('OPENAI_API_KEY');
    console.log('API_KEY', API_KEY);
    api.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${API_KEY}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    console.log('payload', payload);
    const { conversation } = payload;

    try {
      const response = await axios.post(
        '/chat/completions',
        {
          model: 'gpt-4-turbo',
          messages: conversation,
        },
      );
      console.log('response.data.choices[0]', response.data.choices[0]);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.log('error', error);
    }
  }
}
