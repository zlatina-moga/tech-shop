import { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";
import * as feedService from "../../services/feedService";

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
    obj[url][23] = obj[url][23].replace('In Stoc', 'in_stock');
    obj[url][23] = obj[url][23].replace('Stoc furnizor', 'limited_availability');
  }
  return obj;
}

const Feed = () => {
  const { readRemoteFile } = usePapaParse();
  const [data, setData] = useState({});

  useEffect(() => {
    //@ts-ignore
    readRemoteFile("https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_componente",{
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          setData(result);
        },
      }
    );
  }, [readRemoteFile]);

  useEffect(() => {
  if (Object.keys(data).length > 0){
    feedService.generate(data, 'componente')
  }
}, [data])

  return (
    <>
    </>
  );
};
export default Feed;
