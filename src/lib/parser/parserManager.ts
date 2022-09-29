import { Node } from './node'
import { ExpressionConfig } from './expressionConfig'
import { Parser } from './parser'
import { Helper } from './../manager'
import { IParserManager } from './../model'

export class ParserManager implements IParserManager {
	public doubleOperators: string[]
	public tripleOperators: string[]
	public assignmentOperators: string[]
	private config: ExpressionConfig
	constructor (config: ExpressionConfig) {
		this.config = config
		this.tripleOperators = []
		this.doubleOperators = []
		this.assignmentOperators = []
		this.refresh()
	}

	public refresh () {
		for (const p in this.config.operators) {
			const metadata = this.config.operators[p]
			if (metadata.operator.length === 2) {
				this.doubleOperators.push(metadata.operator)
			} else if (metadata.operator.length === 3) {
				this.tripleOperators.push(metadata.operator)
			}
			if (metadata.category === 'assignment') {
				this.assignmentOperators.push(metadata.operator)
			}
		}
	}

	public priority (name: string, cardinality?:number): number {
		const metadata = this.config.getOperator(name, cardinality)
		return metadata && metadata.priority ? metadata.priority : -1
	}

	public isEnum (name: string) {
		return this.config.isEnum(name)
	}

	public getEnumValue (name: string, option: any) {
		return this.config.getEnumValue(name, option)
	}

	public getEnum (name: string) {
		return this.config.getEnum(name)
	}

	public parse (expression: string): Node {
		try {
			const buffer: string[] = this._minify(expression)
			const parser = new Parser(this, buffer)
			const node = parser.parse()
			//  delete _parser
			this.clearChildEmpty(node)
			// this.setParent(node)
			return node
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public toExpression (node: Node): string {
		const list: string[] = []
		// if (!node || !node.type) {
		// console.log(node)
		// }
		switch (node.type) {
		case 'const':
		case 'var':
			list.push(node.name)
			break
		case 'array':
			list.push('[')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(']')
			break
		case 'keyVal':
			list.push(node.name + ':')
			list.push(this.toExpression(node.children[0]))
			break
		case 'obj':
			list.push('{')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push('}')
			break
		case 'operator':
			if (node.children.length === 1) {
				list.push(node.name)
				list.push(this.toExpression(node.children[0]))
			} else if (node.children.length === 2) {
				list.push('(')
				list.push(this.toExpression(node.children[0]))
				list.push(node.name)
				list.push(this.toExpression(node.children[1]))
				list.push(')')
			}
			break
		case 'funcRef':
			list.push(node.name)
			list.push('(')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(')')
			break
		case 'childFunc':
			list.push(this.toExpression(node.children[0]))
			list.push('.' + node.name)
			list.push('(')
			for (let i = 1; i < node.children.length; i++) {
				if (i > 1) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(')')
			break
		case 'arrow':
			list.push(this.toExpression(node.children[0]))
			list.push('.' + node.name)
			list.push('(')
			list.push(node.children[1].name)
			list.push('=>')
			list.push(this.toExpression(node.children[2]))
			list.push(')')
			break
		default:
			throw new Error('node: ' + node.type + ' not supported')
		}
		return list.join('')
	}

	public clearChildEmpty (node: Node) {
		try {
			if (node.children.length > 0) {
				const toRemove: number[] = []
				for (let i = 0; i < node.children.length; i++) {
					if (node.children[i] === null) {
						toRemove.push(i)
					}
				}
				for (let i = 0; i < toRemove.length; i++) {
					delete node.children[toRemove[i]]
				}
			}
		} catch (error: any) {
			throw new Error('set parent: ' + node.name + ' error: ' + error.toString())
		}
		return node
	}

	public minify (expression: string): string {
		return this._minify(expression).join('')
	}

	private _minify (expression: string): string[] {
		let isString = false
		let quotes = ''
		const buffer = expression.split('')
		const length = buffer.length
		const result = []
		let i = 0
		while (i < length) {
			const p = buffer[i]
			if (isString && p === quotes) {
				isString = false
			} else if (!isString && (p === '\'' || p === '"' || p === '`')) {
				isString = true
				quotes = p
			}
			if (isString) {
				result.push(p)
			} else if (p === ' ') {
				// Only leave spaces when it's between alphanumeric characters.
				// for example in the case of "} if" there should not be a space
				if (i + 1 < length && i - 1 >= 0 && Helper.validator.isAlphanumeric(buffer[i - 1]) && Helper.validator.isAlphanumeric(buffer[i + 1])) {
					result.push(p)
				}
			// when there is a block that ends with "}" and then there is an enter , replace the enter with ";"
			// TODO: si estamos dentro de un objecto NO debería agregar ; luego de } sino rompe el obj
			} else if (p === '\n' && result.length > 0 && result[result.length - 1] === '}') {
				result.push(';')
			} else if (p !== '\n' && p !== '\r' && p !== '\t') {
				result.push(p)
			}
			i += 1
		}
		if (result[result.length - 1] === ';') {
			result.splice(-1)
			return result
		}
		return result
	}
}
