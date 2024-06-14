'use client'
import {
  Book,
  Bot,
  Code2,
  LifeBuoy,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  LogOut,
  BarChartBig,
  Printer,
  FileOutput,
  Table,
  Table2,
  Flashlight,
  FilePlus,
  FolderPlus
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { useEffect, useState, useCallback, MouseEvent, ChangeEvent } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { getData } from "../../server/action";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ModeToggle } from "../Components/darkmode";
import Graph from "../Components/graph"
import Link from "next/link"
import TableDemo from '../Components/table'
import { Checkbox } from "@/components/ui/checkbox"
import { Delayhandler } from '../Components/delayhandler'
import { useToast } from "@/components/ui/use-toast"

type DashboardProps = {
  className?: string;
};

type DataResponse = -1 | Array<{ [key: string]: any }>;

export default function Dashboard({ className }: DashboardProps) {
  const { toast } = useToast()
  const [rep, setRep] = useState(false);
  const [tog, setTog] = useState(true);


  useEffect(() => {
    console.log(rep, "REP")
  }, [rep]);

  const handleTog = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTog((prevTog) => !prevTog);
  }

  async function hhlander(hobj, hlist, ev) {
    console.log('lander', hobj, ev)
    if (hobj == -1 && ev == -1) {
      console.log(rep)
      setRep(false)
    }
    else {
      try {
        const res = await getData({ ...hobj, hlist, ev });
        console.log(res, 'res')
        let Objlen = Object.keys(hobj).length
        if (hlist.includes('CD')) {
          if (Objlen + 1 == hlist.length) {
            setRep(res !== -1 ? res : false);
          } else {
            setRep(false);
          }
        } else {
          if (Objlen == hlist.length) {
            setRep(res !== -1 ? res : false);
          } else {
            setRep(false);
          }

        }
      }catch (error) {
      console.error("Error fetching data:", error);
      setRep(false);
    }
  }
}

return (
  <div className="grid h-screen w-full pl-[53px]">
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-6 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Models"
            >
              <Bot className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Models
          </TooltipContent>
        </Tooltip>
        <Link href={"/Statistics"}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Playground"
              >
                <BarChartBig className="size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Statistics
            </TooltipContent>
          </Tooltip>
        </Link>
        <Link href='/AddDelay'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="API"
            >
              <FolderPlus className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            AddRecord
          </TooltipContent>
        </Tooltip>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Documentation"
            >
              <Book className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Documentation
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Settings"
            >
              <Settings2 className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Settings
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Link href={"/"}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LogOut className="size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Log Out
            </TooltipContent>
          </Tooltip>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Account"
            >
              <SquareUser className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Statistical Data</h1>
        <ModeToggle />
        <Button
          variant="outline"
          size="sm"
          className="ml-auto gap-1.5 text-sm"
          onClick={() => {
            window.print()
          }}
        >
          <Printer className="size-3.5" />
          Print
        </Button>
      </header>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
          <div className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Statistics
              </legend>
              <Delayhandler hhlander={hhlander} />
              <div>
                {tog ? (

                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto gap-1.5 text-sm"
                    onClick={handleTog}
                  >
                    <><Table2 className="size-3.5" />Table</>
                  </Button>
                ) : (

                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto gap-1.5 text-sm"
                    onClick={handleTog}
                  >
                    <><BarChartBig className="size-3.5" />Bar Graph</>
                  </Button>
                )}
              </div>
            </fieldset>
          </div>
        </div>
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <Badge variant="outline" className="absolute right-3 top-3">
            <FileOutput className="size-3.5" />
            Output
          </Badge>
          <div className="flex-1" />
          {rep ? (
            <>
              {tog ? (
                <div className="gph1-con">
                  <Graph res={rep} />
                </div>
              ) : (
                <div className="tab-con">
                  <TableDemo res={rep} />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="gph2-con">
                {tog ? (<><BarChartBig className="size-8" />Bar Graph</>) : (<><Table2 className="size-8" />Table</>)}

              </div>
            </>
          )}
        </div>
      </main>
    </div>
  </div>
)
}
