import { useState, useEffect, useMemo} from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { workstationBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import Footer from "../components/global/Footer";
import { usePapaParse } from "react-papaparse";

const Workstations = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/workstation");
  const router = useRouter();
  const [highestPrice, setHighestPrice] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [categories, setCategories] = useState([]);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/workstation");
  const [totalPages, setTotalPages] = useState(1);
  const [processor, setProcessor] = useState("");
  const [generation, setGeneration] = useState("");
  const [videoCard, setVideoCard] = useState("");
  const [videoCards, setVideoCards] = useState([]);
  const [procFrequencies, setProcFrequencies] = useState([]);
  const [frequency, setFrequency] = useState('');
  const [clicked, setClicked] = useState<boolean>(false);

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
  }, [getTotalPages, filteredData.length, pageSize])

  useEffect(() => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_workstation", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(15).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(15).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(15).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getTypes(15).then((r) => {
      setCategories(r);
    });
    sortingService.getProcessorGeneration(15).then((r) => {
      setProcessorsGeneration(r);
    });
    sortingService.getVideoCards(15).then((resp) => setVideoCards(resp))
    sortingService.getProccessorsFrequency(15).then((resp) => setProcFrequencies(resp))
  }, []);

  const onReset = () => {
    setClicked(true);
    setMultupleSelected(false);
    setBaseLink(`/workstation`);
    router.push(`/workstation`);
  }

  useEffect(() => {
    if (clicked) {
      setShow(false)
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_workstation", {
      skipEmptyLines: true,
      complete: (results) => {
        setFilteredData(results.data.slice(1));
        setShow(true)
      },
    }
  );
  sortingService.getBrands(15).then((result) => {
    setBrands(result);
  });
  sortingService.getProcessors(15).then((res) => {
    setProcessors(res);
  });
  sortingService.getHighestPrice(15).then((response) => {
    setHighestPrice(response[1]);
  });
  sortingService.getTypes(15).then((r) => {
    setCategories(r);
  });
  sortingService.getProcessorGeneration(15).then((r) => {
    setProcessorsGeneration(r);
  });
  sortingService.getVideoCards(15).then((resp) => setVideoCards(resp))
  sortingService.getProccessorsFrequency(15).then((resp) => setProcFrequencies(resp))

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
    if (priceRange != "" && category != "" && brand != "" && processor != '' && generation != '' && videoCard != '' && frequency != '') {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "" && (category != "" || brand != "" || processor != '' || generation != '' || videoCard != '' || frequency != '')) {
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
  }, [priceRange, brand, category, processor, generation, videoCard, frequency]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != ""  && videoCard && !(router.asPath.includes('category')))  {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && frequency != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != ""  && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (videoCard != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&procesor=${processor}&generatie=${generation}`);
      router.push(`/workstation?category=${cat}&procesor=${processor}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('category')))  {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&generatie=${generation}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && !(router.asPath.includes('category')))  {
      setBaseLink(`/workstation?category=${cat}&brand=${brand}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${cat}&brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?category=${cat}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (videoCard != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?category=${cat}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/workstation?category=${cat}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != ""  && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?procesor=${processor}&category=${cat}`);
      router.push(`/workstation?procesor=${processor}&category=${cat}`);
    } else if (brand != ""  && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${cat}`);
      router.push(`/workstation?brand=${brand}&category=${cat}`);
    } else if (generation != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?generatie=${generation}&category=${cat}`);
      router.push(`/workstation?generatie=${generation}&category=${cat}`);
    } else if (videoCard != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&category=${cat}`);
      router.push(`/workstation?placa-video=${videoCard}&category=${cat}`);
    } else if (frequency != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/workstation?frecventa=${frequency}&category=${cat}`);
      router.push(`/workstation?frecventa=${frequency}&category=${cat}`);
    } else if (router.asPath.includes('category')){
      setBaseLink(`/workstation?category=${cat}`);
      router.push(`/workstation?category=${cat}`);
    } else {
      setBaseLink(`/workstation?category=${cat}`);
      router.push(`/workstation?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (processor != "" && generation != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
    } else if (processor != "" && generation != "" && category != '' && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
    } else if (processor != "" && generation != ""  && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&brand=${br}}&placa-video=${videoCard}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&brand=${br}}&placa-video=${videoCard}`);
    } else if (processor != "" && category != ''  && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (generation != "" && category != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && videoCard != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&brand=${br}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&brand=${br}`);
    } else if (processor != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&brand=${br}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&brand=${br}`);
    } else if (generation != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&brand=${br}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&generatie=${generation}&brand=${br}`);
      router.push(`/workstation?placa-video=${videoCard}&generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&placa-video=${videoCard}&brand=${br}`);
      router.push(`/workstation?category=${category}&placa-video=${videoCard}&brand=${br}`);
    } else if (processor != "" && videoCard != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&procesor=${processor}&brand=${br}`);
      router.push(`/workstation?placa-video=${videoCard}&procesor=${processor}&brand=${br}`);
    } else if (category != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?category=${category}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != ""  && frequency != ''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (generation != "" && frequency != ''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != ""  && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
    } else if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?category=${category}&brand=${br}`);
      router.push(`/workstation?category=${category}&brand=${br}`);
    } else if (processor != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?procesor=${processor}&brand=${br}`);
      router.push(`/workstation?procesor=${processor}&brand=${br}`);
    } else if (generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?generatie=${generation}&brand=${br}`);
      router.push(`/workstation?generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&brand=${br}`);
      router.push(`/workstation?placa-video=${videoCard}&brand=${br}`);
    } else if (frequency!= "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/workstation?frecventa=${frequency}&brand=${br}`);
      router.push(`/workstation?frecventa=${frequency}&brand=${br}`);
    } else if (router.asPath.includes('brand')) {
      setBaseLink(`/workstation?brand=${br}`);
      router.push(`/workstation?brand=${br}`);
    } else {
      setBaseLink(`/workstation?brand=${br}`);
      router.push(`/workstation?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  const onProcessorSelect = (processor) => {
    setCurrentPage(1);
    if (generation != "" && brand != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (generation != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&category=${category}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && videoCard != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (generation != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && category != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&category=${category}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ""  && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != "" && videoCard  && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != ""&& frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&frecventa=${frequency}&procesor=${processor}`);
    } else if (videoCard != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}`);
    } else if (generation != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?generatie=${generation}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&procesor=${processor}`);
    } else if (category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&procesor=${processor}`);
    } else if (videoCard != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?placa-video=${videoCard}&procesor=${processor}`);
    } else if (frequency != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/workstation?frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?frecventa=${frequency}&procesor=${processor}`);
    } else if (router.asPath.includes('procesor')) {
      setBaseLink(`/workstation?procesor=${processor}`);
      router.push(`/workstation?procesor=${processor}`);
    } else {
      setBaseLink(`/workstation?procesor=${processor}`);
      router.push(`/workstation?procesor=${processor}`);
    }
    setMultupleSelected(true);
    setProcessor(processor)
  };

  const onGenerationSelect = (generation) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&category=${category}&generatie=${generation}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && brand != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && videoCard  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard  && frequency != ''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&frecventa=${frequency}&generatie=${generation}`);
    } else if (videoCard != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}`);
    } else if (processor != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?generatie=${generation}&procesor=${processor}`);
      router.push(`/workstation?generatie=${generation}&procesor=${processor}`);
    } else if (category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}`);
      router.push(`/workstation?category=${category}&generatie=${generation}`);
    } else if (videoCard != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/workstation?placa-video=${videoCard}&generatie=${generation}`);
    } else if (frequency != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/workstation?frecventa=${frequency}&generatie=${generation}`);
      router.push(`/workstation?frecventa=${frequency}&generatie=${generation}`);
    } else if (router.asPath.includes('generatie')) {
      setBaseLink(`/workstation?generatie=${generation}`);
      router.push(`/workstation?generatie=${generation}`);
    } else {
      setBaseLink(`/workstation?generatie=${generation}`);
      router.push(`/workstation?generatie=${generation}`);
    }

    setMultupleSelected(true);
    setGeneration(generation)
  };

  const onVideoSelect = (videoCard) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" &&  category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    }  else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?procesor=${processor}&brand=${brand}&placa-video=${videoCard}`);
      router.push(`/workstation?procesor=${processor}&brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?brand=${brand}&placa-video=${videoCard}`);
      router.push(`/workstation?brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/workstation?procesor=${processor}&placa-video=${videoCard}`);
    } else if (category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?category=${category}&placa-video=${videoCard}`);
      router.push(`/workstation?category=${category}&placa-video=${videoCard}`);
    } else if (generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/workstation?generatie=${generation}&placa-video=${videoCard}`);
    } else if (frequency != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/workstation?frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/workstation?frecventa=${frequency}&placa-video=${videoCard}`);
    }  else if (router.asPath.includes('placa-video')) {
      setBaseLink(`/workstation?placa-video=${videoCard}`);
      router.push(`/workstation?placa-video=${videoCard}`);
    } else {
      setBaseLink(`/workstation?placa-video=${videoCard}`);
      router.push(`/workstation?placa-video=${videoCard}`);
    }
    setMultupleSelected(true);
    setVideoCard(videoCard)
  };

  const onFrecSelect = (fr) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && generation != ''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&category=${category}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&procesor=${processor}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&category=${category}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&category=${category}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&procesor=${processor}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&generatie=${generation}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?procesor=${processor}&brand=${brand}&frecventa=${fr}`);
      router.push(`/workstation?procesor=${processor}&brand=${brand}&frecventa=${fr}`);
    } else if (brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?brand=${brand}&frecventa=${fr}`);
      router.push(`/workstation?brand=${brand}&frecventa=${fr}`);
    } else if (processor != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?procesor=${processor}&frecventa=${fr}`);
      router.push(`/workstation?procesor=${processor}&frecventa=${fr}`);
    } else if (category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?category=${category}&frecventa=${fr}`);
      router.push(`/workstation?category=${category}&frecventa=${fr}`);
    } else if (generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?generatie=${generation}&frecventa=${fr}`);
      router.push(`/workstation?generatie=${generation}&frecventa=${fr}`);
    } else if (videoCard != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/workstation?placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/workstation?placa-video=${videoCard}&frecventa=${fr}`);
    }  else if (router.asPath.includes('frecventa')) {
      setBaseLink(`/workstation?frecventa=${fr}`);
      router.push(`/workstation?frecventa=${fr}`);
    } else {
      setBaseLink(`/workstation?frecventa=${fr}`);
      router.push(`/workstation?frecventa=${fr}`);
    }
    setMultupleSelected(true);
    setFrequency(fr)
  }

  let matchBrand = brands.find((x) => x.slug == brand);
  let matchProc = processors.find((x) => x.slug == processor);
  let matchGeneration = processorsGeneration.find((x) => x.slug == generation);
  let matchVideo = videoCards.find((x) => x.slug == videoCard);
  let matchFreq = procFrequencies.find((x) => x.slug == frequency);

  useEffect(() => {
    if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(16, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
        let arr = laptopsData
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
          sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getTypesByProcessorBrandGenerationNVideoFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setCategories(result);
          });
        setFilteredData(arr);
    } else if (category != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationFreqAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationFreqAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationFreqAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqProcessorAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandFreqProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandFreqProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndFreq(16, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(16, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByGenerationBrandAndProc(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
        sortingService.getGenerationsByProcessorAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
        sortingService.getGenerationsByProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
        sortingService.getGenerationsByProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && videoCard !='') {
      let arr = laptopsData
        .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandGenerationNVideo(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorNVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
    
    } else if (category != "" && processor != "" && generation != '' && videoCard !='') {
    if (category == "refurbished") {
      let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(16,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByGenerationAndProcVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
        sortingService.getBrandsByGenerationAndProcessorAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category == "second-hand") {
      let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByGenerationAndProcVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
        sortingService.getBrandsByGenerationAndProcessorAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category == "nou") {
      let arr = laptopsData
        .filter((r) => r[2] == "Noi")
        .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByGenerationAndProcVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
        sortingService.getBrandsByGenerationAndProcessorAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    }
    }  else if (category != "" && brand != "" && processor != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessor(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[27] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[27] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGenerationFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGenerationFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' ) {
      let arr = laptopsData
        .filter((r) => r[25] == matchProc.name)
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandAndGeneration(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcessorBrandAndGeneration(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
            setVideoCards(result);
          });
          sortingService.getFreqByProcessorBrandAndGeneration(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r))
    
    } else if (category != "" && processor != "" && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreq(16,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && videoCard !='' && frequency != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='' && frequency != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreq(16, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreq(16, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreq(16, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreq(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreq(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreq(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreq(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[27] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideoFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getGenerationsByProcessorAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[27] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationVideoFreq(15,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[27] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideoFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideoFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
    } else if (category != "" && processor != "" && generation != '' && videoCard !='') {
  if (category == "refurbished") {
    let arr = laptopsData
      .filter((r) => r[2] == "Refurbished")
      .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideo(16,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
  } else if (category == "second-hand") {
    let arr = laptopsData
      .filter((r) => r[2] == "Second Hand")
      .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
  } else if (category == "nou") {
    let arr = laptopsData
      .filter((r) => r[2] == "Noi")
      .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
  }
    } else if (category != "" && brand != "" && processor != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessor(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcessor(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByProcessor(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrandAndProcessor(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getFreqByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
            sortingService.getGenerationsByProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r));
            sortingService.getVideosByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r));
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getFreqByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
            sortingService.getGenerationsByProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r));
            sortingService.getVideosByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      }
    } else if (category != "" && brand != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGeneration(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrand(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGeneration(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
          sortingService.getVideosByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGeneration(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '') {
        let arr = laptopsData
          .filter((r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService.getTypesByProcessorBrandAndGeneration(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
            setCategories(result);
          });
          sortingService
            .getHighestPriceByBrandGenerationAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByProcessorBrandAndGeneration(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setVideoCards(result);
            });
            sortingService.getFreqByProcessorBrandAndGeneration(15,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setProcFrequencies(result);
            });
      
    } else if (category != "" && processor != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(16,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessor(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessor(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getProcessorsByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(16, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getFreqByProcessorNVideo(16, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService
          .getHighestPriceByProcessorAndVideo(16, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideo(16, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideo(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideo(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(15, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideo(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideo(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideo(15, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProcessorAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationAndVideo(15,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqsByGenerationAndBrandAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndBrandAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideo(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getFreqsByGenerationAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService
          .getHighestPriceByGenAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter(
        (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideo(15,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideo(15, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByGenerationAndProcessorAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getBrandsByGenerationAndProcessorAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category != "" && brand != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(16, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(16, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(16, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(16, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(16, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25].toLowerCase() ==  processor.split('-').join(' ')
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[25].toLowerCase() ==  processor.split('-').join(' '))
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != ""  && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[27] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessorAndFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByProcAndBrandFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessorFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != ""  && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[27] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationFreq(15,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndBrandFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrandFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(16, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[27] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && frequency != '' ) {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[27] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndProcessorFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessorFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[27] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideoFreq (15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideoFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !=''  && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[27] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(16, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(16, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(16, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(16, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[27] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
            .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[27] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[27] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideoFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideoFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideoFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideoFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[27] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideoFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideoFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideoFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideoFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (category != "" && brand != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(16, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(16, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrand(16, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrand(16, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrand(16, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(15, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(15, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      }
    } else if (category != "" && processor != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(16, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(16, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(16, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProc(16, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getVideosByProc(16, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == processor.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(15, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(15, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(15, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
          sortingService.getGenerationsByProc(15, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res));
          sortingService.getVideosByProc(15, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[25] == processor.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(15, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(15, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(15, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
          sortingService.getGenerationsByProc(15, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res))
          sortingService.getVideosByProc(15, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
      }
    } else if (brand != '' && processor != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrand(15, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByBrandAndProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProcessor(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getVideosByProcAndBrand(15, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
    } else if (brand != '' && generation != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGeneration(15,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGeneration(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByGenerationAndBrand(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
    } else if (category != "" && generation != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(16, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(16, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGeneration(16, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
        sortingService.getProcessorsByGeneration(16, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r));
        sortingService.getVideosByGeneration(16, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(15, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(15, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "") {
      let arr = laptopsData
      .filter(
        (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGen(15,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessor(15, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      sortingService.getBrandsByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      sortingService.getVideosByGenerationAndProcessor(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
    } else if (brand != "" && videoCard !='' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getFreqByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByBrandAndVideo(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByVideo(16, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(16, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideo(16, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideo(16, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(16, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi")    
            .filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(15, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideo(15, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideo(15,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideo(15,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByProcessorNVideo(15,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProcessorNVideo(15,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideo(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByGenerationAndVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndVideo(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
    } else if (brand != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[27] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getVideosByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByBrandFreq(15, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[27] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(16, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(16, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(16, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(16, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(16, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[27] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")
        .filter((r) => r[27] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(15, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      }
    } else if (processor != "" && frequency != '') {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[27] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorFreq(15, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByProcFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcFreq(15,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ) .filter((r) => r[27] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationFreq(15, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByGenerationFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationFreq(15,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (videoCard != "" && frequency != '' ) {
      let arr = laptopsData.filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[27] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByVideoFreq(15, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideoFreq(15,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideoFreq(15,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByVideoFreq(15,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByVideoFreq(15,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (brand != "") {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(15, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(15, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getFreqByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrand(15, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
    } else if (category != "") {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished");
        setFilteredData(arr);
        sortingService.getBrands(16).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(16).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(16).then((r) => setProcessors(r))
        sortingService.getGenerationsByType(16).then((r) => setProcessorsGeneration(r))
        sortingService.getVideos(16).then((r) => setVideoCards(r))
        sortingService.getFreqs(16).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand");
        setFilteredData(arr);
        sortingService.getBrands(15).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(15).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(15).then((r) => setProcessors(r))
        sortingService.getVideos(15).then((r) => setVideoCards(r))
        sortingService.getGenerationsByType(15).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqs(15).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi");
        setFilteredData(arr);
        sortingService.getBrands(15).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(15).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqs(15).then((r) => setProcFrequencies(r))
        sortingService.getProcessors(15).then((r) => setProcessors(r))
        sortingService.getGenerationsByType(15).then((r) => setProcessorsGeneration(r))
        sortingService.getVideos(15).then((r) => setVideoCards(r))
      }
    } else if (processor != "") {
      let arr = laptopsData.filter(
        (r) => r[25].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByProcessor(15, `${matchProc.slug}-${matchProc.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessor(15,`${matchProc.slug}-${matchProc.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessor(15,`${matchProc.slug}-${matchProc.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByProc(15,`${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProc(15,`${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getVideosByProc(15,`${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
    } else if (generation != "") {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByGeneration(15, `${matchGeneration.slug}-${matchGeneration.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGen(15,`${matchGeneration.slug}-${matchGeneration.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGeneration(15,`${matchGeneration.slug}-${matchGeneration.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByGeneration(15,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGeneration(15,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByGeneration (15,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
    } else if (videoCard != "") {
      let arr = laptopsData.filter((r) => r[50].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByVideo(15, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideo(15,`${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideo (15,`${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByVideo(15,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByVideo(15,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      sortingService.getGenerationsByVideo(15,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (frequency != "") {
      let arr = laptopsData.filter((r) => r[27] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByFreq(15, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByFreq(15, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByFreq (15, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByFreq(15,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByFreq(15,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByFreq(15,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
    }
  }, [brand, category, processor, generation, videoCard, frequency]);

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
            title="Workstation"
            laptopsData={laptopsData}
            categories={categories}
            breadcrumbs={workstationBrcrmbs}
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
            processorsGeneration={processorsGeneration}
            generationSelect={onGenerationSelect}
            videoCards={videoCards}
            videoSelect={onVideoSelect}
            processorsFrequency={procFrequencies}
            selectFrequency={onFrecSelect}
            reset={onReset}
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav id="pagination-container">
              <ul className="pagination justify-content-center flex-wrap">
                <>
                  <li className="page-item" style={{ cursor: "pointer" }}>
                    <a className="page-link" onClick={prevPage}>
                      <i id='arrow' className="fas fa-arrow-left text-primary mr-1"></i>
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
                      <i id='arrow' className="fas fa-arrow-right text-primary mr-1"></i>
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

export default Workstations;
