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

export const getProcessorsByBrandAndType = (category, brand, type) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[qualities]=${type}&filter[brand]=${brand}`
  );

export const getProcessorGenerationByBrandAndType = (category, brand, type) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[qualities]=${type}&filter[brand]=${brand}`
  );

export const getBrandsByProcessor = (category, processor) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getBrandsByGeneration = (category, gen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getHighestPrice = (category) =>
  request.get(`${baseUrl}/price/price?filter[category]=${category}`);

export const getHighestPriceByType = (category, type) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[qualities]=${type}`
  );

export const getHighestPriceByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getHighestPriceByBrandAndProcessor = (
  category,
  brand,
  processor
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getHighestPriceByGenerationAndProcessor = (
  category,
  generation,
  processor
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}`
  );

export const getHighestPriceByGenerationTypeAndProcessor = (
  category,
  generation,
  processor,
  type
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[qualities]=${type}&filter[a-procesor-132]=${processor}`
  );

export const getHighestPriceByBrandTypeAndProcessor = (
  category,
  brand,
  processor,
  type
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[qualities]=${type}&filter[a-procesor-132]=${processor}`
  );

export const getHighestPriceByBrandTypeAndGeneration = (
  category,
  brand,
  generation,
  type
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[qualities]=${type}&filter[a-generatie-procesor-277]=${generation}`
  );

export const getHighestPriceByBrandAndGeneration = (
  category,
  brand,
  generation
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}`
  );

export const getHighestPriceByProcessor = (category, processor) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getHighestPriceByGen = (category, gen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getProcessorsByGeneration = (category, gen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
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
  request.get(`${baseUrl}/quality/qualities?filter[category]=${category}`);

export const getTypesByProcessor = (category, processor) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getTypesByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getProcessorsBrands = (category, type, processor) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[qualities]=${type}&filter[a-procesor-132]=${processor}`
  );

export const getGenerationBrands = (category, type, gen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[qualities]=${type}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getScreenSizes = (category) => request.get(`${baseUrl}/attributes/a-diagonala-25?filter[category]=${category}`)

export const getHighestPriceByScreen = (category, screen) => request.get(`${baseUrl}/price/price?filter[category]=${category}&filter[a-diagonala-25]=${screen}`)

export const getScreenSizesByBrand = (category, brand) => request.get(`${baseUrl}/attributes/a-diagonala-25?filter[category]=${category}&filter[brand]=${brand}`)

export const getHighestPriceByScreenAndBrand = (category, screen, brand) => request.get(`${baseUrl}/price/price?filter[category]=${category}&filter[a-diagonala-25]=${screen}&filter[brand]=${brand}`)