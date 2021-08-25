export interface IFormValue {
  _id: string;
  fullName: string;
  email: string;
  birthday: Date;
  phone: string;
  mssv: string;
  department: string[];
  address: string;
  role: string;
  gender: 'Nam' | 'Nữ';
  avatar?: string;
  major?: string;
  ability: string[];
  linkFB?: string;
}
