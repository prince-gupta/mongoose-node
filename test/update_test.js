const assert = require('assert');
const Server = require('../src/server');

describe('Updating records', () => {

    let server;

    beforeEach((done) => {
        server = new Server({ 
            name: 'Server 1' ,
            ip: '127.0.0.1',
            running: true
        });
        server.save()
            .then(() => done()); 
    });

    function assertName(operation, done) {
        operation.then(() => Server.find({}))
            .then((servers) => {
                assert(servers.length === 1);
                assert(servers[0].name === 'Server 1.2');
                done();
            });
    }

    it('instance type using set and save', (done) => {
        server.set('name', 'Server 1.2');
        assertName(server.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(server.update({ name: 'Server 1.2' }), done);
    });

    it('A model class can update', (done) => {
        assertName(
            Server.update({ name: 'Server 1' }, { name: 'Server 1.2' }),
            done
        );

    });

    it('A model class can update one record', (done) => {
        assertName(
            Server.findOneAndUpdate({ name: 'Server 1' }, { name: 'Server 1.2' }),
            done
        );
    });

    it('A model class can find with an Id and update', (done) => {
        assertName(
            Server.findByIdAndUpdate(server._id, { name: 'Server 1.2' }),
            done
        )
    });
});