import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { HTTP_ERRORS, UNK_ERR } from '../consts/messages/http-messages.const';
import { IAlert } from '../interfaces/alert.iterface';
import { IFileReaderEvent } from '../interfaces/file-reader-event.interface';

export abstract class Api {
    protected httpClient: HttpClient;
    private readonly domain: string;
    constructor(injector: Injector, domain: string) {
        this.httpClient = injector.get(HttpClient);
        this.domain = domain;
    }

    public static generateHttpErr(err: HttpErrorResponse, msgCntxt?: string): IAlert {
        const message = HTTP_ERRORS[err.status];
        if (message) {
            return message(msgCntxt);
        } else {
            return UNK_ERR(msgCntxt);
        }
    }

    public static formUrlEncoded(data: object): string {
        const body = new URLSearchParams();
        Object.keys(data).forEach(key => {
            if (data[key]) {
                body.set(key, data[key]);
            }
        });
        return body.toString();
    }

    public static getStringUrlParams(data: object): string {
        const params = Api.formUrlEncoded(data);
        return params ? `?${params}` : '';
    }

    protected getUrl(suffix: string): string {
        return `${this.domain}/${suffix}`;
    }

    protected async post(sufix: string, body?: any, headers?: HttpHeaders): Promise<any> {
        return this.httpClient.post(this.getUrl(sufix), body, { headers: headers }).toPromise();
    }

    protected async get(suffix: string, headers?: HttpHeaders, binary?: boolean): Promise<any> {
        return this.httpClient.get(
            this.getUrl(suffix),
            { headers: headers, responseType: binary ? 'arraybuffer' as 'json' : 'json' as 'json' } // TODO: Angular, what is it ???
        ).toPromise();
    }

    protected async put(suffix: string, body?: any, headers?: HttpHeaders): Promise<any> {
        return this.httpClient.put(this.getUrl(suffix), body, { headers: headers }).toPromise();
    }

    protected async delete(sufix: string, body?: any, headers?: HttpHeaders): Promise<any> {
        return this.httpClient.delete(this.getUrl(sufix), { headers: headers }).toPromise();
    }

    protected readFileFromBinary(binary: ArrayBuffer): Promise<string> {
        return new Promise((resolve, reject) => {
            const blob = new Blob([new Uint8Array(binary)]);
            const fr = new FileReader();
            fr.readAsDataURL(blob);
            fr.addEventListener('loadend', (e: IFileReaderEvent) => {
                resolve(e.target.result as string);
            });
            fr.addEventListener('abort', (e) => {
                reject(e);
            });
        });
    }

}
