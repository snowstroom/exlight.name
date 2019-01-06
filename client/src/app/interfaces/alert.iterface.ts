export interface IAlert {
    type: 'success' | 'info' | 'warning' | 'danger';
    msg: string;
    timeMs?: number;
}
