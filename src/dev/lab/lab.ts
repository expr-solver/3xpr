import { expressions as exp } from '../../lib'

(async () => {
// const list = [
// 'Product { name supplier { name contact phone } }',
// 'Product(id:1){ name supplier { name contact phone } }'
// ]
// for (const p of list) {
// const result = exp.graphqlToExpression(p)
// console.log(`${p} => ${result}`)
// }
	// const context = { orders: [{ number: '20001', customer: { firstName: 'John', lastName: 'Murphy' }, orderTime: '2022-07-30T10:15:54', details: [{ article: 'Pear', unitPrice: 1.78, qty: 2 }, { article: 'Banana', unitPrice: 1.99, qty: 1 }, { article: 'White grape', unitPrice: 2.03, qty: 1 }] }, { number: '20002', customer: { firstName: 'Paul', lastName: 'Smith' }, orderTime: '2022-07-30T12:12:43', details: [{ article: 'Apple', unitPrice: 2.15, qty: 1 }, { article: 'Banana', unitPrice: 1.99, qty: 2 }, { article: 'Pear', unitPrice: 1.78, qty: 1 }] }] }
	// console.log(exp.eval('orders[0]', context))
	console.log(JSON.stringify(exp.parameters('cities.push(salta).name')))
	// const data: any = { a: [1, 2, 3], b: 0 }
	// exp.eval('a.foreach(p=>b=b+p)', data)
	// console.log(data.b)
})()
