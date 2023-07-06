import { useMemo} from "react";
import { usePapaParse} from "react-papaparse";
import Crontab from "reactjs-crontab";
import "reactjs-crontab/dist/index.css";
import * as feedService from "../services/feedService";

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

const Feed = () => {
  const { readRemoteFile } = usePapaParse();

  const fetchMonitors = () => {
    console.log('fetching monitors')
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_monitoare", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "monitoare");
          }
        },
      }
    );
  };

  const fetchServers = () => {
    console.log('fetching Servers')
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_servere", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "servere");
          }
        },
      }
    );
  };

  const fetchComponents = () => {
    console.log('fetching Components')
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_componente", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "componente");
          }
        },
      }
    );
  };

  const fetchPrinters = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_imprimante", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "imprimante");
          }
        },
      }
    );
  };

  const fetchPos = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_sisteme-pos", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "sisteme-pos");
          }
        },
      }
    );
  };

  const fetchUps = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_ups", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, "ups");
          }
        },
      }
    );
  };

  const fetchAccessories = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_accesorii", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'accesorii')
          }
        },
      }
    );
  };

  const fetchNetwork = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_retelistica", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'retelistica')
          }
        },
      }
    );
  };

  const fetchLaptop = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_laptop", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'laptop')
          }
        },
      }
    );
  };

  const fetchSolar = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_sisteme-solare-fotovoltaice", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'sisteme-solare-fotovoltaice')
          }
        },
      }
    );
  };

  const fetchComputers = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_calculatoare", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'calculatoare')
          }
        },
      }
    );
  };

  const fetchWorkstation = () => {
    //@ts-ignore
    readRemoteFile( "https://api.citgrup.ro/public/feeds/csv-public-feeds/produse_workstation", {
        skipEmptyLines: true,
        complete: (results) => {
          let result = update(results.data);
          if (result) {
            feedService.generate(result, 'workstation')
          }
        },
      }
    );
  };

  const tasks = useMemo(
    () => [
      {
        fn: fetchMonitors,
        config: "0 20 6 * *",
      },
      {
        fn: fetchServers,
        config: "0 20 6 * *",
      },
      {
        fn: fetchComponents,
        config: "0 20 6 * *",
      },
      {
        fn: fetchPrinters,
        config: "0 20 6 * *",
      },
      {
        fn: fetchPos,
        config: "0 20 6 * *",
      },
      {
        fn: fetchUps,
        config: "0 20 6 * *",
      },
      {
        fn: fetchAccessories,
        config: "0 20 6 * *",
      },
      {
        fn: fetchNetwork,
        config: "0 20 6 * *",
      },
      {
        fn: fetchLaptop,
        config: "0 20 6 * *",
      },
      {
        fn: fetchSolar,
        config: "0 20 6 * *",
      },
      {
        fn: fetchComputers,
        config: "0 20 6 * *",
      },
      {
        fn: fetchWorkstation,
        config: "0 20 6 * *",
      },

    ],
    []
  );

  return (
    <Crontab
      tasks={tasks}
      timeZone="local"
      dashboard={{
        hidden: false,
      }}
    />
  );
};
export default Feed;
