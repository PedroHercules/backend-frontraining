import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface InterfaceData {
    to: String, // Change to your recipient
    from: String, // Change to your verified sender
    subject: String,
    // text: 'and easy to do anywhere, even with Node.js',
    html: String,
}

const sendEmail = (receiver: String, source: String, subject: String, content: String) => {
    try{
        const data: any = {
            to: receiver, // Change to your recipient
            from: source, // Change to your verified sender
            subject: subject,
            // text: 'and easy to do anywhere, even with Node.js',
            html: content,
        }
        return sgMail.send(data)
    } catch (e: any) {
        return new Error(e);
    }
}

export default sendEmail;