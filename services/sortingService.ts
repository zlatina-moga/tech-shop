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

export const getBrandsByGenerationAndProcessor = (category, gen, procesor) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}`
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

export const getHighestPriceByBrandGenerationAndProcessor = (
  category,
  brand,
  generation,
  processor
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}`
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

export const getProcessorsByGenerationAndBrand = (category, gen, brand) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}`
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

export const getTypesByProcessorAndBrand = (category, processor, brand) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}`
  );

export const getTypesByProcessorAndGen = (category, processor, gen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getTypesByProcessorBrandAndGeneration = (
  category,
  processor,
  brand,
  gen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getTypesByBrandAndGeneration = (category, brand, gen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}`
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

export const getScreenSizes = (category) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-25?filter[category]=${category}`
  );

export const getHighestPriceByScreen = (category, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-diagonala-25]=${screen}`
  );

export const getScreenSizesByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-25?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getTypesByScreen = (category, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-diagonala-25]=${screen}`
  );

export const getBrandsByScreenSizes = (category, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-diagonala-25]=${screen}`
  );

export const getHighestPriceByBrandAndScreen = (category, brand, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-diagonala-25]=${screen}`
  );

export const getHighestPriceByScreenAndBrand = (category, screen, brand) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-diagonala-25]=${screen}&filter[brand]=${brand}`
  );

export const getComponentsByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-tip-componenta-237?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getHighestPriceByComponentAndBrand = (
  category,
  brand,
  component
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-tip-componenta-237]=${component}`
  );

export const getAccessoriesTypes = (category) =>
  request.get(
    `${baseUrl}/attributes/a-tip-accesoriu-252?filter[category]=${category}`
  );

export const getAccessoriesByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-tip-accesoriu-252?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getNetworkTypesByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-tip-261?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getDiscountedItemsBrands = (category) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[availability]=sale`
  );

export const getDiscountedItemsHighestPrice = (category) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[availability]=sale`
  );

export const getDiscountedItemsHighestPriceBrand = (category, brand) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[availability]=sale&filter[brand]=${brand}`
  );

export const getGenerationsByProcessor = (category, brand, processor) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getGenerationsByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getGenerationsByProc = (category, processor) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getGenerationsByType = (category) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}`
  );

export const getTypesByGeneration = (category, gen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getVideoCards = (category) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}`
  );

export const getBrandsByGenerationAndProcessorAndVideo = (
  category,
  gen,
  procesor,
  video
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandGenerationProcessorAndVideo = (
  category,
  brand,
  generation,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getProcessorsByGenerationBrandAndVideo = (
  category,
  gen,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandProcessorAndVideo = (
  category,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getGenerationsByProcessorAndVideo = (
  category,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandAndGenerationAndVideo = (
  category,
  brand,
  generation,
  video
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}`
  );

