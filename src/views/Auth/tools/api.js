import toast from "react-hot-toast";

/**
 * This class is used to call API ....
 */
export default class Api {
    static baseUrl = 'https://datacollection.quraniccompetition.com/api/';

    /**
     * call api function
     * @param {url} api to call ...etc
     * @param {showPopup} function to show error/response message
     * @returns Promise
     */
    static async fetch({ url, params, showPopup, method, customMessage, body, token }) {
        // init params
        url = this.baseUrl + url

        // call API
        let res
        try {
            // set params
            if (params != null)
                url = `${url}?${new URLSearchParams(params)}`
            // console.log(`url: ${url}`);
            // console.log(JSON.stringify(body));

            // set header
            const headers = {
                "Accept": "*/*",
                "Content-Type": "application/json",
            }
            if (token != null) {
                headers['Authorization'] = `Bearer ${token}`
            }

            // check method
            if (method == null || method == 'GET') {
                res = await fetch(url, { headers: headers })
            } else if (method == 'POST' || method == 'PUT'|| method == 'DELETE') {
                let requestBody = body != null ? JSON.stringify(body) : null;
                let fetchOptions = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json', // Set appropriate Content-Type header
                        ...headers // Include other headers
                    },
                    body: requestBody
                };
            
                res = await fetch(url, fetchOptions);
                // Log response
                if (!res.ok) {
                    toast.error(errorBody.title);
                    const errorBody = await res.json(); // Assuming response body is in JSON format
                    console.error('Request failed:', errorBody.title);
                    // You can handle the error message here, such as displaying it to the user
                } else {
                    console.log(res);
                    return res;
                }
                // res = await fetch(url, {
                //     method: method,
                //     body: body != null ? JSON.stringify(body) : body,
                //     headers: headers,
                // })
                // // log response
                // console.log(res);
            }
        } catch (error) {
            console.log(error.message);
            
            if (res && res.text) {
                const responseText = await res.text();
                console.log(responseText);
                return responseText;
            }
        
            return error.message;
        }

        if (res == null) {
            console.error('Response is null');
            return null;
        }

        // check the resposne 
        if (res.ok) {// resposne was success
            const response = await res.json() // convert object 
            // console.log('response:');
            // console.log(response);
            
            return response
        } else {
            // init error response
            let response
            try {
                response = await res.json();
                console.log(response);
            } catch (e) {
                console.log(e);
            }

            // show error message
            if (showPopup != null) {
                let message = customMessage ?? 'Something went wrong while retriving data from Server!'
                if (response?.message != null)
                    message = response.message
                showPopup(message)
            }
        }
        return null;
    }
}