import { Type, Parameter, OperatorMetadata, OperatorType } from '../model'

export interface Metadata {
	description?: string
	return:string
	params:Parameter[]
}

export abstract class Library {
	public name:string
	public enums:any
	public formats:any
	public operators:OperatorMetadata[]
	public functions: OperatorMetadata[]

	constructor (name:string) {
		this.name = name
		this.enums = {}
		this.formats = {}
		this.operators = []
		this.functions = []
	}

	public addEnum (name:string, source:any) {
		this.enums[name] = source
	}

	public addFormat (name:string, pattern:any) {
		this.formats[name] = pattern
	}

	public addFunction (name:string, source:any, type:OperatorType = OperatorType.function, custom:any = null, deterministic = true):any {
		const metadata = this.getMetadata(source)
		this.functions.push({
			name: name,
			operator: name,
			type: type,
			deterministic: deterministic,
			lib: this.name,
			operands: metadata.params.length,
			description: metadata.description,
			params: metadata.params,
			return: metadata.return,
			function: source,
			custom: custom
		})
	}

	public addOperator (name:string, source:any, custom:any = null):any {
		const metadata = this.getMetadata(source)
		this.operators.push({
			operator: name,
			name: source.name,
			deterministic: true,
			type: OperatorType.operator,
			lib: this.name,
			operands: metadata.params.length,
			description: metadata.description,
			params: metadata.params,
			return: metadata.return,
			function: source,
			custom: custom
		})
	}

	private getMetadata (source:any):Metadata {
		const args = []
		const _args = this.getArgs(source)
		for (const k in _args) {
			const p = _args[k]
			const data = p.split('=')
			const arg = {
				name: data[0],
				type: 'any' as Type,
				default: data.length > 1 ? data[1] : null
			}
			args.push(arg)
		}
		return {
			return: 'any',
			params: args
		}
	}

	private getArgs (source:string) {
		const args = (f:any) => f.toString().replace(/[\r\n\s]+/g, ' ')
			.match(/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/)
			.slice(1, 3)
			.join('')
			.split(/\s*,\s*/)
		return args(source)
	}
}
