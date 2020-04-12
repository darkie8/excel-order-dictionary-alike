import * as XLSX from 'xlsx';
import Axios from 'axios';
import * as fs from 'fs';
function ordering (Z: any[], key: string, col: number, type?: 'eng' | 'bng') {
    const A1 = !type || type === 'bng' ?'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ড় ঢ় য় ৎ ং ঃ ঁ '
    : 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
    const B1 = 'া ি ী ু ূ ৃ ে ৈ ো ৌ';
    let A2 = A1.split(' ');
    let B2 = B1.split(' ');
    let Z2: any[];
    let m ='', n = '';
    
    let keyNames = Object.keys(Z.find(el => Object.keys(el).length === col));
    Z2 = !type || type === 'bng' ? Z.map((el: { [x: string]: string; pos: any; }) => (el.pos = (el[key] ? el[key].replace(' ', '')
    : ' ঁৎ').replace(RegExp('্', 'ig'), '').replace(/[.!@#$%^&*\[\]\(\)\/_+-=）（\→]/g, '').split('')
    .map((el1: string, i: number, arr: string[]) => 
    A2.indexOf(el1) === -1 ? A2.indexOf(arr[i-1]) + (B2.indexOf(el1) + 1)/100
    : A2.indexOf(arr[i+1]) === -1 ? 'NaN' 
    : A2.indexOf(el1))
    .filter((el2: any) => el2 !== 'NaN')    
    ,keyNames.forEach(key1 => el[key1]? el[key1]  : 'N/A'), el)
    
    )
    : Z.map((el: { [x: string]: string; pos: any; }) => (el.pos = (el[key] ? el[key].replace(' ', '')
    : 'ZZZZZ').toUpperCase().replace(/[.!@#$%^&*\[\]\(\)\/_+-=）（\→]/g, '').split('')
    .map((el1: string, i: number) => A2.indexOf(el1))  
    ,keyNames.forEach(key1 => el[key1]? el[key1]  : 'N/A'), el)
    
    );
    let maxLength = Math.max(...Z2.map(el => el.pos.length))
    for(let i = 0; i < maxLength; i++) {
        n = `${i === maxLength -1 ? '' : ':'} a.pos[${i}] - b.pos[${i}]${n}`;
        if(i === maxLength -1 ) break
        m = `${m}a.pos[${i}] === b.pos[${i}] ? `;
      }
      eval('let z = (a, b) =>' +m+n +';Z2.sort(z)');
    return Z2.map(el => (delete el.pos, el));
    
}
async function zebra (input?: any, key?: string, col?: number, type?: 'eng' | 'bng', path?: string) {
    try {
        let hello : any;
        hello = !Buffer.isBuffer(input) ? await Axios.get(input, {responseType: 'arraybuffer'}) : input;
        const buffer = !Buffer.isBuffer(input) ? Buffer.from(hello.data) : input;
        const workBook = XLSX.read(buffer, { type: 'buffer' });
        const jsonData = workBook.SheetNames.reduce((initial: { [x: string]: unknown[]; }, name: string | number) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
        }, {});
        let value = ordering(Object.values(jsonData)[0], key, col, type);
        let worksheet = XLSX.utils.json_to_sheet(value);
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'dictionary')
        const bf = XLSX.write(workbook, {bookType:'xlsx', type:'buffer'})
        fs.writeFileSync(path, bf);
    } catch (error) {
        return error;
    }
}
export const orderJSON = ordering;
export default zebra;