import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { laptopsData } from "../../../data";
import Meta from "../../../components/layouts/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import qualityIcon from "../../../public/svg/quality.svg";
import transportIcon from "../../../public/svg/transport.svg";
import payImg from "../../../public/images/stripe.png";
import truckIcon from "../../../public/svg/truck.svg";
import walletIcon from "../../../public/svg/money.svg";
import cartIcon from "../../../public/svg/cart.svg";
import externalIcon from "../../../public/svg/external.svg";
import { PhotoProvider, PhotoView } from "react-photo-view";
import classNames from "classnames";
import Link from "next/link";
import Navbar from "../../../components/global/Navbar";
import * as itemService from '../../../services/itemService';

const features = ["Producator", "Model", "Garantie", "Stare produs"];

const SecondHandLaptopDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [laptopsData, setLaptopsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getSingleItem(id)
      .then((result) => {
        setLoading(false);
        setLaptopsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="page-details">
        <PhotoProvider>

        </PhotoProvider>
      </div>
    </>
  );
};

export default SecondHandLaptopDetails;
