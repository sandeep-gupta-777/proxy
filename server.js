const https = require('https');
const str = `
<entry key='UPI_DS_REQUEST_XML'><upi:ReqPay xmlns:upi="http://npci.org/upi/schema/">    <Head ver="1.0" ts="2018-03-07T17:58:54+05:30" orgId="400011" msgId="ICI39fb7c7fb31b41d998cd3390dad2aeae"/>    <Meta>        <Tag name="PAYREQSTART" value="2018-03-07T17:58:54+05:30"/>        <Tag name="PAYREQEND" value="2018-03-07T17:58:54+05:30"/>    </Meta>    <Txn id="ICI6032208h075g19g71220160720110712" note="taxi-bill" refId="ICI6032208h075g19g71220160720110712" custRef="806617014630"         refUrl="https://mystar.com/orderid" ts="2018-03-07T17:58:54+05:30" type="PAY" >        <RiskScores>            <Score provider="psp1" type="TXNRISK" value="00030"/>        </RiskScores>    </Txn>    <Payer addr="good@icici" name="Good" seqNum="1" type="PERSON" code="0000">        <Info>            <Identity type="ACCOUNT" verifiedName="Good" id="193701507010"/>            <Rating verifiedAddress="TRUE"/>        </Info>        <Device>            <Tag name="MOBILE" value="917799827000"/>            <Tag name="GEOCODE" value="19.0415868,72.8798676"/>            <Tag name="LOCATION" value="Mumbai,Maharashtra" />            <Tag name="IP" value="124.170.23.22"/>            <Tag name="TYPE" value="mob"/>            <Tag name="ID" value="56b39cf4a9ccd251"/>            <Tag name="OS" value="android"/>            <Tag name="APP" value="2259"/>            <Tag name="CAPABILITY" value="5200000200010004000639292929292"/>        </Device>        <Ac addrType="ACCOUNT">            <Detail name="ACTYPE" value="SAVINGS"/>            <Detail name="IFSC" value="ICIC0001937"/>            <Detail name="ACNUM" value="193701507010"/>        </Ac>        <Creds>            <Cred subType="NA" type="PreApproved">                <Data code="NPCI">MDB8NjExNDI1</Data>            </Cred>        </Creds>        <Amount value="50.00" curr="INR">        </Amount>    </Payer>    <Payees>        <Payee addr="abhinav@icici" name="" seqNum="1" type="PERSON" code="0000">            <Amount value="50.00" curr="INR">            </Amount>        </Payee>    </Payees></upi:ReqPay></entry>

`;

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