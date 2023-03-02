import Navbar from "../../components/global/Navbar";
import LaptopsPage from "../../components/shared/LaptopsPage";
import { projectBrcrmbs } from "../../data/breadcrumbs";
import { softwareCategories } from "../../data/categories";
import { licenseData } from "../../data/licenseData";

const Projects = () => {
  return (
    <>
      <Navbar />
      <LaptopsPage
        title='Microsoft Project'
        laptopsData={licenseData.filter((c) => c.category == 'Project')}
        categories={softwareCategories}
        breadcrumbs={projectBrcrmbs}
      />
    </>
  );
};

export default Projects;
