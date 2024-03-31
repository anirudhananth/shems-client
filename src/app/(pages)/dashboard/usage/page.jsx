
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
import { select } from "@nextui-org/react"

export default function Component() {
    const [deletedIds, setDeletedIds] = useState([]);
    const [locationList, setLocationsList] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [displayData, setDisplayData] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [hasSelectedDuration, setHasSelectedDuration] = useState(false);
    const [hasSelectedLocation, setHasSelectedLocation] = useState(false);

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

    const lastWeekData = async () => {
        try {
            const id = localStorage.getItem('customerId');
            const response = await fetch(`http://${id}.localhost:8080/api/v1/location/consumption_interval?interval=week`, {
                method: 'GET',
            })
            const data = await response.json()

            let addressMap = new Map();
            data.forEach((d) => {
                addressMap.set(d.address, {
                    id: d.address,
                    data: []
                });
            });

            data.forEach((d) => {
                addressMap.get(d.address).data.push({
                    x: d.timeUnit,
                    y: d.total,
                });
            });
            addressMap = Array.from(addressMap.values());
            setDisplayData(addressMap);
            setHasData(true);

            return new Response(JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }

    const getData = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        let time = 'day';

        switch (formData.get('duration')) {
            case '0':
                time = 'day';
                break;
            case '1':
                time = 'week';
                break;
            case '2':
                time = 'month';
                break;
            case '3':
                time = 'three_months';
                break;
            default:
                time = 'day';
                break;
        }

        const location = formData.get('location');
        const id = localStorage.getItem('customerId');
        const response = await fetch(`http://${id}.localhost:8080/api/v1/location${location == '0' ? "" : '/' + location}/consumption_interval?interval=${time}`, {
            method: 'GET',
        })
        const data = await response.json()

        let addressMap = new Map();
        data.forEach((d) => {
            addressMap.set(d.address, {
                id: d.address,
                data: []
            });
        });

        data.forEach((d) => {
            addressMap.get(d.address).data.push({
                x: d.timeUnit,
                y: d.total,
            });
        });
        addressMap = Array.from(addressMap.values());

        setSelectedDuration(formData.get('duration'));
        setSelectedLocation(formData.get('location'));
        setDisplayData(addressMap);
        setHasData(true);
        return new Response(JSON.stringify(data));
    }

    useEffect(() => {
        getLocations();
        lastWeekData();
    }, []);

    if (!locationList) return (<div>Loading...</div>);

    return (
        <div>
            <div className="mt-10 px-6 h-auto overflow-auto">
                <form onSubmit={getData}>
                    <div className="grid gap-8 mb-8 md:grid-cols-3 xl:grid-cols-3">
                        <Card className="bg-white px-6">
                            <div className="">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-md font-medium">Choose a location</CardTitle>
                                    <LocationIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Select name="location" onValueChange={e => setHasSelectedLocation(true)} className="text-start">
                                            <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                                                <SelectValue placeholder="Select Location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem id={0} value="0">All Locations</SelectItem>
                                                {locationList != [] && locationList.map((location, i) => (
                                                    <SelectItem key={locationList.id} id={i + 1} value={location.id.toString().trim()}>{location.address.trim()}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                        <Card className="bg-white px-6">
                            <div className="">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-md font-medium">Select a time period</CardTitle>
                                    <TimeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Select name="duration" onValueChange={e => setHasSelectedDuration(true)}>
                                            <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem id={0} value="0">Day</SelectItem>
                                                <SelectItem id={1} value="1">Last week</SelectItem>
                                                <SelectItem id={2} value="2">Last month</SelectItem>
                                                <SelectItem id={3} value="3">Last three months</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                        <Card className="bg-white px-6">
                            <div className="">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-md font-medium">View your data</CardTitle>
                                    <DataIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <Button type="submit"
                                        className="w-28 font-bold bg-gray-600 hover:bg-[#c74f54] hover:text-white"
                                        disabled={hasSelectedDuration && hasSelectedLocation ? false : true}
                                    >
                                        Results
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </form>
                <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-1">
                    <Card className="bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">User Statistics (in kWh)</CardTitle>
                            <BarChartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent className="overflow-auto">
                            <CurvedlineChart className="container w-full h-[750px] overflow-y-scroll" location={selectedLocation} data={displayData} hasData={hasData} duration={parseInt(selectedDuration)} />
                        </CardContent>
                    </Card>
                </div>
            </div>
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

function TimeIcon(props) {
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
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    )
}

function DataIcon(props) {
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
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
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
}

function CurvedlineChart(props) {
    if (!props.hasData || props.duration == null) return (<div>No data to display</div>);
    const isDayDuration = props.duration;

    const transformData = (data, currentHour) => {
        return data.map(d => ({
            ...d,
            data: d.data.map(point => {
                let date = new Date();
                if (point.x > currentHour) {

                    date.setDate(date.getDate() - 1);
                }
                date.setHours(point.x, 0, 0, 0);
                return { ...point, x: date };
            })
        }));
    };

    const currentHour = new Date().getHours();

    const formattedData = isDayDuration == 0 ? transformData(props.data, currentHour) : props.data.map(d => ({
        ...d,
        data: d.data.map(point => ({
            ...point,
            x: new Date(point.x)
        }))
    }));

    const xScale = {
        type: "time",
        format: isDayDuration == 0 ? "%H" : isDayDuration == 3 ? "%Y-%m-%d %H:%M:%S" : "%Y-%m-%d",
        useUTC: false,
        precision: isDayDuration == 0 ? "hour" : "day",
    };

    const xFormat = isDayDuration == 0 ? "time:%H" : isDayDuration == 3 ? "time:%Y-%m-%d" : "time:%Y-%m-%d";

    const axisBottom = {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Time",
        legendOffset: 45,
        legendPosition: "middle",
        format: isDayDuration == 0 ? "%H" : isDayDuration == 3 ? "%b %d" : "%b %d",
        tickValues: isDayDuration == 0 ? "every 1 hour" : isDayDuration == 3 ? "every 1 week" : isDayDuration == 2 ? "every 2 days" : "every 1 day",
    };

    return (
        <div {...props}>
            <ResponsiveLine
                data={formattedData}
                enableCrosshair={false}
                margin={{ top: 50, right: 110, bottom: 250, left: 60 }}
                xScale={xScale}
                xFormat={xFormat}
                yScale={{
                    type: "linear",
                    min: 0,
                    max: "auto",
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={axisBottom}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Energy Consumed",
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
                        anchor: "top-left",
                        direction: "column",
                        justify: false,
                        translateX: 0,
                        translateY: 520,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 25,
                        symbolSize: 18,
                        symbolShape: "circle",
                        fontSize: 18,
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