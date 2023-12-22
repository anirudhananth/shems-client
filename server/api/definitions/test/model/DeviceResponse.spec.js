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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    
    factory(root.expect, root.OpenApiDefinition);
  }
}(this, function(expect, OpenApiDefinition) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new OpenApiDefinition.DeviceResponse();
  });

  var getProperty = function(object, getter, property) {
    
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('DeviceResponse', function() {
    it('should create an instance of DeviceResponse', function() {
      
      //var instance = new OpenApiDefinition.DeviceResponse();
      //expect(instance).to.be.a(OpenApiDefinition.DeviceResponse);
    });

    it('should have the property type (base name: "type")', function() {
      
      //var instance = new OpenApiDefinition.DeviceResponse();
      //expect(instance).to.be();
    });

    it('should have the property modelNumber (base name: "modelNumber")', function() {
      
      //var instance = new OpenApiDefinition.DeviceResponse();
      //expect(instance).to.be();
    });

    it('should have the property location (base name: "location")', function() {
      
      //var instance = new OpenApiDefinition.DeviceResponse();
      //expect(instance).to.be();
    });

    it('should have the property enrollmentDate (base name: "enrollmentDate")', function() {
      
      //var instance = new OpenApiDefinition.DeviceResponse();
      //expect(instance).to.be();
    });

  });

}));
