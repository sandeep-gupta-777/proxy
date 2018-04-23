var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var options = {
    host: '103.14.161.148',
    port:443,
    path: '/upi/ReqListPsp/1.0/urn:txnid:ICI6032208h075g19g71220160720110712',
    method: 'post',
    rejectUnauthorized: false,
    requestCert: true,
    headers:{
        'Content-Type': 'application/xml',
    },
    agent: false,
    body: ``
};

var req = https.request(options, function(res) {
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();