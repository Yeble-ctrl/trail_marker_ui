/* Custom method for fetching data.
Takes the following arguments: url, method, headers, body, stateVarSetter.
Returns an oject which gets set to a State variable using the given state variable setter.*/

export async function fetchData(
    url: string,
    method: string,
    headers?: Headers,
    body?: object,
    stateVarSetter?: (data: any) => void
) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (stateVarSetter) {
            stateVarSetter(data);
        }
        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}