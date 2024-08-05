export const revalidate = 5
import parse from 'html-react-parser'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

import type { Media } from 'payload-types'
import Image from 'next/image'

import {
  UserGroupIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  AdjustmentsVerticalIcon,
} from '@heroicons/react/24/solid'

const iconLookup = {
  'user-group': <UserGroupIcon className="size-8 mr-4" />,
  'building-library': <BuildingLibraryIcon className="size-8 mr-4" />,
  'building-office-2': <BuildingOffice2Icon className="size-8 mr-4" />,
  'adjustments-vertical': <AdjustmentsVerticalIcon className="size-8 mr-4" />,
}

const Page = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  const page = await payload.find({
    collection: 'pages',
    page: 1,
  })

  return (
    <main className="flex-1">
      {/* <section className="w-full bg-[url('https://images.unsplash.com/photo-1665494131942-b5fdc8985e18?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat py-24 md:py-32 lg:py-40">
        <div className="container flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-slate-100">
              {page?.docs?.[0]?.banner_title}
            </h1>
            <p className="text-xl text-secondary-foreground md:text-2xl text-slate-100">
              {page?.docs?.[0]?.banner_subtitle}
            </p>
          </div>
          <p className="max-w-[600px] text-slate-100 md:text-xl">
            Bringing a fresh perspectives and a commitment to political engagement to the OLP.
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-red-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Connect with Rob
          </Link>
        </div>
      </section> */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100 ">
        <div className="container px-4 md:px-6 grid gap-6 md:grid-cols-2 items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {page?.docs?.[0]?.banner_title}
            </h1>
            <p className="text-xl font-medium">{page?.docs?.[0]?.banner_subtitle}</p>
          </div>
          <div className="flex justify-center">
            <Image
              src={`${process.env.WEBSITE_URL}${(page?.docs?.[0]?.bio_photo as Media)?.url}` ?? ''}
              width="300"
              height="300"
              alt="Candidate"
              className="rounded-full w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-6 md:py-12 lg:py-24 key-messages">
        <div className="container px-4 md:px-6 grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl underline decoration-red-600">
              {page?.docs?.[0]?.key_message_1_title}
            </h2>
            {parse(page?.docs?.[0]?.key_message_1_body_html ?? '')}
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl underline decoration-red-600">
              {page?.docs?.[0]?.key_messages_title}
            </h2>
            <ul className="mt-4 space-y-16">
              {page?.docs?.[0]?.key_messages_list?.map((key_message) => {
                return (
                  <li key={key_message?.id}>
                    <div className="flex">
                      {iconLookup[key_message?.key_message_icon ?? 'adjustments-vertical']}
                      <h3 className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl">
                        {key_message?.key_message_title}
                      </h3>
                    </div>
                    <p>{key_message?.key_message_body}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full py-6 md:py-12 lg:py-24 bg-muted">
        <div className="container px-4 md:px-6 grid gap-6 place-items-center">
          {/* <div className="space-y-4">
            <div className="bg-background rounded-md p-6 shadow-sm h-48">
              <h3 className="text-xl font-semibold underline decoration-red-600">
                {page?.docs?.[0]?.cta_1_title}
              </h3>
              <p className="mt-2 text-muted-foreground">{page?.docs?.[0]?.cta_1_body}</p>
              <Button variant="outline" className="mt-4">
                Sign Up
              </Button>
            </div>
            <div className="bg-background rounded-md p-6 shadow-sm h-48">
              <h3 className="text-xl font-semibold underline decoration-red-600">
                {page?.docs?.[0]?.cta_2_title}
              </h3>
              <p className="mt-2 text-muted-foreground">{page?.docs?.[0]?.cta_2_body}</p>
              <Button variant="outline" className="mt-4">
                Donate
              </Button>
            </div>
          </div> */}
          <div className="bg-background rounded-md p-6 shadow-sm max-w-[800px]">
            <h3 className="text-xl font-semibold underline decoration-red-600">
              {page?.docs?.[0]?.contact_form_title}
            </h3>
            <p className="mt-2 text-muted-foreground">{page?.docs?.[0]?.contact_form_body}</p>
            <form className="mt-4 grid gap-4">
              <Input type="text" placeholder="Name" className="w-full" />
              <Input type="email" placeholder="Email" className="w-full" />
              <Textarea placeholder="Message" className="w-full" />
              <Button
                type="submit"
                className="w-full bg-red-600 transition-colors hover:bg-red-600/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
