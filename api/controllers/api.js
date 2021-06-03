const axios  = require('axios');
const { response } = require('express');
const moment = require('moment');
const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'};
exports.api_get_states =  async (req,res,next)=>{
    try{
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states',{
            headers: headers
        });
        await res.status(200).json({
            count:response.data.states.length,
            states:response.data.states
         });
    }catch(error){
        res.status(404).json({
            count:0,
            error:error
        });
    }
}

exports.api_get_districts= async (req,res,next)=>{
    const id = req.params.id;
    try{
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+id,{
            headers: headers
        });
        await res.status(200).json({
            count:response.data.districts.length,
            districts:response.data.districts
         });
    }catch(error){
        res.status(404).json({
            count:0,
            error:error
        });
    }
}

exports.api_get_slots =  async (req,res,next)=>{
    const id = req.params.id;
    try{
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+id+'&date=19-05-2021',{
            headers: headers
        });
        await res.status(200).json({
            count:response.data.centers.length,
            centers:response.data.centers
         });
    }catch(error){
        res.status(404).json({
            count:0,
            error:error
        });
    }
}

exports.api_get_slots_week =  async (req,res,next)=>{
    const id = req.params.id;
    const dates = [];
    let count = 0;
    let now = moment()
    for(var i =0;i<7;i++){
        let now = moment()
           let  ndate  = now.add(i,'days').format("DD-MM-YYYY");
            dates.push(ndate);
        }
    const response = [];
    try{ 
        for (const i in dates) {
           let ares = await axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+id+'&date='+dates[i],{
            headers: headers
        });
        console.log(dates[i]);
        ares = await ares.data.sessions;
        count= count+ares.length;
        await response.push(ares);
        }
        await res.status(200).json({
            count:count,
            centers:response
         });
    }catch(error){
        res.status(404).json({
            count:0,
            error:error
        });
    }
}

