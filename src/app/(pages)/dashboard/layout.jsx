'use client'

import Link from "next/link"
import { ResponsiveBar } from "@nivo/bar"
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';

import { useEffect } from 'react';

export default function Component({ children }) {


  const router = useRouter();
  const pathname = usePathname();

  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return router.push('/api/auth/login');

  const updateCustomer = async (name, email) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email
        }),
      })

      
      const data = await response.json()
      localStorage.setItem('customerId', JSON.stringify(data.id));

    } catch (err) {
      console.error(err);
    }
  };

  

  useEffect(() => {
    updateCustomer(user.name, user.email);
  }, []);

  document.cookie = `accessToken=${user.sid}; path=/;`

  return (
    <div className="relative flex overflow-auto">
      <div className="fixed top-0 left-0 h-screen flex flex-col w-64 bg-white overflow-hidden bg-[#f1f1f1]">
        <div className="flex items-center justify-center h-20 shadow-md text-[42px] font-bold text-gray-700 border-r-4">
          SHEMS
        </div>
        <nav className="flex-1 px-6 py-4 bg-white overflow-y-auto bg-[#f1f1f1] border-r-4">
          <Link className={`flex items-center mt-2 py-2 px-6 text-gray-500 hover:bg-gray-200 hover:rounded-md hover:text-gray-700 ${pathname == "/dashboard/profile" ? 'text-white rounded-md font-semibold bg-gray-600 hover:text-white hover:bg-gray-600' : 'text-gray-500'
            }`} href="/dashboard/profile">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="mx-4 font-medium">Profile</span>
          </Link>
          <Link className={`flex items-center mt-2 py-2 px-6 text-gray-500 hover:bg-gray-200 hover:rounded-md hover:text-gray-700 ${pathname == "/dashboard/main" ? 'text-white rounded-md font-semibold bg-gray-600 hover:text-white hover:bg-gray-600' : 'text-gray-500'
            }`} href="/dashboard/main">
            <GroupIcon className="h-6 w-6" />

            <span className="mx-4 font-medium">Dashboard</span>
          </Link>
          <Link
            className={`flex items-center mt-2 py-2 px-6 text-gray-500 hover:bg-gray-200 hover:rounded-md hover:text-gray-700 ${pathname == "/dashboard/devices" ? 'text-white rounded-md font-semibold bg-gray-600 hover:text-white hover:bg-gray-600' : 'text-gray-500'
              }`}
            href="/dashboard/devices"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>

            <span className="mx-4 font-medium">Devices</span>
          </Link>
          <Link
            className={`flex items-center mt-2 py-2 px-6 text-gray-500 hover:bg-gray-200 hover:rounded-md hover:text-gray-700 ${pathname == "/dashboard/locations" ? 'text-white rounded-md font-semibold bg-gray-600 hover:text-white hover:bg-gray-600' : 'text-gray-500'
              }`}
            href="/dashboard/locations"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>

            <span className="mx-4 font-medium">Locations</span>
          </Link>
          <Link
            className={`flex items-center mt-2 py-2 px-6 text-gray-500 hover:bg-gray-200 hover:rounded-md hover:text-gray-700 ${pathname == "/dashboard/usage" ? 'text-white rounded-md font-semibold bg-gray-600 hover:text-white hover:bg-gray-600' : 'text-gray-500'
              }`}
            href="/dashboard/usage"
          >
            <UsageIcon className="h-6 w-6" />

            <span className="mx-4 font-medium">Usage</span>
          </Link>
          <Link
            className={`flex items-center mt-2 py-2 px-6 text-gray-500 hover:bg-gray-200 hover:rounded-md hover:text-gray-700 ${pathname == "" ? 'text-gray-100 rounded-md font-semibold bg-gray-600 hover:text-gray-200 hover:bg-gray-600' : 'text-gray-500'
              }`}
            href="/api/auth/logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>

            <span className="mx-4 font-medium">Log Out</span>
          </Link>
        </nav>
      </div>
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-100 ml-[15%] w-[80%]">
        <div className="px-6 py-4 border-b-4 w-[80%] ml-[10%]">
          <h2 className="text-2xl font-semibold text-gray-700 ml-[5%] mt-2">{
            pathname == "/dashboard/main" ? "Dashboard" : pathname == "/dashboard/devices" ? "Devices" : pathname == "/dashboard/profile" ? "Profile" : pathname == "/dashboard/locations" ? "Locations" : "Usage"
          }</h2>
        </div>
        <div className="mt-10 px-6 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          {
            name: "A",
            data: 111,
          },
          {
            name: "B",
            data: 157,
          },
          {
            name: "C",
            data: 129,
          },
          {
            name: "D",
            data: 187,
          },
          {
            name: "E",
            data: 119,
          },
          {
            name: "F",
            data: 22,
          },
          {
            name: "G",
            data: 101,
          },
          {
            name: "H",
            data: 83,
          },
        ]}
        keys={["data"]}
        indexBy="name"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Name",
          legendPosition: "middle",
          legendOffset: 45,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number",
          legendPosition: "middle",
          legendOffset: -45,
          truncateTickAt: 0,
        }}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}

function UsageIcon(props) {
  return (
    <svg 
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
      <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"/>
      <path d="M15 7h6v6"/>
    </svg>
  )
}

function GroupIcon(props) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  )
}