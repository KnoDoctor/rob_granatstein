import { FilmIcon, MessageSquareCodeIcon } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex gap-2 py-5 px-5 bg-slate-50 text-white items-center">
      {/* <MessageSquareCodeIcon className="text-red-600" /> */}
      <Link href="/" className="text-xl font-bold">
        <h1 className="text-red-600">Rob Granatstein</h1>
      </Link>
      {/* |
      <Link href="/add" className="text-xl font-light">
        Political Stuff
      </Link> */}
    </header>
  )
}
