import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { windowsBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";

const Windows = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title="Windows"
        laptopsData={licenseData.filter((c) => c.category == 'Windows')}
        categories={softwareCategories}
        breadcrumbs={windowsBrcrmbs}
      />
    </>
  );
};

export default Windows;
