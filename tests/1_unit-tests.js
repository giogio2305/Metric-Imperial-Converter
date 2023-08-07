const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Function convertHandler.getNum(input)', ()=>{
        test('Whole number input', (done)=>{
            let input = '45L';
            assert.equal(convertHandler.getNum(input), 45);
            done();
        });

        test('Decimal number input', (done)=>{
            let input = '3.5L';
            assert.equal(convertHandler.getNum(input), 3.5);
            done();
        });

        test('Fractionnal number input', (done)=>{
            let input = '1/3L';
            assert.equal(convertHandler.getNum(input), 1/3);
            done();
        });

        test('Fractionnal with decimal number input', (done)=>{
            let input = '9/3.3L';
            assert.equal(convertHandler.getNum(input), 9/3.3);
            done();
        });

        test('Whole number input', (done)=>{
            let input = '3/2/3L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test('Whole number input', (done)=>{
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', ()=>{
        
        test('Read each valid input unit', (done)=>{
            let validunits = ["4km","2.3gal","13lbs","1/3mi","6.5l","7.5kg"];
        let validreturned = ["km","gal","lbs","mi","L","kg"];

        validunits.forEach((el, index)=>{
            assert.equal(convertHandler.getUnit(el), validreturned[index]);
        });
        done();
        });

        test('Error for invalid input unit', (done)=>{
            let input = '3.5ml';
            assert.equal(convertHandler.getUnit(input), undefined);
            done();
        });

        test('Correct return unit for each input unit', (done)=>{
            let inputunits = ["km","gal","lbs","mi","l","kg"];
            let outputunits = ["mi","L","kg","km","gal","lbs"];
            inputunits.forEach((el, index)=>{
            assert.equal(convertHandler.getReturnUnit(el), outputunits[index]);
            });
            done();
        });

        test('Correct spelled-out string unit for each input unit', (done)=>{
            let inputunits = ["km","gal","lbs","mi","l","kg"];
            let outputunits = ["kilometers","gallons","pounds","miles","liters","kilograms"];
            inputunits.forEach((el,index)=>{
            assert.equal(convertHandler.spellOutUnit(el), outputunits[index]);
            });
            done();
        });
    });


    suite('Function convertHandler.convert(initNum, initUnit)', ()=>{

        test('Correctly convert gal to L',(done)=>{
            let num = 4;
            let unit = "gal";
            let expected =15.14164;

            assert.equal(convertHandler.convert(num, unit),expected);
            done();
        });

        test('Correctly convert L to gal',(done)=>{
            let num = 15.14164;
            let unit = "L";
            let expected = 4;

            assert.equal(convertHandler.convert(num, unit),expected);
            done();
        });

        test('Correctly convert mi to km',(done)=>{
            let num = 3.1;
            let unit = "mi";
            let expected = 4.98895;

            assert.equal(convertHandler.convert(num, unit),expected);
            done();
        });

        test('Correctly convert km to mi',(done)=>{
            let num = 1/2;
            let unit = "km";
            let expected = 0.31069 ;

            assert.equal(convertHandler.convert(num, unit),expected);
            done();
        });

        test('Correctly convert lbs to kg',(done)=>{
            let num = 5.4/3;
            let unit = "lbs";
            let expected = 0.81647;

            assert.equal(convertHandler.convert(num, unit),expected);
            done();
        });

        test('Correctly convert kg to lbs',(done)=>{
            let num = 1;
            let unit = "kg";
            let expected = 2.20462;

            assert.equal(convertHandler.convert(num, unit),expected);
            done();
        });
    });
});