const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            servers: "http://localhost:3333"
        }
    },
    apis: ["app.js", ".routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
const dbURI =
    "mongodb+srv://belfekih:6789@cluster0.lufvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//connect to mongoose db

mongoose
    .connect(dbURI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        },
    );


const connexion = mongoose.connection;

connexion.once("open", () => {
    console.log("Connected")
}) &

    /* CORS */
    app.use(cors({
        origin: '*',
        methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
        allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
    }));
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Import Routes

const taskRoute = require('./routes/tasks');

// Define Routes
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *    description: Authentifier un nouvel utilisateur
 *   
 
 * /api/auth/register:
 *   post:
 *    description: Inscrire un nouvel utilisateur
 *
 */

app.use('/api/tasks', taskRoute);


module.exports = app;
