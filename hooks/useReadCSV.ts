import * as React from "react";
import Papa, { ParseResult } from "papaparse";

type Data = {
    id: string;
    category: string;
    subcategory: string;
    brand: string;
    categoryId: string;
    connectivity: string;
    connectors?: string;
    description: string;
    innerDescription: string;
    availability: string;
    warranty: string;
    images: string[];
    metaDescription: string;
    metaKeywords: string;
    model: string;
    name: string;
    price: string;
    resolution: string;
    type: string
};

type Values = {
  data: Data[];
};

const useReadCSV = () => {
  const [values, setValues] = React.useState<Values | undefined>();

  const getCSV = () => {
    Papa.parse("assets/produse_accesorii.csv", {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: (results: ParseResult<Data>) => {
          setValues(results);
        },
      });
  };

  React.useEffect(() => {
    getCSV()
  }, [])

  return values
};


export default useReadCSV;
