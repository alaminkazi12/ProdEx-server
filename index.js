const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

// middlewares to pass data
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r90hnej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    // database
    const prodex = client.db("prodEx");
    const productCollection = prodex.collection("Products");

    // products related api

    // app.get("/products", async (req, res) => {
    //   const result = await productCollection.find().toArray();
    //   res.send(result);
    // });

    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;
      const skip = (page - 1) * limit;
      const searchQuery = req.query.search || "";
      const brand = req.query.brand || "";
      const category = req.query.category || "";
      const minPrice = parseFloat(req.query.minPrice) || 0;
      const maxPrice =
        parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
      const sortField = req.query.sortField || "product_creation_date";
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

      const query = {
        ...(searchQuery && {
          product_name: { $regex: searchQuery, $options: "i" },
        }),
        ...(brand && { brand_name: brand }),
        ...(category && { category }),
        ...(minPrice !== 0 || maxPrice !== Number.MAX_SAFE_INTEGER
          ? { price: { $gte: minPrice, $lte: maxPrice } }
          : {}),
      };

      try {
        const result = await productCollection
          .find(query)
          .sort({ [sortField]: sortOrder })
          .skip(skip)
          .limit(limit)
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch products" });
      }
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
  res.send("ProdEx is on fire");
});

app.listen(port, () => {
  console.log(`ProdEx server is running on port ${port}`);
});
