'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import React, { useEffect, useState } from 'react'
import { ComboboxDemo } from '../Components/autocomplete'

export function Delayhandler({ hhlander }) {

    const [hlist, setHlist] = useState([])
    const [cy, setcy] = useState(null)
    const [ag, setag] = useState(null)
    const [rw, setrw] = useState(null)
    const [sc, setsc] = useState(null)
    const [df, setdf] = useState(null)
    const [dt, setdt] = useState(null)
    const [agm, setagm] = useState([])
    const [hobj, setHobj] = useState({})
    const [flag, setFlag] = useState(false)
    const [sec, setsec] = useState(true)
    function Checker(dt, df){
        let y1 = parseInt(dt.split('-')[0])
        let y2 = parseInt(dt.split('-')[0])
        if(y1 > 1900 && y2 > 1900){
            return true
        }
        return false
    }
    useEffect(() => {
        if (df && dt && Checker(dt, df)) {
            console.log(hlist, hobj)
            let Objlen = Object.keys(hobj).length
            if (hlist.includes('CD')) {
                if (Objlen + 1 == hlist.length) {
                    console.log('Fetching(CD)')
                    hhlander(hobj, hlist, 1, df, dt)
                } else {
                    console.log('Suck')
                    hhlander(-1, -1, - 1, -1, -1)
                }
            } else {
                if (Objlen == hlist.length && Objlen != 0) {
                    console.log("Fetching")
                    hhlander(hobj, hlist, 0, df, dt)

                } else {
                    console.log('Fuck')
                    hhlander(-1, -1, -1, -1, -1)
                }
            }
        }
    }, [hobj, flag])


    function optimize(val) {
        if (val == 'CY') {
            setcy(null)
        }
        // if (val == 'AG') {
        //     setag(null)
        // }
        if (val == 'SC') {
            setsc(null)
        }
        if (val == 'RW') {
            setrw(null)
        }
    }

    function heavy(e) {
        const { value } = e.target
        if (!e.target.checked) {
            setHlist(prev => {
                delete hobj[value]
                optimize(value)
                return prev.filter(p => p !== value)
            })
        }
        else {
            setHlist(prev => {
                return [...prev, value]
            })
        }
        setFlag(!flag)
    }
    // function heavy(e) {
    //     const { value } = e.target
    //     setHlist(prev => {
    //         if (prev.includes(value)) {
    //             delete hobj[value]
    //             optimize(value)
    //             return prev.filter(p => p !== value)
    //         }
    //         else {
    //             return [...prev, value]
    //         }
    //     })
    //     setFlag(!flag)
    // }
    function Dhandler(value, val){
        if(val == 'AG'){
            handlerAgency(value)
        }
    }
    function handlerConvey(e) {
        const { value } = e.target
        setcy(prev => value)
        if (value) {
            setHobj(prev => ({ ...prev, CY: value }))
        }
        else {
            delete hobj.CY
            setFlag(!flag)
        }
    }
    function handlerRaw(e) {
        const { value } = e.target
        setrw(prev => value)
        if (value) {
            setHobj(prev => ({ ...prev, RW: value }))
        }
        else {
            delete hobj.RW
            setFlag(!flag)

        }
    }
    function handlerAgency(value){
        if (value) {
            setHobj(prev => ({ ...prev, AG: value }))
        }
        else {
            delete hobj.AG
            setFlag(!flag)

        }
    }
    // function handlerAgency(e) {
    //     const { value } = e.target
    //     setag(prev => value)
    //     if (value) {
    //         setHobj(prev => ({ ...prev, AG: value }))
    //     }
    //     else {
    //         delete hobj.AG
    //         setFlag(!flag)

    //     }
    // }
    function handlerShop(e) {
        const { value } = e.target
        setsc(prev => value)
        if (value) {
            setHobj(prev => ({ ...prev, SC: value }))
        }
        else {
            delete hobj.SC
            setFlag(!flag)

        }
    }



    return (
        <>
            <div className="grid gap-3">
                <Label htmlFor="model">( Date Range )</Label>
                <Label htmlFor="model">From : </Label>
                <input value={df} onChange={(e) => { setFlag(!flag); setdf(e.target.value) }} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="date" id="dateInput" name="dateInput" pattern="\d{2}/\d{2}/\d{4}" placeholder="mm/dd/yyyy" required />
                <Label htmlFor="model">To : </Label>
                <input value={dt} onChange={(e) => { setFlag(!flag); setdt(e.target.value) }} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="date" id="dateInput" name="dateInput" pattern="\d{2}/\d{2}/\d{4}" placeholder="mm/dd/yyyy" required />
            </div>
            <Label htmlFor="temperature">Delay Preferences??</Label>
            <div className="DelayPrefernces gap-5">
                <div className="flex gap-2 items-center">
                    Continued<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" value='CD' onChange={heavy} />
                </div>
                <div className="flex gap-1 items-center">
                    Conveyor<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='CY' onChange={heavy} />
                </div>
                <div className="flex gap-2 items-center">
                    Raw Materials<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='RW' onChange={heavy} />
                </div>
                <div className="flex gap-2 items-center">
                    Shop Code<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='SC' onChange={heavy} />
                </div>
                <div className="flex gap-2 items-center">
                    Agency<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='AG' onChange={heavy} />
                </div>
                {/* <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Shop Code Delays</option>
                  </select> */}
            </div>
            <div className='flex flex-col gap-6'>
                {hlist.includes('CY') ? (<div>
                    <Label htmlFor="temperature">Conveyor Delay</Label>
                    <Input
                        type="text"
                        value={cy}
                        onChange={handlerConvey}
                    />
                </div>) : (<></>)}
                {/* {hlist.includes('CD') ? (<div><Label htmlFor="temperature">Continued Delay</Label>
                <Input
                type="text"
                    placeholder="Enter Shop Code"
                    className="shopeval"
                    // value={shopCode}
                    // onChange={handleShopCodeChange}
                    /></div>) : (<></>)} */}
                {hlist.includes('RW') ? (<div><Label htmlFor="temperature">Raw Material Delay</Label>
                    <Input
                        type="text"
                        value={rw}
                        onChange={handlerRaw}
                    /></div>) : (<></>)}
                {hlist.includes('SC') ? (<div><Label htmlFor="temperature">Shop Code</Label>
                    <Input
                        type="text"
                        value={sc}
                        onChange={handlerShop}
                    /></div>) : (<></>)}
                {hlist.includes('AG') ? (<div><Label htmlFor="temperature">Agency Delay</Label>
                    {/* <Input
                        type="text"
                        value={ag}
                        onChange={handlerAgency}
                    /> */}
                    <div>
                    <ComboboxDemo val = "AG" Dhandler={Dhandler}/>
                    </div>
                        
                    {/* {agm.length > 0 && sec && (
                        <div>
                            {agm.map((item) => (
                                <div className="py-2 px-4 cursor-pointer border-b border-gray-200 hover:bg-blue-500 hover:text-white" key={item} onClick={() => { setag(item); setsec(false) }} id={item}>{item}</div>
                            ))}
                        </div>
                    )} */}
                </div>) : (<></>)}
            </div>
        </>
    )
}
