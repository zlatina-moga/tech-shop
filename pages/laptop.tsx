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
  const [screens, setScreens] = useState([]);
  const [screen, setScreen] = useState("");

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
    sortingService.getProccessorsFrequency(5).then((resp) => setProcFrequencies(resp));
    sortingService.getScreens(5).then((res) => {
      setScreens(res);
    });
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
  sortingService.getScreens(5).then((res) => {
    setScreens(res);
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
    if (priceRange != "" && category != "" && brand != "" && processor != '' && generation != '' && videoCard != '' && frequency != '' && screen != '') {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "" && (category != "" || brand != "" || processor != '' || generation != '' || videoCard != '' || frequency != '' || screen != '')) {
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
  }, [priceRange, brand, category, processor, generation, videoCard, frequency, screen]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && generation != "" && videoCard !='' && frequency != '' && screen !=''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && videoCard !='' && frequency != '' && screen !=''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard !='' && frequency != '' && screen !=''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && videoCard !='' && frequency != '' && screen !=''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && frequency != '' && screen !=''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard !='' && screen !=''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  videoCard !='' && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && frequency != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != "" && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard !='' && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard !='' && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != ""  && videoCard !='' && screen !=''&& !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != ''  && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (processor != "" && generation != "" && frequency != ''  && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && frequency != '' && screen !='' && !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && frequency != '' && screen !='' && !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != ""  && frequency != ''  && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && frequency != '' && screen !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && generation != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != ""  && videoCard !='' && !(router.asPath.includes('category')))  {
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
    } else if (videoCard != "" && generation != "" && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && generation != ""&& screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && screen !=''&& !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&screen=${screen}&generatie=${generation}`);
    } else if (brand != "" && videoCard != "" && screen !=''&& !(router.asPath.includes('category')))  {
      setBaseLink(`/laptop?category=${cat}&brand=${brand}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${cat}&brand=${brand}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard != "" && screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (videoCard != "" && generation != ""&& screen !=''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?category=${cat}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${cat}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
    } else if (videoCard != "" && generation != "" && !(router.asPath.includes('category'))) {
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
    } else if (processor != "" && screen !=''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?procesor=${processor}&screen=${screen}&category=${cat}`);
      router.push(`/laptop?procesor=${processor}&screen=${screen}&category=${cat}`);
    } else if (brand != "" && screen !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?brand=${brand}&screen=${screen}&category=${cat}`);
      router.push(`/laptop?brand=${brand}&screen=${screen}&category=${cat}`);
    } else if (generation != "" && screen !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?generatie=${generation}&screen=${screen}&category=${cat}`);
      router.push(`/laptop?generatie=${generation}&screen=${screen}&category=${cat}`);
    } else if (videoCard != "" && screen !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&screen=${screen}&category=${cat}`);
      router.push(`/laptop?placa-video=${videoCard}&screen=${screen}&category=${cat}`);
    } else if (frequency != "" && screen !='' && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&screen=${screen}&category=${cat}`);
      router.push(`/laptop?frecventa=${frequency}&screen=${screen}&category=${cat}`);
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
    } else if (screen != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/laptop?screen=${screen}&category=${cat}`);
      router.push(`/laptop?screen=${screen}&category=${cat}`);
    }else if (router.asPath.includes('category')){
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
    if (processor != "" && generation != "" && category != '' && videoCard != '' && frequency != '' && screen !=''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else  if (generation != "" && category != '' && videoCard != ''&& frequency != '' && screen !=''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else  if (processor != "" && category != '' && videoCard != ''&& frequency != '' && screen !=''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else  if (processor != "" && generation != "" && videoCard != ''&& frequency != '' && screen !=''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else  if (processor != "" && generation != "" && category != '' && frequency != '' && screen !=''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&screen=${screen}`);
    } else  if (processor != "" && generation != "" && category != '' && videoCard != ''&& screen !=''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && videoCard != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != '' && videoCard != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard != ''&& frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && frequency != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&frecventa=${frequency}`);
    } else if (processor != "" && generation != "" && category != '' && videoCard != ''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && category != '' && screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}&brand=${br}`);
    } else if (processor != "" && generation != ""  && videoCard != '' && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && category != ''  && videoCard != '' && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard != '' && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&brand=${br}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (processor != "" && category != '' && frequency != ''&& screen !=''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (generation != "" && category != ''&& frequency != ''&& screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && frequency != ''&& screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (videoCard != "" && category != '' && frequency != '' && screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (processor != "" && videoCard != ''&& frequency != '' && screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    }  else if (processor != "" && generation != "" && category != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&brand=${br}`);
    } else if (processor != "" && generation != ""  && videoCard != ''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&brand=${br}&placa-video=${videoCard}`);
    } else if (processor != "" && category != ''  && videoCard != ''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&brand=${br}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard != ''&& !(router.asPath.includes('brand'))) {
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
    } else if (processor != "" && generation != "" && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}&brand=${br}`);
    } else if (processor != "" && category != ''&& screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&screen=${screen}&brand=${br}`);
    } else if (generation != "" && category != '' && screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&generatie=${generation}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&generatie=${generation}&screen=${screen}&brand=${br}`);
    } else if (videoCard != "" && category != '' && screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}&brand=${br}`);
    } else if (processor != "" && videoCard != '' && screen !=''&& !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&procesor=${processor}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&procesor=${processor}&screen=${screen}&brand=${br}`);
    } else if (category != "" && frequency != ''&& screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (processor != ""  && frequency != '' && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&frecventa=${frequency}&screen=${screen}brand=${br}`);
      router.push(`/laptop?procesor=${processor}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (generation != "" && frequency != '' && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?generatie=${generation}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
    } else if (videoCard != ""  && frequency != '' && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&brand=${br}`);
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
    }  else if (category != "" && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?category=${category}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?category=${category}&screen=${screen}&brand=${br}`);
    } else if (processor != "" && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?procesor=${processor}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?procesor=${processor}&screen=${screen}&brand=${br}`);
    } else if (generation != ""&& screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?generatie=${generation}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?generatie=${generation}&screen=${screen}&brand=${br}`);
    } else if (videoCard != "" && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?placa-video=${videoCard}&screen=${screen}&brand=${br}`);
    } else if (frequency!= "" && screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&screen=${screen}&brand=${br}`);
      router.push(`/laptop?frecventa=${frequency}&screen=${screen}&brand=${br}`);
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
    } else if (screen !='' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/laptop?screen=${screen}&brand=${br}`);
      router.push(`/laptop?screen=${screen}&brand=${br}`);
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
    if (generation != "" && brand != "" && category != "" && videoCard !='' && frequency != '' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && videoCard !='' && frequency != '' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else  if (generation != "" && category != "" && videoCard !='' && frequency != '' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else  if (generation != "" && brand != "" && videoCard !='' && frequency != '' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != "" && frequency != '' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else  if (generation != "" && brand != "" && category != "" && videoCard !='' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}`);
    } else if (generation != "" && brand != "" && category != "" && videoCard !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (generation != "" && brand != "" && category != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && videoCard !='' && screen !=''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard !='' && screen !=''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && videoCard !=''&& screen !=''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && frequency != ''&& screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && category != "" && frequency != ''&& screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && frequency != '' && screen !=''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ""  && frequency != '' && screen !=''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (generation != "" && videoCard  && frequency != '' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (category != "" && videoCard !='' && frequency != '' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    }   else if (generation != "" && brand != "" && category != "" && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (brand != "" && generation != "" && videoCard !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && videoCard !='' && !(router.asPath.includes('procesor'))) {
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
    } else if (generation != "" && videoCard !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard !='' && !(router.asPath.includes('procesor'))) {
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
    } else if (category != "" && videoCard !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && category != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&category=${category}&screen=${screen}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && videoCard != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (generation != "" && videoCard !=''&& screen !=''  && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (category != "" && videoCard !='' && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
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
    }  else if (brand != ""&& screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?brand=${brand}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&screen=${screen}&procesor=${processor}`);
    } else if (generation != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?generatie=${generation}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&screen=${screen}&procesor=${processor}`);
    } else if (category != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?category=${category}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&screen=${screen}&procesor=${processor}`);
    } else if (videoCard != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (frequency != "" && screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
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
    } else if (screen !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/laptop?screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?screen=${screen}&procesor=${processor}`);
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
    if (processor != "" && brand != "" && category != "" && videoCard!= ''  && frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (brand != "" && category != "" && videoCard!= ''  && frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" &&  category != "" && videoCard!= ''  && frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard!= ''  && frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" &&  frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard!= ''  && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && category != "" && videoCard != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != ""&& screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard != '' && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard != '' && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard != '' && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    }else if (processor != "" && brand != ""  && frequency != '' && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && category != ""  && frequency != ''&& screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && category != "" && frequency != ''&& screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ''  && frequency != '' && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&&screen=${screen}generatie=${generation}`);
    } else if (processor != "" && videoCard != ''  && frequency != '' && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (category != "" && videoCard != ''  && frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    }  else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    }else if (processor != "" && brand != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && category != ""  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ''  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    } else if (processor != "" && videoCard != ''  && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard != ''  && frequency != ''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}`);
    }  else if (brand != "" && frequency != '' && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&frecventa=${frequency}&screen=${screen}&procesor=${processor}`);
    } else if (category != "" && frequency != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (videoCard != "" && frequency != ''  && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?placa-video=${videoCard}&frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && brand != ""  && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && category != ""  && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && category != ""  && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ''  && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && videoCard != ''  && screen !=''&& !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&screen=${screen}&procesor=${processor}`);
    } else if (category != "" && videoCard != '' && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
    }  else if (brand != "" && frequency != '' && !(router.asPath.includes('generatie'))) {
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
    } else if (processor != "" && brand != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&category=${category}&generatie=${generation}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&procesor=${processor}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&procesor=${processor}`);
    } else if (brand != "" && videoCard != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&generatie=${generation}`);
    } else if (processor != "" && videoCard != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&procesor=${processor}`);
    } else if (category != "" && videoCard != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&generatie=${generation}`);
    }  else if (brand != "" && screen !=''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?brand=${brand}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?brand=${brand}&screen=${screen}&generatie=${generation}`);
    } else if (processor != "" && screen !=''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?generatie=${generation}&screen=${screen}&procesor=${processor}`);
      router.push(`/laptop?generatie=${generation}&screen=${screen}&procesor=${processor}`);
    } else if (category != "" && screen !=''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?category=${category}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?category=${category}&screen=${screen}&generatie=${generation}`);
    } else if (videoCard != "" && screen !='' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?placa-video=${videoCard}&screen=${screen}&generatie=${generation}`);
    } else if (frequency != ""&& screen !=''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?frecventa=${frequency}&screen=${screen}&generatie=${generation}`);
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
    } else if (screen !=''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/laptop?screen=${screen}&generatie=${generation}`);
      router.push(`/laptop?screen=${screen}&generatie=${generation}`);
    }else if (router.asPath.includes('generatie')) {
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
    if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && generation != '' && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
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
    } else if (brand != "" && category != "" && generation != '' && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && generation != ''&& screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  generation != '' && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != ''&& screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && frequency != ''&& screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && frequency != '' && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
    }  else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
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
    } else if (brand != "" && category != "" && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&category=${category}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && category != ""  && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
    } else if (generation != "" && category != ""  && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != ""  && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != ""  && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&screen=${screen}&placa-video=${videoCard}`);
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
    } else if (brand != "" && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?brand=${brand}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?brand=${brand}&screen=${screen}&placa-video=${videoCard}`);
    } else if (processor != "" && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?procesor=${processor}&screen=${screen}&placa-video=${videoCard}`);
    } else if (category != "" && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?category=${category}&screen=${screen}&placa-video=${videoCard}`);
    } else if (generation != "" && screen !=''&& !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?generatie=${generation}&screen=${screen}&placa-video=${videoCard}`);
    } else if (frequency != ""&& screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?frecventa=${frequency}&screen=${screen}&placa-video=${videoCard}`);
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
    } else if (screen !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?screen=${screen}&placa-video=${videoCard}`);
      router.push(`/laptop?screen=${screen}&placa-video=${videoCard}`);
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

  const onFrecSelect = (fr) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && videoCard != ''  && screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && videoCard != ''  && screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && videoCard != ''  && screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && generation != '' && videoCard != ''  && screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard != ''  && screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' &&  screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('frecventa'))) {
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
    } else if (brand != "" && category != "" && generation != '' && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" &&  generation != '' && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != '' && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && videoCard != '' && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && videoCard != ''&& screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && videoCard != ''&& screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && videoCard != ''&& screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && videoCard != '' && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != ''&& screen !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
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
    } else if (processor != "" && brand != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&screen=${screen}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&category=${category}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&screen=${screen}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&screen=${screen}&frecventa=${fr}`);
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
    } else if (brand != ""  && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?brand=${brand}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?brand=${brand}&screen=${screen}&frecventa=${fr}`);
    } else if (processor != ""  && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?procesor=${processor}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?procesor=${processor}&screen=${screen}&frecventa=${fr}`);
    } else if (category != ""  && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?category=${category}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?category=${category}&screen=${screen}&frecventa=${fr}`);
    } else if (generation != ""  && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?generatie=${generation}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?generatie=${generation}&screen=${screen}&frecventa=${fr}`);
    } else if (videoCard != ""  && screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?placa-video=${videoCard}&screen=${screen}&frecventa=${fr}`);
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
    } else if (screen !=''&& !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/laptop?screen=${screen}&frecventa=${fr}`);
      router.push(`/laptop?screen=${screen}&frecventa=${fr}`);
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

  const onScreenSelect = (screen) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && videoCard !='' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && category != "" && generation != '' && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else if (processor != "" &&  category != "" && generation != '' && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    }  else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}`);
    } else if (brand != "" && category != "" && generation != '' && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && category != "" && generation != ''&& videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" &&  generation != '' && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" && frequency != ''&& videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (brand != "" && category != "" && frequency != ''&& videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && category != "" && frequency != '' && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (generation != "" && category != "" && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (brand != "" && generation != "" && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && generation != "" && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != "" && frequency != '' && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    }  else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&generatie=${generation}&screen=${screen}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&generatie=${generation}&screen=${screen}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&generatie=${generation}&screen=${screen}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}`);
      router.push(`/laptop?category=${category}&brand=${brand}&procesor=${processor}&screen=${screen}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&procesor=${processor}&frecventa=${frequency}&screen=${screen}`);
    } else if (brand != "" && category != "" && frequency != ''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&category=${category}&frecventa=${frequency}&screen=${screen}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&frecventa=${frequency}&screen=${screen}`);
    } else if (generation != "" && category != "" && frequency != ''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else if (brand != "" && generation != "" && frequency != ''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&screen=${screen}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&frecventa=${frequency}&screen=${screen}`);
    } else if (brand != "" && category != "" && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&category=${category}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && category != ""  && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&placa-video=${videoCard}&screen=${screen}`);
    } else if (generation != "" && category != ""  && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (brand != "" && generation != ""  && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && generation != "" && videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && brand != ""  && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&screen=${screen}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&category=${category}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&category=${category}&screen=${screen}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&procesor=${processor}&screen=${screen}`);
      router.push(`/laptop?category=${category}&procesor=${processor}&screen=${screen}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?category=${category}&generatie=${generation}&screen=${screen}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&generatie=${generation}&screen=${screen}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&generatie=${generation}&screen=${screen}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&brand=${brand}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&brand=${brand}&screen=${screen}`);
    } else if (brand != "" && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&placa-video=${videoCard}&screen=${screen}`);
    } else if (processor != "" && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&placa-video=${videoCard}&screen=${screen}`);
    } else if (category != "" && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?category=${category}&placa-video=${videoCard}&screen=${screen}`);
    } else if (generation != "" && videoCard !=''&& !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?generatie=${generation}&placa-video=${videoCard}&screen=${screen}`);
    } else if (frequency != ""&& videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?frecventa=${frequency}&placa-video=${videoCard}&screen=${screen}`);
    } else if (brand != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?brand=${brand}&screen=${screen}`);
      router.push(`/laptop?brand=${brand}&screen=${screen}`);
    } else if (processor != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?procesor=${processor}&screen=${screen}`);
      router.push(`/laptop?procesor=${processor}&screen=${screen}`);
    } else if (category != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?category=${category}&screen=${screen}`);
      router.push(`/laptop?category=${category}&screen=${screen}`);
    } else if (generation != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?generatie=${generation}&screen=${screen}`);
      router.push(`/laptop?generatie=${generation}&screen=${screen}`);
    } else if (frequency != "" && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?frecventa=${frequency}&screen=${screen}`);
      router.push(`/laptop?frecventa=${frequency}&screen=${screen}`);
    } else if (videoCard !='' && !(router.asPath.includes('screen'))) {
      setBaseLink(`/laptop?placa-video=${videoCard}&screen=${screen}`);
      router.push(`/laptop?placa-video=${videoCard}&screen=${screen}`);
    } else if (router.asPath.includes('screen')) {
      setBaseLink(`/laptop?screen=${screen}`);
      router.push(`/laptop?screen=${screen}`);
    } else {
      setBaseLink(`/laptop?screen=${screen}`);
      router.push(`/laptop?screen=${screen}`);
    }
    setMultupleSelected(true);
    setScreen(screen)
  };

  let matchBrand = brands.find((x) => x.slug == brand);
  let matchProc = processors.find((x) => x.slug == processor);
  let matchGeneration = processorsGeneration.find((x) => x.slug == generation); 
  let matchVideo = videoCards.find((x) => x.slug == videoCard);
  let matchFreq = procFrequencies.find((x) => x.slug == frequency);
  let matchScreen = screens.find((x) => x.slug == screen);

  console.log(screen)
  console.log(matchScreen)

  useEffect(() => {
    if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorVideoAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorVideoAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' && screen != '') {
        let arr = laptopsData
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorVideoAndFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getTypesyBrandGenerationProcessorVideoAndFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setCategories(r))
    } else if (category != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getBrandsByGenerationProcessorVideoAndFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getBrandsByGenerationProcessorVideoAndFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getBrandsByGenerationProcessorVideoAndFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationVideoAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandGenerationVideoAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationVideoAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandGenerationVideoAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationVideoAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandGenerationVideoAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessors(r))
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorVideoAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByBrandProcessorVideoAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorVideoAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByBrandProcessorVideoAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorVideoAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getGenerationsByBrandProcessorVideoAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideoCardsByBrandGenerationProcessorAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r));
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideoCardsByBrandGenerationProcessorAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r));
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideoCardsByBrandGenerationProcessorAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r));
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getFreqByBrandGenerationProcessorVideoAndScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getFreqByBrandGenerationProcessorVideoAndScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getFreqByBrandGenerationProcessorVideoAndScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByProcessorBrandGenerationNVideoFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
        setFilteredData(arr);
    } else if (category != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
          sortingService.getScreensByGenerationAndProcessorVideoAndFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
          sortingService.getScreensByGenerationAndProcessorVideoAndFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r));
          sortingService.getScreensByGenerationAndProcessorVideoAndFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrandAndVideoFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrandAndVideoFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrandAndVideoFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
          sortingService.getGenerationsByProcessorAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r));
          sortingService.getScreensByProcessorAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r));
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
          sortingService.getGenerationsByProcessorAndVideoFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getScreensByProcessorAndVideoFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r));
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
          sortingService.getGenerationsByProcessorAndVideoFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r));
          sortingService.getScreensByProcessorAndVideoFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r));
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProcFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProcFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProcFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProcVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProcVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProcVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorScreen(7, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProcScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorScreen(8, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProcScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorScreen(49, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationBrandAndProcScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProcScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !=''  && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
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
          .filter((r) => r[33] == matchScreen.name)
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
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
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorAndVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
          setProcFrequencies(res)
        });
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res)
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && videoCard !='' && screen != '') {
      let arr = laptopsData
        .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandGenerationNVideoScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorNVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideoScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res)
          });
    
    } else if (category != "" && processor != "" && generation != '' && videoCard !='' && screen != '') {
    if (category == "refurbished") {
      let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoScreen(7,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((resp) => setProcFrequencies(resp));
    } else if (category == "second-hand") {
      let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoScreen(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((resp) => setProcFrequencies(resp));
    } else if (category == "nou") {
      let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoScreen(49,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((resp) => setProcFrequencies(resp));
    }
    } else if (category != "" && brand != "" && processor != '' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessorScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessorScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessorScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && frequency != ''  && screen != '') {
      let arr = laptopsData
        .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandAndGenerationScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcessorBrandAndGenerationScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
            setVideoCards(result);
          });
          sortingService.getFreqByProcessorBrandAndGenerationScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    
    } else if (category != "" && processor != "" && generation != '' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreqScreen(7,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreqScreen(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreqScreen(49,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && videoCard !='' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='' && frequency != ''  && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreqScreen(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreqScreen(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreqScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreqScreen(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreqScreen(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreqScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name)
          .filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreqScreen(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreqScreen(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreqScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='' && frequency != '' && screen != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideoFreqScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideoFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getGenerationsByProcessorAndVideoFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && videoCard !='' && frequency != '' && screen != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationVideoFreqScreen(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationVideoFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getProcessorsByGenerationAndBrandAndVideoFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && videoCard !='' && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='' && frequency != '' && screen != '') {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideoFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideoFreqScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideoFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
    } else if (category != "" && brand != "" && processor != '' && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProc(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProc(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndProc(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByBrandAndProcVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByBrandAndProcVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByBrandAndProcVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setScreens(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setScreens(res)
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationBrandAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setScreens(res)
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && videoCard !='') {
      let arr = laptopsData
        .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensyGenerationBrandAndProcVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setScreens(res)
          });
    
    } else if (category != "" && processor != "" && generation != '' && videoCard !='') {
    if (category == "refurbished") {
      let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
        sortingService.getScreensByGenerationAndProcVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setScreens(resp))
    } else if (category == "second-hand") {
      let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
        sortingService.getScreensByGenerationAndProcVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setScreens(resp))
    } else if (category == "nou") {
      let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
        sortingService.getScreensByGenerationAndProcVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setScreens(resp))
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
        sortingService.getScreensByProcessorAndFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByProcessorAndFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByProcessorAndFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      }
    } else if (category != "" && brand != "" && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrandFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setScreens(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrandFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setScreens(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrandFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setScreens(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' ) {
      let arr = laptopsData
        .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getFreqByProcessorBrandAndGeneration(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setProcFrequencies(r));
          sortingService.getScreensByProcessorBrandAndGeneration(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setScreens(r))
    
    } else if (category != "" && processor != "" && generation != '' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndProcessorFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getBrandsByGenerationAndProcessorFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r));
          sortingService.getScreensByGenerationAndProcessorFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndProcessorFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandAndVideoFreq(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandAndVideoFreq(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandAndVideoFreq(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByProcessorNVideoFreq(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setScreens(res))
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
        sortingService.getGenerationsByProcessorNVideoFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setProcessorsGeneration(res));
        sortingService.getScreensByProcessorNVideoFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setScreens(res))
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
        sortingService.getScreensByProcessorNVideoFreq(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setScreens(res))
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
      sortingService.getScreensByProcessorAndVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (brand != '' && generation != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndBrandAndVideoFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (category != "" && generation != "" && videoCard !='' && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationAndVideoFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationAndVideoFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationAndVideoFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='' && frequency != '' ) {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByProcessorAndGenAndVideoFreq(5,  `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r))
    } else if (category != "" && brand != "" && processor != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByBrandAndProcessorScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcessorScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByBrandAndProcessorScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcessorScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByBrandAndProcessorScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndProcessorScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (category != "" && brand != "" && generation != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrandScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrandScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrandScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcFrequencies(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && screen != '') {
        let arr = laptopsData
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
          setFilteredData(arr);
          sortingService.getTypesByProcessorBrandAndGenerationScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
            setCategories(result);
          });
          sortingService
            .getHighestPriceByBrandGenerationAndProcessorScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByProcessorBrandAndGenerationScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
              setVideoCards(result);
            });
            sortingService.getFreqByProcessorBrandAndGenerationScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
              setProcFrequencies(result);
            });
      
    } else if (category != "" && processor != "" && generation != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorScreen(7,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
          sortingService.getFreqByGenerationAndProcessorScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorScreen(8,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
          sortingService.getFreqByGenerationAndProcessorScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorScreen(49,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
          sortingService.getFreqByGenerationAndProcessorScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (category != "" && brand != "" && videoCard !='' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideoScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideoScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideoScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);;
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoScreen(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoScreen(7, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getFreqByProcessorNVideoScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcFrequencies(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);;
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoScreen(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoScreen(8, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getFreqByProcessorNVideoScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcFrequencies(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);;
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoScreen(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoScreen(49, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getFreqByProcessorNVideoScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcFrequencies(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='' && screen != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideoScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideoScreen (5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getGenerationsByProcessorAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getFreqByProcessorAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != '' && generation != "" && videoCard !='' && screen != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);;
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationAndVideoScreen(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getProcessorsByGenerationAndBrandAndVideoScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      sortingService.getFreqsByGenerationAndBrandAndVideoScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && generation != "" && videoCard !='' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessors(r))
        sortingService.getFreqsByGenerationAndVideoScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessors(r))
        sortingService.getFreqsByGenerationAndVideoScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcessors(r))
        sortingService.getFreqsByGenerationAndVideoScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcFrequencies(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='' && screen != '') {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideoScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`  ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideoScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` )
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideoScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setBrands(r));
      sortingService.getFreqByGenerationAndProcessorAndVideoScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((r) => setProcFrequencies(r))
    } else if (category != "" && brand != "" && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreqScreen(7, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreqScreen(8, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreqScreen(49, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreqScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreqScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreqScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreqScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreqScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreqScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreqScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreqScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreqScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreqScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreqScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreqScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != ""  && frequency != '' && screen != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandFreqScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessorAndFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByProcAndBrandFreqScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessorFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != ""  && frequency != ''  && screen != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationFreqScreen(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndBrandFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrandFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreqScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreqScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreqScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && frequency != '' && screen != '') {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorFreqScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndProcessorFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessorFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' && frequency != ''  && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideoFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideoFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideoFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideoFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !=''  && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreqScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreqScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreqScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreqScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreqScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreqScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreqScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreqScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreqScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='' && frequency != '' && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideoFreqScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideoFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideoFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideoFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='' && frequency != '' && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideoFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideoFreqScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideoFreqScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideoFreqScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
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
        sortingService.getScreensByBrandAndProcessor(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
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
            sortingService.getScreensByBrandAndProcessor(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
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
            sortingService.getScreensByBrandAndProcessor(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
      }
    } else if (category != "" && brand != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrand(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrand(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndBrand(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setScreens(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '') {
        let arr = laptopsData
          .filter((r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase())
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
            sortingService.getScreensByProcessorBrandAndGeneration(5,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setScreens(result);
            });
      
    } else if (category != "" && processor != "" && generation != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndProcessor(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndProcessor(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase())
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
          sortingService.getScreensByGenerationAndProcessor(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandAndVideo(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandAndVideo(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandAndVideo(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByProcessorNVideo(7, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setScreens(res))
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
        sortingService.getScreensByProcessorNVideo(8, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setScreens(res))
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
        sortingService.getScreensByProcessorNVideo(49, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setScreens(res))
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
      sortingService.getScreenByProcessorAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
    } else if (brand != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndBrandAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
    } else if (category != "" && generation != "" && videoCard !='') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationAndVideo(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationAndVideo(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationAndVideo(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='') {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndProcessorAndVideo(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandFreq(7, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandFreq(8, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrandFreq(49, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByProcFreq(7, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setScreens(res))
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
        sortingService.getScreensByProcFreq(8, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setScreens(res))
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
        sortingService.getScreensByProcFreq(49, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setScreens(res))
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
      sortingService.getScreensByProcessorFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (brand != '' && generation != ""  && frequency != '' ) {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndBrandFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (category != "" && generation != "" && frequency != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationFreq(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationFreq(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGenerationFreq(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
      }
    } else if (processor != '' && generation != "" && frequency != '' ) {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndProcessorFreq(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByBrandAndVideoFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByTypeAndVideoFreq(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByTypeAndVideoFreq(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByTypeAndVideoFreq(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
      sortingService.getScreensByProcessorNVideoFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (generation != ""  && videoCard !='' && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndVideoFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (category != "" && brand != "" && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getFreqByBrandScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByBrandScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandScreen(7, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getFreqByBrandScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByBrandScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandScreen(8, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getFreqByBrandScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByBrandScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandScreen(49, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcFrequencies(res))
          sortingService.getVideosByProcScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcScreen(7, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcFrequencies(res))
          sortingService.getVideosByProcScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcScreen(8, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcFrequencies(res))
          sortingService.getVideosByProcScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcScreen(49, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && screen != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessorScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByBrandAndProcessorScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      sortingService.getVideosByProcAndBrandScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessorScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && screen != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationScreen(5,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByGenerationAndBrandScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      sortingService.getVideosByGenerationAndBrandScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrandScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGenerationScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationScreen(7, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGenerationScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationScreen(8, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          ).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r));
          sortingService.getVideosByGenerationScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationScreen(49, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && screen != '') {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[33] == matchScreen.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByGenerationAndProcessorScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      sortingService.getVideosByGenerationAndProcessorScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessorScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' && screen != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getFreqByBrandAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByBrandAndVideoScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !='' && screen != '' ) {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideoScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideoScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoScreen(7, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideoScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideoScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoScreen(8, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
        .filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByVideoScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByVideoScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoScreen(49, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='' && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideoScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideoScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByProcessorNVideoScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      sortingService.getBrandsByProcessorAndVideoScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideoScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='' && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideoScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideoScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideoScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByGenerationAndVideoScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndVideoScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
    } else if (brand != "" && frequency != '' && screen != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getVideosByBrandFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByBrandFreqScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && frequency != '' && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsFreqScreen(7, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreqScreen(7, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreqScreen(7, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreqScreen(7, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreqScreen(7, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsFreqScreen(8, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreqScreen(8, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreqScreen(8, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreqScreen(8, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreqScreen(8, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")
        .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsFreqScreen(49, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreqScreen(49, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreqScreen(49, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreqScreen(49, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreqScreen(49, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      }
    } else if (processor != "" && frequency != '' && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorFreqScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByProcFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcFreqScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != "" && frequency != ''  && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ) .filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationFreqScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenFreqScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationFreqScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByGenerationFreqScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationFreqScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
    } else if (videoCard != "" && frequency != '' && screen != '') {
      let arr = laptopsData.filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByVideoFreqScreen(5, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideoFreqScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideoFreqScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByVideoFreqScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByVideoFreqScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
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
          sortingService.getScreensByBrand(7, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrand(8, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setScreens(r))
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
          sortingService.getScreensByBrand(49, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByProc(7, `${matchProc.slug}-${matchProc.id}`).then((res) => setScreens(res))
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
          sortingService.getScreensByProc(8, `${matchProc.slug}-${matchProc.id}`).then((res) => setScreens(res))
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
          sortingService.getScreensByProc(49, `${matchProc.slug}-${matchProc.id}`).then((res) => setScreens(res))
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
      sortingService.getScreensByProcessor(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
    } else if (brand != '' && generation != "") {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndBrand(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setScreens(r))
    } else if (category != "" && generation != "") {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGeneration(7, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setScreens(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGeneration(8, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setScreens(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
        sortingService.getScreensByGeneration(49, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setScreens(r))
      }
    } else if (processor != '' && generation != "") {
      let arr = laptopsData
      .filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      )
      .filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndProcessor(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByBrandAndVideo(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByVideo(7, `${matchVideo.slug}-${matchVideo.id}`).then((r) =>setScreens(r))
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
        sortingService.getScreensByVideo(8, `${matchVideo.slug}-${matchVideo.id}`).then((r) =>setScreens(r))
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
        sortingService.getScreensByVideo(49, `${matchVideo.slug}-${matchVideo.id}`).then((r) =>setScreens(r))
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
      sortingService.getScreensByProcessorNVideo(5,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
    } else if (generation != ""  && videoCard !='') {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationAndVideo(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensByBrandFreq(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensFreq(7, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensFreq(8, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
        sortingService.getScreensFreq(49, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
      sortingService.getScreensByProcFreq(5,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (generation != "" && frequency != '' ) {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGenerationFreq(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
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
      sortingService.getScreensByVideoFreq(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (brand != "" && screen != '' ) {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getVideosByBrandScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByBrandScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandScreen(5, `${matchBrand.slug}-${matchBrand.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && screen != '') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished").filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsScreen(7, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceScreen(7, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsScreen(7, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeScreen(7, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosScreen(7, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getFreqsScreen(7, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand").filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsScreen(8, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceScreen(8, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsScreen(8, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeScreen(8, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosScreen(8, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getFreqsScreen(8, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou").filter((r) => r[33] == matchScreen.name);
        setFilteredData(arr);
        sortingService.getBrandsScreen(49, `${matchScreen.slug}-${matchScreen.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceScreen(49, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsScreen(49, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeScreen(49, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosScreen(49, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
        sortingService.getFreqsScreen(49, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (processor != ""  && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[24].toLowerCase() == processor.split('-').join(' ').toLowerCase()
      ).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorScreen(5, `${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByProcScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getFreqByProcScreen(5,`${matchProc.slug}-${matchProc.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    } else if (generation != ""  && screen != '') {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationScreen(5, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByGenerationScreen (5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      sortingService.getFreqByGenerationScreen(5,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    } else if (videoCard != "" && screen != '') {
      let arr = laptopsData.filter((r) => r[52].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByVideoScreen(5, `${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideoScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideoScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByVideoScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByVideoScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      sortingService.getFreqByVideoScreen(5,`${matchVideo.slug}-${matchVideo.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    } else if (frequency != "" && screen != '') {
      let arr = laptopsData.filter((r) => r[26] == matchFreq.name).filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByFreqScreen(5, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByFreqScreen(5, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByFreqScreen(5, `${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByFreqScreen(5,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByFreqScreen(5,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByFreqScreen(5,`${matchFreq.slug}-${matchFreq.id}`, `${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
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
        sortingService.getScreensByBrand(5, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setScreens(r))
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
        sortingService.getScreens(7).then((r) => setScreens(r))
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
        sortingService.getScreens(8).then((r) => setScreens(r))
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
        sortingService.getScreens(49).then((r) => setScreens(r))
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
      sortingService.getScreensByProc(5,`${matchProc.slug}-${matchProc.id}`).then((r) => setScreens(r))
    } else if (generation != "") {
      let arr = laptopsData.filter(
        (r) => r[31].toLowerCase() == generation.split('-').join(' ').toLowerCase()
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
      sortingService.getScreensByGeneration(5,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setScreens(r))
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
      sortingService.getScreensByVideo(5,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setScreens(r))
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
      sortingService.getScreenByFreq(5,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setScreens(r))
    } else if (screen != "") {
      let arr = laptopsData.filter((r) => r[33] == matchScreen.name);
      setFilteredData(arr);
      sortingService
        .getTypesByScreen(5, `${matchScreen.slug}-${matchScreen.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByScreen(5, `${matchScreen.slug}-${matchScreen.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByScreen(5, `${matchScreen.slug}-${matchScreen.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByScreen(5,`${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByScreen(5,`${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByScreen(5,`${matchScreen.slug}-${matchScreen.id}`).then((r) => setVideoCards(r))
      sortingService.getFreqsByScreen(5,`${matchScreen.slug}-${matchScreen.id}`).then((r) => setProcFrequencies(r))
    }
  }, [brand, category, processor, generation, videoCard, frequency, screen]);

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
            screens={screens}
            scrSelect={onScreenSelect}
            screenTitle
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
