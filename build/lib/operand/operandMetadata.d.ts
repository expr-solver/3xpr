import { Library } from './';
export declare class OperandMetadata {
    libraries: any;
    operators: any;
    functions: any;
    constructor();
    addLibrary(library: Library): void;
    getOperatorMetadata(name: string, operands: number): any;
    getFunctionMetadata(name: string): any;
}
