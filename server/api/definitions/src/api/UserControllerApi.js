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


import ApiClient from "../ApiClient";
import UserRequest from '../model/UserRequest';
import UserResponse from '../model/UserResponse';

/**
* UserController service.
* @module api/UserControllerApi
* @version v0
*/
export default class UserControllerApi {

    /**
    * Constructs a new UserControllerApi. 
    * @alias module:api/UserControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the register operation.
     * @callback module:api/UserControllerApi~registerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/UserRequest} userRequest 
     * @param {module:api/UserControllerApi~registerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserResponse}
     */
    register(userRequest, callback) {
      let postBody = userRequest;
      
      if (userRequest === undefined || userRequest === null) {
        throw new Error("Missing the required parameter 'userRequest' when calling register");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = UserResponse;
      return this.apiClient.callApi(
        '/register', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the user operation.
     * @callback module:api/UserControllerApi~userCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/UserControllerApi~userCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    user(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/me', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
