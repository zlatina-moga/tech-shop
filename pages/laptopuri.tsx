import { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import * as productService from "../services/productService";
import Loader from "../components/global/Loader/Loader";
import LaptopsPage from "../components/shared/LaptopsPage";

const Laptopuri = () => {
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    productService
      .getAllLaptops()
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <LaptopsPage title="All Laptops" laptopsData={laptopsData} />
      )}
    </>
  );
};

export default Laptopuri;