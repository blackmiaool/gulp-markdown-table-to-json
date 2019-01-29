const fs = require('fs');
const chai = require("chai");
const inputText = fs.readFileSync("./test/test.md").toString();

const handle = require("../handle.js");
chai.should();
describe('handle', function () {
    it('can handle multiple tables', function (done) {
        handle(inputText, "######").should.deep.equal({
            boys: [{
                    name: 'John',
                    age: '11',
                    grade: '3'
                },
                {
                    name: 'Bob',
                    age: '13',
                    grade: '4'
                }
            ],
            girls: [{
                name: 'Petra',
                age: '15',
                grade: '8',

            }, {
                age: "14",
                grade: "7",
                name: "Olivia"
            }]
        });
        done();
    });

});
