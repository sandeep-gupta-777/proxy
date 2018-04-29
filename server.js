var builder = require('xmlbuilder');const tls = require('tls');
var fs = require('fs');
const xmlSignInit = require("./xml-sign");
// console.log(xml);
var cert = fs.readFileSync( 'certs/signer.crt' );
var ca = fs.readFileSync( 'certs/ssl.crt' );

const https = require('https');
var user = "sandeep";
var pass = "12345";
//var authenticationHeader = "Basic " + new Buffer(username + ":" + password).toString("base64");

const hbt = `
<upi:ReqHbt xmlns:upi="http://npci.org/upi/schema/">
    <Head ver="1.0" ts="2018-03-07T17:58:54+05:30" orgId="400011" msgId="ICI39fb7c7fb31b41d998cd3390dad2aeae"/>
    <Txn id="ICI6032208h075g19g71220160720110712" note="taxi-bill" refId="ICI6032208h075g19g71220160720110712"
         custRef="806617014630" refUrl="https://mystar.com/orderid" ts="2018-03-07T17:58:54+05:30" type="PAY">
    </Txn>
    <HbtMsg type="EODE" value="DATE"/>
</upi:ReqHbt>

`;

const sign1 = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><upi:ReqHbt xmlns:upi="http://npci.org/upi/schema/">
<Head msgId="MYPOOLMSGID000153" orgId="700032" ts="2016-02-15T17:57:25+0530" ver="1.0"/>
<Txn id="MYPOOLTXNID000109" note="Heart beat" ref="" ts="2016-02-15T17:57:25+0530" type="Hbt"/>
<HbtMsg type="ALIVE" value="NA"/>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>TZ6b203P/wC2VG3U3KVxsic9VWnk6c8qEVzmqsFDDTI=</DigestValue></Reference></SignedInfo><SignatureValue>rejlsLwZiJS5QOO/+qetrC4unAPPd8mGqJnvvcekpW9deABabivxqTJhP1bysCR4SSy8r65Nq6VbxTnCO0V/A3cfvAywTdl2l2ZH8C9uI4ZyE5vfu7rq22XLHRTvkuvwWcf+KzVt2t7tlu3T9sPXwkpZBkeCxDWP6qmTID3IYDarJtUqaOWwBv1QY6f9Vp/TvQZgiAMSGTBjSeg0XhUsbjcNJCinjWXb7DnyFhXrPrGxdSiyUODEtiVEZSrdMRIXGs4/dzUw0blZ89eDcBDKBNBo2ywt4rKLFKnQ+IYQZmjIb+3TCMTpsCM1ivVJxkLSrtWSKspzmc7Gm0Er7CI15w==</SignatureValue><KeyInfo><KeyValue><RSAKeyValue><Modulus>wR3jN+bFI9sK9TyhtZM3xbw5o8Wd1QDXZI1gccSsBJrtzpvIQhwhsvSLmXfmT1mmc0WloqNN31s7YYXx6BwhYD8m7/ZC0pFiGwYDTPbPRToLFqc7Km2v34XoCVeg7LTWLzPMRojnKQxhnj+lll8eHyWxpSoF0UjPktM2uJZ142IkicwM1Qh93+uieKU1hnA43XytPH81KZ7ec6JCkc4f/TLyIippLotI1qmDq87W+HZamFEKZq6ZlbwxTY3Ck+gA2jVfB1oFfpGy3Dah3knBNPmiQmDbNIYwz0zqYvP0ALLWBFSEEWq+IquBmqqF5hJyeCl1TUNXApvyFyu6ZW4QSQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue></KeyValue></KeyInfo></Signature></upi:ReqHbt>
`;



xmlSignInit(hbt)
    .then((value)=>{

        //process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
//NODE_TLS_REJECT_UNAUTHORIZED=0;
        var options = {
            host: '103.14.161.148',
            port:443,
            path: '/upi/ReqHbt/1.0/urn:txnid:ICI6032208h075g19g71220160720110712',
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
//rejectUnauthorized: false,
//    headers:{
            //      'Content-Type': 'text/xml',
            //'Authorization': 'Basic ' + new Buffer(user + ':' + pass).toString('base64')
            // },
//    rejectUnauthorized: true,
            // auth: {
            //     user: user,
            //     pass: pass
            // }

//    cert: ca,
//    ca: cert,


            ca: ca,
            //  rejectUnauthorized: false
        };
//options.agent = new https.Agent(options);
//options.agent = new https.Agent(options);

        const req = https.request(options, (res) => {
            console.log(req);
            debugger;

            console.log("hi", JSON.stringify(options.checkServerIdentity));
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', (d) => {
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

        // console.log(value);
        req.write(sign1);
        req.end();
    });
