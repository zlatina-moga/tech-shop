import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import * as sortingService from "../services/sortingService";
import LaptopsPage from "../components/shared/LaptopsPage";
import { usePagination, DOTS } from "../hooks/usePagination";
import { laptopBrcrmbs } from "../data/breadcrumbs";
import MainSkeleton from "../components/shared/MainSkeleton";
import { usePapaParse } from "react-papaparse";

const Laptopuri = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/laptop");
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
  const [baseLink, setBaseLink] = useState("/laptop");
  const [totalPages, setTotalPages] = useState(1);
  const [processor, setProcessor] = useState("");
  const [generation, setGeneration] = useState("");
  const [videoCard, setVideoCard] = useState("");
  const [videoCards, setVideoCards] = useState([]);

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
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_laptop", {
        skipEmptyLines: true,
        complete: (results) => {
          setLaptopsData(results.data.slice(1));
          setLoading(false);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    sortingService.getBrands(5).then((result) => {
      setBrands(result);
    });
    sortingService.getProcessors(5).then((res) => {
      setProcessors(res);
    });
    sortingService.getHighestPrice(5).then((response) => {
      setHighestPrice(response[1]);
    });
    sortingService.getTypes(5).then((r) => {
      setCategories(r);
    });
    sortingService.getProcessorGeneration(5).then((r) => {
      setProcessorsGeneration(r);
    });
    sortingService.getVideoCards(5).then((resp) => setVideoCards(resp))
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
    if (priceRange != "" && category != "" && brand != "" && processor != '' && generation != '' && videoCard != '') {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "" && (category != "" || brand != "" || processor != '' || generation != '' || videoCard != '')) {
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
  }, [priceRange, brand, category, processor, generation, videoCard]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && generation != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != ""  && videoCard && !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}`);
    } else if (processor != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (videoCard != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != ""  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?procesor=${processor}&category=${cat}`);
      router.push(`/laptop?procesor=${processor}&category=${cat}`);
    } else if (brand != ""  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${cat}`);
      router.push(`/laptop?brand=${brand}&category=${cat}`);
    } else if (generation != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?generatie=${generation}&category=${cat}`);
      router.push(`/laptop?generatie=${generation}&category=${cat}`);
    } else if (videoCard != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&category=${cat}`);
      router.push(`/laptop?placa-video=${videoCard}&category=${cat}`);
    } else if (router.asPath.includes('category')){
      setBaseLink(`/laptop?category=${cat}`);
      router.push(`/laptop?category=${cat}`);
    } else {
      setBaseLink(`/laptop?category=${cat}`);
      router.push(`/laptop?category=${cat}`);
    }
    setMultupleSelected(true);
    setCategory(cat);
  };

  const onBrandSelect = (br) => {
    setCurrentPage(1);
    if (processor != "" && generation != "" && category != '' && videoCard  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else  if (processor != "" && generation != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
    } else if (processor != "" && generation != ""  && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}}&placa-video=${videoCard}`);
    } else if (processor != "" && category != ''  && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}`);
    } else if (processor != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&brand=${br}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&brand=${br}`);
    } else if (generation != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&brand=${br}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&generatie=${generation}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&brand=${br}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&brand=${br}`);
    } else if (processor != "" && videoCard != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&procesor=${processor}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&procesor=${processor}&brand=${br}`);
    } else if (category != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&brand=${br}`);
      router.push(`/laptop?category=${category}&brand=${br}`);
    } else if (processor != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${br}`);
      router.push(`/laptop?procesor=${processor}&brand=${br}`);
    } else if (generation != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?generatie=${generation}&brand=${br}`);
      router.push(`/laptop?generatie=${generation}&brand=${br}`);
    } else if (videoCard != "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&brand=${br}`);
    } else if (router.asPath.includes('brand')) {
      setBaseLink(`/laptop?brand=${br}`);
      router.push(`/laptop?brand=${br}`);
    } else {
      setBaseLink(`/laptop?brand=${br}`);
      router.push(`/laptop?brand=${br}`);
    }
    setMultupleSelected(true);
    setBrand(br);
  };

  const onProcessorSelect = (processor) => {
    setCurrentPage(1);
   if (generation != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&category=${category}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && videoCard != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (generation != "" && videoCard && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}`);
    } else if (generation != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&procesor=${processor}`);
    } else if (category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&procesor=${processor}`);
    } else if (videoCard != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?placa-video=${videoCard}&procesor=${processor}`);
    } else if (router.asPath.includes('procesor')) {
      setBaseLink(`/laptop?procesor=${processor}`);
      router.push(`/laptop?procesor=${processor}`);
    } else {
      setBaseLink(`/laptop?procesor=${processor}`);
      router.push(`/laptop?procesor=${processor}`);
    }
    setMultupleSelected(true);
    setProcessor(processor)
  };

  const onGenerationSelect = (generation) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&generatie=${generation}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (brand != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}`);
    } else if (processor != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&procesor=${processor}`);
    } else if (category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&generatie=${generation}`);
    } else if (videoCard != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?placa-video=${videoCard}&generatie=${generation}`);
    } else if (router.asPath.includes('generatie')) {
      setBaseLink(`/laptop?generatie=${generation}`);
      router.push(`/laptop?generatie=${generation}`);
    } else {
      setBaseLink(`/laptop?generatie=${generation}`);
      router.push(`/laptop?generatie=${generation}`);
    }

    setMultupleSelected(true);
    setGeneration(generation)
  };

  const onVideoSelect = (videoCard) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}`);
    } else if (brand != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}`);
    } else if (processor != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&placa-video=${videoCard}`);
    } else if (category != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}`);
    } else if (generation != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}`);
    } else if (router.asPath.includes('placa-video')) {
      setBaseLink(`/laptop?placa-video=${videoCard}`);
      router.push(`/laptop?placa-video=${videoCard}`);
    } else {
      setBaseLink(`/laptop?placa-video=${videoCard}`);
      router.push(`/laptop?placa-video=${videoCard}`);
    }
    setMultupleSelected(true);
    setVideoCard(videoCard)
  };

  let matchBrand = brands.find((x) => x.slug == brand);
  let matchProc = processors.find((x) => x.slug == processor);
  let matchGeneration = processorsGeneration.find((x) => x.slug == generation);
  let matchVideo = videoCards.find((x) => x.slug == videoCard);

  useEffect(() => {
    if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);;
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && videoCard !='') {
      let arr = laptopsData
        .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandGenerationNVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorNVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
    
    } else if (category != "" && processor != "" && generation != '' && videoCard !='') {
    if (category == "refurbished") {
      let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(7,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category == "second-hand") {
      let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category == "nou") {
      let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(49,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    }
    } else if (category != "" && brand != "" && processor != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessor(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByBrandAndProcessor(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessor(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByBrandAndProcessor(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
            sortingService.getGenerationsByProcessor(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByBrandAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
            sortingService.getGenerationsByProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGeneration(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGeneration(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGeneration(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrand(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrand(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setVideoCards(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '') {
        let arr = laptopsData
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          setFilteredData(arr);
          sortingService.getTypesByProcessorBrandAndGeneration(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
            setCategories(result);
          });
          sortingService
            .getHighestPriceByBrandGenerationAndProcessor(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByProcessorBrandAndGeneration(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setVideoCards(result);
            });
      
    } else if (category != "" && processor != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(7,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessor(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessor(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(49,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessor(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideo(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideo(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideo(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideo(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getGenerationsByProcessorAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationAndVideo(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getProcessorsByGenerationAndBrandAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideo(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
    } else if (category != "" && brand != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrand(7, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(7, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByBrand(7, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrand(7, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(8).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(8, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(8, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByBrand(8, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrand(8, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase());
        setFilteredData(arr);
        sortingService.getBrands(49).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByBrand(49, `${matchBrand.slug}-${matchBrand.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrand(49, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByBrand(49, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrand(49, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(7, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(7, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProc(7, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProc(7, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() ==  processor.split('-').join(' ')
          );
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(8, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(8, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProc(8, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
          sortingService.getGenerationsByProc(8, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[24].toLowerCase() ==  processor.split('-').join(' '));
        setFilteredData(arr);
        sortingService.getBrandsByProcessor(49, `${matchProc.slug}-${matchProc.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessor(49, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProc(49, `${matchProc.slug}-${matchProc.id}`).then((res) => setVideoCards(res))
          sortingService.getGenerationsByProc(49, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrand(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessor(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByProcAndBrand(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessor(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGeneration(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGeneration(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndBrand(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrand(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(7, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(7, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGeneration(7, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(7, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(8, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(8, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGeneration(8, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(8, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getBrandsByGeneration(49, `${matchGeneration.slug}-${matchGeneration.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGen(49, `${matchGeneration.slug}-${matchGeneration.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGeneration(49, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(49, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "") {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGen(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessor(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndProcessor(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessor(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(4, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideo(5, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideo(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideo(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideo(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
    } else if (brand != "") {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByBrand(5, `${matchBrand.slug}-${matchBrand.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrand(5, `${matchBrand.slug}-${matchBrand.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrand(5, `${matchBrand.slug}-${matchBrand.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getVideosByBrand(5, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByBrand(5, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "") {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished");
        setFilteredData(arr);
        sortingService.getBrands(7).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(7).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(7).then((r) => setProcessors(r))
        sortingService.getGenerationsByType(7).then((r) => setProcessorsGeneration(r))
        sortingService.getVideos(7).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand");
        setFilteredData(arr);
        sortingService.getBrands(8).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(8).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(8).then((r) => setProcessors(r))
        sortingService.getVideos(8).then((r) => setVideoCards(r))
        sortingService.getGenerationsByType(8).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou");
        setFilteredData(arr);
        sortingService.getBrands(49).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPrice(49).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessors(49).then((r) => setProcessors(r))
        sortingService.getVideos(49).then((r) => setVideoCards(r))
        sortingService.getGenerationsByType(49).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "") {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByProcessor(5, `${matchProc.slug}-${matchProc.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessor(5,`${matchProc.slug}-${matchProc.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessor(5,`${matchProc.slug}-${matchProc.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByProc(5,`${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProc(5,`${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != "") {
      let arr = laptopsData.filter(
        (r) => r[30].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      );
      setFilteredData(arr);
      sortingService
        .getTypesByGeneration(5, `${matchGeneration.slug}-${matchGeneration.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGen(5,`${matchGeneration.slug}-${matchGeneration.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGeneration(5,`${matchGeneration.slug}-${matchGeneration.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByGeneration (5,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGeneration(5,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
    } else if (videoCard != "") {
      let arr = laptopsData.filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getTypesByVideo(5, `${matchVideo.slug}-${matchVideo.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideo(5,`${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideo (5,`${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByVideo(5,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByVideo(5,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
    }
  }, [brand, category, processor, generation, videoCard]);

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
            title="Laptopuri"
            laptopsData={data}
            categories={categories}
            breadcrumbs={laptopBrcrmbs}
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
          />
          {currentPage === 0 || totalPages < 2 ? null : (
            <nav>
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

export default Laptopuri;
