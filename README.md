## Description

Function to help generate valid url for surveys on Wehelp

## Installation

```shell
npm i wehelp-url-generator
```

## Usage

JavaScript
```js
const wehelpGenerator = require('wehelp-url-generator');

```
TypeScript
```ts
import * as wehelpGenerator from 'wehelp-url-generator';
```

Example minimum data required
```js
const wehelpGenerator = require('wehelp-url-generator');

const data = {
    code: 'xx', //change to valid code
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
const encryptKey = 'xxx'; // change to valid encryptKey
const url = wehelpGenerator.generateUrl(data, encryptKey);
```

Example full data
```js
const wehelpGenerator = require('wehelp-url-generator');

const data = {
    code: 'xx', //change to valid code
    experience_id: null,
    experience_date: '2023-11-10 10:00:00',
    company_unit_code: 'xxxx', 
    person: {
        name: 'xxxx',
        internal_code: 'xxxx',
        type: 'CUSTOMER',
        company_unit_code: 'xxxxx',
        created_at: '2022-10-10',
        date_of_birth: '1988-07-06',
        language: 'PORTUGUESE',
        email: 'xxxx@email.com',
        phone: 'xxxxxxxx',
    },
    cf: {
        1: 'xxx', // id:valor
        2: 'xx',
    },
};
const encryptKey = 'xxx'; // change to valid encryptKey
const url = wehelpGenerator.generateUrl(data, encryptKey);
```

