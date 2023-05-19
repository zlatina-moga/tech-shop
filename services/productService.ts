import * as request from "./requester";
//const baseUrl = "http://localhost:5500";
const baseUrl = 'https://pc-bun-api.herokuapp.com';

export const getAllProdictsCount = () => request.get(`${baseUrl}`);

export const getAllLaptops = (page) =>
  request.get(`${baseUrl}/laptop?page=${page}`);

export const getAllLaptopsPrice = (price, page) =>
  request.get(`${baseUrl}/laptop?price=1-${price}&page=${page}`);

export const getSortedLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop?sort=${sort}&page=${page}`);

export const getSortedLaptopsPrice = (price, page, sort) =>
  request.get(`${baseUrl}/laptop?price=1-${price}&sort=${sort}&page=${page}`);

export const getAllSecondHandLaptops = (page) =>
  request.get(`${baseUrl}/laptop/second-hand-1?page=${page}`);

export const getAllSecondHandLaptopsPrice = (price, page) =>
  request.get(`${baseUrl}/laptop/second-hand-1?price=1-${price}&page=${page}`);

export const getSortedSecondHandLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop/second-hand-1?sort=${sort}&page=${page}`);

export const getSortedSecondHandLaptopsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRefurbishedLaptops = (page) =>
  request.get(`${baseUrl}/laptop/refurbished-1?page=${page}`);

export const getAllRefurbishedLaptopsPrice = (price, page) =>
  request.get(`${baseUrl}/laptop/refurbished-1?price=1-${price}&page=${page}`);

export const getSortedRefurbishedLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop/refurbished-1?sort=${sort}&page=${page}`);

export const getSortedRefurbishedLaptopsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllNewLaptops = (page) =>
  request.get(`${baseUrl}/laptop/noi-1?page=${page}`);

export const getAllNewLaptopsPrice = (price, page) =>
  request.get(`${baseUrl}/laptop/noi-1?price=1-${price}&page=${page}`);

export const getSortedNewLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop/noi-1?sort=${sort}&page=${page}`);

export const getSortedNewLaptopsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/laptop/noi-1?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllLaptopsByBrand = (page, slug) =>
  request.get(`${baseUrl}/laptop/brand?brand=${slug}&page=${page}`);

export const getAllLaptopsByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedLaptopsByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopsByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}
    `
  );

export const getAllLaptopsByProcessor = (page, slug) =>
  request.get(`${baseUrl}/laptop/procesor?procesor=${slug}&page=${page}`);

export const getAllLaptopsByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedLaptopsByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopsByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllLaptopsGenerationAndProcessor = (page, slug, processor) =>
  request.get(
    `${baseUrl}/laptop/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllLaptopsGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/laptop/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllLaptopssByGeneration = (page, slug) =>
  request.get(`${baseUrl}/laptop/generatie?generatie=${slug}&page=${page}`);

export const getSortedLaptopsByGenerationPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopsByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getAllLaptopsByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getAllLaptopsBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

  export const getAllLaptopsGenerationBrandAndProcesorGeneration = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/laptop/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getSortedLaptopssByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedLaptopsByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedLaptopsByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedLaptopsByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllLaptopsByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllLaptopsByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllLaptopssByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedLaptopsByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/laptop/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedLaptopsByGenerationBrandPrice = (page, slug, sort, brand, price) =>
request.get(
  `${baseUrl}/laptop/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedLaptopsByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
request.get(
  `${baseUrl}/laptop/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
);

export const getLaptopsByGenerationBrandProcessorPrice = (page, slug, procesor, brand, price) =>
request.get(
  `${baseUrl}/laptop/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getLaptopsByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/laptop/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getLaptopsByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/laptop/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getSortedLaptopssByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
request.get(
  `${baseUrl}/laptop/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllNewLaptopsBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

  export const getAllNewLaptopsGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getSortedNewLaptopsByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewLaptopsByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewLaptopsByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewLaptopsByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllNewLaptopsByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllNewLaptopsByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllNewLaptopsByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedNewLaptopsByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewLaptopsByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
request.get(
  `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
);

export const getNewLaptopsByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getNewLaptopsByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getAllRefLaptopsBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

  export const getAllRefLaptopsGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getSortedRefLaptopsByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefLaptopsByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefLaptopsByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefLaptopsByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllRefLaptopssByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllRefLaptopsByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllRefLaptopsByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedRefLaptopsByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefLaptopsByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
request.get(
  `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
);

export const getAllRefLaptopsByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getRefLaptopsByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getRefLaptopsByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getAllRefLaptopsGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllRefLaptopsBrand = (page, brand) =>
  request.get(`${baseUrl}/laptop/refurbished-1?brand=${brand}&page=${page}`);

export const getSortedRefLaptopsByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefLaptopsByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefLaptopsByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefLaptopsGenerationAndProcessor = (page, slug, processor) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllRefLaptopsByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&page=${page}`
  );

export const getSortedRefLaptopsByGenPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefLaptopsByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefLaptopsByProcessor = (page, slug) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/procesor?procesor=${slug}&page=${page}`
  );

export const getSortedRefLaptopsByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefLaptopsByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefLaptopsByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getAllSHLaptopsBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllSHLaptopsGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllSHLaptopsBrand = (page, brand) =>
  request.get(`${baseUrl}/laptop/second-hand-1?brand=${brand}&page=${page}`);

export const getSortedSHLaptopsByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHLaptopsByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllSHLaptopsByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllSHLaptopsGenerationAndProcessor = (page, slug, processor) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllSHLaptopsByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&page=${page}`
  );

export const getSortedSHLaptopsByGenPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHLaptopsByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getAllSHLaptopsByProcessor = (page, slug) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/procesor?procesor=${slug}&page=${page}`
  );

export const getSortedSHLaptopsByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHLaptopsByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllSHLaptopsByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getAllNewLaptopsBrand = (page, brand) =>
  request.get(`${baseUrl}/laptop/noi-1?brand=${brand}&page=${page}`);

export const getSortedNewLaptopsByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewLaptopsByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllNewLaptopsByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedLaptopsByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopsByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopsByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedNewLaptopsByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedNewLaptopsByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getSortedNewLaptopsByGenerationPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewLaptopsByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedNewLaptopsByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getAllNewLaptopsByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getAllComputers = (page) =>
  request.get(`${baseUrl}/calculatoare?page=${page}`);

export const getAllComputersPrice = (price, page) =>
  request.get(`${baseUrl}/calculatoare?price=1-${price}&page=${page}`);

export const getSortedComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare?sort=${sort}&page=${page}`);

export const getSortedComputersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/calculatoare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllComputersByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&page=${page}`
  );

export const getAllNewComputersByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&page=${page}`
  );

export const getAllRefComputersByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&page=${page}`
  );

export const getAllSHComputersByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&page=${page}`
  );

export const getAllComputersByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getAllComputersGenerationAndProcessor = (page, slug, processor) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

  export const getAllComputersGenerationProcessorAndBrand = (page, slug, processor, brand) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&procesor=${processor}&brand=${brand}&page=${page}`
  );

