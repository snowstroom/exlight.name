import { IAlert } from '../../interfaces/alert.iterface';

const NEED_AUTH_MSG = 'Need authentication!';
const CONNECTION_LOST_MSG = 'Connection lost!';
const NOT_FOUND_MSG = 'Not found!';
const BAD_REQUEST_MSG = 'Bad request';
const SERVER_BAD_GATEWAY_MSG = 'Bad Gateway';
const INTERNAL_SERVER_ERR_MSG = 'Internal Server Error';
const UNK_ERR_MSG = 'Unknown error!';

export const NEED_AUTH = (msgCntxt: string): IAlert =>
    ({ type: 'danger', msg: msgCntxt ? `${msgCntxt}: ${NEED_AUTH_MSG}` : NEED_AUTH_MSG });
export const CONNECTION_LOST = (msgCntxt: string): IAlert =>
    ({ type: 'danger', msg: msgCntxt ? `${msgCntxt}: ${CONNECTION_LOST_MSG}` : CONNECTION_LOST_MSG });
export const NOT_FOUND = (msgCntxt: string): IAlert =>
    ({ type: 'danger', msg: msgCntxt ? `${msgCntxt}: ${NOT_FOUND_MSG}` : NOT_FOUND_MSG });
export const BAD_REQUEST = (msgCntxt: string): IAlert =>
    ({ type: 'danger', msg: msgCntxt ? `${msgCntxt}: ${BAD_REQUEST_MSG}` : BAD_REQUEST_MSG });
export const SERVER_BAD_GATEWAY = (msgCntxt: string): IAlert =>
    ({ type: 'danger', msg: msgCntxt ? `${msgCntxt}: ${SERVER_BAD_GATEWAY_MSG}` : SERVER_BAD_GATEWAY_MSG });
export const INTERNAL_SERVER_ERR = (msgCntxt: string): IAlert =>
    ({ type: 'danger', msg: msgCntxt ? `${msgCntxt}: ${INTERNAL_SERVER_ERR_MSG}` : INTERNAL_SERVER_ERR_MSG });
export const UNK_ERR = (msgCntxt: string): IAlert =>
    ({ type: 'danger', msg: msgCntxt ? `${msgCntxt}: ${UNK_ERR_MSG}` : UNK_ERR_MSG });

export const HTTP_ERRORS = {
    0: CONNECTION_LOST,
    400: BAD_REQUEST,
    401: NEED_AUTH,
    404: NOT_FOUND,
    500: INTERNAL_SERVER_ERR,
    502: SERVER_BAD_GATEWAY,
};
