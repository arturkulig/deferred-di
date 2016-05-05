import ddi from '../src';

ddi.logger = console;

function noop() {
}

describe('ddi', function () {
    it('exists', function () {
        expect(ddi).toBeDefined();
    });

    it('can define', function () {
        expect(() => {
            ddi(
                'name',
                noop
            );

            ddi(
                'name',
                'dep',
                noop
            );
        }).not.toThrow();
    });

    // TODO split inject styles
    it('can inject', function (done) {
        let m1a = ddi('m1a', () => 5);

        // ng style
        let m1bDef = m1a => m1a - 3;
        m1bDef.$inject = ['m1a'];
        let m1b = ddi('m1b', m1bDef);

        // with string
        let m2 = ddi('m2', 'm1a, m1b', (m1a, m1b) => {
            expect(m1a).toBe(5);
            expect(m1b).toBe(2);
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(m1a + m1b);
                }, 16);
            });
        });

        // with an array of strings
        let tester = ddi('mTest', ['m2'], (m2) => {
            expect(m2).toBe(7);
            done();
        });

        ddi.inject()
            (m1a)
            (m1b)
            (m2)
            (tester)
        ;
    });

    it('has then function in case of a success', function (done) {
        let m1 = ddi('m1', () => 5);
        let m2 = ddi('m2', () => new Promise(resolve => setTimeout(()=>resolve(2), 16)));

        ddi.inject()
            (m1)
            (m2)
            .then(({ m1, m2 }) => {
                expect(m1).toBe(5);
                expect(m2).toBe(2);
                done();
            })
        ;
    });

    it('has catch function in case of a failure', function (done) {
        let m1 = ddi('m1', () => 5);
        let m2 = ddi('m2', 'm3', () => new Promise(resolve => setTimeout(()=>resolve(2), 16)));

        ddi.inject()
            (m1)
            (m2)
            .catch(done)
        ;
    });
});