export const getAllNewComputersGenerationAndProcessor = (
  page,
  slug,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllRefComputersGenerationAndProcessor = (
  page,
  slug,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllSHComputersGenerationAndProcessor = (
  page,
  slug,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllNewLaptopsGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllNewLaptopsGenerationAndProcessor = (page, slug, processor) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllNewLaptopsByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/laptop/noi-1/generatie?generatie=${slug}&page=${page}`
  );

export const getAllNewLaptopsByProcessor = (page, slug) =>
  request.get(`${baseUrl}/laptop/noi-1/procesor?procesor=${slug}&page=${page}`);

export const getSortedNewLaptopsByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewLaptopsByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/noi-1/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllNewLaptopsByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/noi-1/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedRefLaptopsByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedRefLaptopsByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getSortedRefLaptopsByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getAllRefLaptopsByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedSHLaptopsByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedSHLaptopsByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

  export const getAllSHLaptopsGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getSortedSHLaptopsByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedSHLaptopsByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedSHLaptopsByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedSHLaptopsByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllSHLaptopssByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllSHLaptopsByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllSHLaptopsByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedSHLaptopsByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSHLaptopsByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getSHLaptopsByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getSortedSHLaptopsByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getAllSHLaptopsByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/laptop/second-hand-1/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getAllNewComputersGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllRefComputersGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllSHComputersGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllComputersGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

  export const getAllComputersGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );


export const getAllComputersByBrand = (page, slug) =>
  request.get(`${baseUrl}/calculatoare/brand?brand=${slug}&page=${page}`);

export const getAllComputersByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllNewComputersByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllSHComputersByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefComputersByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefComputersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getAllNewComputersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedComputersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedComputersByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedComputersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedComputersByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);
  
export const getSortedComputersByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllComputersByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllComputersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllComputersByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedComputersByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedNewComputersByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );


  export const getAllNewComputersGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getSortedNewComputersByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewComputersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewComputersByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewComputersByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllNewComputersByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllNewComputersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllNewComputersByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedNewComputersByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedNewComputersByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
request.get(
  `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
);

export const getNewComputersByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getNewComputersByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getSortedNewComputersByGenerationBrand = (page, slug, sort, brand) =>
request.get(
  `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&brand=${brand}&sort=${sort}&page=${page}`
);

export const getNewComputersByGenerationBrandProcessorPrice = (page, slug, procesor, brand, price) =>
request.get(
  `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getSortedRefComputersByGenerationBrand = (page, slug, sort, brand) =>
request.get(
  `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&brand=${brand}&sort=${sort}&page=${page}`
);

export const getRefComputersByGenerationBrandProcessorPrice = (page, slug, procesor, brand, price) =>
request.get(
  `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&price=1-${price}&page=${page}`
);


export const getSortedNewComputersByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getAllSHComputersByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedSHComputersByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getSortedSHComputersByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

  export const getAllRefComputersGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getAllRefwComputersGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

  export const getSortedRefComputersByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefComputersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefComputersByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefComputersByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllRefComputersByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllRefComputersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllRefComputersByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedRefComputersByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefComputersByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
request.get(
  `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
);

export const getRefComputersByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getRefComputersByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);



export const getAllRefComputersByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedComputersByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedNewComputersByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getAllNewComputersByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedComputersByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getSortedNewComputersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedComputersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedComputersByGenerationPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

  export const getSortedComputersByGenerationBrandProcessorPrice = (page, slug, sort, procesor, brand, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
  );

  export const getSortedComputersByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
  );

  export const getSortedComputersByGenerationBrandPrice = (page, slug, sort, brand, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

  export const getSortedComputersByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
  );

  export const getSortedComputersByGenerationProcessor = (page, slug, sort, procesor) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&procesor=${procesor}&sort=${sort}&page=${page}`
  );

  export const getSortedComputersByGenerationBrand = (page, slug, sort, brand) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&sort=${sort}&page=${page}`
  );

  export const getComputersByGenerationBrandProcessorPrice = (page, slug, procesor, brand, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&price=1-${price}&page=${page}`
  );

  export const getComputersByGenerationProcessorPrice = (page, slug, procesor, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
  );

  export const getComputersByGenerationBrandPrice = (page, slug, brand, price) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
  );


export const getSortedNewComputersByGenerationPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHComputersByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

  export const getAllSHComputersGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getSortedSHComputersByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedSHComputersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedSHComputersByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedSHComputersByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllSHComputersByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllSHComputersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllSHComputersByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedSHComputersByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSHComputersByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getSHComputersByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getSortedSHComputersByGenerationBrand = (page, slug, sort, brand) =>
request.get(
  `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&brand=${brand}&sort=${sort}&page=${page}`
);

export const getSHComputersByGenerationBrandProcessorPrice = (page, slug, procesor, brand, price) =>
request.get(
  `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&price=1-${price}&page=${page}`
);


export const getSortedSHComputersByGenerationPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByGenerationPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedNewComputersByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedComputersByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedNewComputersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByProcessorPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewComputersByProcessorPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByBrandPriceAndProcessor = (
  page,
  slug,
  sort,
  price,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHComputersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedNewComputersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/nou/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedRefComputersByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedSHComputersByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedSHComputersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllComputersByProcessor = (page, slug) =>
  request.get(`${baseUrl}/calculatoare/procesor?procesor=${slug}&page=${page}`);

export const getAllSHComputersByProcessor = (page, slug) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/procesor?procesor=${slug}&page=${page}`
  );

export const getAllSHComputersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedSHComputersByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHComputersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllComputersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/calculatoare/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedComputersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedComputersByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/calculatoare/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSecondHandComputers = (page) =>
  request.get(`${baseUrl}/calculatoare/second-hand?page=${page}`);

export const getAllSecondHandComputersPrice = (price, page) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand?price=1-${price}&page=${page}`
  );

export const getSortedSecondHandComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare/second-hand?sort=${sort}&page=${page}`);

export const getSortedSecondHandComputersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllNewComputers = (page) =>
  request.get(`${baseUrl}/calculatoare/nou?page=${page}`);

export const getAllNewComputersBrand = (page, brand) =>
  request.get(`${baseUrl}/calculatoare/nou?brand=${brand}&page=${page}`);

export const getAllNewComputersPrice = (price, page) =>
  request.get(`${baseUrl}/calculatoare/nou?price=1-${price}&page=${page}`);

export const getSortedNewComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare/nou?sort=${sort}&page=${page}`);

export const getSortedNewComputersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/calculatoare/nou?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRefurbishedComputers = (page) =>
  request.get(`${baseUrl}/calculatoare/refurbished?page=${page}`);

export const getAllRefurbishedComputersPrice = (price, page) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished?price=1-${price}&page=${page}`
  );

export const getSortedRefurbishedComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare/refurbished?sort=${sort}&page=${page}`);

export const getSortedRefurbishedComputersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRefComputersBrand = (page, brand) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished?brand=${brand}&page=${page}`
  );

export const getAllRefComputersProcessor = (page, processor) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished?procesor=${processor}&page=${page}`
  );

export const getAllNewComputersProcessor = (page, processor) =>
  request.get(
    `${baseUrl}/calculatoare/nou/procesor?procesor=${processor}&page=${page}`
  );

export const getAllComputersBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllRefComputersBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/calculatoare/refurbished/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllSHComputersBrand = (page, brand) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand?brand=${brand}&page=${page}`
  );

export const getAllSHComputersBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/calculatoare/second-hand/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllNewComputersBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllServers = (page) =>
  request.get(`${baseUrl}/servere?page=${page}`);

export const getAllServersPrice = (price, page) =>
  request.get(`${baseUrl}/servere?price=1-${price}&page=${page}`);

export const getSortedServers = (page, sort) =>
  request.get(`${baseUrl}/servere?sort=${sort}&page=${page}`);

export const getSortedServersPrice = (price, page, sort) =>
  request.get(`${baseUrl}/servere?price=1-${price}&sort=${sort}&page=${page}`);

export const getAllServersByBrand = (page, slug) =>
  request.get(`${baseUrl}/servere/brand?brand=${slug}&page=${page}`);

export const getAllServersByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

  export const getSortedServersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getAllServersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getSortedServersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedServersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllServersByProcessor = (page, slug) =>
  request.get(`${baseUrl}/servere/procesor?procesor=${slug}&page=${page}`);

export const getAllServersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedServersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedServersByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSecondHandServers = (page) =>
  request.get(`${baseUrl}/servere/second-hand-2?page=${page}`);

export const getAllSecondHandServersPrice = (price, page) =>
  request.get(`${baseUrl}/servere/second-hand-2?price=1-${price}&page=${page}`);

export const getSortedSecondHandServers = (page, sort) =>
  request.get(`${baseUrl}/servere/second-hand-2?sort=${sort}&page=${page}`);

export const getSortedSecondHandServersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/servere/second-hand-2?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRefurbishedServers = (page) =>
  request.get(`${baseUrl}/servere/refurbished-2?page=${page}`);

export const getAllRefurbishedServersPrice = (price, page) =>
  request.get(`${baseUrl}/servere/refurbished-2?price=1-${price}&page=${page}`);

export const getSortedRefurbishedServers = (page, sort) =>
  request.get(`${baseUrl}/servere/refurbished-2?sort=${sort}&page=${page}`);

export const getSortedRefurbishedServersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/servere/refurbished-2?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllNewServers = (page) =>
  request.get(`${baseUrl}/servere/noi-6?page=${page}`);

export const getAllNewServersPrice = (price, page) =>
  request.get(`${baseUrl}/servere/noi-6?price=1-${price}&page=${page}`);

export const getSortedNewServers = (page, sort) =>
  request.get(`${baseUrl}/servere/noi-6?sort=${sort}&page=${page}`);

export const getSortedNewServersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/servere/noi-6?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRackServers = (page) =>
  request.get(`${baseUrl}/servere/cabinet-rack-refurbished?page=${page}`);

export const getAllRackServersPrice = (price, page) =>
  request.get(
    `${baseUrl}/servere/cabinet-rack-refurbished?price=1-${price}&page=${page}`
  );

export const getSortedRackServers = (page, sort) =>
  request.get(
    `${baseUrl}/servere/cabinet-rack-refurbished?sort=${sort}&page=${page}`
  );

export const getSortedRackServersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/servere/cabinet-rack-refurbished?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllServerBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getSortedServerByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getAllNewServerBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/servere/noi-6/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllNewServersBrand = (page, brand) =>
  request.get(`${baseUrl}/servere/noi-6?brand=${brand}&page=${page}`);

export const getSortedNewLServersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/noi-6/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewServersByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/servere/noi-6/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

  export const getSortedNewServersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/servere/noi-6/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getAllNewServersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/servere/noi-6/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);


export const getSortedNewServersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/noi-6/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllNewServerByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/noi-6/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllNewServersByProcessor = (page, slug) =>
  request.get(
    `${baseUrl}/servere/noi-6/procesor?procesor=${slug}&page=${page}`
  );

export const getSortedNewServersByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/noi-6/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewServersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/noi-6/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllNewServersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/noi-6/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getAllSHServerBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllSHServersBrand = (page, brand) =>
  request.get(`${baseUrl}/servere/second-hand-2?brand=${brand}&page=${page}`);

export const getSortedSHLServersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHServersByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

  export const getSortedSHServersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getAllSHServersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);


export const getSortedSHServersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllSHServerByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllSHServersByProcessor = (page, slug) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/procesor?procesor=${slug}&page=${page}`
  );

export const getSortedSHServersByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHServersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllSHServersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/second-hand-2/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefServerBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllRefServersBrand = (page, brand) =>
  request.get(`${baseUrl}/servere/refurbished-2?brand=${brand}&page=${page}`);

export const getSortedRefServersByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

  export const getSortedRefServersByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getAllRefServersByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);


export const getSortedRefServersByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedRefServersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefServerByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefServersByProcessor = (page, slug) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/procesor?procesor=${slug}&page=${page}`
  );

