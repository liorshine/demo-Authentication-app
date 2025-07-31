import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        //create hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === 'VERIFY') {
        await User.findByIdAndUpdate(userId, 
            {verifyToken: hashedToken,  verifyTokenExpiry: Date.now() + 3600000})
    } else if (emailType === 'RESET') {
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken,  forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        
        // var transport = nodemailer.createTransport({
        //     host: process.env.EMAIL_HOST,
        //     port: Number(process.env.EMAIL_PORT),
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASSWORD
        //     }
        //  });

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "dd4abeb927ad44",
            pass: "24872db1d0f5ff"
        }
        });

         const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
            here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.
            or copy and paste this link into your browser: <br>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a>
            </p>`}

            const mailresponse = await transport.sendMail(mailOptions);
            return mailresponse;
    } catch (error: any) {
        throw new Error(error.message); 
    }
}