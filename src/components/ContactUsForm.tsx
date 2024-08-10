'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { sendContactUsEmail } from '@/lib/actions/email'
import { useFormState } from 'react-dom'

export default function ContactUsForm() {
  const initialState = { message: null, errors: {}, successMessage: null }

  const [state, dispatch] = useFormState(sendContactUsEmail, initialState)

  return (
    <form action={dispatch} className="mt-4 grid gap-4">
      {/* Success Message */}
      {state?.successMessage ? (
        <p>{state.successMessage}</p>
      ) : (
        <>
          {/* Error Handling for Each Input Field */}
          <div id="study-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <Input name="name" type="text" placeholder="Name" className="w-full" />
          <div id="study-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <Input name="email" type="email" placeholder="Email" className="w-full" />
          <div id="study-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.subject &&
              state.errors.subject.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <Input name="subject" type="text" placeholder="Subject" className="w-full" />
          <div id="study-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.message &&
              state.errors.message.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <Textarea name="message" placeholder="Message" className="w-full" />
          <Button
            type="submit"
            className="w-full bg-red-600 transition-colors hover:bg-red-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Submit
          </Button>
        </>
      )}
    </form>
  )
}
