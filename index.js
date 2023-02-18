const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tgametl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    const freshersJobCollection = client.db('jobifyHMI').collection('freshersJob');
    const experiencedJobCollection = client.db('jobifyHMI').collection('experiencedJob');
    const ITCompaniesCollection = client.db('jobifyHMI').collection('ITCompanies');

    try{
        app.get('/freshersJob', async (req, res)=>{
            const query = {};
            const freshersJob = await freshersJobCollection.find(query).toArray();
            res.send(freshersJob);
        })

        app.get('/experiencedJob', async (req, res)=>{
            const query = {};
            const experiencedJob = await experiencedJobCollection.find(query).toArray();
            res.send(experiencedJob);
        })

        app.get('/ITCompanies/:Bangladesh', async (req, res)=>{
            const Bangladesh = req.params.Bangladesh;
            const query = {office: Bangladesh};
            const ITCompanies = await ITCompaniesCollection.find(query).toArray();
            res.send(ITCompanies);
        })

        app.get('/ITCompanies/:worldWide', async (req, res)=>{
            const worldWide = req.params.worldWide;
            const query = {office: worldWide };
            const ITCompanies = await ITCompaniesCollection.find(query).toArray();
            res.send(ITCompanies);
        })
    }
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/',(req, res) => {
    res.send('jobify server is running')
})

app.listen(port, ()=>{
    console.log(`jobify server is running on port ${port}`)
})