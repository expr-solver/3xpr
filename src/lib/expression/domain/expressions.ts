import { OperandFacade } from '../../operand/domain'
import { ModelService } from '../../model/domain'
import { ActionObserver } from '../../shared/domain'

export interface ExpressionEvaluate {
	eval (expression: string, data?: any): any
	evalAsync (expression: string, data?: any): Promise<any>
}

export interface ExpressionListener {
	subscribe (observer:ActionObserver):void
	unsubscribe (observer:ActionObserver): void
}

export interface ExpressionConverter {
	convert(source:any):[string, any]
}
export interface ExpressionConvert {
	addConvert (key:string, converter:ExpressionConverter): ExpressionConvert
	getConvert (key:string):ExpressionConverter
	convert (source:any, from:string): [string, any]
}
export interface IExpressions extends ModelService, ExpressionEvaluate, OperandFacade, ExpressionConvert, ExpressionListener {}

export interface ExpressionConfig {
	model: ModelService
	expressionConvert:ExpressionConvert
	operandFacade:OperandFacade
	expressionEvaluator:ExpressionEvaluate
}
