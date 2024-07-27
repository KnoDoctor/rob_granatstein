import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-primary text-primary-foreground">
      <span className="text-xs">
        &copy; <a href={'https://www.epochnorth.ca'}>Epoch North</a>. All rights reserved.
      </span>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacy
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Terms
        </Link>
      </nav>
    </footer>
  )
}

export default Footer
