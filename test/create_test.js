const Server = require('../src/server');
const assert = require('assert');

describe('Creating Server Records', () => {

    //"done" is available to every single 'it' block.
    it(' save server model using instance.save()', (done) => {
        const server = new Server({
            name: 'Server 1',
            ip: '127.0.0.1',
            isRunning: true
        });

        server.save()
            .then(() => {
                
                // <instance>.isNew will return true if instance is still yet to be attached 
                // to DB, so if <instance>.isNew returing false then that means that instance is saved to DB.
                assert(!server.isNew);

                //after saving to DB , emit done to mocha so that mocha will proceed for next process.
                done();
            })
    })
});