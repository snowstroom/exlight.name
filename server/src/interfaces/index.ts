export interface IMulterFile {
  fieldname: string;
  originalname: string;
  buffer: ArrayBuffer | string;
  size: number;
}
