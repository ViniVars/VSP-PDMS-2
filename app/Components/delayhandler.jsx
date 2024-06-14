'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

export function Delayhandler({hhlander}) {

    const [hlist, setHlist] = useState([])
    const [cy, setcy] = useState(null)
    const [ag, setag] = useState(null)
    const [rw, setrw] = useState(null)
    const [sc, setsc] = useState(null)
    const [hobj, setHobj] = useState({})
    const [flag, setFlag] = useState(false)

    useEffect(()=> {
        console.log(hlist, hobj)
        let Objlen = Object.keys(hobj).length
        if(hlist.includes('CD')){
            if(Objlen + 1 == hlist.length){
                console.log('Fetching(CD)')
                hhlander(hobj,hlist, 1)
            }else{
                console.log('Suck')
                hhlander(-1,-1 -1)
            }
        }else{
            if(Objlen == hlist.length && Objlen != 0){
                console.log("Fetching")
                hhlander(hobj,hlist, 0)
                
            }else{
                console.log('Fuck')
                hhlander(-1,-1, -1)
            }
        }
    }, [hobj, flag])


    function optimize(val){
        if(val == 'CY'){
            setcy(null)
        }
        if(val == 'AG'){
            setag(null)
        }
        if(val == 'SC'){
            setsc(null)
        }
        if(val == 'RW'){
            setrw(null)
        }
    }


    function heavy(e){
        const {value} = e.target
        setHlist(prev => {
            if(prev.includes(value)){
                delete hobj[value]
                optimize(value)
                return prev.filter(p => p !== value)
            }
            else{
                return [...prev, value]
            }
        })
        setFlag(!flag)
    }

    function handlerConvey(e){
        const {value} = e.target
        setcy(prev => value)
        if(value){
            setHobj(prev => ({...prev, CY:value }))
        }
        else{
            delete hobj.CY
            setFlag(!flag)
        }
    }
    function handlerRaw(e){
        const {value} = e.target
        setrw(prev => value)
        if(value){
            setHobj(prev => ({...prev, RW:value }))
        }
        else{
            delete hobj.RW
            setFlag(!flag)

        }
    }
    function handlerAgency(e){
        const {value} = e.target
        setag(prev => value)
        if(value){
            setHobj(prev => ({...prev, AG:value }))
        }
        else{
            delete hobj.AG
            setFlag(!flag)

        }
    }
    function handlerShop(e){
        const {value} = e.target
        setsc(prev => value)
        if(value){
            setHobj(prev => ({...prev, SC:value }))
        }
        else{
            delete hobj.SC
            setFlag(!flag)

        }
    }



    return (
        <>
         <div className="grid gap-3">
                  <Label htmlFor="model">Date Range</Label>
                  <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="date" id="dateInput" name="dateInput" pattern="\d{2}/\d{2}/\d{4}" placeholder="mm/dd/yyyy" required />
                </div>
                  <Label htmlFor="temperature">Delay Preferences??</Label> 
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex gap-2 items-center">
                  Continued<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" value='CD' onChange={heavy}/>
                    </div>
                    <div className="flex gap-2 items-center">
                  Conveyor<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='CY' onChange={heavy}/>
                    </div>
                    <div className="flex gap-2 items-center">
                  Raw Materials<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='RW' onChange={heavy}/>
                    </div>
                    <div className="flex gap-2 items-center">
                  Shop Code<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='SC' onChange={heavy}/>
                    </div>
                    <div className="flex gap-2 items-center">
                  Agency<input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id="include" value='AG' onChange={heavy}/>
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
                <Input
                    type="text"
                    value={ag}
                    onChange={handlerAgency}
                    /></div>) : (<></>)}
        </div>
                    </>
    )
}
