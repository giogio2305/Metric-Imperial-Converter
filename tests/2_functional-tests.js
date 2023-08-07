const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    suite("Routes Testing", ()=>{
        
        test("Convertion Route test", (done)=>{
            chai
            .request(server)
            .get("/api/convert")
            .query({"input":"10L"})
            .end((err, res)=>{
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, 'L');
                assert.equal(res.body.returnNum, 2.64172);
                assert.equal(res.body.returnUnit, "gal");
                done();
            });
        });

        test("Invalid input unit Route test", (done)=>{
            chai
            .request(server)
            .get("/api/convert")
            .query({"input":"32g"})
            .end((err, res)=>{
                assert.equal(res.status, 200);
                assert.equal(res.body.initUnit, undefined);
                done();
            });
        });

        test("Invalid input number  Route test", (done)=>{
            chai
            .request(server)
            .get("/api/convert")
            .query({"input":"3/7.2/4kg"})
            .end((err, res)=>{
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
                done();
            });
        });

        test("Invalid input number and unit  Route test", (done)=>{
            chai
            .request(server)
            .get("/api/convert")
            .query({"input":"3/7.2/4kilomegagram"})
            .end((err, res)=>{
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
                assert.equal(res.body.initUnit, undefined);
                done();
            });
        });

        test("No input number conversion Route test", (done)=>{
            chai
            .request(server)
            .get("/api/convert")
            .query({"input":"kg"})
            .end((err, res)=>{
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, "kg");
                assert.equal(res.body.returnNum, 2.20462 );
                assert.equal(res.body.returnUnit, "lbs");
                done();
            });
        });

    });
});
