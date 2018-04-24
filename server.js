const https = require('https');
const str = "" +
    "<?xml version=\"1.0\"?>\n" +
    "<root>\n" +
    "  <xmlbuilder>\n" +
    "    <repo type=\"git\">git://github.com/oozcitak/xmlbuilder-js.git</repo>\n" +
    "  </xmlbuilder>\n" +
    "</root>\n";

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
    body: str
};

const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});
req.end();