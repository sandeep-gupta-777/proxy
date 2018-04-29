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

const sign1 = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><upi:ReqHbt xmlns:upi="http://npci.org/upi/schema/"><Head msgId="400011" orgId="700024" ts="2016-03-02T09:01:51.771Z" ver="1.0"/><Txn id="600012" note="Heartbeat" type="Hbt"/><HbtMsg type="ALIVE" value="NA"/><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><DigestValue>mXMWVPNSFvWqvOKSWrVsKvZr2LAoXvzhSI3uZf+QOTA=</DigestValue></Reference></SignedInfo><SignatureValue>RZcmKI9IT6Mn4AmXiDRIJrSR3vyiWF5hsbblFBuh407kEnNlv34IkO9QydxBG/8NKobM9iDP+6WM Pv0qAkgst8e3MStqf5Zjh7v39oBLJJUkjjrouatOmsAefsRwbHgtQ50zAgVNMXNmH1KeC1mk4gHG gBZUEHAoqfp69hlVIUWlMgzgutzpX19WPIVWHVqYSNFmgJZ+uKHDsDpTRVHfaii8Yklbf8vtG+gf/PbLCXpWZEDxLgR5U756GlsOzaOQE4DeN42wktBK4sPO+iGk4Onl6ty5seov7HT4Ir+5g5b0jRc3NgZvski5/xCH/Fgay4TImhdy3bSxu0d67b7eCw==</SignatureValue><KeyInfo><KeyValue><RSAKeyValue><Modulus>py5eZwVTwgVl2LCu943Or/uMYjFhhu889AursIAggkjm1cQM9sz+nyZEPA5H2mjD35vqlVDMetdwxTCBJKwpflsMugFVE3r7ejP8c/gEp3hi7jABILsRYw5AYifK1r1Fo9iredP4ejbOFp0vJlmJpzeWragDkY1Wpog0+7HIB2Sn5ZPcF4DmgtZ9Luo18aLIzVetYRPoMltgt13y5nM+x80s9x18H+dGuO4b0rHLPj2gDODIndSziymWT7sHtA/FRxjZ45wW5D2MpUns3VI4s0AemFBNJY4mmzMKgIH73SXgeX+zbfwcU2uFpV9WL7IYhQQE5tzXB31HcvLc8QH4Dw==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue></KeyValue></KeyInfo></Signature></upi:ReqHbt>`;



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
