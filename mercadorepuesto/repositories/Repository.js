import axios from "axios";
//export const baseDomain = "https://mymedi.noudeveloper.com";
//export const baseDomain = "https://api.aal-estate.com";
export const baseDomain = "https://mercadorepuesto.gimcloud.com";
//export const baseUrlProduct = "https://mymedi.noudeveloper.com";
//export const baseUrlProduct = "https://api.aal-estate.com";
export const baseUrlProduct = "https://mercadorepuesto.gimcloud.com";

export const customHeaders = {
    Accept: "application/json",
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&");
};
