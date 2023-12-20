/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cPhdvIApuPO
 */
'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Component() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  // [user, setUser] = useState(user);
  useEffect(() => {
    if(user) {
      router.push('/dashboard/main');
    }
  }, [user, router]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  return (
    <div className="flex flex-col min-h-[100vh] bg-[#ffffff]">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-[#ffffff]">
        {/* <Link className="flex items-center justify-center" href="#">
          <FacebookIcon className="h-6 w-6" />
          <span className="sr-only">Company Name</span>
        </Link> */}
        { user && 
        <nav className="ml-auto flex gap-4 sm:gap-6 mr-20">
          <Link className="text-black text-sm font-medium hover:underline underline-offset-4" href="/dashboard/main">
            Dashboard
          </Link>
        </nav> }
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#f7f7f7]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-black text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Smart Home Energy Management System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A platform designed for you. Accessible. Customizable. Open Source.
                </p>
              </div>
              { true &&
                <div className="space-x-4">
                  <Button className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                    <Link href="/api/auth/login">Log In</Link>
                  </Button>
                </div>
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FacebookIcon(props = {}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props = {}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props = {}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
