import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import Loader from "../../../components/global/Loader/Loader";
import SingleDetailedView from "../../../components/shared/SingleDetailedView";
import { newComputersBrcrmbs } from "../../../data/breadcrumbs";

const NewCompDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getNewComp(id)
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
        <Loader />
      ) : 
        <SingleDetailedView itemData={itemData} breadcrumbs={newComputersBrcrmbs}/>
      }
    </>
  );
};

export default NewCompDetails;
