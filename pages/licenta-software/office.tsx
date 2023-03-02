import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { officeBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";

const Office = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title='Microsoft Office'
        laptopsData={licenseData.filter((c) => c.category == 'Office')}
        categories={softwareCategories}
        breadcrumbs={officeBrcrmbs}
      />
    </>
  );
};

export default Office;
