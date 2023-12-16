/**
 * v0 by Vercel.
 * @see https://v0.dev/t/i1jBshVM6Fa
 */
'use client'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import React, { useEffect } from "react";
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
    const [deletedIds, setDeletedIds] = React.useState([]);
    const [deviceList, setDeviceList] = React.useState([]);
    const [locationIds, setLocationIds] = React.useState('');
    const [locationList, setLocationList] = React.useState([])
    const [allowedTypes, setAllowedTypes] = React.useState([]);;
    const [allowedModels, setAllowedModels] = React.useState([]);
    const [currentType, setCurrentType] = React.useState('');
    const [currentModel, setCurrentModel] = React.useState([]);

    const getLocations = async () => {
        try {
            const id = localStorage.getItem('customerId');
            const response = await fetch(`http://${id}.localhost:8080/api/v1/location/all`, {
                method: 'GET',
            })
            const data = await response.json()
            setLocationList(data);
            setLocationIds(data.map(d => d.id));
            return new Response(JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    const getDevices = async () => {
        try {
            const id = localStorage.getItem('customerId');
            const response = await fetch(`http://${id}.localhost:8080/api/v1/device/get`, {
                method: 'GET',
            })
            const data = await response.json()

            setDeviceList(data);
            return new Response(JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }

    const getAllowedTypes = async () => {
        try {
            const id = localStorage.getItem('customerId');
            const response = await fetch(`http://localhost:8080/api/v1/device/allowed`, {
                method: 'GET',
            })
            const data = await response.json()
            let types = await Object.keys(data);
            setAllowedTypes(types);
            setAllowedModels(data);
            console.log("Um: ", types);
            return new Response(JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        getDevices();
        getAllowedTypes();
    }, []);

    async function deleteDevices(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const deviceIds = [...deletedIds];
        const id = localStorage.getItem('customerId');
        const response = await fetch(`http://${id}.localhost:8080/api/v1/device/delete_multiple`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceIds: deviceIds,
            })
        })
        const data = await response.json()
    }


    async function deleteDevice(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let tempIds = [...deletedIds];
        let tempDeviceList = deviceList.filter(d => {
            if (d.id == formData.get('id')) {
                tempIds.push(d.id);
                return false;
            }
            return true;
        });

        setDeviceList(tempDeviceList);
        setDeletedIds(tempIds);
        setCanShow(true);
    }

    async function addDevice(event) {
        event.preventDefault()
        const id = localStorage.getItem('customerId');

        const formData = new FormData(event.currentTarget)
        const response = await fetch(`http://${id}.localhost:8080/api/v1/device/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: formData.get('type'),
                modelNumber: formData.get('model'),
                locationId: formData.get('location'),
            })
        })
        const data = await response.json()
        let tempDeviceList = [...deviceList];
        tempDeviceList.push(data);
        setDeviceList(tempDeviceList);
    }

    const changeType = (value) => {
        setCurrentType(value);
        setCurrentModel(allowedModels[value]);
        console.log(allowedModels[value])
    }
    console.log(currentModel)


    const [canShow, setCanShow] = React.useState(false)

    return (
        <div className="w-full">
            <Dialog>
                <DialogTrigger asChild className="ml-[5%]">
                    <Button size="lg" className="text-gray-800 bg-gray-200 border border-none hover:bg-gray-600 hover:text-gray-100">Add Device</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add a new device</DialogTitle>
                        <DialogDescription>
                            Enter the details of the device you want to add.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={addDevice}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Select name="type" onValueChange={(e) => changeType(e)}>
                                    <Label htmlFor="type" className="text-right">
                                        Type
                                    </Label>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            allowedTypes.map((type, i) => (
                                                <SelectItem className="button cursor-pointer" type="button" id={i} value={type}>{type}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Select name="model" id="model-name">
                                    <Label htmlFor="model" className="text-right">
                                        Model
                                    </Label>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            currentModel.map((type, i) => (
                                                <SelectItem className="button cursor-pointer" type="button" id={i} value={type}>{type}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Location" className="text-right">
                                    Location
                                </Label>
                                <Select name="location">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {locationList.map((location, i) => (
                                            <SelectItem id={i} value={location.id.toString()}>{location.address}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogClose asChild className="text-end ml-[76%]">
                            <Button type="submit" className="bg-gray-400 hover:bg-gray-700 rounded-md" size="lg">Add</Button>
                        </DialogClose>
                    </form>
                </DialogContent>
            </Dialog>
            <Table className="w-full my-8 ml-[5%] mr-[5%]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4 font-bold">Type</TableHead>
                        <TableHead className="w-1/4 font-bold">Model</TableHead>
                        <TableHead className="w-1/4 font-bold">Address</TableHead>
                        <TableHead className="w-1/4 font-bold"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deviceList.map((device) => (
                        <TableRow key={device.id}>
                            <TableCell className="font-medium">{device.type}</TableCell>
                            <TableCell>{device.modelNumber}</TableCell>
                            <TableCell>{device.location.address}</TableCell>
                            <TableCell className="text-begin">
                                <form onSubmit={deleteDevice}>
                                    <Input id="id" type="hidden" value={device.id} name="id" />
                                    <Button className="w-fit text-black hover:text-gray-100 hover:bg-gray-400" size="sm" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </Button>
                                </form>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {!canShow &&
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="text-gray-800 bg-gray-200 hover:text-gray-100 hover:bg-gray-600 ml-[80%]" size="lg">
                            Save
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Save Changes?</DialogTitle>
                            <DialogDescription>
                                You have not made any changes.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="text-end">
                            <Button type="button" className="bg-gray-400 hover:bg-gray-700 rounded-md">Close</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            }
            {canShow &&
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="text-gray-800 bg-gray-200 hover:text-gray-100 hover:bg-gray-600 ml-[80%]" size="lg">
                            Save
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Save Changes?</DialogTitle>
                            <DialogDescription>
                                This will delete the devices removed from the list.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                            <form onSubmit={deleteDevices} className="text-end">
                                <Button type="submit" className="bg-gray-400 hover:bg-gray-700 rounded-md">Delete</Button>
                            </form>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}

