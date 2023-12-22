# OpenApiDefinition.DeviceControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getDevices**](DeviceControllerApi.md#getDevices) | **GET** /{customerId}/get | 



## getDevices

> DeviceResponse getDevices(customerId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.DeviceControllerApi();
let customerId = "customerId_example"; 
apiInstance.getDevices(customerId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customerId** | **String**|  | 

### Return type

[**DeviceResponse**](DeviceResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

