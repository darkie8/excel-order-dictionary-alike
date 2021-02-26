import * as XLSX from 'xlsx';
import Axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
interface returnJSON {
    [x: string]: any[]
}
function ordering (Z: any[], key: string, col: number, type?: 'eng' | 'bng') {
    try {
        const A1 = !type || type === 'bng' ?'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ং ঃ ঁ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত ৎ থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ড় ঢ় য়'
        : 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
        const B1 = 'া ি ী ু ূ ৃ ে ৈ ো ৌ';
        let A2 = A1.split(' ');
        let B2 = B1.split(' ');
        let Z2: any[];
        let m ='', n = '';
        
        let keyNames = Object.keys(Z.find(el => Object.keys(el).length === col));
        Z2 = !type || type === 'bng' ? Z.map(
            (el: { [x: string]: string; pos: any; }) => (el.pos = (el[key] ? el[key].replace(/ /g, '') : 'ঢ়য়')         
                                                                                    .replace(/[.!@#$%^&*\[\]\(\)\/_+-=）（\→]/g, '')
                                                                                    .split('্').map((str, m) => str.split('').map((str1, n, arr) => (B2.some(el2 => el2 === str1 || el2 === arr[n+1]) || A2.some((el2, i) => (el2 == str1 || el2 === arr[n+1]) && i < 14)) || n==arr.length-1 ? str1 : str1 + 'অ').join('')).join('')
                                                                                    .split('').map((el1: string, i: number, arr: string[]) => 
        A2.indexOf(el1) === -1 ? (B2.indexOf(el1) + 1)
        : A2.indexOf(el1)) 
        .filter((el2: any) => el2 !== 'NaN')    
        ,keyNames.forEach(key1 => {el[key1] = el[key1]? el[key1]  : 'N/A'}), el)
        
        )
        : Z.map((el: { [x: string]: string; pos: any; }) => (el.pos = (el[key] ? el[key].replace(' ', '')
        : 'ZZZZZ').toUpperCase().replace(/[.!@#$%^&*\[\]\(\)\/_+-=）（\→]/g, '').split('')
        .map((el1: string, i: number) => A2.indexOf(el1))  
        ,keyNames.forEach(key1 => {el[key1] = el[key1]? el[key1]  : 'N/A'}), el)
        
        );
        let maxLength = Math.max(...Z2.map(el => el.pos.length))
        Z2 = Z2.map(el => {
            for (let index = 0; index < maxLength - el.pos.length; index++) {
                el.pos.push(0)
                
            }
            return el;
        })
        for(let i = 0; i < maxLength; i++) {
            n = `${i === maxLength -1 ? '' : ':'} a.pos[${i}] - b.pos[${i}]${n}`;
            if(i === maxLength -1 ) break
            m = `${m}a.pos[${i}] === b.pos[${i}] ? `;
          }
          eval('let z = (a, b) =>' +m+n +';Z2.sort(z)');
        return Z2.map(el => (delete el.pos, el));
        
    } catch (error) {
        throw error;
    }
    
}
async function orderexcel (input: Buffer | string, key: string[], col: number[], type?: 'eng' | 'bng', path?: string, returnJSON?: boolean) : Promise<returnJSON | undefined> {
    try {
        const buffer = !Buffer.isBuffer(input) ? Buffer.from(((await Axios.get((input as string), {responseType: 'arraybuffer'})) as AxiosResponse).data) : input;
        const workBook = XLSX.read(buffer, { type: 'buffer' });
        const jsonData = workBook.SheetNames.reduce((initial: { [x: string]: unknown[]; }, name: string | number) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
        }, {});
        let workbook = XLSX.utils.book_new();
        Object.keys(jsonData).forEach((data, i) => {
            let value = ordering(jsonData[data], key[i], col[i], type);
            jsonData[data] = value;
            let worksheet = XLSX.utils.json_to_sheet(value);
            XLSX.utils.book_append_sheet(workbook, worksheet, data)
        })
        fs.writeFileSync(path??'', XLSX.write(workbook, {bookType:'xlsx', type:'buffer'}));
        return returnJSON? jsonData: undefined;
    } catch (error) {
        throw error;
    }
}
async function orderexcelspecifiworksheet (input: Buffer | string, worksheetName: string, key: string, col: number, type?: 'eng' | 'bng', path?: string, returnJSON?: boolean) : Promise<returnJSON | undefined> {
    try {
        const buffer = !Buffer.isBuffer(input) ? Buffer.from(((await Axios.get((input as string), {responseType: 'arraybuffer'})) as AxiosResponse).data) : input;
        const workBook = XLSX.read(buffer, { type: 'buffer' });
        const jsonData = workBook.SheetNames.reduce((initial: { [x: string]: unknown[]; }, name: string | number) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
        }, {});
        let workbook = XLSX.utils.book_new();
        if(!jsonData[worksheetName]) {throw new Error(`${worksheetName} doesn't exist !`)}
        let value = ordering(jsonData[worksheetName], key, col, type);
        jsonData[worksheetName] = value;
        let worksheet = XLSX.utils.json_to_sheet(value);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
        fs.writeFileSync(path??'', XLSX.write(workbook, {bookType:'xlsx', type:'buffer'}));
        return returnJSON? jsonData: undefined;
    } catch (error) {
        throw error;
    }
}
export const orderJSON = ordering;
export const orderExcel = orderexcel;
export const orderExcelSpecificWorkSheet = orderexcelspecifiworksheet;
export default orderexcel;