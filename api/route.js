require('dotenv').config();
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()

// middleware to parse json req bodies
app.use(express.json())
// app.use(cors({
//     origin: 'http://127.0.0.1:5500'
// }))

// POST req to send email

app.post('/send-email', (req, res) => {
    
    const { name, email, phone, service, message } = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        }
    })

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: 'vikingdesignsyeg@gmail.com',
        subject: `New Contact Submission from ${name}`,
        text: `
            Name: ${name},
            Email: ${email},
            Phone: ${phone},
            Services: ${service},
            Message: ${message}
        `
    }

    try {
        transporter.sendMail(mailOptions)

        return res.status(200).json({message: 'Email sent successfully'})
    } catch (error) {
        console.log(error)

        return res.status(500).json({message: 'failed'})
    }

})

// const PORT = process.env.PORT || 5500;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
