'use client'
import Link from "next/link"
import { Bot, CircleUser, CopyPlus, LineChart, LogOut, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { addData } from "@/server/action"
import { useToast } from "@/components/ui/use-toast"

export default function page() {
  const [sav, setSav] = useState(true)
  const {toast} = useToast()
  async function sData() {
    let sc = document.querySelector('.sc').value
    let eqpt = document.querySelector('.eqpt').value
    let fdel = document.querySelector('.fdel').value
    let tdel = document.querySelector('.tdel').value
    let deldate = document.querySelector('.deldate').value
    let ddel = document.querySelector('.ddel').value
    if (sc && eqpt && fdel && tdel && deldate && ddel) {
      setSav(false)
      await addData({ sc, eqpt, fdel, tdel, deldate, ddel })
      setSav(true)
      toast({
        description: "New Delay Added",
      })
    }
    else{
      toast({
        description: "Enter All Fields",
      })
    }
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        </nav>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">( New Delay )</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-12 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="/Statistics" className="flex items-center gap-2 font-semibold hover:text-primary">
              <LineChart className="size-6"/>
              Statistics
            </Link>
            <Link href="#" className="flex items-center gap-2 font-semibold text-primary">
              <CopyPlus className="size-6"/>
              New Delay
            </Link>
            <Link href="#" className="flex items-center gap-2 font-semibold hover:text-primary">
              <Bot className="size-6"/>
              Prediction AI
            </Link>
            <Link href="/" className="flex items-center gap-2 font-semibold hover:text-primary">
              <LogOut className="size-6"/>
              LogOut
            </Link>
          </nav>
          <div className="grid gap-3">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Delay Date</CardTitle>
              </CardHeader>
              <CardContent>
                <input className="deldate flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="date" id="dateInput" name="dateInput" pattern="\d{2}/\d{2}/\d{4}" placeholder="mm/dd/yyyy" required />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>From Delay</CardTitle>
                <CardDescription>
                  When did the Delay start?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input className="fdel flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="text" />

              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>To Delay</CardTitle>
                <CardDescription>
                  When did the Delay end?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input className="tdel flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="text" />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Shop Code</CardTitle>
              </CardHeader>
              <CardContent>
                <input className="sc flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="text" />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <input className="eqpt flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="text" />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Delay Description</CardTitle>
                <CardDescription className="cd flex gap-2 items-center">
                  Continued Delay?
                  <Checkbox id="include" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input className="ddel flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="text" />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                {sav ? (

                  <Button onClick={sData}>Save</Button>
                ) : (
                  <Button disabled>Saving..</Button>

                )}
              </CardFooter>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}

