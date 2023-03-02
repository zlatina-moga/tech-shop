import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { adobeBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";

const Adobe = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title='Adobe'
        laptopsData={licenseData.filter((c) => c.category == 'Adobe')}
        categories={softwareCategories}
        breadcrumbs={adobeBrcrmbs}
      />
    </>
  );
};

export default Adobe;
