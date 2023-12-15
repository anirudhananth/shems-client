/**
 * v0 by Vercel.
 * @see https://v0.dev/t/i1jBshVM6Fa
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import React from "react";
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"


export default function Component() {
    return (
        <Table className="w-full my-8">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/2">Product</TableHead>
                    <TableHead className="w-1/4">Price</TableHead>
                    <TableHead className="w-1/4">Availability</TableHead>
                    <TableHead className="w-1/4">Location</TableHead>
                    <TableHead className="w-1/4">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Product 1</TableCell>
                    <TableCell>$100</TableCell>
                    <TableCell>In Stock</TableCell>
                    <TableCell>
                        <div className="space-y-2">
                            <Select id="voice-category">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Voice Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Button className="w-full" size="sm">
                            Add to cart
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Product 2</TableCell>
                    <TableCell>$200</TableCell>
                    <TableCell>Out of Stock</TableCell>
                    <TableCell>
                    <div className="space-y-2">
                            <Select id="voice-category">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Voice Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Button className="w-full" disabled size="sm">
                            Add to cart
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Product 3</TableCell>
                    <TableCell>$300</TableCell>
                    <TableCell>In Stock</TableCell>
                    <TableCell>
                    <div className="space-y-2">
                            <Select id="voice-category">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Voice Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Button className="w-full" size="sm">
                            Add to cart
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

