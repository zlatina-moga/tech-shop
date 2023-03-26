import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import DetailPageSkeleton from "../../../components/shared/DetailPageSkeleton";
import SingleItemView from "../../../components/shared/SingleItemView";
import { printerConsumablesBrcrmbs } from "../../../data/breadcrumbs";
import Footer from "../../../components/global/Footer";

const NewPrinterDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getPrinterCollateral(id)
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
      {loading ? (
       <DetailPageSkeleton />
      ) : <SingleItemView itemData={itemData} breadcrumbs={printerConsumablesBrcrmbs}/>}
      <Footer />
    </>
  );
};

export default NewPrinterDetails;
