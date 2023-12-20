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
import { useState } from 'react'
import { useEffect } from 'react'

export default function Component() {
  let name, email;
  let customerData;

  const [address, setAddress] = useState('');

  const getCustomer = async () => {
    try {
        const id = localStorage.getItem('customerId');
        
        let headers = new Headers();
        headers.append("User", id.toString());

        const externalApiResponse = await fetch(`http://${id}.localhost:8080/api/v1/user/me`, {
            method: 'GET',
            // headers,
        });

        if (!externalApiResponse.ok) {
            throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
        }

        const data = await externalApiResponse.json();
        
        if(!data) return;
        customerData = data;
        return new Response(JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(() => {
    getCustomer();
  }, []);


  async function onSubmit(event) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Card className="mx-auto max-w-md space-y-6 p-6 bg-gray-200">
      <CardHeader>
        <h1 className="text-3xl font-bold text-gray-700">Hi, { user.name }!</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your personal details.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={user.name} name="name" className="bg-gray-100" required readOnly/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} name="email" className="bg-gray-100" required type="email" readOnly/>
          </div>
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* </div> */}
          <div className="space-y-2">
            <Label htmlFor="food-preferences">Billing Address</Label>
            <Input id="food-preferences" placeholder="XYZ Street, NY" className="bg-gray-100" value={address ? address: ""} onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <Button className="w-full bg-gray-400 hover:bg-gray-700 rounded-md" type="submit">
            Save
          </Button>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}

