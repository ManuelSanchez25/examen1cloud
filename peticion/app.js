const express = require('express')
const cors = require('cors')

const router = require('./src/routes')
const path = require('path');

const { json, urlencoded } = express
const app = express()

const host = process.env.IP  || '0.0.0.0'
const port = process.env.PORT || 4500

app.use(json())
app.use(urlencoded({ extended: false }))

const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

app.use(router)
router.get('/autor', (req, res) => {
    res.send({
        autor2: 'MESV',
        servicio: ' EKS en AWS'

    })
});

router.post('/metodo', (req, res) => {
    const cadena = req.body.datos;
    console.log(cadena);
    res.sendFile(path.join(__dirname+'/src/html/index.html'));
});



app.use('/home',(req,res) => { res.sendFile(path.join(__dirname+'/src/html/index.html')); })
app.use('/', (req, res) => {res.sendFile(path.join(__dirname+'/src/html/index.html')); })

app.listen(port,host, () => { console.log(`Server listening on port ${port} in the host ${host}`); })
