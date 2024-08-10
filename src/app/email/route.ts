// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'barfieldjt@gmail.com', // Change to your recipient
//   from: 'no-reply@robgranatstein.ca', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

export const POST = async (request: Request) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    }: {
      name: string
      email: string
      subject: string
      message: string
    } = await request.json()

    const msg = {
      to: ['meagan.trush@gmail.com', 'barfieldjt@gmail.com'],
      from: {
        email: 'no-reply@robgranatstein.ca',
        name: 'Contact Rob Request',
      },
      reply_to: {
        email: email,
        name: name,
      },
      templateId: 'd-ac8581d32f2946109f3dc387aeda58eb',
      dynamic_template_data: {
        name,
        email,
        subject,
        message,
      },
    }

    const emailRes = await sgMail.send(msg)
    if (emailRes[0].statusCode === 202) {
      return Response.json({ success: true, message: 'Email sent successfully', emailRes })
    } else {
      return Response.json({ success: false, message: 'Email failed to send.', emailRes })
    }
  } catch (error) {
    return Response.json({ success: false, message: 'Email failed to send.', error })
  }
}
