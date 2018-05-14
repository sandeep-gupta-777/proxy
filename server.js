var builder = require('xmlbuilder');
var fs = require('fs');
const uuidv1 = require('uuid/v1');
const xmlSignInit = require("./xml-sign");
var cert = fs.readFileSync( 'certs/signer.crt' );
var ca = fs.readFileSync( 'certs/ssl.crt' );

const https = require('https');
//let uuidStr = "ICI"+ uuidv1().replace(/-/g, "");
let uuidStr = 'ICI56d011c057ad11e8823c9b61d45d2b91';;
Promise.resolve()
    .then((signedXml)=>{
        var options = {
            host: '103.14.161.148',
            port:443,
            path: `/upi/ReqHbt/1.0/urn:txnid:${uuidStr}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
                //'Content-Length': hbt.length,
            } ,
            checkServerIdentity: function (host, cert) {
                console.log('inside check server id')
                debugger;
                return undefined;

            },
                ca:ca,
            };
            //options.agent = new https.Agent(options);
            //options.agent = new https.Agent(options);
            
                    const req = https.request(options, (res) => {
                        console.log(req.path);
                        debugger;
                        res.on('data', (d) =>
                            {
                                    debugger;
                            process.stdout.write(d);
                        });
                    });
            
            
                    req.on('error', (e) => {
                        console.error(e);
                    });
                    req.on('data', (data) => {
                        console.log(data);
                        process.stdout.write(d);
                    });
            
                    console.log(signedXML_java);
                    req.write(signedXML_java);
                    req.end();
});
            