const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json({
        endpoints: [
                 {
                path: 'api/states',
                request_type: 'GET',
                params_needed: 'null',
                description: 'This Fetches all the states from cowin APi'
               },
               {
                path: 'api/districts/[id]',
                request_type: 'GET',
                params_needed: 'id',
                description: "This Fetches all the Districts from cowin APi and requires 'id' (state_id) as Param"
               },
               {
                path: 'api/slots/[id]',
                request_type: 'GET',
                params_needed: 'id',
                description: "This Fetches all the Slots for the next 7 days in a specific district from cowin APi and requires 'id' (District id) as Param"
               },
               {
                path: 'api/user/signup',
                request_type: 'POST',
                params_needed: 'email and password',
                description: "This Creates a New User in MongoDB"
               },
               {
                path: 'api/user/login',
                request_type: 'POST',
                params_needed: 'email and password',
                description: "This login the User"
               },
            ]
    });
})

module.exports = router; 