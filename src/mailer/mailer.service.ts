import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailerService {
    private transporter = nodemailer.createTransport({
      service: 'gmail',
    auth: {
      pass: 'rgqh wpaa xgwg kwna',
      user: 'bozorboyevazizjon56@gmail.com  ',
    },
  });


    async sendEmail(to: string, subject: string, text: string) {
        try {
            await this.transporter.sendMail({
              to,
              subject,
              text,
            });
            return 'Email sent successfully';
        } catch (error) {
            console.log('Error sending email:', error);
            return 'Error sending email';
        }
     }

}
