const fs = require('fs');
const uuidv1 = require('uuid/v1');

(function(){
    let uuidStr = "ICI"+ uuidv1().replace(/-/g, "");
    let xmlStr = `<upi:ReqHbt xmlns:upi="http://npci.org/upi/schema/"><Head ver="1.0" ts="2018-03-07T17:58:54+05:30" orgId="400011" msgId="${uuidStr}"/><Txn id="${uuidStr}" note="taxi-bill" refId="${uuidStr}" custRef="806717014630" refUrl="https://mystar.com/orderid" ts="2018-03-07T17:58:54+05:30" type="PAY"></Txn><HbtMsg type="EODE" value="DATE"/></upi:ReqHbt>`;
    
    console.log(xmlStr);
    fs.writeFileSync(`C:\\Users\\384041\\Desktop\\nodebook\\proxy\\sign-java\\sign\\src\\ReqHbt.xml`, xmlStr);
    fs.writeFileSync(`C:\\Users\\384041\\Desktop\\nodebook\\proxy\\sign-java\\sign\\src\\id.txt`, uuidStr);
    // fs.writeFileSync(`C:\\Users\\384041\\Desktop\\nodebook\\proxy\\sign-java\\sign\\src\\req-hbt.xml`, xmlStr);
})()