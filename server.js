const express = require('express')
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.text({type: '*/*'}));
const request = require('request');

let npci_root = "https://103.14.161.148//upi/ReqPay/1.0/urn:txnid:ICI6032208h075g19g71220160720110712";
let switch_root = "https://192.168.141.88:7171";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/', (req, res_from_client) =>{
    console.log("hello console");
    request.post({
            url:npci_root,
            body : "hello",
            method:"POST",
            rejectUnauthorized: false,
            headers:{
                'Content-Type': 'application/xml',
            }, //todo: any encryption to add here, I think not.
        },
        (err, res, body) => {
            res_from_client.send(JSON.stringify({err,body}));
            console.log('got response from upi',body);
            console.log('got error from upi',err);
        });



})



    // res.send(req.body);
// });

app.listen(3000, () => console.log('app listening on port 3000!'));