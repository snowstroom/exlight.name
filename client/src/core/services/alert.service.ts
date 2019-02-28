import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlert } from '../interfaces/alert.interface';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    /**
     * Список уведомлений
     */
    private alerts: IAlert[] = [];
    private alerts$: BehaviorSubject<IAlert[]> = new BehaviorSubject(this.alerts);
    /**
     * Время скрытия по умолчанию
     */
    private defTime = 5000;

    constructor() { }

    get $alerts(): Observable<IAlert[]> {
        return this.alerts$.asObservable();
    }
    /**
     * Добавляет новое уведомление
     */
    public addAlert(alert: IAlert): void {
        this.alerts.push(alert);
        this.alerts$.next(this.alerts);
        setTimeout(() => {
            this.closeAlert(alert);
            this.alerts$.next(this.alerts);
        }, alert.dismissMs || this.defTime);
    }
    /**
     * Скрывает уведомление
     */
    public closeAlert(alert: IAlert): void {
        this.alerts = this.alerts.filter(a => a.msg !== alert.msg);
    }

}
