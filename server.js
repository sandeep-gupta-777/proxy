var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var options = {
    host: '103.14.161.148',
    port:443,
    path: '/upi/ReqListPsp/1.0/urn:txnid:ICI6032208h075g19g71220160720110712',
    method: 'post',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    body: `<upi:ReqListPsp xmlns:upi="http://npci.org/upi/schema/"><Head ver="1.0" ts="2018-03-07T17:58:53+05:30" orgId="400011" msgId="1GRDpegBbA5wY2r9c4PJ"/><Txn id="ICI6032208h075g19g71220160720110712" note="asdsad" refId="ICI6032208h075g19g71220160720110712" refUrl="" ts="2018-03-07T17:58:53+05:30" type="ListPsp"/></upi:ReqListPsp>`
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