export const getSortedRefServersByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefServersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefServersByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/servere/refurbished-2/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getAllWorkstationsBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllWorkstationsGenerationBrandAndProcesorGeneration = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

export const getSortedWorkstationsByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedWorkstationsByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedWorkstationsByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedWorkstationsByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllWorkstationsByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllWorkstationsByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllWorkstationsByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedWorkstationsByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/workstation/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedWorkstationsByGenerationBrandPrice = (page, slug, sort, brand, price) =>
request.get(
  `${baseUrl}/workstation/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedWorkstationsByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
request.get(
  `${baseUrl}/workstation/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
);

export const getWorkstationsByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/workstation/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getWorkstationsByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/workstation/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getAllWorkstationsGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getSortedWorkstationsByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedWorkstationsByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getAllWorkstationsGenerationAndProcessor = (
  page,
  slug,
  processor
) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllWorkstationsByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&page=${page}`
  );

export const getSortedWorkstationsByGenerationPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedWorkstationsByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedWorkstationsByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getAllWorkstationByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/workstation/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefWorkstationsBrandAndProcessor = (
  page,
  brand,
  processor
) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

  export const getAllRefWorkstationsGenerationBrandAndProcesor = (page, slug, brand, procesor) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&page=${page}`
  );

  export const getSortedRefWorkstationsByBrandProcessorAndGenerationPrice = (page, slug, sort, processor, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefWorkstationsByBrandProcessorPrice = (page, slug, sort, processor, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&procesor=${processor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefWorkstationsByBrandGenerationPrice = (page, slug, sort, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefWorkstationsByBrandProcessorAndGeneration = (page, slug, sort, processor, generatie) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&sort=${sort}&page=${page}`
);

export const getAllRefWorkstationsByBrandProcessorAndGenerationPrice = (page, slug, processor, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&procesor=${processor}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getAllRefWorkstationsByBrandProcessorPrice = (page, slug, processor, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&procesor=${processor}&price=1-${price}&page=${page}`
);

export const getAllRefWorkstationsByBrandGenerationPrice = (page, slug, generatie, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&generatie=${generatie}&price=1-${price}&page=${page}`
);

export const getSortedRefWorkstationsByGenerationProcessorPrice = (page, slug, sort, procesor, price) =>
request.get(
  `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&sort=${sort}&page=${page}`
);

export const getSortedRefWorkstationsByGenerationBrandProcessor = (page, slug, sort, procesor, brand) =>
request.get(
  `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&brand=${brand}&procesor=${procesor}&sort=${sort}&page=${page}`
);

export const getRefWorkstationsByGenerationProcessorPrice = (page, slug, procesor, price) =>
request.get(
  `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&procesor=${procesor}&price=1-${price}&page=${page}`
);

export const getRefWorkstationsByGenerationBrandPrice = (page, slug, brand, price) =>
request.get(
  `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&brand=${brand}&price=1-${price}&page=${page}`
);

export const getAllReffWorkstationsGenerationAndBrand = (page, slug, brand) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&brand=${brand}&page=${page}`
  );

export const getAllRefWorkstationsBrand = (page, brand) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3?brand=${brand}&page=${page}`
  );

export const getSortedRefWorkstationsByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefWorkstationsByBrandAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedRefWorkstationByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
  );

export const getSortedRefWorkstationByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefWorkstationByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefWorkstationGenerationAndProcessor = (
  page,
  slug,
  processor
) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&procesor=${processor}&page=${page}`
  );

export const getAllRefWorkstationByGeneration = (page, slug) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&page=${page}`
  );

export const getSortedRefWorkstationByGenerationAndProcessor = (
  page,
  slug,
  sort,
  processor
) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&procesor=${processor}&sort=${sort}&page=${page}`
  );

export const getSortedRefWorkstationsByGenPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefWorkstationByGeneration = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefWorkstationByGenerationPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/generatie?generatie=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedRefWorkstationByProcessorPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefWorkstationByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefWorkstationByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getAllWorkstations = (page) =>
  request.get(`${baseUrl}/workstation?page=${page}`);

export const getAllWorkstationsPrice = (price, page) =>
  request.get(`${baseUrl}/workstation?price=1-${price}&page=${page}`);

export const getSortedWorkstations = (page, sort) =>
  request.get(`${baseUrl}/workstation?sort=${sort}&page=${page}`);

export const getSortedWorkstationsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/workstation?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllWorkstationsByBrand = (page, slug) =>
  request.get(`${baseUrl}/workstation/brand?brand=${slug}&page=${page}`);

export const getAllWorkstationsByBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedWorkstationsByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedWorkstationsByBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllWorkstationsByProcessor = (page, slug) =>
  request.get(`${baseUrl}/workstation/procesor?procesor=${slug}&page=${page}`);

export const getAllWorkstationsByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/workstation/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedWorkstationsByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedWorkstationsByProcessorPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/workstation/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getRefurbishedWorkstations = (page) =>
  request.get(`${baseUrl}/workstation/refurbished-3?page=${page}`);

export const getRefurbishedWorkstationsPrice = (price, page) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3?price=1-${price}&page=${page}`
  );

export const getSortedRefurbishedWorkstations = (page, sort) =>
  request.get(`${baseUrl}/workstation/refurbished-3?sort=${sort}&page=${page}`);

export const getSortedRefurbishedWorkstationsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/workstation/refurbished-3?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSecondHandWorkstations = (page) =>
  request.get(`${baseUrl}/workstation/second-hand-3?page=${page}`);

export const getSecondHandWorkstationsPrice = (price, page) =>
  request.get(
    `${baseUrl}/workstation/second-hand-3?price=1-${price}&page=${page}`
  );

export const getSortedSecondHandWorkstations = (page, sort) =>
  request.get(`${baseUrl}/workstation/second-hand-3?sort=${sort}&page=${page}`);

export const getSortedSecondHandWorkstationsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/workstation/second-hand-3?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllMonitors = (page) =>
  request.get(`${baseUrl}/monitoare?page=${page}`);

export const geAllMonitorsPrice = (price, page) =>
  request.get(`${baseUrl}/monitoare?price=1-${price}&page=${page}`);

export const geSortedMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare?sort=${sort}&page=${page}`);

export const geSortedMonitorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getRefMonitorBrands = (brand, page) =>
  request.get(`${baseUrl}/monitoare/refurbished-4?brand=${brand}&page=${page}`);

export const getRefMonitorScreens = (screen, page) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?screen=${screen}&page=${page}`
  );

export const getmonitorScreens = (screen, page) =>
  request.get(`${baseUrl}/monitoare?screen=${screen}&page=${page}`);

export const getSortedMonitorScreens = (screen, sort, page) =>
  request.get(
    `${baseUrl}/monitoare?screen=${screen}&sort=${sort}&page=${page}`
  );

export const getMonitorsScreensByPrice = (screen, price, page) =>
  request.get(
    `${baseUrl}/monitoare?screen=${screen}&price=1-${price}&page=${page}`
  );

export const getSortedMonitorsScreensPrice = (screen, price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare?screen=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getMonitorScreensByBrand = (screen, brand, page) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${brand}&screen=${screen}&page=${page}`
  );

export const getSortedBrandMonitorsScreens = (page, slug, sort, screen) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${slug}&screen=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedMonitorsScreensBrandPrice = (
  screen,
  price,
  page,
  sort,
  slug
) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${slug}&screen=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getMonitorsScreensBrandByPrice = (screen, price, page, slug) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${slug}&screen=${screen}&price=1-${price}&page=${page}`
  );

export const getSortedRefMonitorsScreensPrice = (screen, price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?screen=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefMonitorsBrandPrice = (brand, price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getRefMonitorsScreensByPrice = (screen, price, page) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?screen=${screen}&price=1-${price}&page=${page}`
  );

export const getRefMonitorsBrandsByPrice = (brand, price, page) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSortedRefMonitorScreens = (screen, sort, page) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?screen=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedRefMonitorBrands = (brand, sort, page) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getRefMonitorScreensAndBrand = (screen, page, brand) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?screen=${screen}&brand=${brand}&page=${page}`
  );

export const getSortedRefMonitorsScreensBrandPrice = (
  screen,
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?screen=${screen}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getRefMonitorsScreensBrandByPrice = (screen, price, page, brand) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?screen=${screen}&brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSortedRefMonitorsBrandScreen = (brand, screen, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?brand=${brand}&screen=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedNewMonitorsScreensBrandPrice = (
  screen,
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?screen=${screen}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getNewMonitorScreens = (screen, page) =>
  request.get(`${baseUrl}/monitoare/noi-4?screen=${screen}&page=${page}`);

export const getNewMonitorBrands = (brand, page) =>
  request.get(`${baseUrl}/monitoare/noi-4?brand=${brand}&page=${page}`);

export const getSortedNewMonitorsScreensPrice = (screen, price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?screen=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewMonitorsBrandPrice = (brand, price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getNewMonitorsScreensByPrice = (screen, price, page) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?screen=${screen}&price=1-${price}&page=${page}`
  );

export const getNewMonitorsBrandsByPrice = (brand, price, page) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSortedNewMonitorScreens = (screen, sort, page) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?screen=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedNewMonitorBrands = (brand, sort, page) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getNewMonitorScreensAndBrand = (screen, page, brand) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?screen=${screen}&brand=${brand}&page=${page}`
  );

export const getSortedNewMonitorsBrandScreen = (brand, screen, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?brand=${brand}&screen=${screen}&sort=${sort}&page=${page}`
  );

