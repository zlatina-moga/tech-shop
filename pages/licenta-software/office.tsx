import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { officeBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";
import Footer from "../../components/global/Footer";

const Office = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title='Microsoft Office'
        laptopsData={licenseData.filter((c) => c.category == 'Office')}
        categories2={softwareCategories}
        breadcrumbs={officeBrcrmbs}
      />
      <Footer />
    </>
  );
};

export default Office;
