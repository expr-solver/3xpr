import { Node } from './node';
import { ParserManager } from './parserManager';
export declare class Parser {
    private mgr;
    private reAlphanumeric;
    private reInt;
    private reFloat;
    private buffer;
    private length;
    private index;
    constructor(mgr: ParserManager, buffer: string[]);
    get previous(): string;
    get current(): any;
    get next(): string;
    get end(): boolean;
    private nextIs;
    parse(): Node;
    private char;
    private offset;
    private getExpression;
    private getOperand;
    private solveChain;
    private getValue;
    private getOperator;
    private getString;
    private getArgs;
    private getObject;
    private getBlock;
    private getIfBlock;
    private getWhileBlock;
    private getForBlock;
    private getChildFunction;
    private getIndexOperand;
    private getEnum;
}
