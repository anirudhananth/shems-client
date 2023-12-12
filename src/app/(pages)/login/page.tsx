import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Component() {
  return (
    <Card className="bg-[#121212] text-white max-w-lg mx-auto mt-10 p-10 rounded-xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl">Welcome</CardTitle>
        <CardDescription>Sign in or create an account to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg" htmlFor="email">
            Email
          </Label>
          <Input
            className="bg-[#1E1E1E] h-10 pl-2 text-white"
            id="email"
            placeholder="m@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-lg" htmlFor="password">
            Password
          </Label>
          <Input className="bg-[#1E1E1E] h-10 pl-2 text-white" id="password" required type="password" />
        </div>
        <Button className="w-full h-12 bg-[#3F3F3F] hover:bg-[#4F4F4F] text-white rounded-md">Sign in</Button>
        <Link href="/api/auth/login"> Login </Link>
        <p className="text-center text-sm">or</p>
        <Button className="w-full h-12 bg-[#3F3F3F] hover:bg-[#4F4F4F] text-white rounded-md">Sign Up</Button>
      </CardContent>
    </Card>
  )
}