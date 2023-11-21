const myApp = require('../app');
const validUrl = require('valid-url');

describe('test generateUrl', () => {
    test('test when the values are all valid with the minimum requirements', () => {
        const testObject = {
            code: 'xx',
            experience_id: null,
            experience_date: '2023-11-21 10:00:00',
            company_unit_code: 'xxxx',
            person: {
                name: 'xxxx',
                internal_code: 'xxxx',
                type: 'CUSTOMER',
                company_unit_code: 'xxx'
            }
        };
        const encryptKey = 'xxx';
        const url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBe(url);
    });

    test('test when encryptKey is empty', () => {
        const testObject = {
            code: 'xx',
            experience_id: null,
            experience_date: '2023-11-21 10:00:00',
            company_unit_code: 'xxxx',
            person: {
                name: 'xxxx',
                internal_code: 'xxxx',
                type: 'CUSTOMER',
                company_unit_code: 'xxx'
            }
        };
        const url = myApp.generateUrl(testObject);
        expect(validUrl.isUri(url)).toBeFalsy();
    });

    test('test when experience_date is invalid', () => {
        const testObject = {
            code: 'xxx',
            experience_id: null,
            experience_date: Date(),
            company_unit_code: 'xxx',
            person: {
                name: 'xxxx',
                internal_code: 'xxx',
                type: 'CUSTOMER',
                company_unit_code: 'xxx'
            }
        };
        const encryptKey = 'xxx';

        const url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();
    });

    test('test when no has required fields ', () => {
        const encryptKey = 'xxx';

        let testObject = {
            code: 'xxx',
            experience_id: null,
            experience_date: '2016-01-01 10:00:00',
            company_unit_code: 'xxxx',
        };
      
        let url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();

        testObject = {
            code: 'xxx',
            experience_id: null,
            experience_date: '2016-01-01 10:00:00',
            person: {
                name: 'xxxx',
                internal_code: 'xxxx',
                type: 'CUSTOMER',
                company_unit_code: 'x'
            }
        };

        url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();

        testObject = {
            code: 'xxx',
            experience_id: null,
            company_unit_code: 'xxxx',
            person: {
                name: 'xxx',
                internal_code: 'xxxx',
                type: 'CUSTOMER',
                company_unit_code: 'x'
            }
        };

        url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();

        testObject = {
            code: 'xxx',
            experience_date: '2016-01-01 10:00:00',
            company_unit_code: 'xxxx',
            person: {
                name: 'xxxx',
                internal_code: 'xxxx',
                type: 'CUSTOMER',
                company_unit_code: 'x'
            }
        };

        url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();

        testObject = {
            experience_id: null,
            experience_date: '2016-01-01 10:00:00',
            company_unit_code: 'xxxx',
            person: {
                name: 'xxxx',
                internal_code: 'xxxx',
                type: 'CUSTOMER',
                company_unit_code: 'x'
            }
        };

        url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();

        testObject = {
            code: 'xxx',
            experience_id: null,
            experience_date: '2016-01-01 10:00:00',
            company_unit_code: 'xxxx',
            person: ""
        };

        url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();

        testObject = {
            code: 'xxx',
            experience_id: null,
            experience_date: '2016-01-01 10:00:00',
            company_unit_code: 'xxxx',
            person: {}
        };

        url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();

        testObject = {
            code: 'xxx',
            experience_id: null,
            experience_date: '2016-01-01 10:00:00',
            company_unit_code: 'xxxx',
            person: {
                name: 'xxxx'
            }
        };

        url = myApp.generateUrl(testObject, encryptKey);
        expect(validUrl.isUri(url)).toBeFalsy();
    });
});
