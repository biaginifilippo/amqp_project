
var axios = require("axios").default;
async function sendMsg (data){
    var options = {
  method: 'POST',
  /*INSERIRE LOCALHOST OPPURE INDIRIZZO IP SU CUI GIRA IL SERVER*/
  /*                    ___                                     */         
  /*                     |                                      */         
  /*                     |                                      */         
  /*                     v                                      */ 
  url: 'http://192.168.0.131:5000/api/v1/dosatore',
  headers: {'Content-Type': 'application/json'},
  data: data  //{testo: data.testo}
};
return (await (axios.request(options))).data
}
export default sendMsg
