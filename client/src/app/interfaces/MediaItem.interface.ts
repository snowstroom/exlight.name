export interface IMediaItem {
  id: number;
  type: string;
  coverUrl: string;
  fileUrl: string;
  performer: string;
  shows: number;
  name: string;
  text?: string;
  discription?: string;
}
