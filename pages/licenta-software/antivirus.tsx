import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { antivurusBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";
import Footer from "../../components/global/Footer";

const Antivirus = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title="Antivirus"
        laptopsData={licenseData.filter((c) => c.category == "Antivirus")}
        categories={softwareCategories}
        breadcrumbs={antivurusBrcrmbs}
      />
      <Footer />
    </>
  );
};

export default Antivirus;
