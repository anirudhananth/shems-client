/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zump6zjeVnu
 */
'use client'
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Component() {
    const [deletedIds, setDeletedIds] = useState([]);
    const [locationList, setLocationsList] = useState([])

    const getLocations = async () => {
        try {
            const id = localStorage.getItem('customerId');
            const response = await fetch(`http://${id}.localhost:8080/api/v1/location/all`, {
                method: 'GET',
            })
            const data = await response.json()

            setLocationsList(data);
            return new Response(JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    return (
        <div>
            <div className="mt-10 px-6 h-auto overflow-auto">
                <div className="grid gap-6 mb-8 md:grid-cols-4 xl:grid-cols-4">
                    <Card className="bg-white">
                        <div className="">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-md font-medium">Choose a location</CardTitle>
                                <LocationIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Select name="location" onValueChange={(e) => e}>
                                        <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem id={0} value="0">All Locations</SelectItem>
                                            {locationList.map((location, i) => (
                                                <SelectItem id={i + 1} value={location.id.toString()}>{location.address}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                    <Card className="bg-white">
                        <div className="">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-md font-medium">Choose a device</CardTitle>
                                <DeviceIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Select name="location" onValueChange={(e) => e}>
                                        <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem id={0} value="0">All Locations</SelectItem>
                                            {locationList.map((location, i) => (
                                                <SelectItem id={i + 1} value={location.id.toString()}>{location.address}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                    <Card className="bg-white">
                        <div className="">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-md font-medium">Select a time period</CardTitle>
                                <LocationIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Select name="location" onValueChange={(e) => e}>
                                        <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem id={0} value="0">All Locations</SelectItem>
                                            {locationList.map((location, i) => (
                                                <SelectItem id={i + 1} value={location.id.toString()}>{location.address}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                    <Card className="bg-white">
                        <div className="">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-md font-medium">Choose a location</CardTitle>
                                <LocationIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Select name="location" onValueChange={(e) => e}>
                                        <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem id={0} value="0">All Locations</SelectItem>
                                            {locationList.map((location, i) => (
                                                <SelectItem id={i + 1} value={location.id.toString()}>{location.address}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                </div>
                <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-1">
                    <Card className="bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">User Statistics (in kWh)</CardTitle>
                            <BarChartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent className="overflow-auto">
                            <CurvedlineChart className="container w-full h-[500px] overflow-y-scroll" />
                        </CardContent>
                    </Card>
                </div>
                {/* <Card className="bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell className="text-right">Credit Card</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>$150.00</TableCell>
                <TableCell className="text-right">PayPal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell>Unpaid</TableCell>
                <TableCell>$350.00</TableCell>
                <TableCell className="text-right">Bank Transfer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV004</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>$450.00</TableCell>
                <TableCell className="text-right">Credit Card</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV005</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>$550.00</TableCell>
                <TableCell className="text-right">PayPal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card> */}
            </div>
        </div>
    )
}

function BarChart(props) {
    const className = props.className;
    return (
        <div className={className}>
            <ResponsiveBar
                data={[]}
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
                // axisLeft={{
                //   tickSize: 5,
                //   tickPadding: 5,
                //   tickRotation: 0,
                //   legend: "Number",
                //   legendPosition: "middle",
                //   legendOffset: -45,
                //   truncateTickAt: 0,
                // }}
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


function BarChartIcon(props) {
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
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
        </svg>
    )
}


function CalendarIcon(props) {
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
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}

function PieChart(props /* see data tab */) {
    return (
        <div className={props.className + "!overflow-auto"}>
            <ResponsivePie
                data={[]}
                margin={{ top: 80, right: 80, bottom: 80, left: -160 }}
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
                // fill={[
                //     {
                //         match: {
                //             id: 'ruby'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'c'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'go'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'python'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'scala'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'lisp'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'elixir'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'javascript'
                //         },
                //         id: 'lines'
                //     }
                // ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'column',
                        justify: false,
                        translateX: 250,
                        translateY: -220,
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


    // <ResponsivePie
    //     data={[{
    //       "id": "javascript",
    //       "value": 355,
    //     },
    //     {
    //       "id": "ruby",
    //       "value": 150,
    //     }]}
    //     margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    //     innerRadius={0.5}
    //     padAngle={0.7}
    //     cornerRadius={3}
    //     colors={{ scheme: 'nivo' }}
    //     borderWidth={1}
    //     borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    //     enableRadialLabels={false}
    //     sliceLabel={({ datum }) => `${datum.id}: ${datum.value}`}
    //     enableSlicesLabels={true}
    //     slicesLabelsTextColor="#333333"
    // />


}

function CurvedlineChart(props) {
    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: "B",
                        data: [
                            { x: "2018-01-01", y: 7 },
                            { x: "2018-01-02", y: 5 },
                            { x: "2018-01-03", y: 11 },
                            { x: "2018-01-04", y: 9 },
                            { x: "2018-01-05", y: 12 },
                            { x: "2018-01-06", y: 16 },
                            { x: "2018-01-07", y: 13 },
                            { x: "2018-01-08", y: 13 },
                        ],
                    },
                    {
                        id: "A",
                        data: [
                            { x: "2018-01-01", y: 9 },
                            { x: "2018-01-02", y: 8 },
                            { x: "2018-01-03", y: 13 },
                            { x: "2018-01-04", y: 6 },
                            { x: "2018-01-05", y: 8 },
                            { x: "2018-01-06", y: 14 },
                            { x: "2018-01-07", y: 11 },
                            { x: "2018-01-08", y: 12 },
                        ],
                    },
                ]}
                enableCrosshair={false}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d",
                    useUTC: false,
                    precision: "day",
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{
                    type: "linear",
                    min: 0,
                    max: "auto",
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "X",
                    legendOffset: 45,
                    legendPosition: "middle",
                    format: "%b %d",
                    tickValues: "every 1 day",
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Y",
                    legendOffset: -45,
                    legendPosition: "middle",
                }}
                colors={{ scheme: "paired" }}
                pointSize={5}
                pointColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                pointBorderWidth={2}
                pointBorderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                pointLabelYOffset={-12}
                useMesh={true}
                curve="monotoneX"
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolSize: 14,
                        symbolShape: "circle",
                    },
                ]}
                theme={{
                    tooltip: {
                        container: {
                            fontSize: "12px",
                        },
                    },
                }}
                role="application"
            />
        </div>
    )
}

function DeviceIcon(props) {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24'"
                height="24"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        qqqq<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        </div>
    )
}
function LocationIcon(props) {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
            </svg>
        </div>
    )
}


function ouseDollarSignIcon(props) {
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


function FlagIcon(props) {
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
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" x2="4" y1="22" y2="15" />
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


function LayoutDashboardIcon(props) {
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
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
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
