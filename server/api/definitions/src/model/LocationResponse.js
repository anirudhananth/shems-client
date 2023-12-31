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
 *
 */

import ApiClient from '../ApiClient';

/**
 * The LocationResponse model module.
 * @module model/LocationResponse
 * @version v0
 */
class LocationResponse {
    /**
     * Constructs a new <code>LocationResponse</code>.
     * @alias module:model/LocationResponse
     */
    constructor() { 
        
        LocationResponse.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>LocationResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LocationResponse} obj Optional instance to populate.
     * @return {module:model/LocationResponse} The populated <code>LocationResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LocationResponse();

            if (data.hasOwnProperty('address')) {
                obj['address'] = ApiClient.convertToType(data['address'], 'String');
            }
            if (data.hasOwnProperty('zipCode')) {
                obj['zipCode'] = ApiClient.convertToType(data['zipCode'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>LocationResponse</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LocationResponse</code>.
     */
    static validateJSON(data) {
        
        if (data['address'] && !(typeof data['address'] === 'string' || data['address'] instanceof String)) {
            throw new Error("Expected the field `address` to be a primitive type in the JSON string but got " + data['address']);
        }
        
        if (data['zipCode'] && !(typeof data['zipCode'] === 'string' || data['zipCode'] instanceof String)) {
            throw new Error("Expected the field `zipCode` to be a primitive type in the JSON string but got " + data['zipCode']);
        }

        return true;
    }


}



/**
 * @member {String} address
 */
LocationResponse.prototype['address'] = undefined;

/**
 * @member {String} zipCode
 */
LocationResponse.prototype['zipCode'] = undefined;






export default LocationResponse;

