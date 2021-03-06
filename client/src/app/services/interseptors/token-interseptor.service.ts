import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { TOKEN_KEY } from '@app/consts/keys';

/**
 * Сервис перхватичк запросов
 */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private storSrv: StorageService) { }
    /**
     * Добавляет в случае наличия авторизационный токен к запросу в виде HTTP закголовка
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authHeader = req.headers.get('Authorization');
        const token = this.storSrv.getSessionItem(TOKEN_KEY);
        if (token && !authHeader) {
            const oAuthReq = req.clone({
                headers: req.headers.append('Authorization', token)
            });
            return next.handle(oAuthReq);
        } else {
            return next.handle(req);
        }
    }
}
