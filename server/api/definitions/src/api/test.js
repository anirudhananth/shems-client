const callApi = async () => {
    try {
        const res = await fetch(`http://localhost:8080/api/v1/device/1/get`);
        const data = await res
        console.log(data);
        return data; // It's a good practice to return the fetched data
    } catch (err) {
        console.error(err);
        // You might want to handle the error more explicitly, possibly returning a default value or an error indication
    }
};

export default callApi;