export const getNewMonitorsScreensBrandByPrice = (screen, price, page, brand) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?screen=${screen}&brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSHMonitorScreens = (screen, page) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?screen=${screen}&page=${page}`
  );

export const getSHMonitorBrands = (brand, page) =>
  request.get(`${baseUrl}/monitoare/second-hand-4?brand=${brand}&page=${page}`);

export const getSortedSHMonitorsScreensPrice = (screen, price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?screen=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHMonitorsBrandPrice = (brand, price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSHMonitorsScreensByPrice = (screen, price, page) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?screen=${screen}&price=1-${price}&page=${page}`
  );

export const getSHMonitorsBrandsByPrice = (brand, price, page) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSortedSHMonitorScreens = (screen, sort, page) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?screen=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedSHMonitorBrands = (brand, sort, page) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSHMonitorScreensAndBrand = (screen, page, brand) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?screen=${screen}&brand=${brand}&page=${page}`
  );

export const getSortedSHMonitorsScreensBrandPrice = (
  screen,
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?screen=${screen}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSHMonitorsScreensBrandByPrice = (screen, price, page, brand) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?screen=${screen}&brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSortedSHMonitorsBrandScreen = (brand, screen, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?brand=${brand}&screen=${screen}&sort=${sort}&page=${page}`
  );

export const geAllBrandMonitors = (page, slug) =>
  request.get(`${baseUrl}/monitoare/brand?brand=${slug}&page=${page}`);

export const geAllBrandMonitorsPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedBrandMonitors = (page, slug, sort) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedBrandMonitorsPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllNewMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/noi-4?page=${page}`);

export const geAllNewMonitorsPrice = (price, page) =>
  request.get(`${baseUrl}/monitoare/noi-4?price=1-${price}&page=${page}`);

export const geSortedNewMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare/noi-4?sort=${sort}&page=${page}`);

export const geSortedNewMonitorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/noi-4?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllRefurbishedMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/refurbished-4?page=${page}`);

export const geAllRefurbishedMonitorsPrice = (price, page) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?price=1-${price}&page=${page}`
  );

export const geSortedRefurbishedMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare/refurbished-4?sort=${sort}&page=${page}`);

export const geSortedRefurbishedMonitorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/refurbished-4?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllSecondHandMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/second-hand-4?page=${page}`);

export const geAllSecondHandMonitorsPrice = (price, page) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?price=1-${price}&page=${page}`
  );

export const geSortedSecondHandMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare/second-hand-4?sort=${sort}&page=${page}`);

export const geSortedSecondHandMonitorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/second-hand-4?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllTSRefMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/touchscreen-refurbished?page=${page}`);

export const getAllTSRefMonitorsPrice = (price, page) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-refurbished?price=1-${price}&page=${page}`
  );

export const geSortedTSRefMonitors = (page, sort) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-refurbished?sort=${sort}&page=${page}`
  );

export const geSortedTSRefMonitorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-refurbished?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSecHandTSMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/touchscreen-second?page=${page}`);

export const getAllSecHandTSMonitorsPrice = (price, page) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-second?price=1-${price}&page=${page}`
  );

export const getSortedSecHandTSMonitors = (page, sort) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-second?sort=${sort}&page=${page}`
  );

export const getSortedSecHandTSMonitorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-second?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllComponents = (page) =>
  request.get(`${baseUrl}/componente?page=${page}`);

export const geAllComponentsPrice = (price, page) =>
  request.get(`${baseUrl}/componente?price=1-${price}&page=${page}`);

export const getSortedComponents = (page, sort) =>
  request.get(`${baseUrl}/componente?sort=${sort}&page=${page}`);

export const getSortedComponentsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllBrandComponents = (page, slug) =>
  request.get(`${baseUrl}/componente/brand?brand=${slug}&page=${page}`);

export const geAllBrandComponentsByType = (page, slug, componenta) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&componenta=${componenta}&page=${page}`
  );

export const getSortedBrandTypeComponents = (page, slug, sort, componenta) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&componenta=${componenta}&sort=${sort}&page=${page}`
  );

export const getSortedBrandTypeComponentsPrice = (
  page,
  slug,
  sort,
  price,
  componenta
) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&componenta=${componenta}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getBrandTypeComponentsPrice = (page, slug, price, componenta) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&componenta=${componenta}&price=1-${price}&page=${page}`
  );

export const geAllBrandComponentsPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedBrandComponents = (page, slug, sort) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedBrandComponentsPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllHardDisks = (page) =>
  request.get(`${baseUrl}/componente/hard-disk?page=${page}`);

export const getAllHardDisksByBrand = (page, brand) =>
  request.get(`${baseUrl}/componente/hard-disk?brand=${brand}&page=${page}`);

export const getSortedHardDisksPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/hard-disk?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedHardDisksBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/hard-disk?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getHardDisksPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/hard-disk?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllHardDisksPrice = (price, page) =>
  request.get(`${baseUrl}/componente/hard-disk?price=1-${price}&page=${page}`);

export const getSortedHardDisks = (page, sort) =>
  request.get(`${baseUrl}/componente/hard-disk?sort=${sort}&page=${page}`);

export const getSortedHardDisksPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/hard-disk?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRAM = (page) =>
  request.get(`${baseUrl}/componente/memorie-ram?page=${page}`);

export const getAllRAMyByBrand = (page, brand) =>
  request.get(`${baseUrl}/componente/memorie-ram?brand=${brand}&page=${page}`);

export const getSortedRAMPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/memorie-ram?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRAMBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/memorie-ram?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getRAMPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/memorie-ram?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllRAMPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/memorie-ram?price=1-${price}&page=${page}`
  );

export const getSortedRAM = (page, sort) =>
  request.get(`${baseUrl}/componente/memorie-ram?sort=${sort}&page=${page}`);

export const getSortedRAMPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/memorie-ram?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllVideoCards = (page) =>
  request.get(`${baseUrl}/componente/placa-video?page=${page}`);

export const getAllVideoCardsByBrand = (page, brand) =>
  request.get(`${baseUrl}/componente/placa-video?brand=${brand}&page=${page}`);

export const getSortedVideoCardsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/placa-video?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedVideoCardsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/placa-video?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getVideoCardsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/placa-video?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllVideoCardsPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/placa-video?price=1-${price}&page=${page}}`
  );

export const getSortedVideoCards = (page, sort) =>
  request.get(`${baseUrl}/componente/placa-video?sort=${sort}&page=${page}`);

export const getSortedVideoCardsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/placa-video?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllProcesors = (page) =>
  request.get(`${baseUrl}/componente/procesor?page=${page}`);

export const getAllProcesorsByBrand = (page, brand) =>
  request.get(`${baseUrl}/componente/procesor?brand=${brand}&page=${page}`);

export const getSortedProcesorsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/procesor?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedProcesorsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/procesor?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getProcesorsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/procesor?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllProcesorsPrice = (price, page) =>
  request.get(`${baseUrl}/componente/procesor?price=1-${price}&page=${page}}`);

export const getSortedProcesors = (page, sort) =>
  request.get(`${baseUrl}/componente/procesor?sort=${sort}&page=${page}`);

export const getSortedProcesorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/procesor?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllLaptopKeyboards = (page) =>
  request.get(`${baseUrl}/componente/tastatura-laptop?page=${page}`);

export const getAllLaptopKeyboardsByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?brand=${brand}&page=${page}`
  );

export const getSortedLaptopKeyboardsPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopKeyboardsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getLaptopKeyboardsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllLaptopKeyboardsPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?price=1-${price}&page=${page}}`
  );

export const getSortedLaptopKeyboards = (page, sort) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?sort=${sort}&page=${page}`
  );
export const getSortedLaptopKeyboardsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllLaptopBatteries = (page) =>
  request.get(`${baseUrl}/componente/baterie-laptop?page=${page}`);

export const getAlLaptopBatteriesByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/baterie-laptop?brand=${brand}&page=${page}`
  );

export const getSortedLaptopBatteriesPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/componente/baterie-laptop?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopBatteriesBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/baterie-laptop?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getLaptopBatteriesPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/baterie-laptop?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllLaptopBatteriesPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/baterie-laptop?price=1-${price}&page=${page}}`
  );

export const getSortedLaptopBatteries = (page, sort) =>
  request.get(`${baseUrl}/componente/baterie-laptop?sort=${sort}&page=${page}`);

export const getSortedLaptopBatteriesPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/baterie-laptop?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllLaptopChargers = (page) =>
  request.get(`${baseUrl}/componente/alimentator-laptop?page=${page}`);

export const getAllLaptopChargersByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?brand=${brand}&page=${page}`
  );

export const getSortedLaptopChargersPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedLaptopChargersBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getLaptopChargersPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllLaptopChargersPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?price=1-${price}&page=${page}}`
  );

export const getSortedLaptopChargers = (page, sort) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?sort=${sort}&page=${page}`
  );

export const getSortedLaptopChargersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllPalmrests = (page) =>
  request.get(`${baseUrl}/componente/palmrest?page=${page}`);

export const getAlPalmrestsMyByBrand = (page, brand) =>
  request.get(`${baseUrl}/componente/palmrest?brand=${brand}&page=${page}`);

export const getSortedPalmrestsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/palmrest?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedPalmrestsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/palmrest?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getPalmrestsriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/palmrest?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllPalmrestsPrice = (price, page) =>
  request.get(`${baseUrl}/componente/palmrest?price=1-${price}&page=${page}}`);

export const getSortedPalmrests = (page, sort) =>
  request.get(`${baseUrl}/componente/palmrest?sort=${sort}&page=${page}`);

export const getSortedPalmrestsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/palmrest?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllCaddy = (page) =>
  request.get(`${baseUrl}/componente/caddy-server?page=${page}`);

export const getAllCaddyByBrand = (page, brand) =>
  request.get(`${baseUrl}/componente/caddy-server?brand=${brand}&page=${page}`);

export const getSortedCaddyPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/caddy-server?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedCaddyBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/caddy-server?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getCaddyPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/caddy-server?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllCaddyPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/caddy-server?price=1-${price}&page=${page}}`
  );

