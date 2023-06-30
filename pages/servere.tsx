import { useState, useEffect , useMemo} from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { serverBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import Footer from "../components/global/Footer";
import { usePapaParse } from "react-papaparse";

const Laptopuri = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/servere");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/servere");
  const [totalPages, setTotalPages] = useState(1);
  const [processor, setProcessor] = useState("");
  const [clicked, setClicked] = useState<boolean>(false);
  const [frequency, setFrequency] = useState('');
  const [procFrequencies, setProcFrequencies] = useState([]);

  let pageSize = 64;
  const getTotalPages = Math.ceil(laptopsData.length / pageSize);
  const totalCount = laptopsData.length;

  useEffect(() => {
    if (filteredData.length > 0) {
      let getPages = Math.ceil(filteredData.length / pageSize);
      setTotalPages(getPages);
    } else {
      setTotalPages(getTotalPages);
    }
  }, [getTotalPages, filteredData.length, pageSize]);

  useEffect(() => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_servere",{
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(9).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(9).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(9).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getTypes(9).then((r) => {
      setCategories(r);
    });
    sortingService.getProccessorsFrequency(9).then((resp) => setProcFrequencies(resp))
  }, []);

  const onReset = () => {
    setClicked(true);
    setMultupleSelected(false);
    setBaseLink(`/servere`);
    router.push(`/servere`);
  }

  useEffect(() => {
    if (clicked) {
      setShow(false)
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_servere", {
      skipEmptyLines: true,
      complete: (results) => {
        setFilteredData(results.data.slice(1));
        setShow(true)
      },
    }
  );
  sortingService.getBrands(9).then((result) => {
    setBrands(result);
  });
  sortingService.getProcessors(9).then((res) => {
    setProcessors(res);
  });
  sortingService.getHighestPrice(9).then((response) => {
    setHighestPrice(response[1]);
  });
  sortingService.getTypes(9).then((r) => {
    setCategories(r);
  });

    }
  }, [clicked, readRemoteFile])

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  useEffect(() => {
    router.push(selectedSort);
    const sort = selectedSort.split("sort=")[1];

    if (filteredData.length > 0) {
      if (sort === "views") {
        filteredData = [...filteredData].sort((a, b) => (a[3] > b[3] ? 1 : -1));
        setFilteredData(filteredData);
      } else if (sort === "deals") {
        filteredData = [...filteredData].sort((a, b) => b[16] - a[16]);
        setFilteredData(filteredData);
      } else if (sort === "price") {
        filteredData = [...filteredData].sort((a, b) => a[17] - b[17]);
        setFilteredData(filteredData);
      } else if (sort === "-price") {
        filteredData = [...filteredData].sort((a, b) => b[17] - a[17]);
        setFilteredData(filteredData);
      }
    } else {
      if (sort === "views") {
        laptopsData = [...laptopsData].sort((a, b) => (a[3] > b[3] ? 1 : -1));
        setLaptopsData(laptopsData);
      } else if (sort === "deals") {
        laptopsData = [...laptopsData].sort((a, b) => b[16] - a[16]);
        setLaptopsData(laptopsData);
      } else if (sort === "price") {
        laptopsData = [...laptopsData].sort((a, b) => a[17] - b[17]);
        setLaptopsData(laptopsData);
      } else if (sort === "-price") {
        laptopsData = [...laptopsData].sort((a, b) => b[17] - a[17]);
        setLaptopsData(laptopsData);
      }
    }
  }, [selectedSort]);

  const onRangeSelect = (range) => {
    setPriceRange(range);
  };

  useEffect(() => {
    if (priceRange != "" && category != "" && brand != "" && processor != "" && frequency != '') {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (
      priceRange != "" &&
      (category != "" || brand != "" || processor != "" || frequency != '')
    ) {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "") {
      setShow(false);
      let arr = laptopsData.filter((r) => r[17] <= Number(priceRange));
      setLaptopsData(arr);
      setShow(true);
    }
  }, [priceRange, brand, category, processor, frequency]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (processor != "" &&  brand != "" && frequency != '' && !router.asPath.includes("category") ) {
      setBaseLink(`/servere?brand=${brand}&procesor=${processor}&frecventa=${frequency}&category=${cat}` );
      router.push( `/servere?brand=${brand}&procesor=${processor}&frecventa=${frequency}&category=${cat}` );
    } else if (frequency != "" &&  brand != "" && !router.asPath.includes("category") ) {
      setBaseLink( `/servere?brand=${brand}&frecventa=${frequency}&category=${cat}`  );
      router.push( `/servere?brand=${brand}&frecventa=${frequency}&category=${cat}`  );
    } else if (processor != "" &&  frequency != "" && !router.asPath.includes("category") ) {
      setBaseLink( `/servere?frecventa=${frequency}&procesor=${processor}&category=${cat}`  );
      router.push( `/servere?frecventa=${frequency}&procesor=${processor}&category=${cat}`  );
    } else if (processor != "" &&  brand != "" && !router.asPath.includes("category") ) {
      setBaseLink( `/servere?brand=${brand}&procesor=${processor}&category=${cat}`  );
      router.push( `/servere?brand=${brand}&procesor=${processor}&category=${cat}`  );
    } else if ( processor != "" && !router.asPath.includes("category") ) {
      setBaseLink( `/servere?procesor=${processor}&category=${cat}` );
      router.push( `/servere?procesor=${processor}&category=${cat}` );
    } else if ( brand != "" && !router.asPath.includes("category") ) {
      setBaseLink( `/servere?brand=${brand}&category=${cat}`  );
      router.push( `/servere?brand=${brand}category=${cat}`);
    } else if ( frequency != "" && !router.asPath.includes("category") ) {
      setBaseLink( `/servere?frecventa=${frequency}&category=${cat}`  );
      router.push( `/servere?frecventa=${frequency}&category=${cat}`);
    }  else if (router.asPath.includes("category")) {
      setBaseLink(`/servere?category=${cat}`);
      router.push(`/servere?category=${cat}`);
    } else {
      setBaseLink(`/servere?category=${cat}`);
      router.push(`/servere?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (  processor != "" && frequency != '' && category != "" && !router.asPath.includes("brand")  ) {
      setBaseLink(  `/servere?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`  );
      router.push(  `/servere?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`  );
    } else if (  frequency != '' && category != "" && !router.asPath.includes("brand")  ) {
      setBaseLink(  `/servere?category=${category}&frecventa=${frequency}&brand=${br}`  );
      router.push(  `/servere?category=${category}&frecventa=${frequency}&brand=${br}`  );
    } else if (  processor != "" && frequency != '' && !router.asPath.includes("brand")  ) {
      setBaseLink(  `/servere?procesor=${processor}&frecventa=${frequency}&brand=${br}`  );
      router.push(  `/servere?procesor=${processor}&frecventa=${frequency}&brand=${br}`  );
    } else if (  processor != ""  && category != "" && !router.asPath.includes("brand")  ) {
      setBaseLink(  `/servere?category=${category}&procesor=${processor}&brand=${br}`  );
      router.push(  `/servere?category=${category}&procesor=${processor}&brand=${br}`  );
    } else if (  processor != "" && !router.asPath.includes("brand") ) {
      setBaseLink(  `/servere?procesor=${processor}&brand=${br}`  );
      router.push( `/servere?procesor=${processor}&brand=${br}`  );
    } else if (  category != "" && !router.asPath.includes("brand") ) {
      setBaseLink( `/servere?category=${category}&brand=${br}` );
      router.push(  `/servere?category=${category}&brand=${br}`  );
    } else if (  frequency != "" && !router.asPath.includes("brand") ) {
      setBaseLink( `/servere?frecventa=${frequency}&brand=${br}` );
      router.push(  `/servere?frecventa=${frequency}&brand=${br}`  );
    } else if (router.asPath.includes("brand")) {
      setBaseLink(`/servere?brand=${br}`);
      router.push(`/servere?brand=${br}`);
    } else {
      setBaseLink(`/servere?brand=${br}`);
      router.push(`/servere?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  const onProcessorSelect = (processor) => {
    setCurrentPage(1);
    if ( brand != "" && category != ""  && frequency != '' && !router.asPath.includes("procesor")  ) {
      setBaseLink( `/servere?category=${category}&brand=${brand}&frecventa=${frequency}&procesor=${processor}` );
      router.push(  `/servere?category=${category}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`  );
    } else if ( category != ""  && frequency != '' && !router.asPath.includes("procesor")  ) {
      setBaseLink( `/servere?category=${category}&frecventa=${frequency}&procesor=${processor}` );
      router.push(  `/servere?category=${category}&frecventa=${frequency}&procesor=${processor}`  );
    } else if ( brand != "" && frequency != '' && !router.asPath.includes("procesor")  ) {
      setBaseLink( `/servere?brand=${brand}&frecventa=${frequency}&procesor=${processor}` );
      router.push(  `/servere?brand=${brand}&frecventa=${frequency}&procesor=${processor}`  );
    } else if ( brand != "" && category != "" && !router.asPath.includes("procesor")  ) {
      setBaseLink( `/servere?category=${category}&brand=${brand}&procesor=${processor}` );
      router.push(  `/servere?category=${category}&brand=${brand}&procesor=${processor}`  );
    } else if ( brand != "" && !router.asPath.includes("procesor") ) {
      setBaseLink( `/servere?brand=${brand}&procesor=${processor}`  );
      router.push( `/servere?brand=${brand}&procesor=${processor}` );
    } else if ( category != "" && !router.asPath.includes("procesor") ) {
      setBaseLink( `/servere?category=${category}&procesor=${processor}` );
      router.push( `/servere?category=${category}&procesor=${processor}`  );
    } else if ( frequency != "" && !router.asPath.includes("procesor") ) {
      setBaseLink( `/servere?frecventa=${frequency}&procesor=${processor}` );
      router.push( `/servere?frecventa=${frequency}&procesor=${processor}`  );
    } else if (router.asPath.includes("procesor")) {
      setBaseLink(`/servere?procesor=${processor}`);
      router.push(`/servere?procesor=${processor}`);
    } else {
      setBaseLink(`/servere?procesor=${processor}`);
      router.push(`/servere?procesor=${processor}`);
    }
    setMultupleSelected(true);
    setProcessor(processor);
  };

  const onFreqSelect = (frequency) => {
    setCurrentPage(1);
    if ( brand != "" && category != ""  && processor != '' && !router.asPath.includes("frecventa")  ) {
      setBaseLink( `/servere?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}` );
      router.push(  `/servere?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}`  );
    } else if ( category != ""  && processor != '' && !router.asPath.includes("frecventa")  ) {
      setBaseLink( `/servere?category=${category}&procesor=${processor}&frecventa=${frequency}` );
      router.push(  `/servere?category=${category}&procesor=${processor}&frecventa=${frequency}`  );
    } else if ( brand != ""  && processor != '' && !router.asPath.includes("frecventa")  ) {
      setBaseLink( `/servere?brand=${brand}&procesor=${processor}&frecventa=${frequency}` );
      router.push(  `/servere?brand=${brand}&procesor=${processor}&frecventa=${frequency}`  );
    } else if ( brand != "" && category != ""  && !router.asPath.includes("frecventa")  ) {
      setBaseLink( `/servere?category=${category}&brand=${brand}&frecventa=${frequency}` );
      router.push(  `/servere?category=${category}&brand=${brand}&frecventa=${frequency}`  );
    } else if ( brand != "" && !router.asPath.includes("frecventa") ) {
      setBaseLink( `/servere?brand=${brand}&frecventa=${frequency}`  );
      router.push( `/servere?brand=${brand}&frecventa=${frequency}` );
    } else if ( category != "" && !router.asPath.includes("frecventa") ) {
      setBaseLink( `/servere?category=${category}&frecventa=${frequency}` );
      router.push( `/servere?category=${category}&frecventa=${frequency}`  );
    } else if ( processor != "" && !router.asPath.includes("frecventa") ) {
      setBaseLink( `/servere?procesor=${processor}&frecventa=${frequency}` );
      router.push( `/servere?procesor=${processor}&frecventa=${frequency}`  );
    } else if (router.asPath.includes("frecventa")) {
      setBaseLink(`/servere?frecventa=${frequency}`);
      router.push(`/servere?frecventa=${frequency}`);
    } else {
      setBaseLink(`/servere?frecventa=${frequency}`);
      router.push(`/servere?frecventa=${frequency}`);
    }
    setMultupleSelected(true);
    setFrequency(frequency)
  };

  let matchBrand = brands.find((x) => x.slug == brand);
  let matchProc = processors.find((x) => x.slug == processor);
  let matchFreq = procFrequencies.find((x) => x.slug == frequency);

  useEffect(() => {
    if (category != "" && brand != "" && processor != '' && frequency) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[30] == matchFreq.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(10, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[30] == matchFreq.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(11, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            
            
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[30] == matchFreq.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(56, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
  
            
      }
    } else if (brand != "" && processor != '' && frequency) {
        let arr = laptopsData
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[30] == matchFreq.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(9, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getTypesByProcessorAndBrandFreq(9, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
              setBrands(result);
            });
    } else if (category != "" && processor != '' && frequency) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[30] == matchFreq.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(10, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByProcessorFreq(10, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setBrands(result);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[30] == matchFreq.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(11, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getBrandsByProcessorFreq(11, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
              setBrands(result);
            });
            
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[30] == matchFreq.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(56, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getBrandsByProcessorFreq(56, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
              setBrands(result);
            });
            
      }
    } else if (category != "" && brand != "" && frequency) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30] == matchFreq.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(10, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(10, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          })
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30] == matchFreq.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandFreq(11, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getProcessorsByBrandFreq(11, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            })
            
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30] == matchFreq.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandFreq(56, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
  
            sortingService.getProcessorsByBrandFreq(56, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            })
      }
    } else if (category != "" && brand != "" && processor != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessor(10, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcessor(10, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(11, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getFreqByBrandAndProcessor(11, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
            
            
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(56, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getFreqByBrandAndProcessor(56, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
  
            
      }
    } else if (category != "" && brand != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(10, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(10, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });    
          sortingService.getFreqByBrand(10, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))    
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(11, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(11, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrand(11, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))    
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(56, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(56, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrand(56, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))    
      }
    } else if (category != "" && processor != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(10, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(10, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(10, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[28].toLowerCase() ==  processor.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(11, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(11, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(11, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[28].toLowerCase() ==  processor.split('-').join(' '));
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(56, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(56, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(56, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
      }
    } else if (brand != '' && processor != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrand(9, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessor(9, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByBrandAndProcessor(9, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[30] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandFreq(9, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandFreq(9, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandFreq(9, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setProcessors(result);
        });
    } else if (category != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[30] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(10, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(10, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(10, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[30] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(11, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(11, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(11, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")
        .filter((r) => r[30] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(56, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(56, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(56, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != "" && frequency != '') {
      let arr = laptopsData.filter(
        (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[30] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorFreq(9, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorFreq(9,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorFreq(9,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
    } else if (brand != "") {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(9, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(9, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrand(9, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getFreqByBrand(9, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "") {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished");
        setFilteredData(arr);
        sortingService.getBrands(10).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(10).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(10).then((r) => setProcessors(r))
        sortingService.getFreqs(10).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand");
        setFilteredData(arr);
        sortingService.getBrands(11).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(11).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(11).then((r) => setProcessors(r))
        sortingService.getFreqs(11).then((r) => setProcFrequencies(r))

      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi");
        setFilteredData(arr);
        sortingService.getBrands(56).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(56).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(56).then((r) => setProcessors(r))
        sortingService.getFreqs(56).then((r) => setProcFrequencies(r))
      }
    } else if (processor != "") {
      let arr = laptopsData.filter(
        (r) => r[28].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByProcessor(9, `${matchProc.slug}-${matchProc.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessor(9,`${matchProc.slug}-${matchProc.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessor(9,`${matchProc.slug}-${matchProc.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByProc(9,`${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
    } else if (frequency != "") {
      let arr = laptopsData.filter((r) => r[30] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByFreq(9, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByFreq(9, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByFreq (9, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByFreq(9,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } 
  }, [brand, category, processor, frequency]);

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    siblingCount: 1,
  });

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let data = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    if (filteredData.length > 0) {
      return filteredData.slice(firstPageIndex, lastPageIndex);
    } else if (laptopsData.length > 0) {
      return laptopsData.slice(firstPageIndex, lastPageIndex);
    }
    
  }, [currentPage, laptopsData, pageSize, filteredData]);


  return (
    <>
      <Navbar />
      {loading ? (
        <MainSkeleton />
      ) : (
        <>
          <LaptopsPage
            title="Servere"
            laptopsData={data}
            categories={categories}
            breadcrumbs={serverBrcrmbs}
            brands={brands}
            processors={processors}
            sortCriteria={onSort}
            baseLink={baseLink}
            highEnd={highestPrice}
            priceRange={onRangeSelect}
            className={show ? "" : "opacity-50"}
            catSelect={onCatSelect}
            brandSelect={onBrandSelect}
            filteredData={data}
            multipleQueries={multipleSelected}
            countShow
            totalCount={totalCount}
            procSelect={onProcessorSelect}
            processorsFrequency={procFrequencies}
            selectFrequency={onFreqSelect}
            reset={onReset}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav id="pagination-container">
              <ul className="pagination justify-content-center flex-wrap">
                <>
                  <li className="page-item" style={{ cursor: "pointer" }}>
                    <a className="page-link" onClick={prevPage}>
                      <i
                        id="arrow"
                        className="fas fa-arrow-left text-primary mr-1"
                      ></i>
                    </a>
                  </li>
                  {paginationRange &&
                    paginationRange.map((page) => (
                      <li
                        className={`page-item ${
                          currentPage == page ? "active" : ""
                        } ${page == DOTS ? "dots" : ""}`}
                        key={page}
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  <li
                    className={`page-item ${
                      currentPage == totalPages ? "user-select-none" : ""
                    } `}
                    style={{ cursor: "pointer" }}
                  >
                    <a className="page-link" onClick={nextPage}>
                      <i
                        id="arrow"
                        className="fas fa-arrow-right text-primary mr-1"
                      ></i>
                    </a>
                  </li>
                </>
              </ul>
            </nav>
          )}
        </>
      )}
      <Footer />
    </>
  );
};

export default Laptopuri;
