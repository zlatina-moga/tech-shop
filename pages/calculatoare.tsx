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
  const [clicked, setClicked] = useState<boolean>(false);
  const [format, setFormat] = useState('');
  const [formats, setFormats] = useState([])

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
    sortingService.getFormats(1).then((r) => setFormats(r))
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
    if (priceRange != "" && category != "" && brand != "" && processor != '' && generation != '' && videoCard != '' && frequency != '' && format != '') {
      setShow(false);
      let arr = filteredData.filter((r) => r[17] <= Number(priceRange));
      setFilteredData(arr);
      setShow(true);
    } else if (priceRange != "" && (category != "" || brand != "" || processor != '' || generation != '' || videoCard != '' || frequency != '' || format != '')) {
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
  }, [priceRange, brand, category, processor, generation, videoCard, frequency, format]);

  const onCatSelect = (cat) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && generation != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (brand != "" && generation != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" && generation != "" && frequency != '' && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" && generation != "" && videoCard && frequency != '' && !(router.asPath.includes('category'))) {
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
    } else if (processor != "" && brand != "" && generation != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}`);
    } else if (processor != "" && brand != "" && videoCard && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && generation != "" && videoCard && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
    } else if (brand != "" && generation != ""  && videoCard && format != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" && frequency != '' && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}&format=${format}`);
    } else if (processor != "" && generation != "" && frequency != '' && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&frecventa=${frequency}&generatie=${generation}&format=${format}`);
    } else if (brand != "" && generation != "" && frequency != ''&& format != ''  && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&generatie=${generation}&format=${format}`);
    } else if (brand != "" && videoCard != "" && frequency != '' && format != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && videoCard != ""  && frequency != ''&& format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}}&frecventa=${frequency}&procesor=${processor}&format=${format}`);
    } else if (processor != "" && brand != "" && frequency != ''&& format != ''  && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&frecventa=${frequency}&procesor=${processor}&format=${format}`);
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
    } else if (videoCard != "" && generation != "" && format != ''&& !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}&frecventa=${frequency}&generatie=${generation}&format=${format}`);
    } else if (processor != "" && generation != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&procesor=${processor}&generatie=${generation}&format=${format}`);
    } else if (brand != "" && generation != "" && format != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&generatie=${generation}&format=${format}`);
    } else if (brand != "" && videoCard != "" && format != '' && !(router.asPath.includes('category')))  {
      setBaseLink(`/calculatoare?category=${cat}&brand=${brand}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&brand=${brand}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && videoCard != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}&procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}&procesor=${processor}&format=${format}`);
    } else if (videoCard != "" && generation != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?category=${cat}&placa-video=${videoCard}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${cat}&placa-video=${videoCard}&generatie=${generation}&format=${format}`);
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
    } else if (processor != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&format=${format}&category=${cat}`);
      router.push(`/calculatoare?procesor=${processor}&format=${format}&category=${cat}`);
    } else if (brand != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?brand=${brand}&format=${format}&category=${cat}`);
      router.push(`/calculatoare?brand=${brand}&format=${format}&category=${cat}`);
    } else if (generation != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}&category=${cat}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}&category=${cat}`);
    } else if (videoCard != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&format=${format}&category=${cat}`);
      router.push(`/calculatoare?placa-video=${videoCard}&format=${format}&category=${cat}`);
    } else if (frequency != "" && format != '' && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&format=${format}&category=${cat}`);
      router.push(`/calculatoare?frecventa=${frequency}&format=${format}&category=${cat}`);
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
    } else if (format != "" && !(router.asPath.includes('category'))) {
      setBaseLink(`/calculatoare?format=${format}&category=${cat}`);
      router.push(`/calculatoare?format=${format}&category=${cat}`);
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
    if (processor != "" && generation != "" && category != '' && videoCard && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
    } else if (generation != "" && category != '' && videoCard && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
    } else if (processor != "" && category != '' && videoCard && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
    } else if (processor != "" && generation != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}&brand=${br}`);
    } else if (processor != "" && generation != "" && category != '' &&  frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&brand=${br}`);
    } else if (processor != "" && generation != "" && category != '' && videoCard && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&brand=${br}`);
    } else if (processor != "" && generation != "" && category != '' && videoCard && frequency != '' && !(router.asPath.includes('brand'))) {
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
    } else if (processor != "" && generation != "" && category != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&format=${format}&brand=${br}`);
    } else if (processor != "" && generation != ""  && videoCard && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&brand=${br}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && category != ''  && videoCard && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&brand=${br}&format=${format}&placa-video=${videoCard}`);
    } else if (generation != "" && category != '' && videoCard && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&brand=${br}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && category != '' && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${frequency}&brand=${br}`);
    } else if (generation != "" && category != ''&& frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&format=${format}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&format=${format}&frecventa=${frequency}&brand=${br}`);
    } else if (videoCard != "" && category != '' && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&brand=${br}`);
    } else if (processor != "" && videoCard != ''&& frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&format=${format}&frecventa=${frequency}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&format=${format}&frecventa=${frequency}&brand=${br}`);
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
    } else if (processor != "" && generation != ""  && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&brand=${br}`);
    } else if (processor != "" && category != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&brand=${br}`);
    } else if (generation != "" && category != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&brand=${br}`);
    } else if (videoCard != "" && generation != "" && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&generatie=${generation}&format=${format}&brand=${br}`);
    } else if (videoCard != "" && category != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&brand=${br}`);
    } else if (processor != "" && videoCard != ''&& format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&procesor=${processor}&format=${format}&brand=${br}`);
    } else if (category != "" && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&frecventa=${frequency}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&frecventa=${frequency}&format=${format}&brand=${br}`);
    } else if (processor != ""  && frequency != '' && format != ''  && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&frecventa=${frequency}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&frecventa=${frequency}&format=${format}&brand=${br}`);
    } else if (generation != "" && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&frecventa=${frequency}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?generatie=${generation}&frecventa=${frequency}&format=${format}&brand=${br}`);
    } else if (videoCard != ""  && frequency != '' && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&frecventa=${frequency}&format=${format}&brand=${br}`);
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
    } else if (category != "" && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?category=${category}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?category=${category}&format=${format}&brand=${br}`);
    } else if (processor != "" && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?procesor=${processor}&format=${format}&brand=${br}`);
    } else if (generation != "" && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}&brand=${br}`);
    } else if (videoCard != "" && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?placa-video=${videoCard}&format=${format}&brand=${br}`);
    } else if (frequency!= "" && format != '' && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&format=${format}&brand=${br}`);
      router.push(`/calculatoare?frecventa=${frequency}&format=${format}&brand=${br}`);
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
    } else if (format!= "" && !(router.asPath.includes('brand'))) {
      setBaseLink(`/calculatoare?format=${format}&brand=${br}`);
      router.push(`/calculatoare?format=${format}&brand=${br}`);
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
    if (generation != "" && brand != "" && category != "" && videoCard  && frequency != '' && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (brand != "" && category != "" && videoCard  && frequency != '' && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (generation != "" && category != "" && videoCard  && frequency != '' && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (generation != "" && brand != "" && videoCard  && frequency != '' && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (generation != "" && brand != "" && category != "" && frequency != '' && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (generation != "" && brand != "" && category != "" && videoCard  && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
    } else if (generation != "" && brand != "" && category != "" && videoCard  && frequency != '' && !(router.asPath.includes('procesor'))) {
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
    } else if (brand != "" && generation != "" && videoCard && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && videoCard && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && generation != "" && format !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && category != "" && format !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
    } else if (generation != ""  && category != "" && format !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&procesor=${processor}`);
    } else if (brand != "" && videoCard != ""  && format !='' && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
    } else if (generation != "" && videoCard  && format !='' && frequency != ''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
    } else if (category != "" && videoCard  && format !='' && frequency != '' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
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
    } else if (brand != "" && generation != "" && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}procesor=${processor}`);
    } else if (brand != "" && category != "" && format !=''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&format=${format}&procesor=${processor}`);
    } else if (generation != ""  && category != ""&& format !=''&& !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && videoCard != "" && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (generation != "" && videoCard && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (category != "" && videoCard && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
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
    } else if (brand != ""  && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?brand=${brand}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&format=${format}&procesor=${processor}`);
    } else if (generation != ""  && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}&procesor=${processor}`);
    } else if (category != ""  && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?category=${category}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&format=${format}&procesor=${processor}`);
    } else if (videoCard != ""  && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (frequency != ""  && format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?frecventa=${frequency}&format=${format}&procesor=${processor}`);
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
    } else if (format !='' && !(router.asPath.includes('procesor'))) {
      setBaseLink(`/calculatoare?format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?format=${format}&procesor=${processor}`);
    }else if (router.asPath.includes('procesor')) {
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
    if (processor != "" && brand != "" && category != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&generatie=${generation}`);
    } else if (brand != "" && category != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && frequency != '' && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard && frequency != '' && !(router.asPath.includes('generatie'))) {
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
    } else if (processor != "" && brand != "" && category != "" && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && brand != "" && videoCard && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && category != "" && videoCard && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && category != "" && videoCard && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (processor != "" && brand != "" && format != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && category != "" && format != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && category != "" && format != ''&& frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && videoCard && format != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&frecventa=${frequency}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && videoCard && format != '' && frequency != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&procesor=${processor}`);
    } else if (category != "" && videoCard && format != '' && frequency != ''  && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&frecventa=${frequency}&generatie=${generation}`);
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
    } else if (processor != "" && brand != "" && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && category != "" && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && category != "" && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&procesor=${processor}`);
    } else if (brand != "" && videoCard && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
    } else if (processor != "" && videoCard && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&placa-video=${videoCard}&format=${format}&procesor=${processor}`);
    } else if (category != "" && videoCard && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&placa-video=${videoCard}&format=${format}&generatie=${generation}`);
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
    } else if (brand != ""  && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?brand=${brand}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?brand=${brand}&format=${format}&generatie=${generation}`);
    } else if (processor != ""  && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}&procesor=${processor}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}&procesor=${processor}`);
    } else if (category != ""  && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?category=${category}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?category=${category}&format=${format}&generatie=${generation}`);
    } else if (videoCard != ""  && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?placa-video=${videoCard}&format=${format}&generatie=${generation}`);
    } else if (frequency != ""  && format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?frecventa=${frequency}&format=${format}&generatie=${generation}`);
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
    } else if (format != '' && !(router.asPath.includes('generatie'))) {
      setBaseLink(`/calculatoare?format=${format}&generatie=${generation}`);
      router.push(`/calculatoare?format=${format}&generatie=${generation}`);
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
    if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && generation != '' && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('placa-video'))) {
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
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != ''&& format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&format=${format}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&format=${format}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && generation != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" &&  generation != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&generatie=${generation}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&generatie=${generation}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && category != "" && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&format=${format}&procesor=${processor}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&format=${format}&procesor=${processor}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != ''&& format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
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
    } else if (processor != "" && brand != ""&& format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?brand=${brand}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&format=${format}&placa-video=${videoCard}`);
    } else if (category != "" && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?category=${category}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&format=${format}&placa-video=${videoCard}`);
    } else if (generation != "" && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (frequency != "" && format!= '' && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
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
    } else if (format!= ''  && !(router.asPath.includes('placa-video'))) {
      setBaseLink(`/calculatoare?format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?format=${format}&placa-video=${videoCard}`);
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
    if (processor != "" && brand != "" && category != "" && generation != '' && videoCard != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && generation != '' && videoCard != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != '' && videoCard != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && generation != '' && videoCard != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
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
    } else if (brand != "" && category != "" && generation != ''&& format !=''  && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && generation != ''&& format !=''  && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" &&  generation != ''&& format !=''  && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && category != "" && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != ''&& format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (brand != "" && category != "" && videoCard != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && category != "" && videoCard != ''&& format !=''  && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (generation != "" && category != "" && videoCard != '' && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (brand != "" && generation != "" && videoCard != '' && format !=''  && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && generation != "" && videoCard != '' && format !=''  && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != "" && videoCard != ''&& format !=''  && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
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
    } else if (processor != "" && brand != "" && videoCard != ''  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&frecventa=${fr}`);
    } else if (brand != "" && category != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && category != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${fr}`);
    } else if (generation != "" && category != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${fr}`);
    } else if (brand != "" && generation != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && generation != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && brand != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&frecventa=${fr}`);
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
    } else if (brand != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?brand=${brand}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?brand=${brand}&format=${format}&frecventa=${fr}`);
    } else if (processor != "" && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?procesor=${processor}&format=${format}&frecventa=${fr}`);
    } else if (category != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?category=${category}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?category=${category}&format=${format}&frecventa=${fr}`);
    } else if (generation != ""  && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}&frecventa=${fr}`);
    } else if (videoCard != "" && format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?placa-video=${videoCard}&format=${format}&frecventa=${fr}`);
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
    } else if (format !='' && !(router.asPath.includes('frecventa'))) {
      setBaseLink(`/calculatoare?format=${format}&frecventa=${fr}`);
      router.push(`/calculatoare?format=${format}&frecventa=${fr}`);
    } else if (router.asPath.includes('frecventa')) {
      setBaseLink(`/calculatoare?frecventa=${fr}`);
      router.push(`/calculatoare?frecventa=${fr}`);
    } else {
      setBaseLink(`/calculatoare?frecventa=${fr}`);
      router.push(`/calculatoare?frecventa=${fr}`);
    }
    setMultupleSelected(true);
    setFrequency(fr)
  }

  const onFormatSelect = (format) => {
    setCurrentPage(1);
    if (processor != "" && brand != "" && category != "" && generation != '' && frequency != '' && videoCard != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (brand != "" && category != "" && generation != '' && frequency != '' && videoCard != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && category != "" && generation != '' && frequency != '' && videoCard != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != ""  && generation != '' && frequency != '' && videoCard != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && videoCard != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else  if (processor != "" && brand != "" && category != "" && generation != '' && videoCard != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
    } else  if (processor != "" && brand != "" && category != "" && generation != '' && frequency != ''&& !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    }  else if (brand != "" && category != "" && generation != '' && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" &&  category != "" && generation != '' && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && brand != "" && generation != '' && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && brand != "" && category != "" && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && brand != "" && category != "" && generation != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}`);
    } else if (brand != "" && category != "" && generation != ''&& videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&placa-video=${videoCard}}&format=${format}`);
    } else if (processor != "" && category != "" && generation != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" &&  generation != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" && category != "" && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && brand != "" && frequency != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (brand != "" && category != "" && frequency != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&placa-video=${videoCard}&format=${format}`);
    } else if (processor != "" && category != "" && frequency != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && frequency != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && frequency != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && frequency != ''&& videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && frequency != '' && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&frecventa=${frequency}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && generation != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&generatie=${generation}&format=${format}`);
    } else if (processor != "" && category != "" && generation != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&generatie=${generation}&format=${format}`);
    } else if (processor != "" && brand != "" &&  generation != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&generatie=${generation}&format=${format}`);
    } else if (processor != "" && brand != "" && category != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?category=${category}&brand=${brand}&procesor=${processor}&format=${format}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}`);
    } else if (brand != "" && category != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&format=${format}`);
    } else if (processor != "" && category != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}`);
    } else if (generation != "" && category != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}`);
    } else if (brand != "" && generation != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}`);
    } else if (processor != "" && generation != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}`);
    } else if (processor != "" && brand != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&frecventa=${frequency}&format=${format}`);
    } else if (brand != "" && category != "" && frequency != ''&& !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && category != "" && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&frecventa=${frequency}&format=${format}`);
    } else if (generation != "" && category != "" && frequency != ''&& !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (brand != "" && generation != "" && frequency != ''&& !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && generation != "" && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && brand != "" && frequency != '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&frecventa=${frequency}&format=${format}}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&frecventa=${frequency}&format=${format}`);
    } else if (processor != "" && brand != ""&& videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && category != "" && videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&category=${category}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&category=${category}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && category != "" && videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&procesor=${processor}&format=${format}&placa-video=${videoCard}`);
    } else if (generation != "" && category != "" && videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && generation != "" && videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && generation != "" && videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && brand != "" && videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&brand=${brand}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?brand=${brand}&format=${format}&placa-video=${videoCard}`);
    } else if (processor != "" && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?procesor=${processor}&format=${format}&placa-video=${videoCard}`);
    } else if (category != "" && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?category=${category}&format=${format}&placa-video=${videoCard}`);
    } else if (generation != "" && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}&placa-video=${videoCard}`);
    } else if (frequency != "" && videoCard!= '' && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
      router.push(`/calculatoare?frecventa=${frequency}&format=${format}&placa-video=${videoCard}`);
    } else if (brand != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?brand=${brand}&format=${format}`);
      router.push(`/calculatoare?brand=${brand}&format=${format}`);
    } else if (processor != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?procesor=${processor}&format=${format}`);
      router.push(`/calculatoare?procesor=${processor}&format=${format}`);
    } else if (category != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?category=${category}&format=${format}`);
      router.push(`/calculatoare?category=${category}&format=${format}`);
    } else if (generation != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?generatie=${generation}&format=${format}`);
      router.push(`/calculatoare?generatie=${generation}&format=${format}`);
    } else if (frequency != "" && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?frecventa=${frequency}&format=${format}`);
      router.push(`/calculatoare?frecventa=${frequency}&format=${format}`);
    } else if (videoCard!= ''  && !(router.asPath.includes('format'))) {
      setBaseLink(`/calculatoare?placa-video=${videoCard}&format=${format}`);
      router.push(`/calculatoare?placa-video=${videoCard}&format=${format}`);
    }  else if (router.asPath.includes('format')) {
      setBaseLink(`/calculatoare?format=${format}`);
      router.push(`/calculatoare?format=${format}`);
    } else {
      setBaseLink(`/calculatoare?format=${format}`);
      router.push(`/calculatoare?format=${format}`);
    }
    setMultupleSelected(true);
    setFormat(format)
  };

  const onReset = () => {
    setClicked(true);
    setMultupleSelected(false);
    setBaseLink(`/calculatoare`);
    router.push(`/calculatoare`);
  }

  useEffect(() => {
    if (clicked) {
      setShow(false)
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_calculatoare", {
      skipEmptyLines: true,
      complete: (results) => {
        setFilteredData(results.data.slice(1));
        setShow(true)
      },
    }
  );
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
  sortingService.getFormats(1).then((r) => setFormats(r))
    }
  }, [clicked, readRemoteFile])

  let matchBrand = brands.find((x) => x.slug == brand);
  let matchProc = processors.find((x) => x.slug == processor);
  let matchGeneration = processorsGeneration.find((x) => x.slug == generation);
  let matchVideo = videoCards.find((x) => x.slug == videoCard);
  let matchFreq = procFrequencies.find((x) => x.slug == frequency);
  let matchFormat = formats.find((x) => x.slug == format);

  useEffect(() => {
    if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
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
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorVideoAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
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
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorVideoAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      }
    } else if (brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' && format != '') {
        let arr = laptopsData
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
        .getHighestPriceByBrandGenerationProcessorVideoAndFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
      
    } else if (category != "" &&  processor != '' && generation != '' && videoCard !='' && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationProcessorVideoAndFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });

        sortingService.getBrandsByGenerationProcessorVideoAndFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationProcessorVideoAndFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
        .getHighestPriceByGenerationProcessorVideoAndFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });

          sortingService.getBrandsByGenerationProcessorVideoAndFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationVideoAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcsByGenerationProcessorVideoAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessors(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandGenerationVideoAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcsByGenerationProcessorVideoAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessors(res))
      } else if (category == "nou") {
        let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandGenerationVideoAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcsByGenerationProcessorVideoAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessors(res))
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='' && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorVideoAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenByBrandProcessorVideoAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[25] == matchProc.name)
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandProcessorVideoAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getGenByBrandProcessorVideoAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[25] == matchProc.name)
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandProcessorVideoAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getGenByBrandProcessorVideoAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByBrandProcessorGenAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByBrandProcessorGenAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByBrandProcessorGenAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getFreqsByGenerationProcessorVideoAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getFreqsByGenerationProcessorVideoAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getFreqsByGenerationProcessorVideoAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
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
          sortingService.getFormatsByBrandGenerationProcessorVideoAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationProcessorVideoAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationProcessorVideoAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
      }
    } else if (brand != "" && processor != '' && generation != '' && videoCard !='' && frequency != '' ) {
        let arr = laptopsData
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name);
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandGenerationProcessorVideoAndFreq(1, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}` )
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getTypesByProcessorBrandGenerationNVideoFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((result) => {
            setCategories(result);
          });
        sortingService.getFormatsByBrandGenerationProcessorVideoAndFreq(1, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getBrandsByGenerationAndProcessorVideoAndFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setBrands(r));
          sortingService.getFormatsByGenerationProcessorVideoAndFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationProcessorVideoAndFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationProcessorVideoAndFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationVideoAndFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationVideoAndFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationVideoAndFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandProcessorVideoAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandProcessorVideoAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandProcessorVideoAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationProcessorAndFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationProcessorAndFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationProcessorAndFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByBrandGenerationProcessorVideo(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationProcessorVideo(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandGenerationProcessorVideo(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
      }
    } else if (category != "" && brand != "" && processor != '' && generation != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorFormat(2, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByGenerationBrandAndProcFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setVideoCards(res)
          });
          sortingService.getFreqByGenerationBrandAndProcFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[25] == matchProc.name)
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandGenerationAndProcessorFormat(4, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getVideosByGenerationBrandAndProcFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setVideoCards(res)
        });
        sortingService.getFreqByGenerationBrandAndProcFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcFrequencies(res)
        });
      } else if (category == "nou") {
        let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[25] == matchProc.name)
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandGenerationAndProcessorFormat(3, `${matchBrand.slug}-${matchBrand.id}`,  `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getVideosByGenerationBrandAndProcFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setVideoCards(res)
        });
        sortingService.getFreqByGenerationBrandAndProcFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcFrequencies(res)
        });
      }
    } else if (category != "" && brand != "" && processor != '' && videoCard !='' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandProcessorAndVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcFrequencies(res)
          });
        sortingService.getGenerationsByProcessorAndVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandProcessorAndVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByBrandAndProcVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcFrequencies(res)
        });
      sortingService.getGenerationsByProcessorAndVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandProcessorAndVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getFreqByBrandAndProcVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcFrequencies(res)
        });
      sortingService.getGenerationsByProcessorAndVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && brand != "" && generation != '' && videoCard !='' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationAndVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByGenerationBrandAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcFrequencies(res)
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandAndGenerationAndVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getProcessorsByGenerationAndBrandAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcessors(res);
        });
        sortingService.getFreqByGenerationBrandAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcFrequencies(res)
        });
      } else if (category == "nou") {
        let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByBrandAndGenerationAndVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getProcessorsByGenerationAndBrandAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcessors(res);
        });
        sortingService.getFreqByGenerationBrandAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`,  `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
          setProcFrequencies(res)
        });
      }
    } else if (processor != "" && brand != "" && generation != '' && videoCard !='' && format != '') {
      let arr = laptopsData
        .filter((r) => r[25] == matchProc.name)
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter( (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getTypesByProcessorBrandGenerationNVideoFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setCategories(result);
        });
        sortingService
          .getHighestPriceByBrandGenerationAndProcessorNVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationBrandAndProcVideoFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcFrequencies(res)
          });
    
    } else if (category != "" && processor != "" && generation != '' && videoCard !='' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorNVideoFormat(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getBrandsByGenerationAndProcessorAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
          sortingService.getFreqByGenerationAndProcVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((resp) => setProcFrequencies(resp))
      } else if (category == "second-hand") {
        let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoFormat(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((resp) => setProcFrequencies(resp))
      } else if (category == "nou") {
        let arr = laptopsData
        .filter((r) => r[2] == "Nou")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoFormat(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
        sortingService.getFreqByGenerationAndProcVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((resp) => setProcFrequencies(resp))
      }
      } else if (category != "" && brand != "" && processor != '' && frequency != '' && format != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndProcessorAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getVideosByBrandAndProcessorFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByProcessorAndFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessorFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "nou") {
          let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getVideosByBrandAndProcessorFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByProcessorAndFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        }
      } else if (category != "" && brand != "" && generation != '' && frequency != '' && format != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndGenerationFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndBrandFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getVideosByGenerationAndBrandFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
              setVideoCards(res);
            });
        } else if (category == "second-hand") {
          let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setVideoCards(res);
          });
        } else if (category == "nou") {
          let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setVideoCards(res);
          });
        }
      } else if (processor != "" && brand != "" && generation != '' && frequency != ''  && format != '' ) {
        let arr = laptopsData
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService.getTypesByProcessorBrandAndGenerationFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
            setCategories(result);
          });
          sortingService
            .getHighestPriceByBrandGenerationAndProcessorFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByProcessorBrandAndGenerationFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
              setVideoCards(result);
            });
            sortingService.getFreqByProcessorBrandAndGenerationFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      
      } else if (category != "" && processor != "" && generation != '' && frequency != '' && format != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByGenerationAndProcessorFreqFormat(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByGenerationAndProcessorFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
            sortingService.getBrandsByGenerationAndProcessorFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreqFormat(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
        } else if (category == "nou") {
          let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFreqFormat(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationAndProcessorFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
        }
      } else if (category != "" && brand != "" && videoCard !='' && frequency != '' && format != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService
            .getHighestPriceByBrandAndVideoFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getProcessorsByBrandAndVideoFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
              setProcessors(res);
            });
            sortingService.getGenerationsByBrandAndVideoFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        } else if (category == "nou") {
          let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandAndVideoFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        }
      } else if (category != "" && processor != "" && videoCard !='' && frequency != ''  && format != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter(
              (r) => r[25] == matchProc.name
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService.getBrandsByProcessorAndVideoFreqFormat(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByProcessorAndVideoFreqFormat(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getGenerationsByProcessorNVideoFreqFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
        } else if (category == "second-hand") {
          let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreqFormat(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreqFormat(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreqFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
        } else if (category == "nou") {
          let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFreqFormat(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFreqFormat(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcessorNVideoFreqFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
        }
      } else if (brand != '' && processor != "" && videoCard !='' && frequency != '' && format != '') {
        let arr = laptopsData
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService.getTypesByProcessorAndBrandAndVideoFreqFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
        setBrands(result);
      });
      sortingService
      .getHighestPriceByBrandProcessorAndVideoFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getGenerationsByProcessorAndVideoFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (brand != '' && generation != "" && videoCard !='' && frequency != '' && format != '') {
        let arr = laptopsData
        .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
        .filter(
          (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService.getTypesByBrandAndGenerationVideoFreqFormat(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
        setCategories(result);
      });
      sortingService
        .getHighestPriceByBrandAndGenerationVideoFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByGenerationAndBrandAndVideoFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      } else if (category != "" && generation != "" && videoCard !='' && frequency != '' && format != '') {
        if (category == "refurbished") {
          let arr = laptopsData
            .filter((r) => r[2] == "Refurbished")
            .filter(
              (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService.getBrandsByGenerationAndVideFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByGenAndVideoFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndVideoFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        } else if (category == "second-hand") {
          let arr = laptopsData
            .filter((r) => r[2] == "Second Hand")
            .filter(
              (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService.getBrandsByGenerationAndVideFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByGenAndVideoFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndVideoFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        } else if (category == "nou") {
          let arr = laptopsData
            .filter((r) => r[2] == "Nou")
            .filter(
              (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
            )
            .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
            .filter((r) => r[31] == matchFreq.name)
            .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService.getBrandsByGenerationAndVideFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
            setBrands(result);
          });
          sortingService
            .getHighestPriceByGenAndVideoFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
          sortingService.getProcessorsByGenerationAndVideoFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        }
      } else if (processor != '' && generation != "" && videoCard !='' && frequency != '' && format != '') {
        let arr = laptopsData
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter(
          (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService.getTypesByProcessorAndGenAndVideoFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((result) => {
        setBrands(result);
      });
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoFreqFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      } else if (category != "" && processor != "" && generation != '' && videoCard !='' && format != '') {
    if (category == "refurbished") {
      let arr = laptopsData
        .filter((r) => r[2] == "Refurbished")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoFormat(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
    } else if (category == "second-hand") {
      let arr = laptopsData
        .filter((r) => r[2] == "Second Hand")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoFormat(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
    } else if (category == "nou") {
      let arr = laptopsData
        .filter((r) => r[2] == "Noi")
        .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
        .filter(
          (r) => r[25] == matchProc.name
        )
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getHighestPriceByGenerationAndProcessorNVideoFormat(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id} `, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getBrandsByGenerationAndProcessorAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
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
          sortingService.getFormatsByGenerationBrandAndProc(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setFormats(res)
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
          sortingService.getFormatsByGenerationBrandAndProc(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setFormats(res)
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
          sortingService.getFormatsByGenerationBrandAndProc(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((res) => {
            setFormats(res)
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
        sortingService.getFormatsByProcessorAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByProcessorAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByProcessorAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatByGenerationBrandAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setFormats(res)
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
          sortingService.getFormatByGenerationBrandAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setFormats(res)
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
          sortingService.getFormatByGenerationBrandAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`,`${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setFormats(res)
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
          sortingService.getFormatByGenerationBrandAndProcVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => {
            setFormats(res)
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
          sortingService.getFormatByGenerationAndProcVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setFormats(resp))
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
          sortingService.getFormatByGenerationAndProcVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setFormats(resp))
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
          sortingService.getFormatByGenerationAndProcVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((resp) => setFormats(resp))
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
          sortingService.getVideosByBrandAndProcessorAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByProcessorAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getFormatsByBrandAndProcessorAndFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getVideosByBrandAndProcessorAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
            sortingService.getGenerationsByProcessorAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
            sortingService.getFormatsByBrandAndProcessorAndFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getVideosByBrandAndProcessorAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
            sortingService.getGenerationsByProcessorAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
            sortingService.getFormatsByBrandAndProcessorAndFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByGenerationAndBrandFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setFormats(res);
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
            sortingService.getFormatsByGenerationAndBrandFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setFormats(res);
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
            sortingService.getFormatsByGenerationAndBrandFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`,  `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
              setFormats(res);
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

            sortingService.getFormatsByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setFormats(r))
      
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
            sortingService.getFormatsByGenerationAndProcessorFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByGenerationAndProcessorFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByGenerationAndProcessorFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByBrandAndVideoFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByBrandAndVideoFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByBrandAndVideoFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByProcessorNVideoFreq(2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setFormats(res))
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
            sortingService.getFormatsByProcessorNVideoFreq(4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setFormats(res))
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
            sortingService.getFormatsByProcessorNVideoFreq(3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setFormats(res))
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
        sortingService.getFormatsByProcessorAndVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByGenerationAndBrandAndVideoFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationAndVideoFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByGenerationAndVideoFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByGenerationAndVideoFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
    } else if (category != "" && brand != "" && processor != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          ).filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndProcessorFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcessorFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByProcessorFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrandAndProcessorFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          ).filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndProcessorFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcessorFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByProcessorFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrandAndProcessorFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter(
            (r) => r[25] == matchProc.name
          ).filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService
          .getHighestPriceByBrandAndProcessorFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByBrandAndProcessorFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByProcessorFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrandAndProcessorFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      }
    } else if (category != "" && brand != "" && generation != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrandFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrandFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcFrequencies(res);
          });
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndGenerationFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getProcessorsByGenerationAndBrandFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getVideosByGenerationAndBrandFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setVideoCards(res);
          });
          sortingService.getFreqByGenerationAndBrandFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcFrequencies(res);
          });
      }
    } else if (processor != "" && brand != "" && generation != '' && format != '') {
        let arr = laptopsData
          .filter((r) => r[25] == matchProc.name)
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter( (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
          setFilteredData(arr);
          sortingService.getTypesByProcessorBrandAndGenerationFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((result) => {
            setCategories(result);
          });
          sortingService
            .getHighestPriceByBrandGenerationAndProcessorFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
            .then((response) => {
              setHighestPrice(response[1]);
            });
            sortingService.getVideosByProcessorBrandAndGenerationFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((result) => {
              setVideoCards(result);
            });
            sortingService.getFreqByProcessorBrandAndGenerationFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
              setProcFrequencies(result);
            });
      
    } else if (category != "" && processor != "" && generation != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          ).filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFormat(2,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessorFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessorFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          ).filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFormat(4,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessorFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessorFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase())
          .filter(
            (r) => r[25] == matchProc.name
          ).filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByGenerationAndProcessorFormat(3,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationAndProcessorFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
          sortingService.getVideosByGenerationAndProcessorFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getBrandsByGenerationAndProcessorFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      }
    } else if (category != "" && brand != "" && videoCard !='' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideoFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideoFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandAndVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandAndVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandAndVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandAndVideoFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && videoCard !='' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFormat(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFormat(2, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideoFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideoFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFormat(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFormat(4, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideoFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideoFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorAndVideoFormat(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorAndVideoFormat(3, `${matchProc.slug}-${matchProc.id}`,  `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcessorNVideoFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcessorNVideoFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != "" && videoCard !='' && format != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandAndVideoFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
    .getHighestPriceByBrandProcessorAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByProcessorAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProcessorAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != "" && videoCard !='' && format != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationAndVideoFormat(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqsByGenerationAndBrandAndVideoFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndBrandAndVideoFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && videoCard !='' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideoFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideoFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqsByGenerationAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getProcessorsByGenerationAndVideoFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && videoCard !='' && format != '') {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenAndVideoFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorNVideoFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorAndVideoFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r));
      sortingService.getFreqByGenerationAndProcessorAndVideoFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && brand != "" && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreqFormat(2, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreqFormat(4, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreqFormat(3, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (category != "" && processor != "" && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreqFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreqFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreqFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreqFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreqFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreqFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreqFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreqFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFreqFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFreqFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByProcFreqFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setVideoCards(res))
        sortingService.getGenerationsByProcFreqFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
      }
    } else if (brand != '' && processor != ""  && frequency != '' && format != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandFreqFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessorAndFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByProcAndBrandFreqFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcessorFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
    } else if (brand != '' && generation != ""  && frequency != '' && format != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationFreqFormat(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndBrandFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationAndBrandFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
    } else if (category != "" && generation != "" && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreqFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreqFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Nou")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[31] == matchFreq.name)
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getVideosByGenerationFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getProcessorsByGenerationFreqFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      }
    } else if (processor != '' && generation != "" && frequency != '' && format != '') {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorFreqFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getVideosByGenerationAndProcessorFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      sortingService.getBrandsByGenerationAndProcessorFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
    } else if (brand != "" && videoCard !='' && frequency != '' && format != '') {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideoFreqFormat (1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideoFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideoFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideoFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && videoCard !=''  && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreqFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreqFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreqFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreqFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreqFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreqFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreqFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreqFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")    
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFreqFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFreqFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFreqFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFreqFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      }
    } else if (processor != "" && videoCard !='' && frequency != '' && format != '') {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideoFreqFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideoFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideoFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideoFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != ""  && videoCard !='' && frequency != '' && format != '') {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase())
      .filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideoFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideoFreqFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideoFreqFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideoFreqFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
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
        sortingService.getFormatsByBrandAndProcessor(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByBrandAndProcessor(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
            sortingService.getFormatsByBrandAndProcessor(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationAndBrand(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setFormats(res);
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
          sortingService.getFormatsByGenerationAndBrand(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setFormats(res);
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
          sortingService.getFormatsByGenerationAndBrand(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((res) => {
            setFormats(res);
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
            sortingService.getFormatsByProcessorBrandAndGeneration(1,`${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` ).then((result) => {
              setFormats(result);
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
          sortingService.getFormatsByGenerationAndProcessor(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationAndProcessor(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationAndProcessor(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandAndVideo(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandAndVideo(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByBrandAndVideo(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByProcessorNVideo (2, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setFormats(res))
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
          sortingService.getFormatsByProcessorNVideo (4, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setFormats(res))
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
          sortingService.getFormatsByProcessorNVideo (3, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((res) => setFormats(res))
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
      sortingService.getFormatsByProcessorAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatsByGenerationAndBrandAndVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByGenerationAndVideo(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationAndVideo(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationAndVideo(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatsByGenerationAndProcessorAndVideo(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
          sortingService.getProcessorsByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.getVideosByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.geFormatsByBrandFreq(2, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getProcessorsByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.geFormatsByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
          sortingService.getVideosByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
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
          sortingService.getProcessorsByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => {
            setProcessors(res);
          })
          sortingService.geFormatsByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
          sortingService.getVideosByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setVideoCards(r))
          sortingService.getGenerationsByBrandFreq(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setProcessorsGeneration(r))
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
        sortingService.getFormatsByProcFreq(2, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setFormats(res))
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
          sortingService.getFormatsByProcFreq(4, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setFormats(res))
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
          sortingService.getFormatsByProcFreq(3, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((res) => setFormats(res))
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
      sortingService.getFormatsByProcessorFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatsByGenerationAndBrandFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByGenerationFreq(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationFreq(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatsByGenerationFreq(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatsByGenerationAndProcessorFreq(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByBrandAndVideoFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByTypeAndVideoFreq(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByTypeAndVideoFreq(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatsByTypeAndVideoFreq(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatsByProcessorNVideoFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatsByGenerationAndVideoFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
    } else if (category != "" && brand != "" && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getFreqByBrandFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
          sortingService.getGenerationsByBrandFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrandFormat(2, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrandFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getFreqByBrandFormat(4, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService
          .getHighestPriceByBrandFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getProcessorsByBrandFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => {
            setProcessors(res);
          });
          sortingService.getGenerationsByBrandFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
          sortingService.getVideosByBrandFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
          sortingService.getFreqByBrandFormat(3, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (category != "" && processor != "" && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByProcFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcFrequencies(res))
        sortingService.getGenerationsByProcFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getVideosByProcFormat(2, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setVideoCards(res))
        
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getVideosByProcFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setVideoCards(res))
        sortingService.getFreqByProcFormat(4, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcFrequencies(res))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[25] == matchProc.name
          )
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByProcessorFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByProcessorFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
        sortingService.getGenerationsByProcFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcessorsGeneration(res))
        sortingService.getVideosByProcFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setVideoCards(res))
        sortingService.getFreqByProcFormat(3, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((res) => setProcFrequencies(res))
      }
    } else if (brand != '' && processor != "" && format != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndBrandFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndProcessorFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByBrandAndProcessorFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProcessorFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getVideosByProcAndBrandFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      
    } else if (brand != '' && generation != ""  && format != '') {
      let arr = laptopsData
      .filter((r) => r[18].toUpperCase() == brand.toUpperCase())
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      )
      .filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByBrandAndGenerationFormat(1,`${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}` , `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
      setCategories(result);
    });
    sortingService
      .getHighestPriceByBrandAndGenerationFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getFreqByGenerationAndBrandFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationAndBrandFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByGenerationAndBrandFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
    } else if (category != "" && generation != "" && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData
          .filter((r) => r[2] == "Refurbished")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r));
        sortingService.getProcessorsByGenerationFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r));
        sortingService.getVideosByGenerationFormat(2, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData
          .filter((r) => r[2] == "Second Hand")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r));
        sortingService.getProcessorsByGenerationFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r));
        sortingService.getVideosByGenerationFormat(4, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData
          .filter((r) => r[2] == "Noi")
          .filter(
            (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
          )
          .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByGenerationFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService
          .getHighestPriceByGenFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
          .then((response) => {
            setHighestPrice(response[1]);
          });
          sortingService.getFreqByGenerationFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r));
        sortingService.getProcessorsByGenerationFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r));
        sortingService.getVideosByGenerationFormat(3, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      }
    } else if (processor != '' && generation != "" && format != '') {
      let arr = laptopsData
      .filter(
        (r) => r[25] == matchProc.name
      )
      .filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[24] == matchFormat.name);
    setFilteredData(arr);
    sortingService.getTypesByProcessorAndGenFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}` ).then((result) => {
      setBrands(result);
    });
    sortingService
      .getHighestPriceByGenerationAndProcessorFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
      .then((response) => {
        setHighestPrice(response[1]);
      });
      sortingService.getBrandsByGenerationAndProcessorFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setBrands(r))
      sortingService.getVideosByGenerationAndProcessorFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      sortingService.getFreqByGenerationAndProcessorFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != "" && videoCard !='' && format != '') {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getGenerationsByBrandAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByBrandAndVideoFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
    } else if (category != "" && videoCard !=''  && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByVideoFormat(2, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByVideoFormat(4, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi")    
        .filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsByVideoFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceByTypeVideoFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByVideoFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeAndVideoFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getFreqByVideoFormat(3, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (processor != "" && videoCard !=''  && format != '') {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorAndVideoFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorAndVideoFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorAndVideoFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByProcessorNVideoFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getFreqByProcessorNVideoFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
    } else if (generation != ""  && videoCard !='' && format != '') {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[24] == matchFormat.name);;
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationAndVideoFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenAndVideoFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationAndVideoFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByGenerationAndVideoFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      sortingService.getFreqByGenerationAndVideoFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
    } else if (brand != "" && frequency != ''  && format != '') {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getVideosByBrandFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getGenerationsByBrandFreqFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
    } else if (category != "" && frequency != '' && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished")
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsFreqFormat(2, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreqFormat(2, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreqFormat(2, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreqFormat(2, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreqFormat(2, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand")
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsFreqFormat(4, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreqFormat(4, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreqFormat(4, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreqFormat(4, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreqFormat(4, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Nou")
        .filter((r) => r[31] == matchFreq.name)
        .filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsFreqFormat(3, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFreqFormat(3, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFreqFormat(3, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFreqFormat(3, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFreqFormat(3, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      }
    } else if (processor != "" && frequency != '' && format != '') {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorFreqFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByProcFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      sortingService.getGenerationsByProcFreqFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
    } else if (generation != "" && frequency != '' && format != '' ) {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ) .filter((r) => r[31] == matchFreq.name)
      .filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationFreqFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenFreqFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationFreqFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getVideosByGenerationFreqFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      sortingService.getProcessorsByGenerationFreqFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
    } else if (videoCard != "" && frequency != ''  && format != '') {
      let arr = laptopsData.filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[31] == matchFreq.name).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByVideoFreqFormat(1, `${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideoFreqFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideoFreqFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByVideoFreqFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByVideoFreqFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
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
          sortingService.getFormatByBrand(2, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatByBrand(4, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatByBrand(3, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByProc(2, `${matchProc.slug}-${matchProc.id}`).then((res) => setFormats(res))
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
          sortingService.getFormatByProc(4, `${matchProc.slug}-${matchProc.id}`).then((res) => setFormats(res))
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
          sortingService.getFormatByProc(3, `${matchProc.slug}-${matchProc.id}`).then((res) => setFormats(res))
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
      sortingService.getFormatByBrandAndProcessor(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatsByGenerationAndBrand(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByGeneration(2, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatByGeneration(4, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setFormats(r))
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
          sortingService.getFormatByGeneration(3, `${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByGenerationAndProcessor(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByBrandAndVideo(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByVideo(2, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByVideo(4, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByVideo(3, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByProcessorNVideo(1,`${matchProc.slug}-${matchProc.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByGenerationAndVideo(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByBrandFreq(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByFreq(2, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByFreq(4, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
        sortingService.getFormatByFreq(3, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByProcFreq(1,`${matchProc.slug}-${matchProc.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByGenerationFreq(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByVideoFreq(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
    } else if (brand != "" && format != '') {
      let arr = laptopsData.filter(
        (r) => r[18].toUpperCase() == brand.toUpperCase()
      ).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByBrandFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByBrandFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsByBrandFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setProcessors(result);
        });
        sortingService.getFreqByBrandFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByBrandFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosByBrandFormat(1, `${matchBrand.slug}-${matchBrand.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
    } else if (category != "" && format != '') {
      if (category == "refurbished") {
        let arr = laptopsData.filter((r) => r[2] == "Refurbished").filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsFormat(2, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFormat(2, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFormat(2, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getFreqsFormat(2, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
        sortingService.getGenerationsByTypeFormat(2, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFormat(2, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
       
      } else if (category == "second-hand") {
        let arr = laptopsData.filter((r) => r[2] == "Second Hand").filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsFormat(4, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFormat(4, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFormat(4, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFormat(4, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFormat(4, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getFreqsFormat(4, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      } else if (category == "nou") {
        let arr = laptopsData.filter((r) => r[2] == "Noi").filter((r) => r[24] == matchFormat.name);
        setFilteredData(arr);
        sortingService.getBrandsFormat(3, `${matchFormat.slug}-${matchFormat.id}`).then((result) => {
          setBrands(result);
        });
        sortingService.getHighestPriceFormat(3, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
          setHighestPrice(response[1]);
        });
        sortingService.getProcessorsFormat(3, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
        sortingService.getGenerationsByTypeFormat(3, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
        sortingService.getVideosFormat(3, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
        sortingService.getFreqsFormat(3, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      }
    } else if (processor != "" && format != '') {
      let arr = laptopsData.filter(
        (r) => r[25] == matchProc.name
      ).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByProcessorFormat(1, `${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByProcessorFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByProcessorFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByProcFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      sortingService.getGenerationsByProcFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getVideosByProcFormat(1,`${matchProc.slug}-${matchProc.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
    } else if (generation != "" && format != '') {
      let arr = laptopsData.filter(
        (r) => r[33].toLowerCase() == generation.split('-').join(' ').toLowerCase()
      ).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByGenerationFormat(1, `${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByGenFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByGenerationFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByGenerationFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByGenerationFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByGenerationFormat(1,`${matchGeneration.slug}-${matchGeneration.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
    } else if (videoCard != "" && format != '') {
      let arr = laptopsData.filter((r) => r[51].toLowerCase() == videoCard.split('-').join(' ').toLowerCase()).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByVideoFormat(1, `${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByVideoFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByVideoFormat (1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getFreqByVideoFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
      sortingService.getProcessorsByVideoFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      sortingService.getGenerationsByVideoFormat(1,`${matchVideo.slug}-${matchVideo.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
    } else if (frequency != "" && format != '') {
      let arr = laptopsData.filter((r) => r[31] == matchFreq.name).filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByFreqFormat(1, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByFreqFormat(1, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByFreqFormat(1, `${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getProcessorsByFreqFormat(1,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      sortingService.getGenerationsByFreqFormat(1,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getVideosByFreqFormat(1,`${matchFreq.slug}-${matchFreq.id}`, `${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
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
        sortingService.getFormatByBrand(1, `${matchBrand.slug}-${matchBrand.id}`).then((r) => setFormats(r))
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
        sortingService.getFormats(2).then((r) => setFormats(r))
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
        sortingService.getFormats(4).then((r) => setFormats(r))
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
        sortingService.getFormats(3).then((r) => setFormats(r))
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
      sortingService.getFormatsByProc(1,`${matchProc.slug}-${matchProc.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByGeneration (1,`${matchGeneration.slug}-${matchGeneration.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByVideo(1,`${matchVideo.slug}-${matchVideo.id}`).then((r) => setFormats(r))
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
      sortingService.getFormatByFreq(1,`${matchFreq.slug}-${matchFreq.id}`).then((r) => setFormats(r))
    } else if (format != "") {
      let arr = laptopsData.filter((r) => r[24] == matchFormat.name);
      setFilteredData(arr);
      sortingService
        .getTypesByFormats(1,`${matchFormat.slug}-${matchFormat.id}`)
        .then((result) => {
          setCategories(result);
        });
      sortingService
        .getHighestPriceByFormats(1, `${matchFormat.slug}-${matchFormat.id}`)
        .then((response) => {
          setHighestPrice(response[1]);
        });
      sortingService.getBrandsByFormat (1, `${matchFormat.slug}-${matchFormat.id}`).then((response) => {
        setBrands(response)
      });
      sortingService.getGenerationsByFormat(1,`${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessorsGeneration(r))
      sortingService.getProcessorsByFormat(1,`${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcessors(r))
      sortingService.getVideosByFormat(1,`${matchFormat.slug}-${matchFormat.id}`).then((r) => setVideoCards(r))
      sortingService.getFormatByFormat(1,`${matchFormat.slug}-${matchFormat.id}`).then((r) => setFormats(r))
      sortingService.getFreqByFormat(1,`${matchFormat.slug}-${matchFormat.id}`).then((r) => setProcFrequencies(r))
    }
  }, [brand, category, processor, generation, videoCard, frequency, format]);

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
            reset={onReset}
            formats={formats}
            selectFormat={onFormatSelect}
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