export const getSortedCaddy = (page, sort) =>
  request.get(`${baseUrl}/componente/caddy-server?sort=${sort}&page=${page}`);

export const getSortedCaddyPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/caddy-server?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRailkit = (page) =>
  request.get(`${baseUrl}/componente/railkit-server?page=${page}`);

export const getAllRailkitsByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/railkit-server?brand=${brand}&page=${page}`
  );

export const getSortedRailkitPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/railkit-server?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRailkitBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/railkit-server?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getRailkitPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/railkit-server?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllRailkitPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/railkit-server?price=1-${price}&page=${page}}`
  );

export const getSortedRailkit = (page, sort) =>
  request.get(`${baseUrl}/componente/railkit-server?sort=${sort}&page=${page}`);

export const getSortedRailkitPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/railkit-server?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllMascaBay = (page) =>
  request.get(`${baseUrl}/componente/masca-bay-server?page=${page}`);

export const getAllMascaBayByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?brand=${brand}&page=${page}`
  );

export const getSortedMascaBayPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedMascaBayBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getMascaBayPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllMascaBayPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?price=1-${price}&page=${page}}`
  );

export const getSortedMascaBay = (page, sort) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?sort=${sort}&page=${page}`
  );

export const getSortedMascaBayPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllControllers = (page) =>
  request.get(`${baseUrl}/componente/controller-raid?page=${page}`);

export const getAllControllersByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/controller-raid?brand=${brand}&page=${page}`
  );

export const getSortedControllersPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/controller-raid?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedControllersBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/controller-raid?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getControllersPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/controller-raid?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllControllersPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/controller-raid?price=1-${price}&page=${page}}`
  );

export const getSortedControllers = (page, sort) =>
  request.get(
    `${baseUrl}/componente/controller-raid?sort=${sort}&page=${page}`
  );

export const getSortedControllersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/controller-raid?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllNetworks = (page) =>
  request.get(`${baseUrl}/componente/placa-de-retea?page=${page}`);

export const getAllNetworkMyByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-retea?brand=${brand}&page=${page}`
  );

export const getSortedNetworkPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-retea?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNetworkBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-retea?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getNetworkPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-retea?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllNetworksPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/placa-de-retea?price=1-${price}&page=${page}}`
  );

export const getSortedNetworks = (page, sort) =>
  request.get(`${baseUrl}/componente/placa-de-retea?sort=${sort}&page=${page}`);

export const getSortedNetworksPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/placa-de-retea?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllCases = (page) =>
  request.get(`${baseUrl}/componente/carcasa-si-surse?page=${page}`);

export const getAllCasesByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?brand=${brand}&page=${page}`
  );

export const getSortedCasesPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedCasesBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getCasesPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllCasesPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?price=1-${price}&page=${page}`
  );

export const getSortedCases = (page, sort) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?sort=${sort}&page=${page}`
  );

export const getSortedCasesPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllBareboneByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?brand=${brand}&page=${page}`
  );

export const getSortedBarebonePriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedBareboneBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getBarebonePriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllBarebone = (page) =>
  request.get(`${baseUrl}/componente/barebone-calculator?page=${page}`);

export const getAllBarebonePrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?price=1-${price}&page=${page}`
  );

export const getSortedBarebone = (page, sort) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?sort=${sort}&page=${page}`
  );

export const getSortedBarebonePrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllCoolers = (page) =>
  request.get(`${baseUrl}/componente/coolere-si-radiatoare?page=${page}`);

export const getAllCoolersByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?brand=${brand}&page=${page}`
  );

export const getSortedCoolersPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedCoolersBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getCoolersPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllCoolersPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?price=1-${price}&page=${page}`
  );

export const getSortedCoolers = (page, sort) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?sort=${sort}&page=${page}`
  );

export const getSortedCoolersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllMotherBoards = (page) =>
  request.get(`${baseUrl}/componente/placa-de-baza-calculator?page=${page}`);

export const getAllMotherBoardsMyByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?brand=${brand}&page=${page}`
  );

export const getSortedMotherBoardsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedMotherBoardsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getMotherBoardsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllMotherBoardsPrice = (price, page) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?price=1-${price}&page=${page}`
  );

export const getSortedMotherBoards = (page, sort) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?sort=${sort}&page=${page}`
  );

export const getSortedMotherBoardsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllSoftware = (page) =>
  request.get(`${baseUrl}/licenta-software?page=${page}`);

export const geAllPrinters = (page) =>
  request.get(`${baseUrl}/imprimante?page=${page}`);

export const getSortedPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante?sort=${sort}&page=${page}`);

export const geAllBrandPrinters = (page, slug) =>
  request.get(`${baseUrl}/imprimante/brand?brand=${slug}&page=${page}`);

export const getSortedBrandPrinters = (page, slug, sort) =>
  request.get(
    `${baseUrl}/imprimante/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getPrintersPrice = (price, page) =>
  request.get(`${baseUrl}/imprimante?price=1-${price}&page=${page}`);

export const getSortedPrintersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/imprimante?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedBrandByPricePrinters = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/imprimante/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getBrandByPricePrinters = (page, slug, price) =>
  request.get(
    `${baseUrl}/imprimante/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllNewPrinters = (page) =>
  request.get(`${baseUrl}/imprimante/noi-3?page=${page}`);

export const getAllNewBrandPrinters = (page, slug) =>
  request.get(`${baseUrl}/imprimante/noi-3?brand=${slug}&page=${page}`);

export const getSortedNewBrandByPricePrinters = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/imprimante/noi-3?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewPrintersBrand = (page, sort, slug) =>
  request.get(
    `${baseUrl}/imprimante/noi-3?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getBrandByPriceNewPrinters = (page, slug, price) =>
  request.get(
    `${baseUrl}/imprimante/noi-3?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllNewPrintersPrice = (page, price) =>
  request.get(`${baseUrl}/imprimante/noi-3?price=1-${price}&page=${page}`);

export const getSortedNewPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante/noi-3?sort=${sort}&page=${page}`);

export const getSortedNewPrintersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/imprimante/noi-3?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSHPrinters = (page) =>
  request.get(`${baseUrl}/imprimante/second-hand-5?page=${page}`);

export const getAllSHBrandPrinters = (page, slug) =>
  request.get(`${baseUrl}/imprimante/second-hand-5?brand=${slug}&page=${page}`);

export const getSortedSHBrandByPricePrinters = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/imprimante/second-hand-5?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSHPrintersBrand = (page, sort, slug) =>
  request.get(
    `${baseUrl}/imprimante/second-hand-5?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getBrandByPriceSHPrinters = (page, slug, price) =>
  request.get(
    `${baseUrl}/imprimante/second-hand-5?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllSHPrintersPrice = (page, price) =>
  request.get(
    `${baseUrl}/imprimante/second-hand-5?price=1-${price}&page=${page}`
  );

export const getSortedSHPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante/second-hand-5?sort=${sort}&page=${page}`);

export const getSortedSHPrintersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/imprimante/second-hand-5?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRefBrandPrinters = (page, slug) =>
  request.get(`${baseUrl}/imprimante/refurbished-5?brand=${slug}&page=${page}`);

export const getSortedRefBrandByPricePrinters = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/imprimante/refurbished-5?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefPrintersBrand = (page, sort, slug) =>
  request.get(
    `${baseUrl}/imprimante/refurbished-5?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getBrandByPriceRefPrinters = (page, slug, price) =>
  request.get(
    `${baseUrl}/imprimante/refurbished-5?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getAllRefPrinters = (page) =>
  request.get(`${baseUrl}/imprimante/refurbished-5?page=${page}`);

export const getAllRefPrintersPrice = (page, price) =>
  request.get(
    `${baseUrl}/imprimante/refurbished-5?price=1-${price}&page=${page}`
  );

export const getSortedRefPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante/refurbished-5?sort=${sort}&page=${page}`);

export const getSortedRefPrintersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/imprimante/refurbished-5?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllPrinterCollateral = (page) =>
  request.get(`${baseUrl}/imprimante/consumabile?page=${page}`);

export const getAllPrinterCollateralPrice = (price, page) =>
  request.get(
    `${baseUrl}/imprimante/consumabile?price=1-${price}&page=${page}`
  );

export const getSortedPrinterCollateral = (page, sort) =>
  request.get(`${baseUrl}/imprimante/consumabile?sort=${sort}&page=${page}`);

export const getSortedPrinterCollateralPrice = (page, sort, price) =>
  request.get(
    `${baseUrl}/imprimante/consumabile?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos?page=${page}`);

export const geAllPOSPrice = (price, page) =>
  request.get(`${baseUrl}/sisteme-pos?price=1-${price}&page=${page}`);

export const getSortedPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos?sort=${sort}&page=${page}`);

export const getSortedPOSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllPOSBrands = (page, slug) =>
  request.get(`${baseUrl}/sisteme-pos/brand?brand=${slug}&page=${page}`);

export const getAlPOSBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getSortedBrandTypePOSPrice = (
  page,
  slug,
  sort,
  price,
  componenta
) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${slug}&procesor=${componenta}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedBrandTypePOS = (page, slug, sort, componenta) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${slug}&procesor=${componenta}&sort=${sort}&page=${page}`
  );

export const getBrandTypePOSPrice = (page, slug, price, componenta) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${slug}&procesor=${componenta}&price=1-${price}&page=${page}`
  );

export const geAllPOSBrandsPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedPOSBrands = (page, slug, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedPOSBrandsPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllPOSByProcessor = (page, slug) =>
  request.get(`${baseUrl}/sisteme-pos/procesor?procesor=${slug}&page=${page}`);

export const getAllPOSByProcessorPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/sisteme-pos/procesor?procesor=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedPOSByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedPOSByProcessorPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/sisteme-pos/procesor?procesor=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRefurbishedPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos/refurbished-6?page=${page}`);

export const getAllRefurbishedPOSPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?price=1-${price}&page=${page}`
  );

export const getRefurbishedPOSScreensAndBrand = (screen, page, brand) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?procesor=${screen}&brand=${brand}&page=${page}`
  );

export const getRefMonitorProcessors = (screen, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?procesor=${screen}&page=${page}`
  );

