const assert = require('assert');
const Greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/greet';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

beforeEach(async function () {
    // clean the tables before each test run
    await pool.query("delete from users;");
});

describe('The greet function', function () {

    it('should set counter to 0 when database is reset', async function () {

        let testGreet = Greetings(pool);

        await testGreet.resetDatabase();

        assert.equal(0, await testGreet.setCounter());
    });
    it('should be able to take in a name and return a greeting in Mandarin and that name with the first letter uppercased', function () {

        let testGreet = Greetings();

        testGreet.setNames('ted');
        testGreet.setLang('Mandarin');
        assert.equal('你好吗, Ted', testGreet.greet());
    });
    it('should be able to take in a name and return a greeting in French and that name with the first letter uppercased', function () {

        let testGreet = Greetings();

        testGreet.setNames('ted');
        testGreet.setLang('French');
        assert.equal('Comment ça va, Ted', testGreet.greet());
    });

});
describe('Counter', function () {
    it('Should be able to return the count number if one person greeted', async function () {

        let testGreet = Greetings(pool);


        await testGreet.pushNames('Musa');

        assert.equal(1, await testGreet.setCounter());

    });
    it('Should be able to return the count number if same person greetet in all 3 langauges', async function () {

        let testGreet = Greetings(pool);


        await testGreet.pushNames('Musa');
        await testGreet.pushNames('Musa');
        await testGreet.greet();
        await testGreet.greet();
        await testGreet.greet();

        assert.equal(1, await testGreet.setCounter());

    });



});
describe('Name list', async function () {
    it('Should be able to return the list of all the names greeted', async function () {

        let testGreet = Greetings(pool);

        await testGreet.pushNames('Musa');
        await testGreet.pushNames('Mulalo');
        await testGreet.pushNames('Naledi');
        await testGreet.pushNames('Piet');

        assert.deepEqual([{
            counter: 1,
            name: 'Musa'
        },
        {
            counter: 1,
            name: 'Mulalo'
        },
        {
            counter: 1,
            name: 'Naledi'

        },
        {
            counter: 1,
            name: 'Piet'
        }], testGreet.greeted());


    });
    it('Should be able to return the list of all the names greeted', async function () {

        let testGreet = Greetings(pool);

        await testGreet.pushNames('Mulalo');
        await testGreet.pushNames('Mulalo');
        await testGreet.pushNames('Mashudu');

        assert.deepEqual([{
            counter: 2,
            name: 'Mulalo'
        },
        {
            counter: 1,
            name: 'Mashudu'
        }], testGreet.greeted());

    });

});
after(function () {
    pool.end();
});




