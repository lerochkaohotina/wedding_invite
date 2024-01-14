import nodemailer from 'nodemailer'
import {config} from 'dotenv';

config();

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    },
});

export const mailer = (message, callback) => {
    transporter.sendMail(message, (err, info) => {
        console.log(err, info);
        callback(err, info)
    })
}