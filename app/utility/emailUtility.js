import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_PSS, EMAIL_USER } from '../config/config.js';

const SendEmail = async (EmailTo, EmailSubject, EmailText, EmailHTMLBody) => {
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PSS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: EMAIL_USER,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
        html: EmailHTMLBody
    };
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch(err) {
        console.error("Email sending error: ", err); 
        return false;
    }
};

export default SendEmail;
