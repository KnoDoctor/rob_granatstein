'use server'

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export type State = {
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
  message?: string | null
  successMessage?: string | null
}

//This sets the zod Schema for the Study Form, it defines the form validation logic for the studie database entity
const ContactUsFormSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  subject: z.string().min(1, 'Please enter a subject'),
  message: z.string().min(1, 'Please enter a message'),
})

// Use Zod to update the expected types

export async function sendContactUsEmail(
  state: State | undefined,
  formData: FormData,
): Promise<State | undefined> {
  // Validate form using Zod
  const validatedFields = ContactUsFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Submit the Form.',
    }
  }

  const { name, email, subject, message } = validatedFields.data

  try {
    // EMAIL STUFF GOES HERE
    console.log({ name, email, subject, message })

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
      return {
        successMessage: 'Thank you for contacting us. We will get back to you soon.',
      }
    } else {
      return {
        message: 'An error occurred. Please try again later.',
      }
    }
  } catch (error) {
    // If an error occurs, return a specific error.
    return {
      message: 'An error occurred. Please try again later.',
    }
  }
}
