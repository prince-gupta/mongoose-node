const assert = require("assert");
const Server = require("../src/server");

describe("Deleting records from db", () => {

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

    function assertServer(operation, done){
        operation
        .then(() => Server.findOne({name : 'Server 1'}))
        .then((server) => {
            assert(server ===  null);
            done();
        });
    }

    it(" using model instance", (done) => {
        assertServer(server.remove(),done);
        
    });

    it(" using Model Class", (done) => {
        assertServer(Server.remove({name : 'Server 1'}), done);
    });

    it(" using Model Class findOneAndRemove ", (done) => {
        assertServer(Server.findOneAndRemove( {name : 'Server 1'}), done);
    })

    it(" using Model Class findByIdAndRemove ", (done) => {
        assertServer(Server.findByIdAndRemove( {_id : server._id}), done);
    })
});