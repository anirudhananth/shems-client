export * from './deviceControllerApi';
import { DeviceControllerApi } from './deviceControllerApi';
export * from './homeControllerApi';
import { HomeControllerApi } from './homeControllerApi';
export * from './userControllerApi';
import { UserControllerApi } from './userControllerApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [DeviceControllerApi, HomeControllerApi, UserControllerApi];
