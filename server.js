
var builder = require('xmlbuilder');
var fs = require('fs');
const uuidv1 = require('uuid/v1');
var ca = fs.readFileSync( 'certs/ssl.crt' );
https = require('https');
const http = require('http');

//=============================== response listener

http.createServer(function (req, res) {
    console.log("======req from NPCI========");
    console.log(req.body);
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  }).listen(8080);
//===============================


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

 
 let uuidStr = fs.readFileSync('.//sign-java//sign//src//id.txt').toString();
 let signedXML_java = fs.readFileSync('.//sign-java//sign//src//ReqHbt-signed.xml').toString();
Promise.resolve()
    .then((signedXml)=>{
        var options = {
            host: '103.14.161.148',
            port:443,
            path: `/upi/ReqHbt/1.0/urn:txnid:${uuidStr}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
            } ,
                ca:ca,
            };
                    const req = https.request(options, (res) => {
                        console.log('===>>>>>>>',req.path);
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
            
console.log('============================================================================================')
                    console.log(signedXML_java);
                    req.write(signedXML_java);
                    req.end();
console.log('============================================================================================')

});



            
