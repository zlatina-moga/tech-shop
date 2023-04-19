import * as request from "./requester";
const baseUrl = "https://api.citgrup.ro/public/products/filters/options";

export const getBrands = (category) =>
  request.get(`${baseUrl}/brand/brand?filter[category]=${category}`);

export const getProcessors = (category) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}`
  );

export const getProcessorsByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getBrandsByProcessor = (category, processor) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getHighestPrice = (category) =>
  request.get(`${baseUrl}/price/price?filter[category]=${category}`)

  export const getHighestPriceByType = (category, type) =>
  request.get(`${baseUrl}/price/price?filter[category]=${category}&filter[qualities]=${type}`);

export const getHighestPriceByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getHighestPriceByProcessor = (category, processor) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getProcessorGeneration = (category) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}`
  );

export const getProcessorGenerationByProcessor = (category, processor) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getProcessorGenerationByType = (category, type) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[qualities]=${type}`
  );

export const getProcessorGenerationByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}`
  );

  export const getTypes = (category) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}`
  );


export const getTypesByProcessor = (category, processor) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

  export const getTypesByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}`
  );