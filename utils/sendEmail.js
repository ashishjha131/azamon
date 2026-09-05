const nodeMailer = require("nodemailer");


const sendEmail = async(to, subject, text)=>{
    const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.user_email,
        pass: process.env.user_pass
    }
    })
    const mailOptions = {
        from: process.env.user_email,
        to,
        subject,
        text
    }

    await transporter.sendMail(mailOptions);

}
module.exports= {sendEmail};