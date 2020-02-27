import { IAlert } from '../interfaces/alert.interface';

const NEED_AUTH_MSG = 'Need authentication!';
const CONNECTION_LOST_MSG = 'Connection lost!';
const NOT_FOUND_MSG = 'Not found!';
const BAD_REQUEST_MSG = 'Bad request';
const SERVER_BAD_GATEWAY_MSG = 'Bad Gateway';
const INTERNAL_SERVER_ERR_MSG = 'Internal Server Error';
const UNK_ERR_MSG = 'Unknown error!';
const AUTH_TIMEOUT_MSG = 'Session timeout!';
/**
 * Генерирует сообщение о необходимости аутентификации с контекстом
 */
export const NEED_AUTH = (context: string): IAlert => ({
  type: 'danger',
  msg: context ? `${context}: ${NEED_AUTH_MSG}` : NEED_AUTH_MSG,
});
/**
 * Генерирует сообщение о потере соединения с контекстом
 */
export const CONNECTION_LOST = (context: string): IAlert => ({
  type: 'danger',
  msg: context ? `${context}: ${CONNECTION_LOST_MSG}` : CONNECTION_LOST_MSG,
});
/**
 * Генерирует сообщение о том что ресурс не найден с контекстом
 */
export const NOT_FOUND = (context: string): IAlert => ({
  type: 'danger',
  msg: context ? `${context}: ${NOT_FOUND_MSG}` : NOT_FOUND_MSG,
});
/**
 * Генерирует сообщение о плохом запросе с контекстом
 */
export const BAD_REQUEST = (context: string): IAlert => ({
  type: 'danger',
  msg: context ? `${context}: ${BAD_REQUEST_MSG}` : BAD_REQUEST_MSG,
});
export const SERVER_BAD_GATEWAY = (context: string): IAlert => ({
  type: 'danger',
  msg: context
    ? `${context}: ${SERVER_BAD_GATEWAY_MSG}`
    : SERVER_BAD_GATEWAY_MSG,
});
/**
 * Генерирует сообщение об ошибке сервера с контекстом
 */
export const INTERNAL_SERVER_ERR = (context: string): IAlert => ({
  type: 'danger',
  msg: context
    ? `${context}: ${INTERNAL_SERVER_ERR_MSG}`
    : INTERNAL_SERVER_ERR_MSG,
});
/**
 * Генерирует сообщение о неизвестной ошибке HTTP с контекстом
 */
export const COMMON_HTTP_ERR = (context: string): IAlert => ({
  type: 'danger',
  msg: context ? `${context}: ${UNK_ERR_MSG}` : UNK_ERR_MSG,
});
/**
 * Генерирует сообщение о истекшей сессии с контекстом
 */
export const AUTH_TIMEOUT = (context: string): IAlert => ({
  type: 'danger',
  msg: context ? `${context}: ${AUTH_TIMEOUT_MSG}` : AUTH_TIMEOUT_MSG,
});
/**
 * Объкт типа Map с функциями генерирующие сообщения об ошибке по статусу
 */
export const HTTP_ERRORS = {
  0: CONNECTION_LOST,
  400: BAD_REQUEST,
  401: NEED_AUTH,
  404: NOT_FOUND,
  419: AUTH_TIMEOUT,
  500: INTERNAL_SERVER_ERR,
  502: SERVER_BAD_GATEWAY,
};
