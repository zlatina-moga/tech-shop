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

export const getAllNewLaptopsBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/laptop/noi-1/brand?brand=${brand}&procesor=${processor}&page=${page}`
  );

export const getAllRefLaptopsBrandAndProcessor = (page, brand, processor) =>
  request.get(
    `${baseUrl}/laptop/refurbished-1/brand?brand=${brand}&procesor=${processor}&page=${page}`
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

export const getSortedNewComputersByBrandAndGeneration = (
  page,
  slug,
  sort,
  generatie
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/brand?brand=${slug}&generatie=${generatie}&sort=${sort}&page=${page}`
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

export const getSortedNewComputersByGenerationPrice = (
  page,
  slug,
  sort,
  price
) =>
  request.get(
    `${baseUrl}/calculatoare/nou/generatie?generatie=${slug}&price=1-${price}&sort=${sort}&page=${page}`
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

export const getSortedRefurbishedPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos/refurbished-6?sort=${sort}&page=${page}`);

export const getSortedRefurbishedPOSPrice = (price, page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/refurbished-6?price=1-${price}&sort=${sort}&page=${page}`
  );

export const getAllSecondHandPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos/second-hand-6?page=${page}`);

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

export const getSortedDiscountedServers = (page, sort) =>
  request.get(`${baseUrl}/promotii/servere?sort=${sort}&page=${page}`);

export const getDiscountedWorkstations = (page) =>
  request.get(`${baseUrl}/promotii/workstation?page=${page}`);

export const getSortedDiscountedWorkstations = (page, sort) =>
  request.get(`${baseUrl}/promotii/workstation?sort=${sort}&page=${page}`);

export const getDiscountedComputers = (page) =>
  request.get(`${baseUrl}/promotii/calculatoare?page=${page}`);

export const getSortedDiscountedComputers = (page, sort) =>
  request.get(`${baseUrl}/promotii/calculatoare?sort=${sort}&page=${page}`);

export const getDiscountedLaptops = (page) =>
  request.get(`${baseUrl}/promotii/laptop?page=${page}`);

export const getSortedDiscountedLaptops = (page, sort) =>
  request.get(`${baseUrl}/promotii/laptop?sort=${sort}&page=${page}`);

export const getDiscountedMonitors = (page) =>
  request.get(`${baseUrl}/promotii/monitoare?page=${page}`);

export const getSortedDiscountedMonitors = (page, sort) =>
  request.get(`${baseUrl}/promotii/monitoare?sort=${sort}&page=${page}`);

export const getDiscountedComponents = (page) =>
  request.get(`${baseUrl}/promotii/componente?page=${page}`);

export const getSortedDiscountedComponents = (page, sort) =>
  request.get(`${baseUrl}/promotii/componente?sort=${sort}&page=${page}`);

export const getDiscountedPrinters = (page) =>
  request.get(`${baseUrl}/promotii/imprimante?page=${page}`);

export const getSortedDiscountedPrinters = (page, sort) =>
  request.get(`${baseUrl}/promotii/imprimante?sort=${sort}&page=${page}`);

export const getDiscountedPOS = (page) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?page=${page}`);

export const getSortedDiscountedPOS = (page, sort) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?sort=${sort}&page=${page}`);

export const getDiscountedUPS = (page) =>
  request.get(`${baseUrl}/promotii/ups?page=${page}`);

export const getSortedDiscountedUPS = (page, sort) =>
  request.get(`${baseUrl}/promotii/ups?sort=${sort}&page=${page}`);

export const getDiscountedAccessories = (page) =>
  request.get(`${baseUrl}/promotii/accesorii?page=${page}`);

export const getSortedDiscountedAccessories = (page, sort) =>
  request.get(`${baseUrl}/promotii/accesorii?sort=${sort}&page=${page}`);
