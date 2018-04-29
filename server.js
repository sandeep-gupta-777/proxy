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

const sign1 = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><ns2:ReqHbt xmlns:ns2="http://npci.org/upi/schema/">
    <Head msgId="HENSVVR4QOS7X1UGPY7JGUV4ACDFCV" orgId="400011" ts="2016-02-27T03:05:58+05:30" ver="1.0"/>
    <Txn id="808080787878" note="Heartbeat" ts="2016-02-27T03:05:58+05:30" type="Hbt"/>
    <HbtMsg type="ALIVE" value="NA"/>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
            <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
            <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
            <Reference URI="">
                <Transforms>
                    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                </Transforms>
                <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                <DigestValue>WtAMmHssl/scZOWvJlD5ymiU940wjFd8CeNP7yE=</DigestValue>
            </Reference>
        </SignedInfo>
        <SignatureValue>/miI6Qrc3bL6+mT9EE1QZ+fsgVQvcVupep9
            GspEZxcG+Nk455pwJv+LsRsNHOGjznbXHJY77ntRVTUUApOYMvNI8++9v9vvc7BPslLKRhEXlGsL
            /n0oV0eCXRJdxt6FPEZSBJVkqVwY86Mp1esl
            uOh3Y/rlSHTddxevR2I5P7MBzvFbHuBhIZuvLEn3dZlSyzQfDqR3FAcrxRe1sB5hsQt8BUvGLpp9
            9td7NiUUdgRPvdOuf9QqLICIrCkqFLkhK3w3zw==
        </SignatureValue>
        <KeyInfo>
            <KeyValue>
                <RSAKeyValue>
                    <Modulus>8Uiva1eNeHPmqYaLEPT7MFInvt7GYgc1QM6AgFHy3cTaHwDntrJpAZ2/7wDxuHZzle5nWwHd
                        r6Ad
                        PmJQWt3+DXoxdFphXL3ydoBgLyuPnSJSHwB/kZoDab2EPGcqyCmxLoON2WaWy1A7ONoxqlOj6ztI
                        6DNLyhqq3PpiK+6AkwqdYPw9loyCDfzvcZouxsJ9RgOkfKuVqsMgVRRaxXBG7xBY+f529jqSDT7Y
                        W+6+AKreDWFD9hDUu8Yx0KlehwmjChz7pkOt5IUXm/p1IGxNwGERpb
                        d+IlKt3cduI/7021fPPgkdxoj2uVoAAN4O/OpQ==
                    </Modulus>
                    <Exponent>AQAB</Exponent>
                </RSAKeyValue>
            </KeyValue>
        </KeyInfo>
    </Signature>
</ns2:ReqHbt>
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
