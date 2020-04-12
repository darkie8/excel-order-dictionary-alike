export function  orderJSON (json: any[], key: string, col: number, type?: 'eng' | 'bng') : any[];
export interface zebraStatic {
    (input?: any, key?: string, col?: number, type?: 'eng' | 'bng', path?: string, returnJSON?: boolean) : Promise<any[] | undefined>
}
declare const zebra: zebraStatic
export default zebra;
