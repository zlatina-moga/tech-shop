import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import LaptopsPage from "../components/shared/LaptopsPage";
import { licenseData } from "../data/licenseData";
import { softwareCategories } from "../data/categories";
import { softwareBrcrmbs } from "../data/breadcrumbs";

const Software = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title="Software"
        laptopsData={licenseData}
        categories={softwareCategories}
        breadcrumbs={softwareBrcrmbs}
      />
      <Footer />
    </>
  );
};

export default Software;
