/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'ronyislam502@gmail.com',
      pass: 'wvee deqy yqje xqaw',
    },
  });

  await transporter.sendMail({
    from: 'ronyislam502@gmail.com', // sender address
    to: 'rafsanalnahiyan@gmail.com', // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: 'Password reset', // plain text body
    html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 0;">
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center; background-color: #00466a; color: white; padding: 10px;">
              <h1 style="margin: 0;">Password Reset</h1>
          </div>
          <div style="padding: 20px;">
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the button below to reset it.</p>
              <p>If you did not request a password reset, please ignore this email.</p>
              <p>Thanks,</p>
              <p>Memes canvas</p>
          </div>
          <div style="text-align: center; background-color: #f1f1f1; color: #555; padding: 10px;">
              <p style="margin: 0;">&copy; 2024 Fresh Blogs. All rights reserved.</p>
          </div>
      </div>
  </div>`, // html body
  });
};
