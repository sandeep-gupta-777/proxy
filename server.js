const express = require('express')
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.text({type: '*/*'}));
const request = require('request');

let npci_root = "https://103.114.161.148";
let switch_root = "http://localhost:3000";

app.get('/', (req, res) =>{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    res.send("hello client");
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
            res.send("hello world!", err, body);
            console.log('got response from upi',body);
            console.log('got error from upi',err);
        });



})



    // res.send(req.body);
// });

app.listen(3000, () => console.log('app listening on port 3000!'));