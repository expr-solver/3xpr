import { OperatorMetadata, IExpressionConfig, Format } from '../model';
export declare class ExpressionConfig implements IExpressionConfig {
    enums: any;
    constants: any;
    formats: any;
    aliases: any;
    operators: OperatorMetadata[];
    functions: OperatorMetadata[];
    constructor();
    addEnum(key: string, source: any): void;
    addFormat(key: string, pattern: string): void;
    addConstant(key: string, value: any): void;
    addAlias(alias: string, reference: string): void;
    isEnum(name: string): boolean;
    isConstant(name: string): boolean;
    getEnumValue(name: string, option: string): any;
    getEnum(name: string): any;
    getConstantValue(name: string): any | undefined;
    getFormat(name: string): Format | undefined;
    getOperator(operator: string, operands?: number): OperatorMetadata;
    getFunction(name: string): OperatorMetadata;
    priority(name: string, cardinality?: number): number;
    addOperator(sing: string, source: any, priority: number): void;
    addFunction(sing: string, source: any, deterministic?: boolean): void;
    private _addOperator;
    private _addFunction;
    private getMetadata;
    private getTypeFromValue;
}
