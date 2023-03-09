import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { visioBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";

const Visio = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title='Microsoft Visio'
        laptopsData={licenseData.filter((c) => c.category == 'Visio')}
        categories={softwareCategories}
        breadcrumbs={visioBrcrmbs}
      />
    </>
  );
};

export default Visio;
