import { useState, useEffect, useRef } from "react";
import { usePapaParse, useCSVDownloader } from "react-papaparse";

const ServerFeed = () => {
  const { readRemoteFile } = usePapaParse();
  const { CSVDownloader, Type } = useCSVDownloader();
  const [serverData, setServerData] = useState({});
  const buttonRef = useRef(null);

  function update(obj) {
    for (const url in obj) {
      obj[0][1] = "Category";
      obj[0][2] = "Condition";
      obj[0][3] = "Title";
      obj[0][8] = "Image link";
      obj[0][9] = "Link";
      obj[0][22] = "Description";
      obj[0][17] = "Price";
      obj[0][23] = "Availability";
      obj[url][9] = obj[url][9].replace("citgrup", "pcbun");
    }
    return obj;
  }

  useEffect(() => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_servere", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          setServerData(result);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
    buttonRef.current.click();
  }, []);


  return (
    <div>
      <CSVDownloader
        type={Type.Button}
        filename={"Servere"}
        bom={true}
        config={{
          delimiter: ",",
        }}
        data={serverData}
        className="feed-container"
        style={{display: 'none'}}
      >
        <button ref={buttonRef}></button>
        
      </CSVDownloader>
    </div>
  );
}

export default ServerFeed;
