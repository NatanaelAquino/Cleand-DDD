export declare class Left<L, R> {
    readonly value: L;
    constructor(value: L);
    isRight(): this is Right<R, L>;
    isLeft(): this is Left<L, R>;
}
export declare class Right<R, L> {
    readonly value: R;
    constructor(value: R);
    isRight(): this is Right<R, L>;
    isLeft(): this is Left<L, R>;
}
export type Either<L, R> = Left<L, R> | Right<R, L>;
export declare const left: <L, R>(value: L) => Either<L, R>;
export declare const right: <L, R>(value: R) => Either<L, R>;
