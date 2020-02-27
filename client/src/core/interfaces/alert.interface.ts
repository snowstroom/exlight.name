/**
 * Интрфейс уведомления
 */
export interface IAlert {
  /**
   * Тип success | info | warning | danger;
   */
  type: 'success' | 'info' | 'warning' | 'danger';
  /**
   * Текст уведомления
   */
  msg: string;
  /**
   * Задержка в мс
   */
  dismissMs?: number;
}
