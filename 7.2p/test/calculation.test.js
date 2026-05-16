const chai = require('chai');
const expect = chai.expect;

const { add } = require('../calculator');

describe('Calculation Function Testing', function () {

    it('should add two positive numbers', function () {
        expect(add(2, 3)).to.equal(5);
    });

    it('should handle negative numbers', function () {
        expect(add(-2, 3)).to.equal(1);
    });

    it('should handle zero', function () {
        expect(add(0, 0)).to.equal(0);
    });

    it('should not return incorrect result', function () {
        expect(add(2, 2)).to.not.equal(5);
    });

});