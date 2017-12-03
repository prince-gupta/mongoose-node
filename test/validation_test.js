const assert = require('assert');
const Server = require('../src/server');

describe('Validating records', () => {

    it("require a Server name", () => {
        const server = new Server({
            name : undefined,
            ip : "127.0.0.1",
            running : false
        });

         /**
         * We have two functions to validate a object :
         *  1. instance.validateSync() : its a synchronus function and will return us
         *                               result sametime and is blocking in nature.
         *  2. instance.validate(callback) : its same as validateSync() but asynchronous
         *                                   in nature and will call callback function once
         *                                   ready with result.
         */
        const validationResult = server.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Server Name is required.');
    });

    it("require a ip address", () => {
        const server = new Server({
            name: "Server 1",
            ip: undefined
        });

        const validationResult = server.validateSync();
        const { message } = validationResult.errors.ip;
        assert(message === "Server ip is required.")
    });

    it("ip length must be greater than equals to 7", () => {
        const server = new Server({
            name : 'Server 1',
            ip : '1.1.1'
        });
        const validationResult = server.validateSync();
        const { message } = validationResult.errors.ip;
        assert(message === "ip lenght must be equals and greater than 7.")
    });

    it("must not save instance to db with invalid Server Name", (done) => {
        const server = new Server({
            name : undefined,
            ip : '1.1.1.1',
            running : true
        });

        server.save()
        .catch((validationResult) => {
             const { message } = validationResult.errors.name;
             assert(message === 'Server Name is required.');
             done();
        })
    });

    it("must not save instance to db with invalid ip", (done) => {
        const server = new Server({
            name : 'Server 1',
            ip : '1.1.1.',
            running : true
        });

        server.save()
        .catch((validationResult) => {
             const { message } = validationResult.errors.ip;
             assert(message === 'ip lenght must be equals and greater than 7.');
             done();
        })
    });
})