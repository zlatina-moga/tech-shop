import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import * as sortingService from "../services/sortingService";
import { usePagination, DOTS } from "../hooks/usePagination";
import { computersBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import { usePapaParse } from "react-papaparse";
import LaptopsPage from "../components/shared/LaptopsPage";

const Calculatoare = () => {
  let [laptopsData, setlaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [selectedSort, setSelectedSort] = useState("/calculatoare");
  const router = useRouter();
  const [priceRange, setPriceRange] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [processorsGeneration, setProcessorsGeneration] = useState([]);
  const [categories, setCategories] = useState([]);
  const { readRemoteFile } = usePapaParse();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [multipleSelected, setMultupleSelected] = useState<boolean>(false);
  const [baseLink, setBaseLink] = useState("/calculatoare");
  const [totalPages, setTotalPages] = useState(1);
  const [processor, setProcessor] = useState("");
  const [generation, setGeneration] = useState("");
  const [videoCard, setVideoCard] = useState("");
  const [videoCards, setVideoCards] = useState([]);
  const [procFrequencies, setProcFrequencies] = useState([]);
  const [frequency, setFrequency] = useState('');

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
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_calculatoare", {
        skipEmptyLines: true,
        complete: (results) => {
          setlaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(1).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(1).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(1).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getProcessorGeneration(1).then((r) => {
      setProcessorsGeneration(r);
    });
    sortingService.getTypes(1).then((r) => {
      setCategories(r);
    });
    sortingService.getVideoCards(1).then((resp) => setVideoCards(resp));
    sortingService.getProccessorsFrequency(1).then((resp) => setProcFrequencies(resp))
  }, []);

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
        setlaptopsData(laptopsData);
      } else if (sort === "deals") {
        laptopsData = [...laptopsData].sort((a, b) => b[16] - a[16]);
        setlaptopsData(laptopsData);
      } else if (sort === "price") {
        laptopsData = [...laptopsData].sort((a, b) => a[17] - b[17]);
        setlaptopsData(laptopsData);
      } else if (sort === "-price") {
        laptopsData = [...laptopsData].sort((a, b) => b[17] - a[17]);
        setlaptopsData(laptopsData);
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
      setlaptopsData(arr);
      setShow(true);
    }
  }, [priceRange, brand, category, processor, generation, videoCard, frequency]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != ""  && videoCard && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && frequency != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != ""  && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (videoCard != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (videoCard != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != ""  && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&category=${cat}`);
      router.push(`/calculatoare?procesor=${processor}&category=${cat}`);
    } else if (brand != ""  && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${cat}`);
      router.push(`/calculatoare?brand=${brand}&category=${cat}`);
    } else if (generation != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&category=${cat}`);
      router.push(`/calculatoare?generatie=${generation}&category=${cat}`);
    } else if (videoCard != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&category=${cat}`);
      router.push(`/calculatoare?placa-video=${videoCard}&category=${cat}`);
    } else if (frequency != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&category=${cat}`);
      router.push(`/calculatoare?frecventa=${frequency}&category=${cat}`);
    } else if (router.asPath.includes('category')){
      setBaseLink(`/calculatoare?category=${cat}`);
      router.push(`/calculatoare?category=${cat}`);
    } else {
      setBaseLink(`/calculatoare?category=${cat}`);
      router.push(`/calculatoare?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (processor != "" && generation != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
    } else if (processor != "" && generation != "" && category != '' && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
    } else if (processor != "" && generation != ""  && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}}&placa-video=${videoCard}`);
    } else if (processor != "" && category != ''  && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (generation != "" && category != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && videoCard != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}`);
    } else if (processor != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}`);
    } else if (generation != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&brand=${br}`);
    } else if (processor != "" && videoCard != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&brand=${br}`);
    } else if (category != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != ""  && frequency != ''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (generation != "" && frequency != ''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != ""  && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
    } else if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&brand=${br}`);
    } else if (processor != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${br}`);
    } else if (generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&brand=${br}`);
      router.push(`/calculatoare?generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&brand=${br}`);
    } else if (frequency!= "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?frecventa=${frequency}&brand=${br}`);
    } else if (router.asPath.includes('brand')) {
      setBaseLink(`/calculatoare?brand=${br}`);
      router.push(`/calculatoare?brand=${br}`);
    } else {
      setBaseLink(`/calculatoare?brand=${br}`);
      router.push(`/calculatoare?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  const onProcessorSelect = (processor) => {
    setCurrentPage(1);
    if (generation != "" && brand != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (generation != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && videoCard != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (generation != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && category != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ""  && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != "" && videoCard  && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != ""&& frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&frecventa=${frequency}&procesor=${processor}`);
    } else if (videoCard != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}`);
    } else if (generation != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&procesor=${processor}`);
    } else if (category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}`);
    } else if (videoCard != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?placa-video=${videoCard}&procesor=${processor}`);
    } else if (frequency != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?frecventa=${frequency}&procesor=${processor}`);
    } else if (router.asPath.includes('procesor')) {
      setBaseLink(`/calculatoare?procesor=${processor}`);
      router.push(`/calculatoare?procesor=${processor}`);
    } else {
      setBaseLink(`/calculatoare?procesor=${processor}`);
      router.push(`/calculatoare?procesor=${processor}`);
    }
    setMultupleSelected(true);
    setProcessor(processor)
  };

  const onGenerationSelect = (generation) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&generatie=${generation}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && brand != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && videoCard  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard  && frequency != ''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&frecventa=${frequency}&generatie=${generation}`);
    } else if (videoCard != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}`);
    } else if (processor != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&procesor=${processor}`);
    } else if (category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}`);
    } else if (videoCard != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/calculatoare?placa-video=${videoCard}&generatie=${generation}`);
    } else if (frequency != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?frecventa=${frequency}&generatie=${generation}`);
    } else if (router.asPath.includes('generatie')) {
      setBaseLink(`/calculatoare?generatie=${generation}`);
      router.push(`/calculatoare?generatie=${generation}`);
    } else {
      setBaseLink(`/calculatoare?generatie=${generation}`);
      router.push(`/calculatoare?generatie=${generation}`);
    }

    setMultupleSelected(true);
    setGeneration(generation)
  };

  const onVideoSelect = (videoCard) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" &&  category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    }  else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&placa-video=${videoCard}`);
    } else if (category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}`);
    } else if (generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}`);
    } else if (frequency != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?frecventa=${frequency}&placa-video=${videoCard}`);
    }  else if (router.asPath.includes('placa-video')) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}`);
      router.push(`/calculatoare?placa-video=${videoCard}`);
    } else {
      setBaseLink(`/calculatoare?placa-video=${videoCard}`);
      router.push(`/calculatoare?placa-video=${videoCard}`);
    }
    setMultupleSelected(true);
    setVideoCard(videoCard)
  };

  const onFrecSelect = (fr) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && generation != ''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&frecventa=${fr}`);
    } else if (brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&frecventa=${fr}`);
    } else if (processor != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&frecventa=${fr}`);
    } else if (category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&frecventa=${fr}`);
    } else if (generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&frecventa=${fr}`);
      router.push(`/calculatoare?generatie=${generation}&frecventa=${fr}`);
    } else if (videoCard != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/calculatoare?placa-video=${videoCard}&frecventa=${fr}`);
    }  else if (router.asPath.includes('frecventa')) {
      setBaseLink(`/calculatoare?frecventa=${fr}`);
      router.push(`/calculatoare?frecventa=${fr}`);
    } else {
      setBaseLink(`/calculatoare?frecventa=${fr}`);
      router.push(`/calculatoare?frecventa=${fr}`);
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
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
        let arr = laptopsData
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(1, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getTypesByProcessorBrandGenerationNVideoFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setCategories(result);
          });
        setFilteredData(arr);
    } else if (category != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationFreqAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationFreqAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationFreqAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqProcessorAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandFreqProcessorAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandFreqProcessorAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByGenerationBrandAndProc(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
        sortingService.getGenerationsByProcessorAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
        sortingService.getGenerationsByProcessorAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
        sortingService.getGenerationsByProcessorAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && videoCard !='') {
      let arr = laptopsData
        .filter((r) => r[25] == matchProc.name)
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandGenerationNVideo(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorNVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
    
    } else if (category != "" && processor != "" && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorNVideo(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
          sortingService.getFreqByGenerationAndProcVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorNVideo(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
          sortingService.getFreqByGenerationAndProcVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorNVideo(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
          sortingService.getFreqByGenerationAndProcVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
      }
      } else if (category != "" && brand != "" && processor != '' && frequency != '' ) {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getVideosByBrandAndProcessor(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByProcessorAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
            .filter((r) => r[2] == "Second Hand")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
            setFilteredData(arr);
            sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getVideosByBrandAndProcessor(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByProcessorAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "nou") {
          let arr = laptopsData
            .filter((r) => r[2] == "Nou")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
            setFilteredData(arr);
            sortingService
            .getHighestPriceByBrandAndProcessorAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getVideosByBrandAndProcessor(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByProcessorAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        }
      } else if (category != "" && brand != "" && generation != '' && frequency != '' ) {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndGenerationFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndBrandFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getVideosByGenerationAndBrandFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setVideoCards(res);
            });
        } else if (category == "second-hand") {
          let arr = laptopsData
            .filter((r) => r[2] == "Second Hand")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            setFilteredData(arr);
            sortingService
            .getHighestPriceByBrandAndGenerationFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndBrandFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getVideosByGenerationAndBrandFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setVideoCards(res);
            });
        } else if (category == "nou") {
          let arr = laptopsData
            .filter((r) => r[2] == "Nou")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            setFilteredData(arr);
            sortingService
            .getHighestPriceByBrandAndGenerationFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndBrandFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getVideosByGenerationAndBrandFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setVideoCards(res);
            });
        }
      } else if (processor != "" && brand != "" && generation != '' && frequency != '' ) {
        let arr = laptopsData
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService.getTypesByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
            setCategories(result);
          });
          sortingService
            .getHighestPriceByBrandGenerationAndProcessor(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setVideoCards(result);
            });
            sortingService.getFreqByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r))
      
      } else if (category != "" && processor != "" && generation != '' && frequency != '' ) {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByGenerationAndProcessorFreq(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByGenerationAndProcessorFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
            sortingService.getBrandsByGenerationAndProcessorFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
            .filter((r) => r[2] == "Second Hand")
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByGenerationAndProcessorFreq(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByGenerationAndProcessorFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
            sortingService.getBrandsByGenerationAndProcessorFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
        } else if (category == "nou") {
          let arr = laptopsData
            .filter((r) => r[2] == "Nou")
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByGenerationAndProcessorFreq(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByGenerationAndProcessorFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
            sortingService.getBrandsByGenerationAndProcessorFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
        }
      } else if (category != "" && brand != "" && videoCard !='' && frequency != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndVideoFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getProcessorsByBrandAndVideoFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getGenerationsByBrandAndVideoFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
            .filter((r) => r[2] == "Second Hand")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndVideoFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getProcessorsByBrandAndVideoFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getGenerationsByBrandAndVideoFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "nou") {
          let arr = laptopsData
            .filter((r) => r[2] == "Nou")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndVideoFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getProcessorsByBrandAndVideoFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getGenerationsByBrandAndVideoFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        }
      } else if (category != "" && processor != "" && videoCard !='' && frequency != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService.getBrandsByProcessorAndVideoFreq(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByProcessorAndVideoFreq(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getGenerationsByProcessorNVideoFreq(2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
        } else if (category == "second-hand") {
          let arr = laptopsData
            .filter((r) => r[2] == "Second Hand")
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService.getBrandsByProcessorAndVideoFreq(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByProcessorAndVideoFreq(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getGenerationsByProcessorNVideoFreq(4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
        } else if (category == "nou") {
          let arr = laptopsData
            .filter((r) => r[2] == "Nou")
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService.getBrandsByProcessorAndVideoFreq(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByProcessorAndVideoFreq(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getGenerationsByProcessorNVideoFreq(3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
        }
      } else if (brand != '' && processor != "" && videoCard !='' && frequency != '' ) {
        let arr = laptopsData
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService.getTypesByProcessorAndBrandAndVideoFreq(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
        setBrands(result);
      });
      sortingService
      .getHighestPriceByBrandProcessorAndVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getGenerationsByProcessorAndVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (brand != '' && generation != "" && videoCard !='' && frequency != '' ) {
        let arr = laptopsData
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter(
          (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService.getTypesByBrandAndGenerationVideoFreq(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
        setCategories(result);
      });
      sortingService
        .getHighestPriceByBrandAndGenerationVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category != "" && generation != "" && videoCard !='' && frequency != '' ) {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter(
              (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService.getBrandsByGenerationAndVideFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByGenAndVideoFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndVideoFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
            .filter((r) => r[2] == "Second Hand")
            .filter(
              (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService.getBrandsByGenerationAndVideFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByGenAndVideoFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndVideoFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        } else if (category == "nou") {
          let arr = laptopsData
            .filter((r) => r[2] == "Nou")
            .filter(
              (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
          setFilteredData(arr);
          sortingService.getBrandsByGenerationAndVideFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByGenAndVideoFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndVideoFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        }
      } else if (processor != '' && generation != "" && videoCard !='' && frequency != '' ) {
        let arr = laptopsData
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter(
          (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService.getTypesByProcessorAndGenAndVideoFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` ).then((result) => {
        setBrands(result);
      });
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoFreq(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category != "" && processor != "" && generation != '' && videoCard !='') {
    if (category == "refurbished") {
      let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category == "second-hand") {
      let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category == "nou") {
      let arr = laptopsData
        .filter((r) => r[2] == "Noi")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    }
    } else if (category != "" && brand != "" && processor != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessor(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcessor(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByProcessor(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrandAndProcessor(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getFreqByBrandAndProcessor(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
            sortingService.getGenerationsByProcessor(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r));
            sortingService.getVideosByBrandAndProcessor(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r));
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getFreqByBrandAndProcessor(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
            sortingService.getGenerationsByProcessor(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r));
            sortingService.getVideosByBrandAndProcessor(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      }
    } else if (category != "" && brand != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGeneration(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrand(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGeneration(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrand(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGeneration(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrand(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '') {
        let arr = laptopsData
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService.getTypesByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
            setCategories(result);
          });
          sortingService
            .getHighestPriceByBrandGenerationAndProcessor(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setVideoCards(result);
            });
            sortingService.getFreqByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setProcFrequencies(result);
            });
      
    } else if (category != "" && processor != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessor(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessor(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessor(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessor(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessor(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessor(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideo(2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideo(2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideo(4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideo(4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideo(3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideo(3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideo(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByProcessorAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProcessorAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationAndVideo(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqsByGenerationAndBrandAndVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndBrandAndVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideo(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideo(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r));
      sortingService.getFreqByGenerationAndProcessorAndVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && brand != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25].toLowerCase() ==  processor.split('-').join(' ')
          )
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[25].toLowerCase() ==  processor.split('-').join(' '))
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != ""  && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[31] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandFreq(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessorAndFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByProcAndBrandFreq(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessorFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != ""  && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[31] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationFreq(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndBrandFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrandFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[31] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && frequency != '' ) {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[31] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorFreq(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndProcessorFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessorFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[31] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideoFreq (1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !=''  && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[31] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideoFreq(1, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideoFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideoFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideoFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideoFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideoFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideoFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideoFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (category != "" && brand != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(2, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(2, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrand(2, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrand(2, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getFreqByBrand(2, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(4, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(4, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrand(4, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrand(4, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrand(4, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(3, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(3, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrand(3, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrand(3, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrand(3, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      }
    } else if (category != "" && processor != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(2, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(2, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProc(2, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getVideosByProc(2, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
        sortingService.getFreqByProc(2, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == matchProc.name
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(4, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(4, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(4, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
          sortingService.getGenerationsByProc(4, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res));
          sortingService.getVideosByProc(4, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[25] == matchProc.name
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(3, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(3, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProc(3, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
          sortingService.getGenerationsByProc(3, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res))
          sortingService.getVideosByProc(3, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
      }
    } else if (brand != '' && processor != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrand(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessor(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getGenerationsByProcessor(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getVideosByProcAndBrand(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      sortingService.getFreqByBrandAndProcessor(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != '' && generation != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGeneration(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGeneration(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByGenerationAndBrand(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndBrand(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByGenerationAndBrand(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
    } else if (category != "" && generation != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(2, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(2, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGeneration(2, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
        sortingService.getProcessorsByGeneration(2, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r));
        sortingService.getVideosByGeneration(2, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(4, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(4, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGeneration(4, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGeneration(4, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(4, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(3, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(3, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGeneration(3, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGeneration(3, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(3, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "") {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGen(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessor(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessor(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      sortingService.getVideosByGenerationAndProcessor(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      sortingService.getFreqByGenerationAndProcessor(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != "" && videoCard !='' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByVideo(2, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(2, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideo(2, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(2, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByVideo(2, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(4, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(4, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideo(4, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(4, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByVideo(4, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi")    
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(3, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(3, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideo(3, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(3, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByVideo(3, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (processor != "" && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideo(1, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideo(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideo(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideo(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getFreqByProcessorNVideo(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (generation != ""  && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideo(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideo(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideo(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      sortingService.getFreqByGenerationAndVideo(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByBrandFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getVideosByBrandFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByBrandFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[31] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(2, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(2, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(2, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(2, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(2, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[31] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(4, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(4, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(4, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(4, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(4, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")
        .filter((r) => r[31] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(3, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(3, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(3, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(3, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(3, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      }
    } else if (processor != "" && frequency != '') {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorFreq(1, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByProcFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ) .filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByGenerationFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (videoCard != "" && frequency != '' ) {
      let arr = laptopsData.filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[31] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByVideoFreq(1, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideoFreq(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideoFreq(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByVideoFreq(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByVideoFreq(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (brand != "") {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(1, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(1, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrand(1, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getFreqByBrand(1, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByBrand(1, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrand(1, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
    } else if (category != "") {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished");
        setFilteredData(arr);
        sortingService.getBrands(2).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(2).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(2).then((r) => setProcessors(r))
        sortingService.getGenerationsByType(2).then((r) => setProcessorsGeneration(r))
        sortingService.getVideos(2).then((r) => setVideoCards(r))
        sortingService.getFreqs(2).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand");
        setFilteredData(arr);
        sortingService.getBrands(4).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(4).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(4).then((r) => setProcessors(r))
        sortingService.getVideos(4).then((r) => setVideoCards(r))
        sortingService.getGenerationsByType(4).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqs(4).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi");
        setFilteredData(arr);
        sortingService.getBrands(3).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(3).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(3).then((r) => setProcessors(r))
        sortingService.getGenerationsByType(3).then((r) => setProcessorsGeneration(r))
        sortingService.getVideos(3).then((r) => setVideoCards(r))
        sortingService.getFreqs(3).then((r) => setProcFrequencies(r))
      }
    } else if (processor != "") {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      );
      setFilteredData(arr);
      sortingService
        .getTypesByProcessor(1, `${matchProc.slug}-${matchProc.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessor(1,`${matchProc.slug}-${matchProc.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessor(1,`${matchProc.slug}-${matchProc.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByProc(1,`${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProc(1,`${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getVideosByProc(1,`${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
    } else if (generation != "") {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByGeneration(1, `${matchGeneration.slug}-${matchGeneration.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGen(1,`${matchGeneration.slug}-${matchGeneration.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGeneration(1,`${matchGeneration.slug}-${matchGeneration.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByGeneration(1,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGeneration(1,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByGeneration (1,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
    } else if (videoCard != "") {
      let arr = laptopsData.filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByVideo(1, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideo(1,`${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideo (1,`${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByVideo(1,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByVideo(1,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      sortingService.getGenerationsByVideo(1,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (frequency != "") {
      let arr = laptopsData.filter((r) => r[31] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByFreq(1, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByFreq(1, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByFreq (1, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByFreq(1,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByFreq(1,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByFreq(1,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
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
            title="Calculatoare"
            laptopsData={data}
            categories={categories}
            breadcrumbs={computersBrcrmbs}
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

export default Calculatoare;