export const getRefurbishedNewPOSProcesorBrandPrice = (
  screen,
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?procesor=${screen}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefurbishedPOSProcesorPrice = (
  screen,
  price,
  page,
  sort
) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?procesor=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getRefurbishedPOSBrands = (brand, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?brand=${brand}&page=${page}`
  );

export const getSortedRefurbishedPOSBrandPrice = (brand, price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefurbishedPOSBrandProcesor = (
  brand,
  screen,
  page,
  sort
) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?brand=${brand}&procesor=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedRefurbishedPOSProcesor = (screen, sort, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?procesor=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedRefurbishedPOSBrands = (brand, sort, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getRefurbishedPOSProcesorsBrandByPrice = (
  screen,
  price,
  page,
  brand
) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?procesor=${screen}&brand=${brand}&price=1-${price}&page=${page}`
  );

export const getRefurbishedPOSProcesorByPrice = (screen, price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?procesor=${screen}&price=1-${price}&page=${page}`
  );

export const getRefurbishedPOSBrandsByPrice = (brand, price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSortedRefurbishedPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos/refurbished-6?sort=${sort}&page=${page}`);

export const getSortedRefurbishedPOSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSecondHandPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos/second-hand-6?page=${page}`);

export const getSecondHandPOSScreensAndBrand = (screen, page, brand) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?procesor=${screen}&brand=${brand}&page=${page}`
  );

export const getSecondHandPOSProcessors = (screen, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?procesor=${screen}&page=${page}`
  );

export const getSecondHandPOSProcesorBrandPrice = (
  screen,
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?procesor=${screen}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSecondHandPOSProcesorPrice = (
  screen,
  price,
  page,
  sort
) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?procesor=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSecondHandPOSBrands = (brand, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?brand=${brand}&page=${page}`
  );

export const getSortedSecondHandPOSBrandPrice = (brand, price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSecondHandPOSBrandProcesor = (
  brand,
  screen,
  page,
  sort
) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?brand=${brand}&procesor=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedSecondHandPOSProcesor = (screen, sort, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?procesor=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedSecondHandPOSBrands = (brand, sort, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSecondHandPOSProcesorsBrandByPrice = (
  screen,
  price,
  page,
  brand
) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?procesor=${screen}&brand=${brand}&price=1-${price}&page=${page}`
  );

export const getSecondHandPOSProcesorByPrice = (screen, price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?procesor=${screen}&price=1-${price}&page=${page}`
  );

export const getSecondHanddPOSBrandsByPrice = (brand, price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllSecondHandPOSPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?price=1-${price}&page=${page}`
  );

export const getSortedSecondHandPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos/second-hand-6?sort=${sort}&page=${page}`);

export const getSortedSecondHandPOSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/second-hand-6?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllNewPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos/noi-8?page=${page}`);

export const getNewPOSScreensAndBrand = (screen, page, brand) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?procesor=${screen}&brand=${brand}&page=${page}`
  );

export const getNewPOSProcessors = (screen, page) =>
  request.get(`${baseUrl}/sisteme-pos/noi-8?procesor=${screen}&page=${page}`);

export const getSortedNewPOSProcesorBrandPrice = (
  screen,
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?procesor=${screen}&brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewPOSProcesorPrice = (screen, price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?procesor=${screen}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getNewPOSBrands = (brand, page) =>
  request.get(`${baseUrl}/sisteme-pos/noi-8?brand=${brand}&page=${page}`);

export const getSortedNewPOSBrandPrice = (brand, price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewPOSBrandProcesor = (brand, screen, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?brand=${brand}&procesor=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedNewPOSProcesor = (screen, sort, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?procesor=${screen}&sort=${sort}&page=${page}`
  );

export const getSortedNewPOSBrands = (brand, sort, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getNewPOSProcesorsBrandByPrice = (screen, price, page, brand) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?procesor=${screen}&brand=${brand}&price=1-${price}&page=${page}`
  );

export const getNewPOSProcesorByPrice = (screen, price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?procesor=${screen}&price=1-${price}&page=${page}`
  );

export const getNewPOSBrandsByPrice = (brand, price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllNewPOSPrice = (price, page) =>
  request.get(`${baseUrl}/sisteme-pos/noi-8?price=1-${price}&page=${page}`);

export const getSortedNewPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos/noi-8?sort=${sort}&page=${page}`);

export const getSortedNewPOSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/noi-8?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllPOSReaders = (page) =>
  request.get(`${baseUrl}/sisteme-pos/cititor-cod-bare?page=${page}`);

export const getAllPOSReadersPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/cititor-cod-bare?price=1-${price}&page=${page}`
  );

export const getSortedPOSReaders = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/cititor-cod-bare?sort=${sort}&page=${page}`
  );

export const getSortedPOSReadersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/cititor-cod-bare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllPOSPrinters = (page) =>
  request.get(`${baseUrl}/sisteme-pos/imprimante-termice-noi?page=${page}`);

export const getAllPOSPrintersPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-pos/imprimante-termice-noi?price=1-${price}&page=${page}`
  );

export const getSortedPOSPrinters = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/imprimante-termice-noi?sort=${sort}&page=${page}`
  );

export const getSortedPOSPrintersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/imprimante-termice-noi?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllUPS = (page) => request.get(`${baseUrl}/ups?page=${page}`);

export const getAllUPSPrice = (price, page) =>
  request.get(`${baseUrl}/ups?price=1-${price}&page=${page}`);

export const getSortedUPS = (page, sort) =>
  request.get(`${baseUrl}/ups?sort=${sort}&page=${page}`);

export const getSortedUPSPrice = (price, page, sort) =>
  request.get(`${baseUrl}/ups?price=1-${price}&sort=${sort}&page=${page}`);

export const getAllUPSBrands = (page, slug) =>
  request.get(`${baseUrl}/ups/brand?brand=${slug}&page=${page}`);

export const getAllUPSBrandsPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/ups/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedUPSBrands = (page, slug, sort) =>
  request.get(`${baseUrl}/ups/brand?brand=${slug}&sort=${sort}&page=${page}`);

export const getSortedUPSBrandsPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/ups/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRefurbishedUPS = (page) =>
  request.get(`${baseUrl}/ups/refurbished-7?page=${page}`);

export const getAllRefUPSByBrand = (page, brand) =>
  request.get(`${baseUrl}/ups/refurbished-7?brand=${brand}&page=${page}`);

export const getSortedRefUPSPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/ups/refurbished-7?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRefUPSBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/ups/refurbished-7?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getRefUPSPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/ups/refurbished-7?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllRefurbishedUPSPrice = (price, page) =>
  request.get(`${baseUrl}/ups/refurbished-7?price=1-${price}&page=${page}`);

export const getSortedRefurbishedUPS = (page, sort) =>
  request.get(`${baseUrl}/ups/refurbished-7?sort=${sort}&page=${page}`);

export const getSortedRefurbishedUPSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/ups/refurbished-7?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAlllNewUPS = (page) =>
  request.get(`${baseUrl}/ups/noi-7?page=${page}`);

export const getAllNewUPSByBrand = (page, brand) =>
  request.get(`${baseUrl}/ups/noi-7?brand=${brand}&page=${page}`);

export const getSortedNewUPSPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/ups/noi-7?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNewUPSBrand = (page, sort, brand) =>
  request.get(`${baseUrl}/ups/noi-7?brand=${brand}&sort=${sort}&page=${page}`);

export const getNewUPSPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/ups/noi-7?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAlllNewUPSPrice = (price, page) =>
  request.get(`${baseUrl}/ups/noi-7?price=1-${price}&page=${page}`);

export const getSortedlNewUPS = (page, sort) =>
  request.get(`${baseUrl}/ups/noi-7?sort=${sort}&page=${page}`);

export const getSortedlNewUPSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/ups/noi-7?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSecondHandUPS = (page) =>
  request.get(`${baseUrl}/ups/second-hand-7?page=${page}`);

export const getAllSecondHandUPSByBrand = (page, brand) =>
  request.get(`${baseUrl}/ups/second-hand-7?brand=${brand}&page=${page}`);

export const getSortedSecondHandUPSPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/ups/second-hand-7?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSecondHandUPSBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/ups/second-hand-7?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSecondHandUPSPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/ups/second-hand-7?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllSecondHandUPSPrice = (price, page) =>
  request.get(`${baseUrl}/ups/second-hand-7?price=1-${price}&page=${page}`);

export const getSortedSecondHandUPS = (page, sort) =>
  request.get(`${baseUrl}/ups/second-hand-7?sort=${sort}&page=${page}`);

export const getSortedSecondHandUPSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/ups/second-hand-7?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllAccessories = (page) =>
  request.get(`${baseUrl}/accesorii?page=${page}`);

export const getAllAccessoriesPrice = (price, page) =>
  request.get(`${baseUrl}/accesorii?price=1-${price}&page=${page}`);

export const getSortedAccessories = (page, sort) =>
  request.get(`${baseUrl}/accesorii?sort=${sort}&page=${page}`);

export const getSortedAccessoriesPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllBrandAccessories = (page, slug) =>
  request.get(`${baseUrl}/accesorii/brand?brand=${slug}&page=${page}`);

export const getAllBrandAccessoriessByType = (page, slug, componenta) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&tip=${componenta}&page=${page}`
  );

export const getSortedBrandTypeAccessoriessPrice = (
  page,
  slug,
  sort,
  price,
  componenta
) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&tip=${componenta}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedBrandTypeAccessories = (page, slug, sort, componenta) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&tip=${componenta}&sort=${sort}&page=${page}`
  );

export const getSortedBrandAccessoriesPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getBrandTypeAccessoriesPrice = (page, slug, price, componenta) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&tip=${componenta}&price=1-${price}&page=${page}`
  );

export const geAllBrandAccessoriesPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedBrandAccessories = (page, slug, sort) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const geAllRetails = (page) =>
  request.get(`${baseUrl}/retelistica?page=${page}`);

export const geAllRetailsPrice = (price, page) =>
  request.get(`${baseUrl}/retelistica?price=1-${price}&page=${page}`);

export const getSortedRetails = (page, sort) =>
  request.get(`${baseUrl}/retelistica?sort=${sort}&page=${page}`);

export const getSortedRetailsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/retelistica?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllBrandRetailsByType = (page, slug, componenta) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&tip=${componenta}&page=${page}`
  );

export const getSortedBrandTypeRetailsPrice = (
  page,
  slug,
  sort,
  price,
  componenta
) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&tip=${componenta}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedBrandTypeRetails = (page, slug, sort, componenta) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&tip=${componenta}&sort=${sort}&page=${page}`
  );

export const getBrandTypeRetailsPrice = (page, slug, price, componenta) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&tip=${componenta}&price=1-${price}&page=${page}`
  );

