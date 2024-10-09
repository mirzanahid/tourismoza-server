const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const colors = require("colors");
const port = process.env.PORT || 5000;
//configs
require("dotenv").config();

//middle ware
app.use(cors());
app.use(express.json());

//rest apis

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vsmf7bv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const spotsCollection = client.db("tourismoza").collection("touristSpots");

    // api for toursit spot create

    app.post("/newSpot", async (req, res) => {
      const newSpot = req.body;
      const result = await spotsCollection.insertOne(newSpot);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("this sever is working fine");
});

//listening
app.listen(port, () => {
  console.log(`this server is working in the port: ${port}`.bgGreen.white);
});
