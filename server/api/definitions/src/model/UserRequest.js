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
 * The UserRequest model module.
 * @module model/UserRequest
 * @version v0
 */
class UserRequest {
    /**
     * Constructs a new <code>UserRequest</code>.
     * @alias module:model/UserRequest
     * @param name {String} 
     * @param email {String} 
     */
    constructor(name, email) { 
        
        UserRequest.initialize(this, name, email);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, email) { 
        obj['name'] = name;
        obj['email'] = email;
    }

    /**
     * Constructs a <code>UserRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserRequest} obj Optional instance to populate.
     * @return {module:model/UserRequest} The populated <code>UserRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserRequest();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('billingAddress')) {
                obj['billingAddress'] = ApiClient.convertToType(data['billingAddress'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UserRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UserRequest</code>.
     */
    static validateJSON(data) {
        
        for (const property of UserRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }
        
        if (data['billingAddress'] && !(typeof data['billingAddress'] === 'string' || data['billingAddress'] instanceof String)) {
            throw new Error("Expected the field `billingAddress` to be a primitive type in the JSON string but got " + data['billingAddress']);
        }

        return true;
    }


}

UserRequest.RequiredProperties = ["name", "email"];

/**
 * @member {String} name
 */
UserRequest.prototype['name'] = undefined;

/**
 * @member {String} email
 */
UserRequest.prototype['email'] = undefined;

/**
 * @member {String} billingAddress
 */
UserRequest.prototype['billingAddress'] = undefined;






export default UserRequest;

