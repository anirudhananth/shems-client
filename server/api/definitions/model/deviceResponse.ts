/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';
import { LocationResponse } from './locationResponse';

export class DeviceResponse {
    'type'?: string;
    'modelNumber'?: number;
    'location'?: LocationResponse;
    'enrollmentDate'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "modelNumber",
            "baseName": "modelNumber",
            "type": "number"
        },
        {
            "name": "location",
            "baseName": "location",
            "type": "LocationResponse"
        },
        {
            "name": "enrollmentDate",
            "baseName": "enrollmentDate",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return DeviceResponse.attributeTypeMap;
    }
}
