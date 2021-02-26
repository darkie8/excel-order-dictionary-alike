/// <reference types="node" />
interface returnJSON {
    [x: string]: any[];
}
declare function ordering(Z: any[], key: string, col: number, type?: 'eng' | 'bng'): any[];
declare function orderexcel(input: Buffer | string, key: string[], col: number[], type?: 'eng' | 'bng', path?: string, returnJSON?: boolean): Promise<returnJSON | undefined>;
declare function orderexcelspecifiworksheet(input: Buffer | string, worksheetName: string, key: string, col: number, type?: 'eng' | 'bng', path?: string, returnJSON?: boolean): Promise<returnJSON | undefined>;
export declare const orderJSON: typeof ordering;
export declare const orderExcel: typeof orderexcel;
export declare const orderExcelSpecificWorkSheet: typeof orderexcelspecifiworksheet;
export default orderexcel;
