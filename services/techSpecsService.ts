import * as request from "./requester";

export const getProductSpecs = (product) => request.get(`https://api.citgrup.ro/public/products/${product}/technical-specs`)

export const getUpgrade = (product) => request.get(`https://api.citgrup.ro/public/products/${product}`)