export const geAllRetailsBrand = (page, slug) =>
  request.get(`${baseUrl}/retelistica/brand?brand=${slug}&page=${page}`);

export const geAllRetailsBrandPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedRetailsBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedRetailsBrandPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllSolarPanels = (page) =>
  request.get(`${baseUrl}/sisteme-solare-fotovoltaice?page=${page}`);

export const getAllSolarPanelsPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice?price=1-${price}&page=${page}`
  );

export const getSortedSolarPanels = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice?sort=${sort}&page=${page}`
  );

export const getSortedSolarPanelsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice?price=1-${price}&sort=${sort}&page=${page}`
  );

export const geAllSolarPanelsBrands = (page, slug) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/brand?brand=${slug}&page=${page}`
  );

export const geAllSolarPanelsBrandsPrice = (page, slug, price) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/brand?brand=${slug}&price=1-${price}&page=${page}`
  );

export const getSortedSolarPanelsBrands = (page, slug, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getSortedSolarPanelsBrandsPrice = (page, slug, sort, price) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/brand?brand=${slug}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllCables = (page) =>
  request.get(`${baseUrl}/accesorii/cabluri-si-adaptoare?page=${page}`);

export const getAllCablesByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?brand=${brand}&page=${page}`
  );

export const getSortedCablesPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedCablesBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getCablesPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllCablesPrice = (price, page) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?price=1-${price}&page=${page}`
  );

export const getSortedCables = (page, sort) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?sort=${sort}&page=${page}`
  );

export const getSortedCablesPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllMice = (page) =>
  request.get(`${baseUrl}/accesorii/mouse?page=${page}`);

export const getAllMiceByBrand = (page, brand) =>
  request.get(`${baseUrl}/accesorii/mouse?brand=${brand}&page=${page}`);

export const getSortedMicePriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/mouse?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedMiceBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/mouse?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getMicePriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/mouse?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllMicePrice = (price, page) =>
  request.get(`${baseUrl}/accesorii/mouse?price=1-${price}&page=${page}`);

export const getSortedMice = (page, sort) =>
  request.get(`${baseUrl}/accesorii/mouse?sort=${sort}&page=${page}`);

export const getSortedMicePrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/mouse?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllKeyboards = (page) =>
  request.get(`${baseUrl}/accesorii/tastaturi?page=${page}`);

export const getAllKeyboardsByBrand = (page, brand) =>
  request.get(`${baseUrl}/accesorii/tastaturi?brand=${brand}&page=${page}`);

export const getSortedKeyboardsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/tastaturi?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedKeyboardsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/tastaturi?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getKeyboardsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/tastaturi?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllKeyboardsPrice = (price, page) =>
  request.get(`${baseUrl}/accesorii/tastaturi?price=1-${price}&page=${page}`);

export const getSortedKeyboards = (page, sort) =>
  request.get(`${baseUrl}/accesorii/tastaturi?sort=${sort}&page=${page}`);

export const getSortedKeyboardsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/tastaturi?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllOtherAccessories = (page) =>
  request.get(`${baseUrl}/accesorii/periferice-diverse?page=${page}`);

export const getAllOtherAccessoriesByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?brand=${brand}&page=${page}`
  );

export const getSortedOtherAccessoriesPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedOtherAccessoriesBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getOtherAccessoriesPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllOtherAccessoriesPrice = (price, page) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?price=1-${price}&page=${page}`
  );

export const getSortedOtherAccessories = (page, sort) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?sort=${sort}&page=${page}`
  );

export const getSortedOtherAccessoriesPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllDockingStations = (page) =>
  request.get(`${baseUrl}/accesorii/docking-station?page=${page}`);

export const getAllDockingStationsByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/accesorii/docking-station?brand=${brand}&page=${page}`
  );

export const getSortedDockingStationsPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/accesorii/docking-station?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDockingStationsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/docking-station?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getDockingStationsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/docking-station?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDockingStationsPrice = (price, page) =>
  request.get(
    `${baseUrl}/accesorii/docking-station?price=1-${price}&page=${page}`
  );

export const getSortedDockingStations = (page, sort) =>
  request.get(`${baseUrl}/accesorii/docking-station?sort=${sort}&page=${page}`);

export const getSortedDockingStationsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/docking-station?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllBags = (page) =>
  request.get(`${baseUrl}/accesorii/genti?page=${page}`);

export const getAllBagsByBrand = (page, brand) =>
  request.get(`${baseUrl}/accesorii/genti?brand=${brand}&page=${page}`);

export const getSortedBagsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/genti?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedBagsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/genti?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getBagsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/genti?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllBagsPrice = (price, page) =>
  request.get(`${baseUrl}/accesorii/genti?price=1-${price}&page=${page}`);

export const getSortedBags = (page, sort) =>
  request.get(`${baseUrl}/accesorii/genti?sort=${sort}&page=${page}`);

export const getSortedBagsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/genti?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllCameras = (page) =>
  request.get(`${baseUrl}/accesorii/camere-web?page=${page}`);

export const getAllCamerasByBrand = (page, brand) =>
  request.get(`${baseUrl}/accesorii/camere-web?brand=${brand}&page=${page}`);

export const getSortedCamerasPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/camere-web?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedCamerasBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/camere-web?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getCamerasPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/camere-web?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllCamerasPrice = (price, page) =>
  request.get(`${baseUrl}/accesorii/camere-web?price=1-${price}&page=${page}`);

export const getSortedCameras = (page, sort) =>
  request.get(`${baseUrl}/accesorii/camere-web?sort=${sort}&page=${page}`);

export const getSortedCamerasPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/camere-web?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllHeadPhones = (page) =>
  request.get(`${baseUrl}/accesorii/casti?page=${page}`);

export const getAllHeadPhonesByBrand = (page, brand) =>
  request.get(`${baseUrl}/accesorii/casti?brand=${brand}&page=${page}`);

export const getSortedHeadPhonesPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/casti?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedHeadPhonesBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/casti?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getHeadPhonesPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/casti?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllHeadPhonesPrice = (price, page) =>
  request.get(`${baseUrl}/accesorii/casti?price=1-${price}&page=${page}`);

export const getSortedHeadPhones = (page, sort) =>
  request.get(`${baseUrl}/accesorii/casti?sort=${sort}&page=${page}`);

export const getSortedHeadPhonesPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/casti?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllGaming = (page) =>
  request.get(`${baseUrl}/accesorii/gaming-console?page=${page}`);

export const getAllGamingByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/accesorii/gaming-console?brand=${brand}&page=${page}`
  );

export const getSortedGamingPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/gaming-console?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedGamingBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/gaming-console?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getGamingPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/gaming-console?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllGamingPrice = (price, page) =>
  request.get(
    `${baseUrl}/accesorii/gaming-console?price=1-${price}&page=${page}`
  );

export const getSortedGaming = (page, sort) =>
  request.get(`${baseUrl}/accesorii/gaming-console?sort=${sort}&page=${page}`);

export const getSortedGamingPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/gaming-console?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllVideo = (page) =>
  request.get(`${baseUrl}/accesorii/videoproiectoare?page=${page}`);

export const getAllVideoByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?brand=${brand}&page=${page}`
  );

export const getSortedVideoPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedVideoBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getVideoPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllVideoPrice = (price, page) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?price=1-${price}&page=${page}`
  );

export const getSortedVideo = (page, sort) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?sort=${sort}&page=${page}`
  );

export const getSortedVideoPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllNetwork = (page) =>
  request.get(`${baseUrl}/retelistica/placi-de-retea?page=${page}`);

export const getAllNetworksByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?brand=${brand}&page=${page}`
  );

export const getSortedNetworksPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedNetworksBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getNetworksPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllNetworkPrice = (price, page) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?price=1-${price}&page=${page}`
  );

export const getSortedNetwork = (page, sort) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?sort=${sort}&page=${page}`
  );

export const getSortedNetworkPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllAdaptors = (page) =>
  request.get(`${baseUrl}/retelistica/adaptoare-wireless?page=${page}`);

export const getAllAdaptorsByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?brand=${brand}&page=${page}`
  );

export const getSortedAdaptorsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedAdaptorsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getAdaptorsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllAdaptorsPrice = (price, page) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?price=1-${price}&page=${page}`
  );

export const getSortedAdaptors = (page, sort) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?sort=${sort}&page=${page}`
  );

export const getSortedAdaptorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllRouters = (page) =>
  request.get(`${baseUrl}/retelistica/routere?page=${page}`);

