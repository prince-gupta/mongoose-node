const assert = require('assert');
const Server = require('../src/server');

describe("Subdocuments", () =>{

    it("can create sub dcoument for Server", (done) =>{
        let server = new Server({
            name : "Server-1",
            ip : "127.0.0.1",
            isRunning : true,
            os : [{
                name : "Windows",
                version : "10"
            },
            {
                name : "Linux",
                version : "17"
            }]
        });
        server.save()
        .then(() => Server.findOne({name: "Server-1"}))
        .then((server) => {
            assert(server.os[1].name === "Linux");
            done();
        });
    });

    it('can add more post to records ', (done) => {
         let server = new Server({
            name : "Server-1",
            ip : "127.0.0.1",
            isRunning : true,
            os : []
        });
        server.save()
        .then(() => Server.findOne({name: "Server-1"}))
        .then((server) => {
            server.os.push({
                name : "Linux",
                version : "16"
            });
            return server.save()
        })
        .then((server) => {
            assert(server.os[0].name === "Linux");
            done();
        });
    }); 

    it('can remove existing subdocument', (done) => {
        let server = new Server({
            name : "Server-1",
            ip : "127.0.0.1",
            isRunning : true,
            os : [{
                name : "Linux",
                version : "17"
            }]
        });

        server.save()
        .then(() => Server.findOne({name : 'Server-1'}))
        .then((server) => {
            const os = server.os[0];
            // In case of subdocument subdocument.remove() will not delete subdocument from 
            // DB, infact instance.remove() will remove document from DB directly.
            os.remove();
            return server.save();
        })
        .then(() => Server.findOne({name : 'Server-1'}))
        .then((server) => {
            assert(server.os.length === 0);
            done();
        })
    });

})