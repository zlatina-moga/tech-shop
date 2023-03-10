import * as request from "./requester";
const baseUrl = "https://api.citgrup.ro/public/products/filters/options";

export const getBrands = (category) => request.get(`${baseUrl}/brand/brand?filter[category]=${category}`)