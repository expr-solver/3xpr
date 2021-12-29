import { ParamMetadata, OperatorMetadata, OperatorType } from '../model';
export interface Metadata {
    desc?: string;
    return: string;
    params: ParamMetadata[];
}
export declare abstract class Library {
    name: string;
    enums: any;
    operators: OperatorMetadata[];
    functions: OperatorMetadata[];
    constructor(name: string);
    addEnum(key: string, source: any): void;
    addFunction(name: string, source: any, custom?: any, type?: OperatorType, deterministic?: boolean): any;
    addOperator(name: string, source: any, custom?: any): any;
    private getMetadata;
    private getArgs;
}
