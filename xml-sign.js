const fs  = require("fs");
require("babel-core/register");
require("babel-polyfill");

var xadesjs = require("xadesjs");
var WebCrypto = require("node-webcrypto-ossl");
xadesjs.Application.setEngine("OpenSSL", new WebCrypto());

var cert = fs.readFileSync( 'certs/test.crt' ).toString();//TODO: use original certificate
// Generate RSA key pair
var privateKey, publicKey;
var publicKey = fs.readFileSync( 'keys/public' ).toString();
var privateKey = fs.readFileSync( './keys/private.ppk' ).toString();

module.exports =  function xmlSignInit(xmlString) {
   return new Promise((resolve, reject)=>{
       xadesjs.Application.crypto.subtle.generateKey(
           {
               name: "RSASSA-PKCS1-v1_5",
               modulusLength: 2048, //can be 1024, 2048, or 4096,
               publicExponent: new Uint8Array([1, 0, 1]),
               hash: { name: "SHA-1" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
           },
           false, //whether the key is extractable (i.e. can be used in exportKey)
           ["sign", "verify"] //can be any combination of "sign" and "verify"
       )
           .then(function (keyPair) {
               // Push ganerated keys to global variable
               // privateKey = keyPair.privateKey;
               // publicKey = keyPair.publicKey;

               // Call sign function
               // var xmlString = '<player bats="left" id="10012" throws="right">\n\t<!-- Here\'s a comment -->\n\t<name>Alfonso Soriano</name>\n\t<position>2B</position>\n\t<team>New York Yankees</team>\n</player>';
               return SignXml(xmlString, keyPair, { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } });
           })
           .then(function (signedDocument) {
               console.log("Signed document:\n\n", signedDocument);
           })
           .catch(function (e) {
               console.error(e);
           });


       function SignXml(xmlString, keys, algorithm) {
           var signedXml;
           return Promise.resolve()
               .then(() => {
                   var xmlDoc = xadesjs.Parse(xmlString);
                   signedXml = new xadesjs.SignedXml();

                   return signedXml.Sign(               // Signing document
                       algorithm,                              // algorithm
                       keys.privateKey,                        // key
                       xmlDoc,                                 // document
                       {                                       // options
                           keyValue: keys.publicKey,
                           references: [
                               { hash: "SHA-256", transforms: ["enveloped"] }
                           ],
                           productionPlace: {
                               country: "Country",
                               state: "State",
                               city: "City",
                               code: "Code",
                           },
                           // signingCertificate: "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"
                           // signingCertificate: "MIID9zCCAt+gAwIBAgIJAIM6xLWVJlOZMA0GCSqGSIb3DQEBCwUAMIGRMQswCQYDVQQGEwJJTjESMBAGA1UECAwJVGFtaWxOYWR1MRAwDgYDVQQHDAdDaGVubmFpMQ0wCwYDVQQKDAROUENJMQwwCgYDVQQLDANVUEkxGzAZBgNVBAMMEnVwaXVhdC5ucGNpLm9yZy5pbjEiMCAGCSqGSIb3DQEJARYTdmliZWV0aEBucGNpLm9yZy5pbjAeFw0xNzEyMDcxMDQ2MjRaFw0yNzA5MDkxMDQ2MjRaMIGRMQswCQYDVQQGEwJJTjESMBAGA1UECAwJVGFtaWxOYWR1MRAwDgYDVQQHDAdDaGVubmFpMQ0wCwYDVQQKDAROUENJMQwwCgYDVQQLDANVUEkxGzAZBgNVBAMMEnVwaXVhdC5ucGNpLm9yZy5pbjEiMCAGCSqGSIb3DQEJARYTdmliZWV0aEBucGNpLm9yZy5pbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALjCsVn8tFnD6ffJrgVmusoaZm+mRmRkih0SDr9OVJSDeU21D5eshHq4e1o9Picin7Dp7UXQFYZCyRkaB8B+oBBHhTR4Hu5D3mvwd93EAG6mt/Zpz+RdWmmU97YyZyq3yNVrptHK3W+3QDM37eCSCzhGvrN1IeznWBJf16exIrHUqCd+OQo9C03y2REM0XVRqL12a3ywcicrB9dVfbQ6yFb++Qv91J3cIx7dza6szQaFDIeVWURZHMLnm1AJISHneYL6MrCcHdMmBqwFFza1ySQ0wI+XYgrmrFsn1mUfZbF+ZdeIXcRfpamnUf6YCCOdw1uaBMtizF4L7drv6pkppfMCAwEAAaNQME4wHQYDVR0OBBYEFOMI3fS6ZLwKnCvoH1xuEIWAy3eWMB8GA1UdIwQYMBaAFOMI3fS6ZLwKnCvoH1xuEIWAy3eWMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAJ4YflNoezlsuRbr8asboMw5kH0F6VpmozNxkDGbwLFGx7cVZ5m9xpmPr2eOA4uk598mFJqvG+6fx3naM1s7WtaEXB4L9eHCv2nPdYKav6GrB7aabXb2Y5IasIG1aa7oX+V6aw0zYufLTIv3Awy7Qp6lgGDvnd0zL3wJqS3kY80CpOFhLwifpPXUA0NMBU6kg1+R0fexjKAOiC9OkDXmj0Uljeb3AbwE3jZgonoIwcbP8rSc5hN3uxUJyIfNzEzAmHGraP0MTPqEocFcvnj8VFJPr94MSZ9CnVUwdLlXTiWYoGkBL6tngh9MSHEaocW1M64Wp85YurWQmF18TeJcJ4k="
                           signingCertificate: cert
                       })
               })
               .then(() => resolve(signedXml.toString()));
       }
   })
}
