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

export const getTypesByProcessorAndBrandFreq = (
  category,
  processor,
  brand,
  freq
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getVideosByProcAndBrandFreq = (category, processor, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getGenerationsByProcessorFreq = (
  category,
  brand,
  processor,
  freq
) =>
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

export const getTypesByProcessorAndVideoFreq = (
  category,
  processor,
  video,
  freq
) =>
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
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceFreq = (category, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

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

export const getFormats = (category) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}`
  );

export const getHighestPriceByBrandGenerationProcessorVideoAndFreqFormat = (
  category,
  brand,
  generation,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenerationProcessorVideoAndFreqFormat = (
  category,
  generation,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationProcessorVideoAndFreqFormat = (
  category,
  generation,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandGenerationVideoAndFreqFormat = (
  category,
  brand,
  generation,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcsByGenerationProcessorVideoAndFreqFormat = (
  category,
  brand,
  generation,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandProcessorVideoAndFreqFormat = (
  category,
  brand,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenByBrandProcessorVideoAndFreqFormat = (
  category,
  brand,
  procesor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandProcessorAndFreqFormat = (
  category,
  brand,
  generation,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByBrandProcessorGenAndFreqFormat = (
  category,
  brand,
  generation,
  procesor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${procesor}&filter[a-generatie-procesor-277]=${generation}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandGenerationProcessorVideoAndFormat = (
  category,
  brand,
  generation,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqsByGenerationProcessorVideoAndFreqFormat = (
  category,
  brand,
  generation,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getFormatsByBrandGenerationProcessorVideoAndFreq = (
  category,
  brand,
  generation,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByGenerationProcessorVideoAndFreq = (
  category,
  generation,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByBrandGenerationVideoAndFreq = (
  category,
  generation,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByBrandProcessorVideoAndFreq = (
  category,
  brand,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByBrandGenerationProcessorAndFreq = (
  category,
  generation,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByBrandGenerationProcessorVideo = (
  category,
  brand,
  generation,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandGenerationAndProcessorFormat = (
  category,
  brand,
  generation,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByGenerationBrandAndProcFormat = (
  category,
  gen,
  brand,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationBrandAndProcFormat = (
  category,
  gen,
  brand,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandProcessorAndVideoFormat = (
  category,
  brand,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByBrandAndProcVideoFormat = (
  category,
  brand,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcessorAndVideoFormat = (
  category,
  brand,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandAndGenerationAndVideoFormat = (
  category,
  brand,
  generation,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationAndBrandAndVideoFormat = (
  category,
  gen,
  brand,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationBrandAndVideoFormat = (
  category,
  gen,
  brand,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorBrandGenerationNVideoFormat = (
  category,
  processor,
  brand,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandGenerationAndProcessorNVideoFormat = (
  category,
  brand,
  generation,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationBrandAndProcVideoFormat = (
  category,
  gen,
  brand,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenerationAndProcessorNVideoFormat = (
  category,
  generation,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationAndProcessorAndVideoFormat = (
  category,
  gen,
  procesor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationAndProcVideoFormat = (
  category,
  gen,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandAndProcessorAndFreqFormat = (
  category,
  brand,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByBrandAndProcessorFormat = (
  category,
  brand,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcessorAndFreqFormat = (
  category,
  brand,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandAndGenerationFreqFormat = (
  category,
  brand,
  generation,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationAndBrandFreqFormat = (
  category,
  gen,
  brand,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByGenerationAndBrandFreqFormat = (
  category,
  gen,
  brand,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorBrandAndGenerationFormat = (
  category,
  processor,
  brand,
  gen,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByProcessorBrandAndGenerationFormat = (
  category,
  processor,
  brand,
  gen,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByProcessorBrandAndGenerationFormat = (
  category,
  processor,
  brand,
  gen,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenerationAndProcessorFreqFormat = (
  category,
  generation,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByGenerationAndProcessorFreqFormat = (
  category,
  gen,
  procesor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationAndProcessorFreqFormat = (
  category,
  gen,
  procesor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandAndVideoFreqFormat = (
  category,
  brand,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByBrandAndVideoFreqFormat = (
  category,
  brand,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByBrandAndVideoFreqFormat = (
  category,
  brand,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByProcessorAndVideoFreqFormat = (
  category,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByProcessorAndVideoFreqFormat = (
  category,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcessorNVideoFreqFormat = (
  category,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndBrandAndVideoFreqFormat = (
  category,
  processor,
  brand,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandProcessorAndVideoFreqFormat = (
  category,
  brand,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcessorAndVideoFreqFormat = (
  category,
  brand,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByBrandAndGenerationVideoFreqFormat = (
  category,
  brand,
  gen,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandAndGenerationVideoFreqFormat = (
  category,
  brand,
  generation,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationAndBrandAndVideoFreqFormat = (
  category,
  gen,
  brand,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationAndVideFreqFormat = (
  category,
  gen,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenAndVideoFreqFormat = (
  category,
  gen,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationAndVideoFreqFormat = (
  category,
  gen,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndGenAndVideoFreqFormat = (
  category,
  processor,
  gen,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenerationAndProcessorNVideoFreqFormat = (
  category,
  generation,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationAndProcessorAndVideoFreqFormat = (
  category,
  gen,
  procesor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getFormatsByGenerationBrandAndProc = (
  category,
  gen,
  brand,
  processor
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getFormatsByProcessorAndVideo = (
  category,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatByGenerationBrandAndVideo = (
  category,
  gen,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatByGenerationBrandAndProcVideo = (
  category,
  gen,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatByGenerationAndProcVideo = (
  category,
  gen,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatsByBrandAndProcessorAndFreq = (
  category,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByGenerationAndBrandFreq = (
  category,
  gen,
  brand,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByProcessorBrandAndGeneration = (
  category,
  processor,
  brand,
  gen
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getFormatsByGenerationAndProcessorFreq = (
  category,
  gen,
  procesor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByBrandAndVideoFreq = (category, brand, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByProcessorNVideoFreq = (
  category,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByProcessorAndVideoFreq = (
  category,
  brand,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByGenerationAndBrandAndVideoFreq = (
  category,
  gen,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByGenerationAndVideoFreq = (
  category,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandAndProcessorFormat = (
  category,
  brand,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByBrandAndProcessorFormat = (
  category,
  brand,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcessorFormat = (
  category,
  brand,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandAndGenerationFormat = (
  category,
  brand,
  generation,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationAndBrandFormat = (
  category,
  gen,
  brand,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByGenerationAndBrandFormat = (
  category,
  gen,
  brand,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationAndBrandFormat = (
  category,
  gen,
  brand,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenerationAndProcessorFormat = (
  category,
  generation,
  processor,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationAndProcessorFormat = (
  category,
  gen,
  procesor,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByGenerationAndProcessorFormat = (
  category,
  gen,
  procesor,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationAndProcessorFormat = (
  category,
  gen,
  procesor,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandAndVideoFormat = (
  category,
  brand,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByBrandAndVideoFormat = (
  category,
  brand,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByBrandAndVideoFormat = (category, brand, video, format) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByBrandAndVideoFormat = (
  category,
  brand,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByProcessorAndVideoFormat = (
  category,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByProcessorAndVideoFormat = (
  category,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByProcessorNVideoFormat = (
  category,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcessorNVideoFormat = (
  category,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndBrandAndVideoFormat = (
  category,
  processor,
  brand,
  video,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByProcessorAndVideoFormat = (
  category,
  brand,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByBrandAndGenerationAndVideoFormat = (
  category,
  brand,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqsByGenerationAndBrandAndVideoFormat = (
  category,
  gen,
  brand,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationAndVideoFormat = (
  category,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenAndVideoFormat = (
  category,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqsByGenerationAndVideoFormat = (
  category,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationAndVideoFormat = (
  category,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndGenAndVideoFormat = (
  category,
  processor,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationAndProcessorAndVideoFormat = (
  category,
  gen,
  procesor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByBrandFreqFormat = (
  category,
  brand,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByBrandFreqFormat = (category, brand, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByBrandFreqFormat = (category, brand, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByBrandFreqFormat = (
  category,
  brand,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByProcessorFreqFormat = (
  category,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByProcessorFreqFormat = (
  category,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByProcFreqFormat = (category, processor, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcFreqFormat = (
  category,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndBrandFreqFormat = (
  category,
  processor,
  brand,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByProcAndBrandFreqFormat = (
  category,
  processor,
  brand,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcessorFreqFormat = (
  category,
  brand,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByBrandAndGenerationFreqFormat = (
  category,
  brand,
  gen,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationFreqFormat = (category, gen, freq, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenFreqFormat = (category, gen, freq, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByGenerationFreqFormat = (category, gen, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationFreqFormat = (
  category,
  gen,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndGenFreqFormat = (
  category,
  processor,
  gen,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByBrandAndVideoFreqFormat = (
  category,
  brand,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByVideoFreqFormat = (category, video, freq, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByTypeVideoFreqFormat = (
  category,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );
export const getProcessorsByVideoFreqFormat = (category, video, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByTypeAndVideoFreqFormat = (
  category,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndVideoFreqFormat = (
  category,
  processor,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByGenerationAndVideoFreqFormat = (
  category,
  gen,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationAndVideoFreqFormat = (
  category,
  gen,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getFormatsByBrandAndProcessor = (category, brand, processor) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getFormatsByGenerationAndBrand = (category, gen, brand) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}`
  );

export const getFormatsByGenerationAndProcessor = (category, gen, procesor) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}`
  );

export const getFormatsByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatsByProcessorNVideo = (category, processor, video) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatsByGenerationAndBrandAndVideo = (
  category,
  gen,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatsByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatsByGenerationAndProcessorAndVideo = (
  category,
  gen,
  procesor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}`
  );

