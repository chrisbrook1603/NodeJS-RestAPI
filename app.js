// Const setup for API call
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const httpSuccessID = 200; 
const httpCreateID = 201;
const httpAcceptID = 202;
const httpBadRequestID = 400; 

// Const setup for new Database for products
const Datastore = require('nedb'); 
const db = new Datastore(); 

// Other supporting Const values
const log = console.log; // Simplifies the code required to initiate console log
const chalk = require('chalk'); // Provides increased 'prettiness' to the code outputs

// add body parser to app
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true
})
);

// Setup products structure
productBuilder = (productName, productDescription, productPrice, productCount) => {
    // use JSON to outline product
    let product =  { 
        name : productName,
        description : productDescription,
        price : productPrice,
        count : productCount
    };
    // return the product
    return product;
};

// ------------------------------ Setup API Calls ------------------------------ //
// Create a new product entry - POST
app.post(`/product/create-new`, (req, res) => {

    // Set log echo output
    log(chalk.italic.blue(`\nCREATE-NEW\n`));

    // Populate product content from post request
    let product = productBuilder(req.body.name, req.body.description, req.body.price, req.body.count);

    // Populate the Database with a new Product entry
    db.insert(product, (err, product) => {

        // if error, send a response containing the error message & 400 error code
        if (err) res.status(httpBadRequestID).send(err);

        // send a success response & product
        res.status(httpCreateID).send(product);

        // send the product back to the console
        log(chalk.bold.green(`Created a new product:\n`));
        log(chalk.italic.green(product));

    });

});

// Update all product data by ID - PUT
app.put('/product/update/:id', (req,res) => {

    // Set log echo output
    log(chalk.italic.blue(`\nUPDATE\n`));
    
    // Set the product id from the request parameters
    let prodId = req.params.id;

    let updatedProduct = {
        _id : prodId,
        name : req.body.name, 
        description : req.body.description,
        price : req.body.price,
        count : req.body.count
    };

    // query the Database '_id:' to get the product
    db.update({_id: prodId}, updatedProduct, (err, product) => {

        // if error, send a response containing the error message & 400 error code
        if (err) res.status(httpBadRequestID).send(err);
        
        // send a success response & updated product
        res.status(httpAcceptID).send(updatedProduct);

        // send the product back to the console
        log(chalk.bold.green(`Updated product by id:  ${prodId}`));
        log(chalk.italic.green(updatedProduct));

    });

});

// Update count of products by ID - PUT
app.put('/product/update-count/:id/:count', (req,res) => {

    // Set log echo output
    log(chalk.italic.blue(`\nUPDATE-COUNT\n`));
    
    // Set the product id from the request parameters
    let prodId = req.params.id;
    let newCount = req.params.count;

    let updatedProduct = {
        _id : prodId,
        count : newCount
    };

    // query the Database '_id:' to get the product
    db.update({_id: prodId}, updatedProduct, (err, product) => {

        // if error, send a response containing the error message & 400 error code
        if (err) res.status(httpBadRequestID).send(err);
        
        // send a success response & updated product
        res.status(httpAcceptID).send(updatedProduct);

        // send the product back to the console
        log(chalk.bold.green(`Updated count of product by id:  ${prodId}`));
        log(chalk.italic.green(updatedProduct));

    });

});

// Get and return all products - GET
app.get('/product/read', (req,res) => {

    // Set log echo output
    log(chalk.italic.blue(`\nREAD-ALL\n`));

    // query the Database with 'nothing' to get all data
    db.find({}, (err, products) => {

        // if error, send a response containing the error message & 400 error code
        if (err) res.status(httpBadRequestID).send(err);
        
        // send a success response & all products
        res.status(httpSuccessID).send(products);

        // send the product back to the console
        log(chalk.bold.green(`Reading all products:\n`));
        log(chalk.italic.green(products));

    });

});

// Get and return a single product by the ID - GET
app.get('/product/read/:id', (req,res) => {

    // Set log echo output
    log(chalk.italic.blue(`\nREAD-ONE\n`));

    // getting the product id from the URL as a parameter
    let prodId = req.params.id;

    // query the Database '_id:' to get the product
    db.find({_id: prodId}, (err, product) => {

        // if error, send a response containing the error message & 400 error code
        if (err) res.status(httpBadRequestID).send(err);
        
        // send a success response & found product
        res.status(httpSuccessID).send(product);

        // log the data to console
        log(chalk.bold.green(`Reading product by id: ${prodId}`));
        log(chalk.italic.green(product));

    });

});

// Delete a product by its ID - DELETE
app.delete('/product/delete/:id', (req,res) => {

    // Set log echo output
    log(chalk.italic.blue(`\nDELETE\n`));

    // getting the product id from the URL as a parameter
    let prodId = req.params.id;

    // remove from the Database by '_id:' to get the product
    db.remove({_id: prodId}, (err, product) => {

        // if error, send a response containing the error message & 400 error code
        if (err) res.status(httpBadRequestID).send(err);
        
        // send a success response & updated product
        res.status(httpAcceptID).send(`Deleted product by id: ${prodId}`);

        // console log that we are deleting the products
        log(chalk.bold.green(`Deleted product by id: ${prodId}`));

    });

});

module.exports = {app, productBuilder};