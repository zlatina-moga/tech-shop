import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { adobeBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";

const Antivirus = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title="Antivirus"
        laptopsData={licenseData.filter((c) => c.category == "Antivirus")}
        categories={softwareCategories}
        breadcrumbs={adobeBrcrmbs}
      />
    </>
  );
};

export default Antivirus;