export const geFormatsByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByProcFreq = (category, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByProcessorFreq = (category, brand, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByGenerationFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatsByTypeAndVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandFormat = (category, brand, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByBrandFormat = (category, brand, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByBrandFormat = (category, brand, format) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByBrandFormat = (category, brand, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByBrandFormat = (category, brand, format) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByProcessorFormat = (category, processor, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByProcessorFormat = (category, processor, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByProcFormat = (category, processor, format) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByProcFormat = (category, processor, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByProcFormat = (category, processor, format) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndBrandFormat = (
  category,
  processor,
  brand,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByProcAndBrandFormat = (
  category,
  processor,
  brand,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByBrandAndGenerationFormat = (
  category,
  brand,
  gen,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByGenerationFormat = (category, gen, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByGenFormat = (category, gen, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationFormat = (category, gen, format) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByGenerationFormat = (category, gen, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByGenerationFormat = (category, gen, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndGenFormat = (
  category,
  processor,
  gen,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByBrandAndVideoFormat = (category, brand, video, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByTypeVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsByVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByTypeAndVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorAndVideoFormat = (
  category,
  processor,
  video,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByGenerationAndVideoFormat = (
  category,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqByGenerationAndVideoFormat = (
  category,
  gen,
  video,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByBrandFreqFormat = (category, brand, freq, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByTypeFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorFreqFormat = (
  category,
  processor,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByGenerationFreqFormat = (category, gen, freq, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByVideoFreqFormat = (category, video, freq, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByVideoFreqFormat = (
  category,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByVideoFreqFormat = (
  category,
  video,
  freq,
  format
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getFormatByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getFormatByProc = (category, processor) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getFormatByBrandAndProcessor = (category, brand, processor) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getFormatByGeneration = (category, gen) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getFormatByGenerationAndProcessor = (category, gen, procesor) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}`
  );

export const getFormatByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatByVideo = (category, video) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatByProcessorNVideo = (category, processor, video) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getFormatByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatByProcFreq = (category, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatByGenerationFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getFormatByVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getTypesByBrandFormat = (category, brand, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsFormat = (category, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceFormat = (category, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-format-carcasa-27]=${format}`
  );

export const getProcessorsFormat = (category, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByTypeFormat = (category, format) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosFormat = (category, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-format-carcasa-27]=${format}`
  );

export const getFreqsFormat = (category, format) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByProcessorFormat = (category, processor, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByGenerationFormat = (category, gen, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByVideoFormat = (category, video, format) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-format-carcasa-27]=${format}`
  );

export const getTypesByFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getHighestPriceByFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getBrandsByFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getGenerationsByFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );
export const getProcessorsByFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getVideosByFreqFormat = (category, freq, format) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-format-carcasa-27]=${format}`
  );

export const getFormatsByProc = (category, processor) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getTypesByFormats = (category, freq) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-format-carcasa-27]=${freq}`
  );

export const getHighestPriceByFormats = (category, freq) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-format-carcasa-27]=${freq}`
  );

export const getBrandsByFormat = (category, freq) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-format-carcasa-27]=${freq}`
  );

export const getGenerationsByFormat = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-format-carcasa-27]=${freq}`
  );

export const getProcessorsByFormat = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-format-carcasa-27]=${freq}`
  );

export const getVideosByFormat = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-format-carcasa-27]=${freq}`
  );

export const getFormatByFormat = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-format-carcasa-27?filter[category]=${category}&filter[a-format-carcasa-27]=${freq}`
  );

export const getFreqByFormat = (category, video) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-format-carcasa-27]=${video}`
  );

export const getScreens = (category) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}`
  );

export const getHighestPriceByBrandGenerationProcessorVideoAndFreqScreen = (
  category,
  brand,
  generation,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesyBrandGenerationProcessorVideoAndFreqScreen = (
  category,
  brand,
  generation,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenerationProcessorVideoAndFreqScreen = (
  category,
  generation,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationProcessorVideoAndFreqScreen = (
  category,
  generation,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandGenerationVideoAndFreqScreen = (
  category,
  brand,
  generation,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByBrandGenerationVideoAndFreqScreen = (
  category,
  brand,
  generation,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandProcessorVideoAndFreqScreen = (
  category,
  brand,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByBrandProcessorVideoAndFreqScreen = (
  category,
  brand,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandGenerationProcessorAndFreqScreen = (
  category,
  brand,
  generation,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideoCardsByBrandGenerationProcessorAndFreqScreen = (
  category,
  brand,
  generation,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandGenerationProcessorVideoAndScreen = (
  category,
  brand,
  generation,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByBrandGenerationProcessorVideoAndScreen = (
  category,
  brand,
  generation,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getScreensByProcessorBrandGenerationNVideoFreq = (
  category,
  processor,
  brand,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByGenerationAndProcessorVideoAndFreq = (
  category,
  gen,
  procesor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByGenerationAndBrandAndVideoFreq = (
  category,
  gen,
  brand,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByProcessorAndVideoFreq = (
  category,
  brand,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByGenerationBrandAndProcFreq = (
  category,
  gen,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByGenerationBrandAndProcVideo = (
  category,
  gen,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getHighestPriceByBrandGenerationAndProcessorScreen = (
  category,
  brand,
  generation,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByGenerationBrandAndProcScreen = (
  category,
  gen,
  brand,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationBrandAndProcScreen = (
  category,
  gen,
  brand,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandProcessorAndVideoScreen = (
  category,
  brand,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcessorAndVideoScreen = (
  category,
  brand,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByBrandAndProcVideoScreen = (
  category,
  brand,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandAndGenerationAndVideoScreen = (
  category,
  brand,
  generation,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationAndBrandAndVideoScreen = (
  category,
  gen,
  brand,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationBrandAndVideoScreen = (
  category,
  gen,
  brand,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorBrandGenerationNVideoScreen = (
  category,
  processor,
  brand,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandGenerationAndProcessorNVideoScreen = (
  category,
  brand,
  generation,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationBrandAndProcVideoScreen = (
  category,
  gen,
  brand,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenerationAndProcessorNVideoScreen = (
  category,
  generation,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationAndProcessorAndVideoScreen = (
  category,
  gen,
  procesor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationAndProcVideoScreen = (
  category,
  gen,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandAndProcessorAndFreqScreen = (
  category,
  brand,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByBrandAndProcessorScreen = (
  category,
  brand,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcessorAndFreqScreen = (
  category,
  brand,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandAndGenerationFreqScreen = (
  category,
  brand,
  generation,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationAndBrandFreqScreen = (
  category,
  gen,
  brand,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByGenerationAndBrandFreqScreen = (
  category,
  gen,
  brand,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorBrandAndGenerationScreen = (
  category,
  processor,
  brand,
  gen,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByProcessorBrandAndGenerationScreen = (
  category,
  processor,
  brand,
  gen,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByProcessorBrandAndGenerationScreen = (
  category,
  processor,
  brand,
  gen,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenerationAndProcessorFreqScreen = (
  category,
  generation,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByGenerationAndProcessorFreqScreen = (
  category,
  gen,
  procesor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationAndProcessorFreqScreen = (
  category,
  gen,
  procesor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandAndVideoFreqScreen = (
  category,
  brand,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByBrandAndVideoFreqScreen = (
  category,
  brand,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByBrandAndVideoFreqScreen = (
  category,
  brand,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByProcessorAndVideoFreqScreen = (
  category,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByProcessorAndVideoFreqScreen = (
  category,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcessorNVideoFreqScreen = (
  category,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndBrandAndVideoFreqScreen = (
  category,
  processor,
  brand,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandProcessorAndVideoFreqScreen = (
  category,
  brand,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcessorAndVideoFreqScreen = (
  category,
  brand,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByBrandAndGenerationVideoFreqScreen = (
  category,
  brand,
  gen,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandAndGenerationVideoFreqScreen = (
  category,
  brand,
  generation,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationAndBrandAndVideoFreqScreen = (
  category,
  gen,
  brand,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationAndVideFreqScreen = (
  category,
  gen,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenAndVideoFreqScreen = (
  category,
  gen,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationAndVideoFreqScreen = (
  category,
  gen,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndGenAndVideoFreqScreen = (
  category,
  processor,
  gen,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenerationAndProcessorNVideoFreqScreen = (
  category,
  generation,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationAndProcessorAndVideoFreqScreen = (
  category,
  gen,
  procesor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getScreensByGenerationBrandAndProc = (
  category,
  gen,
  brand,
  processor
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getScreensByBrandAndProcVideo = (
  category,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByGenerationBrandAndVideo = (
  category,
  gen,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensyGenerationBrandAndProcVideo = (
  category,
  gen,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByGenerationAndProcVideo = (
  category,
  gen,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByProcessorAndFreq = (
  category,
  brand,
  processor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByGenerationAndBrandFreq = (
  category,
  gen,
  brand,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByProcessorBrandAndGeneration = (
  category,
  processor,
  brand,
  gen
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getScreensByGenerationAndProcessorFreq = (
  category,
  gen,
  procesor,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByBrandAndVideoFreq = (category, brand, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByProcessorNVideoFreq = (
  category,
  processor,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByGenerationAndVideoFreq = (
  category,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByProcessorAndGenAndVideoFreq = (
  category,
  processor,
  gen,
  video,
  freq
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandAndProcessorScreen = (
  category,
  brand,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcessorScreen = (
  category,
  brand,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByBrandAndProcessorScreen = (
  category,
  brand,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandAndGenerationScreen = (
  category,
  brand,
  generation,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${generation}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationAndBrandScreen = (
  category,
  gen,
  brand,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByGenerationAndBrandScreen = (
  category,
  gen,
  brand,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationAndBrandScreen = (
  category,
  gen,
  brand,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenerationAndProcessorScreen = (
  category,
  generation,
  processor,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${generation}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByGenerationAndProcessorScreen = (
  category,
  gen,
  procesor,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationAndProcessorScreen = (
  category,
  gen,
  procesor,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationAndProcessorScreen = (
  category,
  gen,
  procesor,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandAndVideoScreen = (
  category,
  brand,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByBrandAndVideoScreen = (
  category,
  brand,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByBrandAndVideoScreen = (category, brand, video, screen) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByBrandAndVideoScreen = (
  category,
  brand,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByProcessorAndVideoScreen = (
  category,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByProcessorAndVideoScreen = (
  category,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcessorNVideoScreen = (
  category,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByProcessorNVideoScreen = (
  category,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndBrandAndVideoScreen = (
  category,
  processor,
  brand,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByProcessorAndVideoScreen = (
  category,
  brand,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByBrandAndGenerationAndVideoScreen = (
  category,
  brand,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqsByGenerationAndBrandAndVideoScreen = (
  category,
  gen,
  brand,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationAndVideoScreen = (
  category,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenAndVideoScreen = (
  category,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationAndVideoScreen = (
  category,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqsByGenerationAndVideoScreen = (
  category,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndGenAndVideoScreen = (
  category,
  processor,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationAndProcessorAndVideoScreen = (
  category,
  gen,
  procesor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByBrandFreqScreen = (
  category,
  brand,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByBrandFreqScreen = (category, brand, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByBrandFreqScreen = (category, brand, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByBrandFreqScreen = (
  category,
  brand,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByProcessorFreqScreen = (
  category,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByProcessorFreqScreen = (
  category,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByProcFreqScreen = (category, processor, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcFreqScreen = (
  category,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndBrandFreqScreen = (
  category,
  processor,
  brand,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByProcAndBrandFreqScreen = (
  category,
  processor,
  brand,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcessorFreqScreen = (
  category,
  brand,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByBrandAndGenerationFreqScreen = (
  category,
  brand,
  gen,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationFreqScreen = (category, gen, freq, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenFreqScreen = (category, gen, freq, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByGenerationFreqScreen = (category, gen, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationFreqScreen = (
  category,
  gen,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndGenFreqScreen = (
  category,
  processor,
  gen,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByBrandAndVideoFreqScreen = (
  category,
  brand,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByVideoFreScreen = (category, video, freq, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByTypeVideoFreqScreen = (
  category,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByVideoFreqScreen = (category, video, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByTypeAndVideoFreqScreen = (
  category,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndVideoFreqScreen = (
  category,
  processor,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByGenerationAndVideoFreqScreen = (
  category,
  gen,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationAndVideoFreqScreen = (
  category,
  gen,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getScreensByBrandAndProcessor = (category, brand, processor) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getScreensByGenerationAndBrand = (category, gen, brand) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}`
  );

export const getScreensByGenerationAndProcessor = (category, gen, procesor) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}`
  );

export const getScreensByBrandAndVideo = (category, brand, video) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByProcessorNVideo = (category, processor, video) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreenByProcessorAndVideo = (
  category,
  brand,
  processor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByGenerationAndBrandAndVideo = (
  category,
  gen,
  brand,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByGenerationAndVideo = (category, gen, video) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByGenerationAndProcessorAndVideo = (
  category,
  gen,
  procesor,
  video
) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-procesor-132]=${procesor}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensByBrandFreq = (category, brand, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByProcFreq = (category, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByProcessorFreq = (category, brand, processor, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByGenerationFreq = (category, gen, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByTypeAndVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getHighestPriceByBrandScreen = (category, brand, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByBrandScreen = (category, brand, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByBrandScreen = (category, brand, screen) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByBrandScreen = (category, brand, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByBrandScreen = (category, brand, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByProcessorScreen = (category, processor, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByProcessorScreen = (category, processor, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByProcScreen = (category, processor, screen) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByProcScreen = (category, processor, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByProcScreen = (category, processor, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndBrandScreen = (
  category,
  processor,
  brand,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByProcAndBrandScreen = (
  category,
  processor,
  brand,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByBrandAndGenerationScreen = (
  category,
  brand,
  gen,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByGenerationScreen = (category, gen, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByGenScreen = (category, gen, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationScreen = (category, gen, screen) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByGenerationScreen = (category, gen, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByGenerationScreen = (category, gen, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndGenScreen = (
  category,
  processor,
  gen,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByBrandAndVideoScreen = (category, brand, video, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByTypeVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByTypeAndVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorAndVideoScreen = (
  category,
  processor,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByGenerationAndVideoScreen = (
  category,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqByGenerationAndVideoScreen = (
  category,
  gen,
  video,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByBrandFreqScreen = (category, brand, freq, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByTypeFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorFreqScreen = (
  category,
  processor,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByGenerationFreqScreen = (category, gen, freq, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByVideoFreqScreen = (category, video, freq, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByVideoFreqScreen = (
  category,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByVideoFreqScreen = (category, video, freq, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByVideoFreqScreen = (
  category,
  video,
  freq,
  screen
) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getScreensByBrand = (category, brand) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}`
  );

export const getScreensByProc = (category, processor) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-procesor-132]=${processor}`
  );

export const getScreensByProcessor = (category, brand, processor) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[brand]=${brand}&filter[a-procesor-132]=${processor}`
  );

export const getScreensByGeneration = (category, gen) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}`
  );

export const getScreensByVideo = (category, video) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-model-placa-video-254]=${video}`
  );

export const getScreensFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getScreensByVideoFreq = (category, video, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getTypesByBrandScreen = (category, brand, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[brand]=${brand}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsScreen = (category, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceScreen = (category, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsScreen = (category, sreen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByTypeScreen = (category, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosScreen = (category, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

export const getFreqsScreen = (category, screen) =>
  request.get(
    `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByProcessorScreen = (category, processor, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-procesor-132]=${processor}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByGenerationScreen = (category, gen, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-generatie-procesor-277]=${gen}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByVideoScreen = (category, video, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-model-placa-video-254]=${video}&filter[a-diagonala-66]=${screen}`
  );

export const getTypesByFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/quality/qualities?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getHighestPriceByFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/price/price?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getBrandsByFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getProcessorsByFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );

export const getVideosByFreqScreen = (category, freq, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}&filter[a-diagonala-66]=${screen}`
  );
export const getScreenByFreq = (category, freq) =>
  request.get(
    `${baseUrl}/attributes/a-diagonala-66?filter[category]=${category}&filter[a-frecventa-procesor-61]=${freq}`
  );

export const getBrandsByScreen = (category, screen) =>
  request.get(
    `${baseUrl}/brand/brand?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

export const getGenerationsByScreen = (category, screen) =>
  request.get(
    `${baseUrl}/attributes/a-generatie-procesor-277?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

  export const getProcessorsByScreen = (category, screen) =>
  request.get(
    `${baseUrl}/attributes/a-procesor-132?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );

  export const getVideosByScreen = (category, screen) =>
  request.get(
    `${baseUrl}/attributes/a-model-placa-video-254?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
  );
  
  
  export const getFreqsByScreen = (
    category,
    screen
  ) =>
    request.get(
      `${baseUrl}/attributes/a-frecventa-procesor-61?filter[category]=${category}&filter[a-diagonala-66]=${screen}`
    );
  