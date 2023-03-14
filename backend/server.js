require('dotenv').config();
// Modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true}));
app.use('/api', router);


//Config bodyParser
router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());
const jsonParser = bodyParser.json();

//Config Cors
router.use(cors());

//MongoDB client
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DATABASE_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});



//Connexion au server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}🚀`);
        
});


// Connexion à la DB
async function run() {
    
    try {
        await client.connect();
        console.log(`Successfully connected to DB 🚀`);
        const DB = client.db(process.env.DB);
        
        //Utiliser collection "products"
        const products = DB.collection("products");

        // Créer un produit                                                                                                                                                              
        

        // Route pour récupérer tous les produits
        router.get('/products', async (req, res) => {
            try {
                const results = await products.find().toArray();
                res.status(200).send(results);
            } catch (err) {
                console.log(err.stack);
                res.status(500).send('Une erreur est survenue lors de la récupération des produits.');
            }
        });

        
        //Insérer un document
        router.post("/products/add", async (req, res) => {     
            
            console.log(req.body);
            
            try {
                const newProduct = {
                    id: parseInt(req.body.id),
                    category: req.body.category,
                    name: req.body.name,
                    price: parseFloat(req.body.price)
                };                
                const result = await products.insertOne(newProduct);
                console.log(`Produit ajouté avec succès à la DB `);
                res.status(200).json(result);
            } catch (err) {
                console.log(err.stack);
                res.status(500).send('Une erreur est survenue lors de la création du produit.');
            }

        });

       
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);

//Page d'acceuil
router.get('/', (req, res) => {
    res.send("Page d'acceuil");
});






