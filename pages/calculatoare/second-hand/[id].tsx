import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/global/Navbar";
import * as itemService from "../../../services/itemService";
import Loader from "../../../components/global/Loader/Loader";
import SingleDetailedView from "../../../components/shared/SingleDetailedView";
import { secondHandComputersBrcrmbs } from "../../../data/breadcrumbs";

const features = ["Procesor", "RAM" ];

const SecondHandCompDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, seItemsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    itemService
      .getSecondHandComp(id)
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
      ) : <SingleDetailedView itemData={itemData} features={features} breadcrumbs={secondHandComputersBrcrmbs}/>}
    </>
  );
};

export default SecondHandCompDetails;
