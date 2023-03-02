import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import Loader from "../../../components/global/Loader/Loader";
import SingleItemView from "../../../components/shared/SingleItemView";
import { palmrestBrcrmbs } from "../../../data/breadcrumbs";

const PalmrestDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getPalmrest(id)
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
      {loading ? <Loader /> : <SingleItemView itemData={itemData} breadcrumbs={palmrestBrcrmbs} />}
    </>
  );
};

export default PalmrestDetails;
