import { Api } from '../classes/api';

export interface IPaginationParams {
  total?: number;
  limit: number;
}
/**
 * Параметры пагинации для POST запроса
 */
export interface IPostParams {
  start: number;
  limit: number;
}
/**
 * Класс управляет параметрами пагинации
 */
export class PaginationParams implements IPaginationParams {
  /**
   * Предел запрашиваемых элементов
   */
  public limit: number;
  /**
   * Текущая страница
   */
  public currentPage = 1;
  /**
   * Стартовый элемент для запроса
   */
  private startItem: number;
  /**
   * Всего элементов
   */
  private totalItems: number;

  constructor(param: IPaginationParams) {
    this.startItem = 0;
    this.limit = param.limit;
    this.totalItems = param.total || null;
  }
  /**
   * Номер текущего стартового элемента
   */
  get start(): number {
    return this.startItem;
  }
  /**
   * Номер текущей страницы
   */
  get page(): number {
    return this.currentPage;
  }
  /**
   * Устанавливает текущую страницу
   */
  set page(page: number) {
    this.currentPage = Math.ceil(page);
    this.startItem = (page - 1) * this.limit;
  }
  /**
   * Устанавливает общее количество элементов
   */
  set total(total: number) {
    if (total) {
      this.totalItems = total;
    } else {
      this.totalItems = 0;
    }
  }
  /**
   * Возвращает общее количество элементов
   */
  get total(): number {
    return this.totalItems;
  }
  /**
   * Рассчитывает и возвращает общее количество страниц
   */
  get totalPage(): number {
    return Math.ceil(this.totalItems / this.limit) || 1;
  }
  /**
   * Генерирует строку параметров для GET запроса
   */
  public getUrlString(): string {
    return Api.getStringUrlParams({ start: this.startItem, limit: this.limit });
  }
  /**
   * Генерирует объект параметров для POST запроса
   */
  public getParamsObject(): IPostParams {
    return {
      start: this.startItem,
      limit: this.limit || null,
    };
  }
}
