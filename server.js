import express from "express";
import ViteExpress from "vite-express";
import {mailer} from "./server/sendMail.js";
import {config} from 'dotenv';

config();

const app = express();
app.use(express.json());
ViteExpress.config({ mode: process.env.MODE })

app.post('/api/send', (req, res) => {
    let mailHtml = ``;
    if (req.body?.name) {
        mailHtml += `<h2>От ${req.body.name}</h2>`
    }
    if (req.body?.message) {
        mailHtml += `<p>${req.body.message}</p>`
    }
    if (req.body?.quiz?.length) {
        mailHtml += `<ul>`
        for (const quizItem of req.body?.quiz) {
            mailHtml += `<li>${quizItem?.quest} - ${quizItem?.answer}</li>`
        }
        mailHtml += `</ul>`
    }

    mailer({
        from: process.env.MAILER_USER,
        to: process.env.MAILER_USER,
        subject: `От ${req.body?.name}`,
        html: mailHtml,
    }, (err) => {
        if (err) {
            res.status(400).json({
                success: false,
                value: 'Ошибка'
            })
        } else {
            res.status(200).json({
                success: true,
                value: 'Отправлено'
            })
        }
    })
});

ViteExpress.listen(app, process.env.PORT || 3000, () => console.log("Server is listening..."));