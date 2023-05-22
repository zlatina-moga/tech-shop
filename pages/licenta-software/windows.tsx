import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { windowsBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";
import Footer from "../../components/global/Footer";

const Windows = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title="Windows"
        laptopsData={licenseData.filter((c) => c.category == 'Windows')}
        categories2={softwareCategories}
        breadcrumbs={windowsBrcrmbs}
      />
      <Footer />
    </>
  );
};

export default Windows;