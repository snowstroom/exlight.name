import { Injectable } from '@angular/core';
/**
 * Сервис для работы слокальным хранилищем
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Добавляет новую запись в локальное хранилище
   */
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  public setSessionItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }
  /**
   * Получает запись из локального хранилища по ключу
   */
  public getItem(key: string): any {
    return localStorage.getItem(key);
  }

  public getSessionItem(key: string): any {
    return sessionStorage.getItem(key);
  }
  /**
   * Удаляет запись из локального хранилища
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }
  /**
   * Очищает локальное хранилище
   */
  public clearStorage(): void {
    localStorage.clear();
  }

  public clearSessionStorage(): void {
    localStorage.clear();
  }
}
