"use server";
import mon from "mongoose";
import Delay from "./models/Delay";
import User from "./models/Users";

mon.connect("mongodb+srv://dasarinirmala110:Nl6E1dNdl6ERFPlF@asynccluster.cuqbtxk.mongodb.net/VSP?retryWrites=true&w=majority")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Hashing Algorithm
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

var gdt = ""
var gdf = ""
var gres = []

// Functions
export async function getData(dat1) {
    
    const startDate = dat1.df
    const endDate = dat1.dt
    let hlist = dat1.hlist
    let matchStage = {
            startDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            },
    }
    if(hlist.includes('AG')){
        matchStage.AGENCY_CODE = dat1.AG
    }
    if(hlist.includes('SC')){
        matchStage.SHOP_CODE = parseInt(dat1.SC)
    }
    const res = await Delay.aggregate([
        {
            $addFields: {
                startDate: { $dateFromString: { dateString: "$DEL_DATE" } }
            }
        },
        {
            $match: matchStage
        },
        {
            $project: {
                startDate: 0,
                _id: 0
            }
        }
    ]);
    if (res.length == 0) {
        return -1;
    }
    console.log('hiii')
    return res
}


export async function getData1(dat1) {
    // const startDate = '2005-03-26'
    // const endDate = '2005-03-31'
    // const shop = dat1.shopCode
    const startDate = dat1.df
    const endDate = dat1.dt
    var res = []
    if (startDate != gdf || endDate != gdt) {
        console.log('New data')
        res = await Delay.aggregate([
            {
                $addFields: {
                    startDate: { $dateFromString: { dateString: "$DEL_DATE" } }
                }
            },
            {
                $match: {
                    startDate: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    },
                }
            },
            {
                $project: {
                    startDate: 0,
                    _id: 0
                }
            }
        ]);
        gdf = startDate
        gdt = endDate
        gres = res

    }
    else {
        console.log('Old Data')
        res = gres
    }
    if (res.length == 0) {
        return -1;
    }
    let hlist = dat1.hlist
    let temp = []
    if (hlist.includes('CD')) {
        temp = res.filter(r => r.CD)
        res = temp
    }
    if (hlist.includes('AG')) {
        temp = res.filter(r => r.AGENCY_CODE === dat1.AG)
        res = temp
    }
    if (hlist.includes('SC')) {
        temp = res.filter(r => r.SHOP_CODE === parseInt(dat1.SC))
        res = temp
    }
    if (hlist.includes('CY')) {
        temp = res.filter(r => r.CY)
        res = temp
    }
    if (hlist.includes('RW')) {
        temp = res.filter(r => r.CD)
        res = temp
    }
    if (res.length == 0) {
        return -1;
    }
    return res

}

export async function credCheck(uname, pass) {

    const hash = await sha256(pass)
    console.log(hash)
    const res = await User.find({ uname: uname, pass: hash })
    console.log(res)
    if (res.length != 0) {
        return 1
    }
    return 0
}


export async function addData({ sc, eqpt, fdel, tdel, deldate, ddel }) {
    deldate = deldate.split('-')
    deldate = deldate[2] + '-' + deldate[1] + '-' + deldate[0]
    User.create({ others: { SHOP_CODE: parseInt(sc), EQPT: eqpt, DEL_DATE: deldate, REMARKS: ddel, DELAY_FROM: fdel, DELAY_TO: tdel } })
}