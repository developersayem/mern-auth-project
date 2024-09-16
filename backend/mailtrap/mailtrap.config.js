import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

if (!TOKEN) {
  throw new Error('MAILTRAP_TOKEN is missing in .env file');
}

export const mailtrapClient = new MailtrapClient({ token: TOKEN });

export const sender = {
  email: 'mailtrap@demomailtrap.com',
  name: 'MERN Auth Project',
};
