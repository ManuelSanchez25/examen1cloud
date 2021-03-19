const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config();
const { json, urlencoded } = express
const app = express()
const bodyParser = require('body-parser');
var JsonParser = bodyParser.json();
const host = process.env.IP  || '0.0.0.0'
const port = process.env.PORT || 5500

app.use(json())
app.use(urlencoded({ extended: false }))

const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

const CLAVE_API = process.env.CLAVE_API;
const URL = process.env.URL;
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: CLAVE_API,
  }),
  serviceUrl: URL,
});


app.get('/autor', (req, res) => {
    res.send({
        autor: 'MESV' ,
        servicio: ' Cloud Foundry en IBM Cloud'
    })
});
app.get('/servicio', (req, res) => {
    res.send({
      servicio: ' Cloud Foundry en IBM Cloud'
        
    })
});
app.post('/metodo', JsonParser, (req, res) => {
  const datos = req.body.datos;
  const toneParams = {
      toneInput: {
          'text': datos
      },
      contentType: 'application/json',
  };

  toneAnalyzer.tone(toneParams)
      .then(toneAnalysis => {
        cadena = JSON.stringify(toneAnalysis.result);
            res.json(cadena);  
         // res.json(toneAnalysis.result.document_tone.tones);
      })
      .catch(err => {
        res.json(err);
        console.log('error:', err);
    });

})
  
app.listen(port,host, () => { console.log(`Server listening on port ${port} in the host ${host}`); })
