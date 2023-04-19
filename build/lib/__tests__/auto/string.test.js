"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('string', () => {
    const context = JSON.parse('{"firstName":"Juan","lastName":"Lopez","email":"jlopez@email.com","age":44,"food":"pizza","film":"Estación central","a":null,"b":"","c":" "}');
    test('lab', () => {
        expect(__1.expressions.eval('capitalize(food)', context)).toStrictEqual('Pizza');
        expect(__1.expressions.eval('chr(68)', context)).toStrictEqual('D');
        expect(__1.expressions.eval('concat(lastName,", ",firstName)', context)).toStrictEqual('Lopez, Juan');
        expect(__1.expressions.eval('concatenate(lastName,", ",firstName)', context)).toStrictEqual('Lopez, Juan');
        expect(__1.expressions.eval('title(film)', context)).toStrictEqual('Estación Central');
        expect(__1.expressions.eval('lower(film)', context)).toStrictEqual('estación central');
        expect(__1.expressions.eval('lpad(firstName,10,"_")', context)).toStrictEqual('______Juan');
        expect(__1.expressions.eval('ltrim("  a  ")', context)).toStrictEqual('a  ');
        expect(__1.expressions.eval('replace(film,"a","*")', context)).toStrictEqual('Est*ción centr*l');
        expect(__1.expressions.eval('mask(email)', context)).toStrictEqual('jlo*****com');
        expect(__1.expressions.eval('rpad(firstName,10,"_")', context)).toStrictEqual('Juan______');
        expect(__1.expressions.eval('rtrim("  a  ")', context)).toStrictEqual('  a');
        expect(__1.expressions.eval('substr(film,1,3)', context)).toStrictEqual('st');
        expect(__1.expressions.eval('substring(film,1,3)', context)).toStrictEqual('st');
        expect(__1.expressions.eval('upper(film)', context)).toStrictEqual('ESTACIÓN CENTRAL');
        expect(__1.expressions.eval('startWith(film,"E")', context)).toStrictEqual(true);
        expect(__1.expressions.eval('strCount(film,"a")', context)).toStrictEqual(2);
        expect(__1.expressions.eval('`${firstName} is ${age} years old and likes ${food}`', context)).toStrictEqual('Juan is 44 years old and likes pizza');
        expect(__1.expressions.eval('test("5","[a-zA-Z0-9_.]+$")', context)).toStrictEqual(true);
        expect(__1.expressions.eval('firstName.test("[a-zA-Z0-9_.]+$")', context)).toStrictEqual(true);
        expect(__1.expressions.eval('isEmpty(a)', context)).toStrictEqual(true);
        expect(__1.expressions.eval('isEmpty(b)', context)).toStrictEqual(true);
        expect(__1.expressions.eval('isEmpty(c)', context)).toStrictEqual(true);
        expect(__1.expressions.eval('isEmpty(food)', context)).toStrictEqual(false);
        expect(__1.expressions.eval('$HOME', context)).toStrictEqual('/home/flavio');
        expect(__1.expressions.eval('${USER}', context)).toStrictEqual('flavio');
        expect(__1.expressions.eval('concat($HOME,$USER)', context)).toStrictEqual('/home/flavioflavio');
        expect(__1.expressions.eval('concat(${HOME},$USER)', context)).toStrictEqual('/home/flavioflavio');
        expect(__1.expressions.eval('"Hello"+" "+"world"', context)).toStrictEqual('Hello world');
        expect(__1.expressions.eval('`value of home: $HOME`', context)).toStrictEqual('value of home: /home/flavio');
        expect(__1.expressions.eval('length(email) > 10 && length(email) < 100', context)).toStrictEqual(true);
        expect(__1.expressions.eval('email.length() > 10 && email.length() < 100', context)).toStrictEqual(true);
        expect(__1.expressions.eval('isEmpty(b)', context)).toStrictEqual(true);
        expect(__1.expressions.eval('isNotEmpty(c)', context)).toStrictEqual(false);
        expect(__1.expressions.eval('isNotEmpty(film)', context)).toStrictEqual(true);
    });
});
//# sourceMappingURL=string.test.js.map