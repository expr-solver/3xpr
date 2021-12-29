import { expressions } from '../../lib'

describe('Numeric', () => {
	test('arithmetic', () => {		
		expect(2).toBe(expressions.eval('1+1'))
		expect(1+1).toBe(expressions.eval('1+1'))
		expect(3+2-1).toBe(expressions.eval('3+2-1')) 
		expect(3*4-1).toBe(expressions.eval('3*4-1'))
		expect(1+4*2).toBe(expressions.eval('1+4*2'))
		expect(4+4+2+50+600).toBe(expressions.eval('4+4+2+50+600'))
		//expect(1-2-5).toBe(expressions.eval('1-2-5'))
		expect((1+4)*2).toBe(expressions.eval('(1+4)*2'))
		expect((2+3)*2).toBe(expressions.eval('(2+3)*2'))
		expect(2*(3+2)).toBe(expressions.eval('2*(3+2)'))
		expect(2*(3+2)*(2+2)).toBe(expressions.eval('2*(3+2)*(2+2)'))
		expect(1+2*3*4).toBe(expressions.eval('1+2*3*4'))  
		expect(2*3+4*5).toBe(expressions.eval('2*3+4*5'))
		expect((1+(2**3)*4)).toBe(expressions.eval('(1+(2**3)*4'))
		expect(1+2**3*4).toBe(expressions.eval('1+2**3*4')) 
		expect(1+2**(3*4)).toBe(expressions.eval('1+2**(3*4)'))
	})
	test('comparisons', () => {	
		expect(3>2).toBe(expressions.eval('3>2'))
		expect(3>2*2).toBe(expressions.eval('3>2*2'))
		expect(-3>2*22).toBe(expressions.eval('-3>2*2'))
		expect(4>=2*2).toBe(expressions.eval('4>=2*2'))
		expect(3<=2*2).toBe(expressions.eval('3<=2*2'))
		expect(3!=2*2).toBe(expressions.eval('3!=2*2'))
		expect(4!=2*2).toBe(expressions.eval('4!=2*2'))
		expect(-4!=2*2).toBe(expressions.eval('-4!=2*2'))
		expect(-4==-2*2).toBe(expressions.eval('-4==-2*2'))
		expect(-4 == -(2 * 2)).toBe(expressions.eval('-4==-(2*2)'))			
	})

	test('variables', () => {	
		expect(false).toBe(expressions.eval('a>b',{"a":1,"b":2}))
		expect(3).toBe(expressions.eval('a+b',{"a":1,"b":2}))
		expect(-2).toBe(expressions.eval('-a*b',{"a":1,"b":2}))
		expect(true).toBe(expressions.eval('a*3==b+1',{"a":1,"b":2}))
		expect(8).toBe(expressions.eval('(a*b)+(2*a+2*b)',{"a":1,"b":2}))
		expect(5).toBe(expressions.eval('2**b+a',{"a":1,"b":2})) 
		expect(5).toBe(expressions.eval('c.b', { "a": "1", "b": 2, "c": { "a": 4, "b": 5 } }))
	})

	test('assigments', () => {	
		const data = {"a":"1","b":2,"c":{"a":4,"b":5}}
		expressions.eval('a=8',data)
		expect(8).toBe(data['a'])
		expressions.eval('c.a=1',data)
		expect(1).toBe(data['c']['a'])
	})

	test('functions', () => {	
		expect(2).toBe(expressions.eval('nvl(a,b)',{"a":null,"b":2})) 	
	})
})	