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
    sortingService.getVideoCards(5).then((resp) => setVideoCards(resp));
    sortingService.getProccessorsFrequency(5).then((resp) => setProcFrequencies(resp))
  }, []);

  const onReset = () => {
    setClicked(true);
    setMultupleSelected(false);
    setBaseLink(`/laptop`);
    router.push(`/laptop`);
  }

  useEffect(() => {
    if (clicked) {
      setShow(false)
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_laptop", {
      skipEmptyLines: true,
      complete: (results) => {
        setFilteredData(results.data.slice(1));
        setShow(true)
      },
    }
  );
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
  sortingService.getVideoCards(5).then((resp) => setVideoCards(resp));
  sortingService.getProccessorsFrequency(5).then((resp) => setProcFrequencies(resp))

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
    if (priceRange != "" && category != "" && brand != "" && processor != '' && generation != '' && videoCard != '' && frequency != '' ) {
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
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  videoCard && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard && !(router.asPath.includes('category'))) {
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
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && frequency != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != ""  && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (videoCard != "" && generation != ""&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
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
    } else if (frequency != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&category=${cat}`);
      router.push(`/laptop?frecventa=${frequency}&category=${cat}`);
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
    if (processor != "" && generation != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
    } else if (processor != "" && generation != "" && category != '' && videoCard && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && !(router.asPath.includes('brand'))) {
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
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (generation != "" && category != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && videoCard != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&brand=${br}`);
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
    } else if (category != "" && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?category=${category}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != ""  && frequency != ''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?procesor=${processor}&frecventa=${frequency}&brand=${br}`);
    } else if (generation != "" && frequency != ''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?generatie=${generation}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?generatie=${generation}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != ""  && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&brand=${br}`);
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
    } else if (frequency!= "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&brand=${br}`);
      router.push(`/laptop?frecventa=${frequency}&brand=${br}`);
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
    if (generation != "" && brand != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (generation != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('procesor'))) {
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
    } else if (brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && category != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ""  && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != "" && videoCard  && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&frecventa=${frequency}&procesor=${processor}`);
    } else if (generation != ""&& frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&frecventa=${frequency}&procesor=${processor}`);
    } else if (videoCard != "" && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
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
    } else if (frequency != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?frecventa=${frequency}&procesor=${processor}`);
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
    if (processor != "" && brand != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard && !(router.asPath.includes('generatie'))) {
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
    } else if (processor != "" && brand != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && videoCard  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard  && frequency != ''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&frecventa=${frequency}&generatie=${generation}`);
    } else if (videoCard != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
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
    } else if (frequency != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?frecventa=${frequency}&generatie=${generation}`);
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
    if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" &&  category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    }  else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
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
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && frequency != ''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}`);
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
    } else if (frequency != "" && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?frecventa=${frequency}&placa-video=${videoCard}`);
    }  else if (router.asPath.includes('placa-video')) {
      setBaseLink(`/laptop?placa-video=${videoCard}`);
      router.push(`/laptop?placa-video=${videoCard}`);
    } else {
      setBaseLink(`/laptop?placa-video=${videoCard}`);
      router.push(`/laptop?placa-video=${videoCard}`);
    }
    setMultupleSelected(true);
    setVideoCard(videoCard)
  };

  const onFrecSelect = (fr) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && generation != ''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != '' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${fr}`);
    } else if (brand != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&frecventa=${fr}`);
    } else if (processor != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&frecventa=${fr}`);
    } else if (category != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&frecventa=${fr}`);
    } else if (generation != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?generatie=${generation}&frecventa=${fr}`);
      router.push(`/laptop?generatie=${generation}&frecventa=${fr}`);
    } else if (videoCard != "" && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&frecventa=${fr}`);
      router.push(`/laptop?placa-video=${videoCard}&frecventa=${fr}`);
    }  else if (router.asPath.includes('frecventa')) {
      setBaseLink(`/laptop?frecventa=${fr}`);
      router.push(`/laptop?frecventa=${fr}`);
    } else {
      setBaseLink(`/laptop?frecventa=${fr}`);
      router.push(`/laptop?frecventa=${fr}`);
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
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
        let arr = laptopsData
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(5, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getTypesByProcessorBrandGenerationNVideoFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setCategories(result);
          });
        setFilteredData(arr);
    } else if (category != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationFreqAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationFreqAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationFreqAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqProcessorAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandFreqProcessorAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandFreqProcessorAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByProcessorAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndFreq(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorAndFreq(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorAndFreq(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);;
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProc(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProc(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setProcFrequencies(res)
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
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
          setProcFrequencies(res)
        });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
          setProcFrequencies(res)
        });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
          setProcFrequencies(res)
        });
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && videoCard !='') {
      let arr = laptopsData
        .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandGenerationNVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorNVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcFrequencies(res)
          });
    
    } else if (category != "" && processor != "" && generation != '' && videoCard !='') {
    if (category == "refurbished") {
      let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(7,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
    } else if (category == "second-hand") {
      let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
    } else if (category == "nou") {
      let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideo(49,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setProcFrequencies(resp))
    }
    } else if (category != "" && brand != "" && processor != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessor(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessor(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndProcessorAndFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGenerationFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndGenerationFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setVideoCards(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' ) {
      let arr = laptopsData
        .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[26] == matchFreq.name)
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
          sortingService.getFreqByProcessorBrandAndGeneration(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r))
    
    } else if (category != "" && processor != "" && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreq(7,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreq(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreq(49,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && videoCard !='' && frequency != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='' && frequency != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreq(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreq(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreq(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreq(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreq(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreq(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreq(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreq(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideoFreq(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getGenerationsByProcessorAndVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationVideoFreq(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getProcessorsByGenerationAndBrandAndVideoFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideoFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideoFreq(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideoFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
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
        sortingService.getFreqByBrandAndProcessor(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
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
            sortingService.getFreqByBrandAndProcessor(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
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
            sortingService.getFreqByBrandAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
            sortingService.getVideosByBrandAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
            sortingService.getGenerationsByProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getFreqByGenerationAndBrand(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getFreqByGenerationAndBrand(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getFreqByGenerationAndBrand(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setProcFrequencies(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '') {
        let arr = laptopsData
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
            sortingService.getFreqByProcessorBrandAndGeneration(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setProcFrequencies(result);
            });
      
    } else if (category != "" && processor != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getFreqByGenerationAndProcessor(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessor(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessor(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessor(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessor(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          );
        setFilteredData(arr);
        sortingService.getFreqByGenerationAndProcessor(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
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
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
        sortingService.getFreqByProcessorNVideo(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideo(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideo(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideo(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideo(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideo(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideo(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
      sortingService.getFreqByProcessorAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
      sortingService.getFreqsByGenerationAndBrandAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && generation != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
        sortingService.getFreqsByGenerationAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideo(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setBrands(r));
      sortingService.getFreqByGenerationAndProcessorAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && brand != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(7, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(7, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(7, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(8, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(49, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() ==  processor.split('-').join(' ')
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[24].toLowerCase() ==  processor.split('-').join(' '))
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreq(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreq(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreq(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreq(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != ""  && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[26] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandFreq(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessorAndFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByProcAndBrandFreq(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessorFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != ""  && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[26] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationFreq(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndBrandFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrandFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && frequency != '' ) {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[26] == matchFreq.name)
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorFreq(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndProcessorFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessorFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideoFreq (5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !=''  && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[26] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[26] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
            .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[26] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreq(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreq(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreq(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreq(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideoFreq(5, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideoFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideoFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideoFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideoFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideoFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideoFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideoFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
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
          })
          sortingService.getFreqByBrand(7, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
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
          sortingService.getFreqByBrand(8, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
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
          sortingService.getFreqByBrand(49, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
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
          sortingService.getFreqByProc(7, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
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
          sortingService.getFreqByProc(8, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
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
          sortingService.getFreqByProc(49, `${matchProc.slug}-${matchProc.id}`).then((res) => setProcFrequencies(res))
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
      sortingService.getFreqByBrandAndProcessor(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      sortingService.getVideosByProcAndBrand(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessor(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getFreqByGenerationAndBrand(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
      sortingService.getVideosByGenerationAndBrand(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrand(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
          sortingService.getFreqByGeneration(7, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGeneration(7, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(7, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
          sortingService.getFreqByGeneration(8, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGeneration(8, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(8, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
          sortingService.getFreqByGeneration(49, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGeneration(49, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGeneration(49, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "") {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getFreqByGenerationAndProcessor(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
      sortingService.getVideosByGenerationAndProcessor(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessor(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
        sortingService.getFreqByBrandAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByBrandAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
        setFilteredData(arr);
        sortingService.getBrandsByVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
            .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());;
        setFilteredData(arr);
        sortingService.getBrandsByVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
        sortingService.getFreqByProcessorNVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getBrandsByProcessorAndVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
      sortingService.getFreqByGenerationAndVideo(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndVideo(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcessors(r))
    } else if (brand != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[26] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByBrandFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getVideosByBrandFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByBrandFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[26] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(7, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(7, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(7, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(7, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(7, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[26] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(8, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(8, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(8, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(8, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(8, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")
        .filter((r) => r[26] == matchFreq.name);
        setFilteredData(arr);
        sortingService.getBrandsFreq(49, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreq(49, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreq(49, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreq(49, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreq(49, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      }
    } else if (processor != "" && frequency != '') {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[26] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorFreq(5, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByProcFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ) .filter((r) => r[26] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByGenerationFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
    } else if (videoCard != "" && frequency != '' ) {
      let arr = laptopsData.filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[26] == matchFreq.name);
      setFilteredData(arr);
      sortingService
        .getTypesByVideoFreq(5, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideoFreq(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideoFreq(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByVideoFreq(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByVideoFreq(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
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
        sortingService.getFreqByBrand(5, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setProcFrequencies(r))
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
        sortingService.getFreqs(7).then((r) => setProcFrequencies(r))
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
        sortingService.getFreqs(8).then((r) => setProcFrequencies(r))
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
        sortingService.getFreqs(49).then((r) => setProcFrequencies(r))
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
      sortingService.getFreqByProc(5,`${matchProc.slug}-${matchProc.id}`).then((r) => setProcFrequencies(r))
    } else if (generation != "") {
      let arr = laptopsData.filter(
        (r) => r[32].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getFreqByGeneration(5,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r))
    } else if (videoCard != "") {
      let arr = laptopsData.filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase());
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
      sortingService.getFreqByVideo(5,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setProcFrequencies(r))
    } else if (frequency != "") {
      let arr = laptopsData.filter((r) => r[26] == matchFreq.name)
      setFilteredData(arr);
      sortingService
        .getTypesByFreq(5, `${matchFreq.slug}-${matchFreq.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByFreq(5, `${matchFreq.slug}-${matchFreq.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByFreq (5, `${matchFreq.slug}-${matchFreq.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByFreq(5,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByFreq(5,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByFreq(5,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
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

export default Laptopuri;
