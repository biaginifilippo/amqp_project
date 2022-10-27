import axios from 'axios'

export default axios.create({
  /*INSERIRE LOCALHOST OPPURE INDIRIZZO IP SU CUI GIRA IL SERVER*/
  /*                    ___                                     */         
  /*                     |                                      */         
  /*                     |                                      */         
  /*                     v                                      */ 
    baseURL: "http://192.168.0.131:5000/api/v1/dosatore",
    headers: {
        "content-type": "application/json"
    }
});