export const getAllRoutersByBrand = (page, brand) =>
  request.get(`${baseUrl}/retelistica/routere?brand=${brand}&page=${page}`);

export const getSortedRoutersPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/routere?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedRoutersBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/routere?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getRoutersPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/retelistica/routere?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllRoutersPrice = (price, page) =>
  request.get(`${baseUrl}/retelistica/routere?price=1-${price}&page=${page}`);

export const getSortedRouters = (page, sort) =>
  request.get(`${baseUrl}/retelistica/routere?sort=${sort}&page=${page}`);

export const getSortedRoutersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/retelistica/routere?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSwitch = (page) =>
  request.get(`${baseUrl}/retelistica/switch-uri?page=${page}`);

export const getAllSwitchByBrand = (page, brand) =>
  request.get(`${baseUrl}/retelistica/switch-uri?brand=${brand}&page=${page}`);

export const getSortedSwitchPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/switch-uri?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedSwitchBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/switch-uri?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSwitchPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/retelistica/switch-uri?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllSwitchPrice = (price, page) =>
  request.get(
    `${baseUrl}/retelistica/switch-uri?price=1-${price}&page=${page}`
  );

export const getSortedSwitch = (page, sort) =>
  request.get(`${baseUrl}/retelistica/switch-uri?sort=${sort}&page=${page}`);

export const getSortedSwitchPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/retelistica/switch-uri?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllAccessPoints = (page) =>
  request.get(`${baseUrl}/retelistica/access-point-uri?page=${page}`);

export const getAllAccessPointsByBrand = (page, brand) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?brand=${brand}&page=${page}`
  );

export const getSortedAccessPointsPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSorteAccessPointsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getAccessPointsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllAccessPointsPrice = (price, page) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?price=1-${price}&page=${page}`
  );

export const getSortedAccessPoints = (page, sort) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?sort=${sort}&page=${page}`
  );

export const getSortedAccessPointsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllPanels = (page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice?page=${page}`
  );

  export const getAllSystems = (page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/sisteme-fotovoltaice?page=${page}`
  );

  export const getSortedSystemsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/sisteme-fotovoltaice?price=1-${price}&sort=${sort}&page=${page}`
  );

  export const getSortedSystems = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/sisteme-fotovoltaice?sort=${sort}&page=${page}`
  );

  export const getAllSystemsPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/sisteme-fotovoltaice?price=1-${price}&page=${page}`
  );

export const getAllPanelsPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice?price=1-${price}&page=${page}`
  );

export const getSortedPanels = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice?sort=${sort}&page=${page}`
  );

export const getSortedPanelsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllInvertors = (page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice?page=${page}`
  );

export const getAllInvertorsPrice = (price, page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice?price=1-${price}&page=${page}`
  );

export const getSortedInvertors = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice?sort=${sort}&page=${page}`
  );

export const getSortedInvertorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSearchedItems = (search) =>
  request.get(`https://api.citgrup.ro/public/products/search?${search}`);

export const getDiscountedItems = (page) =>
  request.get(`${baseUrl}/promotii?page=${page}`);

export const getSortedDiscountedItems = (page, sort) =>
  request.get(`${baseUrl}/promotii?sort=${sort}&page=${page}`);

export const getDiscountedServers = (page) =>
  request.get(`${baseUrl}/promotii/servere?page=${page}`);

  export const getAllDiscountedServersByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/servere?brand=${brand}&page=${page}`);

export const getSortedDiscountedServersPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/servere?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscounteServersBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/servere?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedServersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/servere?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedServersPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/servere?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedServersPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/servere?price=1-${price}&page=${page}`);

export const getSortedDiscountedServers = (page, sort) =>
  request.get(`${baseUrl}/promotii/servere?sort=${sort}&page=${page}`);

export const getDiscountedWorkstations = (page) =>
  request.get(`${baseUrl}/promotii/workstation?page=${page}`);

  export const getAllDiscountedWorkstationsByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/workstation?brand=${brand}&page=${page}`);

export const getSortedDiscountedWorkstationsPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/workstation?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscounteWorkstationsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/workstation?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedWorkstationsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/workstation?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedWorkstationsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/workstation?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedWorkstationssPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/workstation?price=1-${price}&page=${page}`);

export const getSortedDiscountedWorkstations = (page, sort) =>
  request.get(`${baseUrl}/promotii/workstation?sort=${sort}&page=${page}`);

export const getDiscountedComputers = (page) =>
  request.get(`${baseUrl}/promotii/calculatoare?page=${page}`);

export const getAllDiscountedComputersByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/calculatoare?brand=${brand}&page=${page}`);

export const getSortedDiscountedComputersPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/calculatoare?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscounteComputersBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/calculatoare?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedComputersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/calculatoare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedComputersPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/calculatoare?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedComputersPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/calculatoare?price=1-${price}&page=${page}`);

export const getSortedDiscountedComputers = (page, sort) =>
  request.get(`${baseUrl}/promotii/calculatoare?sort=${sort}&page=${page}`);

export const getDiscountedLaptops = (page) =>
  request.get(`${baseUrl}/promotii/laptop?page=${page}`);

export const getAllDiscountedLaptopsByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/laptop?brand=${brand}&page=${page}`);

export const getSortedDiscountedLaptopsPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/laptop?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscounteLaptopsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/laptop?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedLaptopsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/laptop?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedLaptopsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/laptop?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedLaptopsPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/laptop?price=1-${price}&page=${page}`);

export const getSortedDiscountedLaptops = (page, sort) =>
  request.get(`${baseUrl}/promotii/laptop?sort=${sort}&page=${page}`);

export const getDiscountedMonitors = (page) =>
  request.get(`${baseUrl}/promotii/monitoare?page=${page}`);

export const getAllDiscountedMonitorsByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/monitoare?brand=${brand}&page=${page}`);

export const getSortedDiscountedMonitorsPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/monitoare?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscounteMonitorsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/monitoare?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedMonitorsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/monitoare?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedMonitorsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/monitoare?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedMonitorsPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/monitoare?price=1-${price}&page=${page}`);

export const getSortedDiscountedMonitors = (page, sort) =>
  request.get(`${baseUrl}/promotii/monitoare?sort=${sort}&page=${page}`);

export const getDiscountedComponents = (page) =>
  request.get(`${baseUrl}/promotii/componente?page=${page}`);

export const getAllDiscountedComponentsByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/componente?brand=${brand}&page=${page}`);

export const getSortedDiscountedComponentsPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/componente?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscounteComponentsBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/componente?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedComponentsPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/componente?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedComponentsPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/componente?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedComponentsPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/componente?price=1-${price}&page=${page}`);

export const getSortedDiscountedComponents = (page, sort) =>
  request.get(`${baseUrl}/promotii/componente?sort=${sort}&page=${page}`);

export const getDiscountedPrinters = (page) =>
  request.get(`${baseUrl}/promotii/imprimante?page=${page}`);

export const getAllDiscountedPrintersByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/imprimante?brand=${brand}&page=${page}`);

export const getSortedDiscountedPrintersPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/imprimante?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountePrintersBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/imprimante?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedPrintersPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/imprimante?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedPrintersPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/imprimante?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedPrintersPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/imprimante?price=1-${price}&page=${page}`);

export const getSortedDiscountedPrinters = (page, sort) =>
  request.get(`${baseUrl}/promotii/imprimante?sort=${sort}&page=${page}`);

export const getDiscountedPOS = (page) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?page=${page}`);

export const getAllDiscountedPOSByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?brand=${brand}&page=${page}`);

export const getSortedDiscountedPOSPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/sisteme-pos?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedPOSBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/sisteme-pos?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedPOSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/sisteme-pos?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedPOSPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/sisteme-pos?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedPOSPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?price=1-${price}&page=${page}`);

export const getSortedDiscountedPOS = (page, sort) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?sort=${sort}&page=${page}`);

export const getDiscountedUPS = (page) =>
  request.get(`${baseUrl}/promotii/ups?page=${page}`);

export const getAllDiscountedUPSByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/ups?brand=${brand}&page=${page}`);

export const getSortedDiscountedUPSPriceAndBrand = (price, page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/ups?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedUPSBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/ups?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedUPSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/ups?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedUPSPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/ups?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedUPSPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/ups?price=1-${price}&page=${page}`);

export const getSortedDiscountedUPS = (page, sort) =>
  request.get(`${baseUrl}/promotii/ups?sort=${sort}&page=${page}`);

export const getDiscountedAccessories = (page) =>
  request.get(`${baseUrl}/promotii/accesorii?page=${page}`);

export const getSortedDiscountedAccessories = (page, sort) =>
  request.get(`${baseUrl}/promotii/accesorii?sort=${sort}&page=${page}`);

export const getAllDiscountedAccessoriesByBrand = (page, brand) =>
  request.get(`${baseUrl}/promotii/accesorii?brand=${brand}&page=${page}`);

export const getSortedDiscountedAccessoriesPriceAndBrand = (
  price,
  page,
  sort,
  brand
) =>
  request.get(
    `${baseUrl}/promotii/accesorii?brand=${brand}&price=1-${price}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedAccessoriesBrand = (page, sort, brand) =>
  request.get(
    `${baseUrl}/promotii/accesorii?brand=${brand}&sort=${sort}&page=${page}`
  );

export const getSortedDiscountedAccessoriesPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/promotii/accesorii?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getDiscountedAccessoriesPriceAndBrand = (price, page, brand) =>
  request.get(
    `${baseUrl}/promotii/accesorii?brand=${brand}&price=1-${price}&page=${page}`
  );

export const getAllDiscountedAccessoriesPrice = (price, page) =>
  request.get(`${baseUrl}/promotii/accesorii?price=1-${price}&page=${page}`);
