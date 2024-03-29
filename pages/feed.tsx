import { useState, useEffect } from "react";
import { usePapaParse, useCSVDownloader } from "react-papaparse";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const Feed = () => {
  const { readRemoteFile } = usePapaParse();
  const { CSVDownloader, Type } = useCSVDownloader();
  const [serverData, setServerData] = useState({});
  const [laptopsData, setLaptopsData] = useState({});
  const [workstationData, setWorkstationData] = useState({});
  const [computersData, setComputersData] = useState({});
  const [solarData, setSolarData] = useState({});
  const [monitorData, setMonitorData] = useState({});
  const [componentData, setComponentData] = useState({});
  const [printerData, setPrinterData] = useState({});
  const [posData, setPosData] = useState({});
  const [upsData, setUpsData] = useState({});
  const [accessoriesData, setAccessoriesData] = useState({});
  const [networkData, setNetworkData] = useState({});

  function update(obj) {
    for (const url in obj) {
      obj[0][1] = 'Category';
      obj[0][2] = 'Condition';
      obj[0][3] = 'Title';
      obj[0][8] = 'Image link';
      obj[0][9] = 'Link';
      obj[0][22] = 'Description';
      obj[0][17] = 'Price';
      obj[0][23] = 'Availability';
      obj[url][9] = obj[url][9].replace('citgrup', 'pcbun');
      obj[url][23] = obj[url][23].replace('In Stoc', 'in_stock');
      obj[url][23] = obj[url][23].replace('Stoc furnizor', 'limited_availability');
    }
    return obj;
}

  useEffect(() => {
    //@ts-ignore
    readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_servere",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
          setServerData(result);
        },
      }
    );

    //@ts-ignore
    readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_workstation", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
          setWorkstationData(result);
        },
      }
    );

    //@ts-ignore
    readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_calculatoare",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
          setComputersData(result);
        },
      }
    );

     //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_sisteme-solare-fotovoltaice",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
            setSolarData(result);
        },
      }
    );

     //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_laptop",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
            setLaptopsData(result);
        },
      }
    );

         //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_monitoare",{
        skipEmptyLines: true,
            complete: (results) => {
              let result = update(results.data)
            setMonitorData(result);
            },
        }
    );

     //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_componente",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
            setComponentData(result);
        },
      }
    );

     //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_imprimante",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
           setPrinterData(result);
        },
      }
    );

     //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_sisteme-pos",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
           setPosData(result);
        },
      }
    );

     //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_ups",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
           setUpsData(result);
        },
      }
    );

     //@ts-ignore
     readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_accesorii",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data)
           setAccessoriesData(result);
        },
      }
    );

         //@ts-ignore
         readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_retelistica",{
            skipEmptyLines: true,
            complete: (results) => {
              let result = update(results.data)
               setNetworkData(result);
            },
          }
        );
    
  }, [readRemoteFile]);


  return (
    <>
    <Navbar />
    <div className="container-fluid pt-5, laptops-page"
        style={{ maxWidth: "80rem", marginTop: "80px"}}>
      <h1 >Feed produse</h1>
      <ul>
        <li className="mt-3">
          <CSVDownloader
            type={Type.Button}
            filename={"Servere"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={serverData}
            className='feed-container'
          >
            Feed Produse Servere
          </CSVDownloader>
        </li>
        <li className="mt-3">
          <CSVDownloader
            type={Type.Button}
            filename={"Workstation"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={workstationData}
            className='feed-container'
          >
            Feed Produse Workstation
          </CSVDownloader>
        </li>
        <li className="mt-3">
          <CSVDownloader
            type={Type.Button}
            filename={"Calculatoare"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={computersData}
            className='feed-container'
          >
            Feed Produse Calculatoare
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"Sisteme solare fotovoltaice"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={solarData}
            className='feed-container'
          >
            Feed Produse Sisteme solare fotovoltaice
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"Laptop"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={laptopsData}
            className='feed-container'
          >
            Feed Produse Laptop
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"Monitoare"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={monitorData}
            className='feed-container'
          >
            Feed Produse Monitoare
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"Componente"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={componentData}
            className='feed-container'
          >
            Feed Produse Componente
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"Imprimante"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={printerData}
            className='feed-container'
          >
            Feed Produse Imprimante
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"Sisteme POS"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={posData}
            className='feed-container'
          >
            Feed Produse Sisteme POS    
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"UPS"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={upsData}
            className='feed-container'
          >
            Feed Produse UPS 
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Button}
            filename={"Accesorii"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={accessoriesData}
            className='feed-container'
          >
            Feed Produse Accesorii
          </CSVDownloader>
        </li>
        <li className="mt-3">
        <CSVDownloader
            type={Type.Link}
            filename={"Retelistica"}
            bom={true}
            config={{
              delimiter: ",",
            }}
            data={networkData}
            className='feed-container'
          >
           Feed Produse Retelistica
          </CSVDownloader>
        </li>
      </ul>
    </div>
    <Footer />
    </>
  );
};

export default Feed;
