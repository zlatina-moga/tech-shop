import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import LicensePage from "../components/shared/LicensePage";
import { licenseData } from "../data/licenseData";
import { softwareCategories } from "../data/categories";
import { softwareBrcrmbs } from "../data/breadcrumbs";

const Software = () => {
  let [laptopsData, setLaptopsData] = useState([]);
  const [selectedSort, setSelectedSort] = useState("/licenta-software");
  const router = useRouter();
  const [baseLink, setBaseLink] = useState("/licenta-software");
  const [category, setCategory] = useState("");
  let [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    router.push(selectedSort);
    const sort = selectedSort.split("=")[1];

    if (sort === "views") {
      laptopsData = [...licenseData].sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
      setLaptopsData(laptopsData);
    } else if (sort === "deals") {
      laptopsData = [...licenseData].sort(
        (a, b) => b.discountNum - a.discountNum
      );
      setLaptopsData(laptopsData);
    } else if (sort === "price") {
      laptopsData = [...licenseData].sort((a, b) => a.priceNum - b.priceNum);
      setLaptopsData(laptopsData);
    } else if (sort === "-price") {
      laptopsData = [...licenseData].sort((a, b) => b.priceNum - a.priceNum);
      setLaptopsData(laptopsData);
    } else {
      setLaptopsData(licenseData);
    }
  }, [selectedSort]);

  const onSort = (sort) => {
    setSelectedSort(sort);
  };

  const onCatSelect = (cat) => {
    setBaseLink(`/licenta-software?category=${cat}`);
    router.push(`/licenta-software?category=${cat}`);
    setCategory(cat);
  };

  useEffect(() => {
    if (category != "") {
      let arr = laptopsData.filter((r) => r.slug == category);
      setFilteredData(arr);
    }
  }, [category]);

  return (
    <>
      <Navbar />
      <LicensePage
        title="Software"
        laptopsData={laptopsData}
        categories2={softwareCategories}
        breadcrumbs={softwareBrcrmbs}
        sortCriteria={onSort}
        baseLink={baseLink}
        catSelect={onCatSelect}
        filteredData={filteredData}
      />
      <Footer />
    </>
  );
};

export default Software;
