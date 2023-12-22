
'use client'
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie'

export default function Component() {
  const [locationConsumptions, setLocationConsumptions] = useState([]);
  const [deviceConsumptions, setDeviceConsumptions] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [totalConsumptionDelta, setTotalConsumptionDelta] = useState(0);
  const [averageConsumption, setAverageConsumption] = useState(0);
  const [averageConsumptionDelta, setAverageConsumptionDelta] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceDelta, setTotalPriceDelta] = useState(0);
  const [allTimePrice, setAllTimePrice] = useState(0);

  const getTotalConsumption = async () => {
    try {
      const id = localStorage.getItem('customerId');
      const externalApiResponse = await fetch(`http://${id}.localhost:8080/api/v1/location/total`, {
        method: 'GET',
      });

      if (!externalApiResponse.ok) {
        throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
      }

      const data = await externalApiResponse.json();

      setTotalConsumption(round(data.total, 1));
      setTotalConsumptionDelta(round(data.percentageDelta, 1));

      return new Response(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  const getAverageConsumption = async () => {
    try {
      const id = localStorage.getItem('customerId');
      const externalApiResponse = await fetch(`http://${id}.localhost:8080/api/v1/location/avg`, {
        method: 'GET',
      });

      if (!externalApiResponse.ok) {
        throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
      }

      const data = await externalApiResponse.json();
      setAverageConsumption(round(data.total, 1));
      setAverageConsumptionDelta(round(data.percentageDelta, 1));

      return new Response(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  const getTotalPrice = async () => {
    try {
      const id = localStorage.getItem('customerId');
      const externalApiResponse = await fetch(`http://${id}.localhost:8080/api/v1/price/total`, {
        method: 'GET',
      });

      if (!externalApiResponse.ok) {
        throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
      }

      const data = await externalApiResponse.json();

      setTotalPrice(round(data.price, 1));
      setTotalPriceDelta(round(data.percentageDelta, 1));

      return new Response(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  const getAllTimePrice = async () => {
    try {
      const id = localStorage.getItem('customerId');
      const externalApiResponse = await fetch(`http://${id}.localhost:8080/api/v1/price/history`, {
        method: 'GET',
      });

      if (!externalApiResponse.ok) {
        throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
      }

      const data = await externalApiResponse.json();

      setAllTimePrice(round(data.price, 1));

      return new Response(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  const getDeviceConsumption = async () => {
    try {
      const id = localStorage.getItem('customerId');
      const externalApiResponse = await fetch(`http://${id}.localhost:8080/api/v1/device/consumption`, {
        method: 'GET',
      });

      if (!externalApiResponse.ok) {
        throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
      }

      let data = await externalApiResponse.json();
      data = data.map(d => {
        return {
          name: d.type,
          data: Math.floor(d.value)
        }
      })
      setDeviceConsumptions(data);
      return new Response(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  const getLocationConsumption = async () => {
    try {
      const id = localStorage.getItem('customerId');
      const externalApiResponse = await fetch(`http://${id}.localhost:8080/api/v1/location/consumption`, {
        method: 'GET',
      });

      if (!externalApiResponse.ok) {
        throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
      }

      let data = await externalApiResponse.json();
      data = data.map(d => {
        return {
          id: d.address,
          value: Math.floor(d.total)
        }
      })
      setLocationConsumptions(data);
      return new Response(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getLocationConsumption();
    getDeviceConsumption();
    getTotalConsumption();
    getAverageConsumption();
    getTotalPrice();
    getAllTimePrice();
  }, []);

  return (
    <div>
      <div className="mt-10 px-6 h-auto overflow-auto">
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Energy Consumed</CardTitle>
              <AverageIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConsumption} kWh</div>
              <p className={`text-xs font-bold ${totalConsumptionDelta > 0 ? "text-[#de0a26]" : "text-[#79B791]"}`}>
                {totalConsumptionDelta > 0 ? '+' : ''}
                {totalConsumptionDelta}% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Average Consumption per Device</CardTitle>
              <DeviceIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageConsumption} kWh</div>
              <p className={`text-xs font-bold ${averageConsumptionDelta > 0 ? "text-[#de0a26]" : "text-[#79B791]"}`}>
                {averageConsumptionDelta > 0 ? '+' : ''}
                {averageConsumptionDelta}% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Current Month Expense</CardTitle>
              <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPrice}</div>
              <p className={`text-xs font-bold ${totalPriceDelta > 0 ? "text-[#de0a26]" : "text-[#79B791]"}`}>
                {totalPriceDelta > 0 ? '+' : ''}
                {totalPriceDelta}% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">All time expense</CardTitle>
              <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${allTimePrice}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Device Energy Consumption (in kWh)</CardTitle>
              <BarChartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <BarChart className="w-full h-[500px]" data={deviceConsumptions} />
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">User Statistics (in kWh)</CardTitle>
              <UsageIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent className="overflow-auto">
              <PieChart className="container w-full h-[500px] overflow-y-scroll" data={locationConsumptions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function UsageIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#000000" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
    </svg>
  )
}

function BarChart(props) {
  const className = props.className;
  return (
    <div className={className}>
      <ResponsiveBar
        data={props.data}
        keys={["data"]}
        indexBy="name"
        margin={{ top: 0, right: 10, bottom: 55, left: 100 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "set3" }}
        borderWidth={1}
        layout="horizontal"
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
          legend: "Energy Consumed",
          legendPosition: "middle",
          legendOffset: 45,
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

function DeviceIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  )
}

function BarChartIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#000000" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  )
}

function AverageIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
    </svg>
  )
}

function PieChart(props) {
  return (
    <div className={props.className + "!overflow-auto + !z-10"}>
      <ResponsivePie
        data={props.data}
        margin={{ top: 80, right: 110, bottom: 90, left: -160 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              2
            ]
          ]
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        legends={[
          {
            anchor: 'top',
            direction: 'column',
            justify: false,
            translateX: 225,
            translateY: 20,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 28,
            itemTextColor: 'rgb(75 85 99)',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function FolderIcon(props) {
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
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  )
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


function ViewIcon(props) {
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
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  )
}
