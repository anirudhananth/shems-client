/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PBR5bGamwFR
 */
'use client'
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@auth0/nextjs-auth0/client"
import { getSession } from '@auth0/nextjs-auth0';
import { FormEvent } from 'react'

async function updateCustomer() {
    try {
        console.log("updateCustomer");
        // const session = await getSession();
        // const accessToken = session?.accessToken;
        // console.log(accessToken);

        const externalApiResponse = await fetch(`http://localhost:8080/api/v1/user/register`);

        if (!externalApiResponse.ok) {
            throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
        }

        const data = await externalApiResponse.json();
        console.log(data);
        return new Response(JSON.stringify(data));
    } catch (err) {
        console.error("WHAT: ", err);
    }
}

export default function Component() {
  let address = "XYZ Street, NY";

  async function onSubmit(event) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    console.log(formData.get('name'));
    const response = await fetch('http://localhost:8080/api/v1/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            billingAddress: address,
        }),
    })
    
    // Handle response if necessary
    const data = await response.json()
    // ...
  }
  const { user } = useUser();
  return (
    <Card className="mx-auto max-w-md space-y-6 p-6">
      <CardHeader>
        <h1 className="text-3xl font-bold">Hi, { user.name }!</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your personal details.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={user.name} name="name" required readOnly/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} name="email" required type="email" readOnly/>
          </div>
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* </div> */}
          <div className="space-y-2">
            <Label htmlFor="food-preferences">Billing Address</Label>
            <Input id="food-preferences" placeholder="XYZ Street, NY" onChange={(e) => address = e.target.value}/>
          </div>
          <Button className="w-full hover:bg-gray-300" type="submit">
            Save
          </Button>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}

