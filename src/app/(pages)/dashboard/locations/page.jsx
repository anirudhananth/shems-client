/**
 * v0 by Vercel.
 * @see https://v0.dev/t/i1jBshVM6Fa
 */
'use client'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import React from "react";
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
    const [locationsList, setLocationsList] = React.useState([])
    const [currentBedrooms, setCurrentBedrooms] = React.useState(0)
    const [currentOccupants, setCurrentOccupants] = React.useState(0)
    const [currentSquareFootage, setCurrentSquareFootage] = React.useState(0)
    const [currentAddress, setCurrentAddress] = React.useState('')
    const [currentZipCode, setCurrentZipCode] = React.useState(0)

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

    React.useEffect(() => {
        getLocations();
    }, []);

    async function deleteLocations(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const locationsIds = [...deletedIds];
        const id = localStorage.getItem('customerId');
        const response = await fetch(`http://${id}.localhost:8080/api/v1/location/delete_multiple`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationsIds)
        })
        const data = await response.json()
    }

    async function deleteLocation(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let tempIds = [...deletedIds];
        let tempLocationsList = locationsList.filter(d => {
            if (d.id == formData.get('id')) {
                tempIds.push(d.id);
                return false;
            }
            return true;
        });

        setLocationsList(tempLocationsList);
        setDeletedIds(tempIds);
        setCanShow(true);
    }

    async function addlocations(event) {
        event.preventDefault()
        const id = localStorage.getItem('customerId');

        const formData = new FormData(event.currentTarget)
        const response = await fetch(`http://${id}.localhost:8080/api/v1/location/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                squareFootage: formData.get('squareFootage'),
                numberOfBedrooms: formData.get('bedrooms'),
                numberOfOccupants: formData.get('occupants'),
                address: formData.get('address'),
                zipCode: formData.get('zipcode'),
            })
        })
        const data = await response.json()

        let templocationsList = [...locationsList];
        templocationsList.push(data);
        setLocationsList(templocationsList);

    }

    const [canShow, setCanShow] = React.useState(false)
    // numberOfBedrooms, squareFootage, address, zipCode

    return (
        <div className="w-full">
            <Dialog>
                <DialogTrigger asChild className="ml-[14%]">
                    <Button size="lg" className="text-gray-800 bg-gray-200 border border-none hover:bg-gray-600 hover:text-gray-100">
                        Add Location
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add a new location</DialogTitle>
                        <DialogDescription>
                            Enter the details of the location you want to add.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={addlocations}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bedrooms" className="text-right">
                                    Number of Bedrooms
                                </Label>
                                <Input
                                    id="bedrooms"
                                    type="number"
                                    placeholder="2"
                                    className="col-span-3"
                                    name="bedrooms"
                                    onChange={(e) => setCurrentBedrooms(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="occupants" className="text-right">
                                    Number of Occupants
                                </Label>
                                <Input
                                    id="occupants"
                                    type="number"
                                    placeholder="2"
                                    className="col-span-3"
                                    name="occupants"
                                    onChange={(e) => setCurrentOccupants(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="squareFootage" className="text-right">
                                    Square Footage
                                </Label>
                                <Input
                                    id="squareFootage"
                                    type="number"
                                    placeholder="1400"
                                    className="col-span-3"
                                    name="squareFootage"
                                    onChange={(e) => setCurrentSquareFootage(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-right">
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    placeholder="XYZ Street, NY"
                                    className="col-span-3"
                                    name="address"
                                    onChange={(e) => setCurrentAddress(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="zipcode" className="text-right">
                                    Zip Code
                                </Label>
                                <Input
                                    id="zipcode"
                                    type="number"
                                    placeholder="11201"
                                    className="col-span-3"
                                    name="zipcode"
                                    onChange={(e) => setCurrentZipCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogClose asChild className="text-end ml-[76%]">
                            <Button
                                type="submit"
                                className="bg-gray-400 hover:bg-gray-700 rounded-md"
                                size="lg"
                                disabled={currentBedrooms == 0 || currentOccupants == 0 || currentSquareFootage == 0 || currentAddress == '' || currentZipCode == 0}
                            >Add</Button>
                        </DialogClose>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="w-[90%] h-[32rem] my-8 ml-[5%] mr-[5%] overflow-y-scroll bg-scroll">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/8 font-bold">Beds</TableHead>
                            <TableHead className="w-1/6 font-bold">Square Footage</TableHead>
                            <TableHead className="w-1/6 font-bold">Number of Occupants</TableHead>
                            <TableHead className="w-1/2 font-bold">Address</TableHead>
                            <TableHead className="w-1/6 font-bold">Zip Code</TableHead>
                            <TableHead className="w-1/6 font-bold"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locationsList.map((locations) => (
                            <TableRow key={locations.id}>
                                <TableCell className="font-medium">{locations.numberOfBedrooms}</TableCell>
                                <TableCell>{locations.squareFootage}</TableCell>
                                <TableCell>{locations.numberOfOccupants}</TableCell>
                                <TableCell>{locations.address}</TableCell>
                                <TableCell>{locations.zipCode}</TableCell>
                                <TableCell className="text-begin">
                                    <form onSubmit={deleteLocation}>
                                        <Input id="id" type="hidden" value={locations.id} name="id" />
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
            </div>
            {!canShow &&
                <Dialog>
                    <DialogTrigger asChild className="text-end">
                        <Button className="text-gray-800 bg-gray-200 hover:text-gray-100 hover:bg-gray-600 ml-[79%]" size="lg">
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
                        <Button className="text-gray-800 bg-gray-200 hover:text-gray-100 hover:bg-gray-600 ml-[88%]" size="lg">
                            Save
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Save Changes?</DialogTitle>
                            <DialogDescription>
                                This will delete the Locations removed from the list.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                            <form onSubmit={deleteLocations} className="text-end">
                                <Button type="submit" className="bg-gray-400 hover:bg-gray-700 rounded-md">Delete</Button>
                            </form>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}

