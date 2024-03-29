import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { projectBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";
import Footer from "../../components/global/Footer";

const Projects = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title='Microsoft Project'
        laptopsData={licenseData.filter((c) => c.category == 'Project')}
        categories2={softwareCategories}
        breadcrumbs={projectBrcrmbs}
      />
      <Footer />
    </>
  );
};

export default Projects;