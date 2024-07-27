import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

import type { Media } from 'payload-types'
import Image from 'next/image'

const Page = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  const page = await payload.find({
    collection: 'pages',
    page: 1,
  })

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 grid gap-6 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {page?.docs?.[0]?.banner_title}
            </h1>
            <p className="text-xl font-medium">{page?.docs?.[0]?.banner_subtitle}</p>
          </div>
          <div className="flex justify-center">
            <Image
              src={(page?.docs?.[0]?.bio_photo as Media)?.url ?? ''}
              width="300"
              height="300"
              alt="Candidate"
              className="rounded-full w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-6 md:py-12 lg:py-24">
        <div className="container px-4 md:px-6 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Jane Doe</h2>
            <p className="mt-4 text-muted-foreground">
              Jane Doe is a lifelong public servant with a proven track record of delivering results
              for her community. As a state representative, she has championed legislation to
              improve education, protect the environment, and support small businesses. Jane is
              known for her bipartisan approach and ability to bring people together to solve
              complex problems.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Key Policy Positions
            </h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <h3 className="font-medium">Education</h3>
                <p>
                  Increase funding for public schools, expand access to early childhood education,
                  and invest in teacher professional development.
                </p>
              </li>
              <li>
                <h3 className="font-medium">Environment</h3>
                <p>
                  Promote renewable energy, protect natural habitats, and combat climate change
                  through sustainable policies.
                </p>
              </li>
              <li>
                <h3 className="font-medium">Economy</h3>
                <p>
                  Support small businesses, invest in infrastructure, and create jobs in emerging
                  industries.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full py-6 md:py-12 lg:py-24 bg-muted">
        <div className="container px-4 md:px-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="bg-background rounded-md p-6 shadow-sm h-48">
              <h3 className="text-xl font-semibold">Volunteer</h3>
              <p className="mt-2 text-muted-foreground">
                Join our team of dedicated volunteers and help make a difference in your community.
              </p>
              <Button variant="outline" className="mt-4">
                Sign Up
              </Button>
            </div>
            <div className="bg-background rounded-md p-6 shadow-sm h-48">
              <h3 className="text-xl font-semibold">Donate</h3>
              <p className="mt-2 text-muted-foreground">
                Your financial support helps us continue our important work. Every contribution
                makes a difference.
              </p>
              <Button variant="outline" className="mt-4">
                Donate
              </Button>
            </div>
          </div>
          <div className="bg-background rounded-md p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Contact</h3>
            <p className="mt-2 text-muted-foreground">
              Have a question or want to learn more? Get in touch with us and we&apos;ll be happy to
              assist.
            </p>
            <form className="mt-4 grid gap-4">
              <Input type="text" placeholder="Name" className="w-full" />
              <Input type="email" placeholder="Email" className="w-full" />
              <Textarea placeholder="Message" className="w-full" />
              <Button type="submit" className="w-full">
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
