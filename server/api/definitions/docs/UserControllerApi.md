# OpenApiDefinition.UserControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**register**](UserControllerApi.md#register) | **POST** /register | 
[**user**](UserControllerApi.md#user) | **GET** /me | 



## register

> UserResponse register(userRequest)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserControllerApi();
let userRequest = new OpenApiDefinition.UserRequest(); // UserRequest | 
apiInstance.register(userRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userRequest** | [**UserRequest**](UserRequest.md)|  | 

### Return type

[**UserResponse**](UserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## user

> String user()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserControllerApi();
apiInstance.user((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

