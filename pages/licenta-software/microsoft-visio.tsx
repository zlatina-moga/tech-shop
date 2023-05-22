import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { visioBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";
import Footer from "../../components/global/Footer";

const Visio = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title='Microsoft Visio'
        laptopsData={licenseData.filter((c) => c.category == 'Visio')}
        categories2={softwareCategories}
        breadcrumbs={visioBrcrmbs}
      />
      <Footer />
    </>
  );
};

export default Visio;