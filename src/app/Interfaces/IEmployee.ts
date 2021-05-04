export interface IEmployee {
    firstname?: string |"";
    lastname?:string|"";
    gender?:string|"";
    email?: string |"";
    phonenumber?: string|"";
    address?: string|"";
    SSN?:string|"";
    designation?:string|"";
    department?: string|"";
    rating?:number|0;
    grosspay?:number|0;
    statetax?:number|0;
    federaltax?:number|0;
    healthinsurance?:number|0;
    socialsecuritytax?:number|0;
    reimbursements?:number|0;
    bonus?:number|0;
    payablesalary?:number|0;
}