import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import "react-photo-view/dist/react-photo-view.css";
import classNames from "classnames";
import Link from "next/link";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import Loader from "../../../components/global/Loader/Loader";
import SingleItemView from "../../../components/shared/SingleItemView";
import { reteaBrcrmbs } from "../../../data/breadcrumbs";

const PlacaDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getPlaca(id)
      .then((result) => {
        setLoading(false);
        seItemsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? <Loader /> : <SingleItemView itemData={itemData} breadcrumbs={reteaBrcrmbs}/>}
    </>
  );
};

export default PlacaDetails;
