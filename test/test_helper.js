const mongoose = require('mongoose');

//Assign global Promise to mongoose Promise as mongoose Promise is now deprecated.
mongoose.Promise = global.Promise;

before((done) => {

    //Asking mongoose to connect to mongoDB server which is running locally.
    mongoose.connect('mongodb://localhost/server_db', { useMongoClient: true });

    console.log("Trying to connect to DB . . . Please wait")

    mongoose.connection

        //'once' is a event handler : it means watch for mongoose to emit event called 'open' and once it emits go forward and 
        // call function - in this case it is done(). done() is mocha function which emits a events to mocha to proceed.
        .once('open', () => { 
            console.log('Connection with DB done ! ');
            console.log('Executing Test Cases .')
            done();
        })

        //'error' is a event handler : it means watch for mongoose to emit event called 'error' and once it emits go forward and 
        // call function - in this case it is console.warn();
        .on('error', (error) => {
            console.warn('Warning', error); 
        });
});

//Hook that will run before each test case
beforeEach((done) => {
    //By passing a callback function to drop , we are ensuring that mocha will wait before running next test
    // for that time untill drop triggers done() 
    mongoose.connection.collections.servers.drop(() => {
        // Ready to run next test !
        done();
    }); 
});