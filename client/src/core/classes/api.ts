import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { COMMON_HTTP_ERR, HTTP_ERRORS } from '../consts/http-messages';
import { IAlert } from '../interfaces/alert.interface';
import { IFileReaderEvent } from '../interfaces/file-reader-event';
/**
 * Класс для работы с API сервера
 */
export abstract class Api {
    protected httpClient: HttpClient;

    constructor(injector: Injector, public readonly domain: string) {
        this.httpClient = injector.get(HttpClient);
    }
    /**
     * Генерирет сообщение для пользователя о ошибке HTTP
     */
    public static generateHttpErr(err: HttpErrorResponse, context?: string): IAlert {
        const message = HTTP_ERRORS[err.status];
        if (message) {
            return message(context);
        } else {
            return COMMON_HTTP_ERR(context);
        }
    }
    /**
     * Генерирует из обекта строку x-www-form-urlencoded
     */
    public static formUrlEncoded(data: object): string {
        const body = new URLSearchParams();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                body.set(key, data[key]);
            }
        });
        return body.toString();
    }
    /**
     * Генерирует из объекта строку GET параметров
     */
    public static getStringUrlParams(data: object): string {
        const params = Api.formUrlEncoded(data);
        return params ? `?${params}` : '';
    }
    /**
     * Генерирует первую часть URL из домена и переданного суфикса
     */
    protected getUrl(suffix: string): string {
        return `${this.domain}/${suffix}`;
    }
    /**
     * Отправляет POST запрос на сервер
     */
    protected async post(sufix: string, body?: any, headers?: HttpHeaders): Promise<any> {
        return this.httpClient.post(this.getUrl(sufix), body, { headers: headers }).toPromise();
    }
    /**
     * Отправляет GET запрос на сервер
     */
    protected async get(suffix: string, headers?: HttpHeaders, binary?: boolean): Promise<any> {
        return this.httpClient.get(this.getUrl(suffix), {
                headers: headers,
                responseType: binary ? 'arraybuffer' as 'json' : 'json' as 'json'
        } /* TODO: Angular, what is it ??? */ ).toPromise();
    }
    /**
     * Отправляет PUT запрос на сервер
     */
    protected async put(suffix: string, body?: any, headers?: HttpHeaders): Promise<any> {
        return this.httpClient.put(this.getUrl(suffix), body, { headers: headers }).toPromise();
    }
    /**
     * Отправляет DELETE запрос на сервер
     */
    protected async delete(sufix: string, body?: any, headers?: HttpHeaders): Promise<any> {
        return this.httpClient.delete(this.getUrl(sufix), { headers: headers }).toPromise();
    }
    /**
     * Преобразует бинарные данные в строку Base64
     */
    protected readFileFromBinary(binary: ArrayBuffer): Promise<string> {
        return new Promise((resolve, reject) => {
            const blob = new Blob([new Uint8Array(binary)]);
            const fr = new FileReader();
            fr.readAsDataURL(blob);
            fr.addEventListener('loadend', (e: IFileReaderEvent) => {
                const res: any = e.target.result;
                resolve(res as string);
            });
            fr.addEventListener('abort', (e) => {
                reject(e);
            });
        });
    }

}