export const getProcessorsByGenerationAndBrandAndVideo = (
  category,
  gen,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByProcessorBrandGenerationNVideo = (
  category,
  processor,
  brand,
  gen,
  video
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandGenerationAndProcessorNVideo = (
  category,
  brand,
  generation,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByGenerationAndProcessorNVideo = (
  category,
  generation,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getProcessorsByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getGenerationsByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getBrandsByProcessorAndVideo = (category, processor, video) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByProcessorAndVideo = (
  category,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );
export const getGenerationsByProcessorNVideo = (category, processor, video) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByProcessorAndBrandAndVideo = (
  category,
  processor,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByBrandAndGenerationAndVideo = (
  category,
  brand,
  gen,
  video
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getBrandsByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByGenAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getProcessorsByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByProcessorAndGenAndVideo = (
  category,
  processor,
  gen,
  video
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getBrandsByVideo = (category, video) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByTypeVideo = (category, video) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getProcessorsByVideo = (category, video) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getGenerationsByVideo = (category, video) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getGenerationsByTypeAndVideo = (category, video) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByProcessorAndVideo = (category, processor, video) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getTypesByVideo = (category, video) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByVideo = (category, video) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getVideosByGenerationBrandAndProc = (
  category,
  gen,
  brand,
  processor
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getVideosByBrandAndProcessor = (category, brand, processor) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getVideosByGenerationAndBrand = (category, gen, brand) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}`
  );

export const getVideosByProcessorBrandAndGeneration = (
  category,
  processor,
  brand,
  gen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getVideosByGenerationAndProcessor = (category, gen, procesor) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}`
  );

export const getVideos = (category) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}`
  );

export const getVideosByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getVideosByProc = (category, processor) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getVideosByProcAndBrand = (category, processor, brand) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}`
  );

export const getVideosByGeneration = (category, gen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
  );
  export const getVideosByGenerationFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getProccessorsFrequency = (category) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}`
  );

export const getHighestPriceByBrandGenerationProcessorVideoAndFreq = (
  category,
  brand,
  generation,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByGenerationProcessorVideoAndFreq = (
  category,
  generation,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandGenerationFreqAndVideo = (
  category,
  brand,
  generation,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandFreqProcessorAndVideo = (
  category,
  brand,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandGenerationProcessorAndFreq = (
  category,
  brand,
  generation,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandAndProcessorAndFreq = (
  category,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getVideosByBrandAndProcessorAndFreq = (
  category,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getGenerationsByProcessorAndFreq = (
  category,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getTypesByProcessorBrandGenerationNVideoFreq = (
  category,
  processor,
  brand,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getBrandsByGenerationAndProcessorVideoAndFreq = (
  category,
  gen,
  procesor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getProcessorsByGenerationAndBrandAndVideoFreq = (
  category,
  gen,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getGenerationsByProcessorAndVideoFreq = (
  category,
  brand,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getVideosByGenerationBrandAndProcFreq = (
  category,
  gen,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFreqByGenerationBrandAndProcVideo = (
  category,
  gen,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFreqByGenerationBrandAndProc = (
  category,
  gen,
  brand,
  processor
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getFreqByBrandAndProcVideo = (category, brand, processor, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFreqByGenerationBrandAndVideo = (category, gen, brand, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

  export const getFreqByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getFreqByGenerationAndProcVideo = (
  category,
  gen,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandAndGenerationFreq = (
  category,
  brand,
  generation,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getProcessorsByGenerationAndBrandFreq = (
  category,
  gen,
  brand,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getVideosByGenerationAndBrandFreq = (category, gen, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFreqByProcessorBrandAndGeneration = (
  category,
  processor,
  brand,
  gen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}`
  );

  export const getProcessorsByVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByGenerationAndProcessorFreq = (
  category,
  generation,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getVideosByGenerationAndProcessorFreq = (
  category,
  gen,
  procesor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getBrandsByGenerationAndProcessorFreq = (
  category,
  gen,
  procesor,
  freq
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandAndVideoFreq = (
  category,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getProcessorsByBrandAndVideoFreq = (
  category,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getGenerationsByBrandAndVideoFreq = (
  category,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getBrandsByProcessorAndVideoFreq = (
  category,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByProcessorAndVideoFreq = (
  category,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getGenerationsByProcessorNVideoFreq = (
  category,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getTypesByProcessorAndBrandAndVideoFreq = (
  category,
  processor,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandProcessorAndVideoFreq = (
  category,
  brand,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getTypesByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getBrandsByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getGenerationsByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getProcessorsByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getVideosByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getTypesByBrandAndGenerationVideoFreq = (
  category,
  brand,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandAndGenerationVideoFreq = (
  category,
  brand,
  generation,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getBrandsByGenerationAndVideFreq = (category, gen, video, freq) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByGenAndVideoFreq = (category, gen, video, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getProcessorsByGenerationAndVideoFreq = (
  category,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getTypesByProcessorAndGenAndVideoFreq = (
  category,
  processor,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByGenerationAndProcessorNVideoFreq = (
  category,
  generation,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getBrandsByGenerationAndProcessorAndVideoFreq = (
  category,
  gen,
  procesor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFreqByBrandAndProcessor = (category, brand, processor) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getFreqByGenerationAndBrand = (category, gen, brand) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}`
  );

export const getFreqByGenerationAndProcessor = (category, gen, procesor) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}`
  );

export const getFreqByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getFreqByProcessorNVideo = (category, processor, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFreqByProcessorAndVideo = (category, brand, processor, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFreqsByGenerationAndBrandAndVideo = (
  category,
  gen,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getFreqsByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

  export const getFreqByGenerationAndProcessorAndVideo = (
    category,
    gen,
    procesor,
    video
  ) =>
    request.get(
      `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}`
    );

    export const getHighestPriceByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getProcessorsByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );
  export const getVideosByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getGenerationsByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getBrandsByProcessorFreq = (category, processor, freq) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );


export const getHighestPriceByProcessorFreq = (category, processor, freq) =>
request.get(
  `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
);

export const getVideosByProcFreq = (category, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getGenerationsByProcFreq = (category, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );


export const getTypesByProcessorAndBrandFreq = (category, processor, brand, freq) =>
request.get(
  `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
);

export const getVideosByProcAndBrandFreq = (category, processor, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getGenerationsByProcessorFreq = (category, brand, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getTypesByBrandAndGenerationFreq = (category, brand, gen, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getBrandsByGenerationFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getHighestPriceByGenFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getProcessorsByGenerationFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );


export const getTypesByProcessorAndGenFreq = (category, processor, gen, freq) =>
request.get(
  `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
);

export const getTypesByBrandAndVideoFreq = (category, brand, video, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );
  export const getBrandsByVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getHighestPriceByTypeVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );


export const getGenerationsByTypeAndVideoFreq = (category, video, freq) =>
request.get(
  `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
);

export const getTypesByProcessorAndVideoFreq = (category, processor, video, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );


  export const getTypesByGenerationAndVideoFreq = (category, gen, video, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getBrandsByGenerationAndVideoFreq = (category, gen, video, freq) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getTypesByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getBrandsFreq = (category, freq) =>
  request.get(`${baseUrl}/brand/brand?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`);

  export const getHighestPriceFreq = (category, freq) =>
  request.get(`${baseUrl}/price/price?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`);

  export const getProcessorsFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getGenerationsByTypeFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getVideosFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getTypesByProcessorFreq = (category, processor, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getTypesByGenerationFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getTypesByVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getHighestPriceByVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getGenerationsByVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

  export const getFreqByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}`
  );

  export const getFreqs = (category) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}`
  );

  export const getFreqByProc = (category, processor) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

  export const getFreqByGeneration = (category, gen) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
  );

  export const getFreqByVideo = (category, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );