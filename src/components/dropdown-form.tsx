/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/XNwPuNa0X7A
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function dropdown_form() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="voice-category">Voice Category</Label>
            <Select key="voice-category">
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
          <div className="space-y-2">
            <Label htmlFor="language-category">Language</Label>
            <Select key="language-category">
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model-category">Model</Label>
            <Select key="model-category">
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input id="temperature" placeholder="Enter Temperature" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-greeting">Custom Greeting</Label>
            <Textarea className="min-h-[100px]" id="custom-greeting" placeholder="Enter your custom greeting" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline">Reset</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}
