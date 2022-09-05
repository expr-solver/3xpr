import { Cache, Parameter, ActionObserver, ValidateResult, Schema } from './model'
import { ParserManager, ExpressionConfig } from './parser'
import { OperandManager, Operand } from './operand'
import { MemoryCache, ExpressionsManager, SchemaManager, SchemaValidator, SchemaExtender } from './manager'
import { CoreLib } from './operand/lib/coreLib'

export class Expressions {
	private cache: Cache
	private parserManager: ParserManager
	private expressionConfig: ExpressionConfig
	private operandManager: OperandManager
	private expressionsManager: ExpressionsManager
	private schemaExtender: SchemaExtender
	private schemaValidator: SchemaValidator
	private schemaManager: SchemaManager

	private observers:ActionObserver[]=[];

	constructor () {
		this.cache = new MemoryCache()
		this.expressionConfig = new ExpressionConfig()
		this.expressionConfig.addLibrary(new CoreLib())
		this.operandManager = new OperandManager(this.expressionConfig)
		this.parserManager = new ParserManager(this.expressionConfig)
		this.expressionsManager = new ExpressionsManager(this.cache, this.expressionConfig, this.operandManager, this.parserManager)
		this.schemaExtender = new SchemaExtender()
		this.schemaValidator = new SchemaValidator(this.expressionsManager)
		this.schemaManager = new SchemaManager(this.schemaExtender, this.schemaValidator)
	}

	private static _instance: Expressions
	public static get instance (): Expressions {
		if (!this._instance) {
			this._instance = new Expressions()
		}
		return this._instance
	}

	public get parser (): ParserManager {
		return this.parserManager
	}

	public get config (): ExpressionConfig {
		return this.expressionConfig
	}

	public get operand (): OperandManager {
		return this.operandManager
	}

	public parse (expression: string): Operand {
		return this.expressionsManager.parse(expression)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		return this.expressionsManager.parameters(expression)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	public eval (expression: string, data?: any): any {
		try {
			this.beforeExecutionNotify(expression, data)
			const result = this.expressionsManager.eval(expression, data)
			this.afterExecutionNotify(expression, data, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, data, error)
			throw error
		}
	}

	public addSchema (schema:Schema):Schema {
		return this.schemaManager.add(schema)
	}

	public validate (data:any, schema: string, model?:string): ValidateResult
	public validate (data:any, schema: Schema, model?:string) : ValidateResult
	public validate (data:any, schema: string|Schema, model?:string) : ValidateResult {
		return this.schemaManager.validate(data, schema, model)
	}

	// Listeners and subscribers
	public subscribe (observer:ActionObserver):void {
		this.observers.push(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		const index = this.observers.indexOf(observer)
		if (index === -1) {
			throw new Error('Subject: Nonexistent observer.')
		}
		this.observers.splice(index, 1)
	}

	private beforeExecutionNotify (expression:string, data: any) {
		const args = { expression: expression, data: data }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.before(args)
			} else {
				if (this.eval(observer.condition, data)) {
					observer.before(args)
				}
			}
		})
	}

	private afterExecutionNotify (expression:string, data: any, result:any) {
		const args = { expression: expression, data: data, result: result }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.after(args)
			} else {
				if (this.eval(observer.condition, data)) {
					observer.after(args)
				}
			}
		})
	}

	private errorExecutionNotify (expression:string, data: any, error:any) {
		const args = { expression: expression, data: data, error: error }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.error(args)
			} else {
				if (this.eval(observer.condition, data)) {
					observer.error(args)
				}
			}
		})
	}
}