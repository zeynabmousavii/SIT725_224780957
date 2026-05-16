const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = require('../server');

describe('API Endpoint Testing', function () {

    it('should return status 200', async function () {
        const res = await request(app)
            .get('/api/message');

        expect(res.status).to.equal(200);
    });

    it('should return correct message', async function () {
        const res = await request(app)
            .get('/api/message');

        expect(res.body.message).to.equal('Socket.IO server is running');
    });

});