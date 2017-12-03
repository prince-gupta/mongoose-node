const Server = require('../src/server');
const assert = require('assert');


describe('Reading record from db ', () => {
    let server;
    beforeEach((done) => {
        server = new Server({
            name: 'Server 1',
            ip: '127.0.0.1',
            runnning: true
        });

        server.save()
            .then(() => done());
    });

    it(' using find to fetch all servers with ip 127.0.0.1 ', (done) => {
        Server.find({ ip: '127.0.0.1' })
            .then((servers) => {
                // Although servers[0]._id string will be equal to joe._id string but if we compare 
                // severs[0]._id === server._id it will fail as Mongo wraps id of tuple in ObjectId("id")
                // thats why we need to call toString() on both of them to get string value of them 
                // and then we can compare them for equality.

                assert(servers[0]._id.toString() === server._id.toString());
                done();
            });
    });

    it(' using findOne to fetch exact one server ', (done) => {
        // We need not to use toString() here while passing _id to Mongoose
        // as mongoose in collabration with mongo, internally wrpas it to 
        // ObjectId("_id");
        Server.findOne({ _id: server._id })
            .then((_server) => {
                assert(_server.name === server.name);
                done();
            });
    })
});