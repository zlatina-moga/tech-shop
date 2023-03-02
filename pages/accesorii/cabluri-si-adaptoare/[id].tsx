import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import Loader from "../../../components/global/Loader/Loader";
import SingleItemView from "../../../components/shared/SingleItemView";
import { cablesBreadCrmbs } from "../../../data/breadcrumbs";

const CableDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getCable(id)
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
      {loading ? <Loader /> : <SingleItemView itemData={itemData} breadcrumbs={cablesBreadCrmbs}/>}
    </>
  );
};

export default CableDetails;
