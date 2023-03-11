import Navbar from "../components/global/Navbar";
import Link from "next/link";

const ComputerBuilder = () => {
  return (
    <>
      <Navbar />
      <div className="laptops-page">
        <div className="col-lg-8 table-responsive mb-5" style={{marginLeft: 'auto', marginRight:'auto'}}>
          <table className="table table-bordered text-center mb-0">
            <thead className="bg-secondary text-dark">
              <tr>
                <th>Component</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Processor
                </td>
                <td>
                  <Link href="/componente/procesor">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Motherboard
                </td>
                <td>
                  <Link href="/componente/placa-de-baza-calculator">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  CPU Cooler
                </td>
                <td>
                  <Link href="/componente/coolere-si-radiatoare">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Case & supply
                </td>
                <td>
                  <Link href="/componente/carcasa-si-surse">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Graphics Card
                </td>
                <td>
                  <Link href="/componente/placa-video">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  RAM
                </td>
                <td>
                  <Link href="/componente/memorie-ram">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Storage
                </td>
                <td>
                  <Link href="/componente/hard-disk">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Monitor
                </td>
                <td>
                  <Link href="/monitoare">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Accessories
                </td>
                <td>
                  <Link href="/accesorii">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Expensions / Networking
                </td>
                <td>
                  <Link href="/retelistica">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="product-item" style={{ textAlign: "left" }}>
                  Softwares
                </td>
                <td>
                  <Link href="/licenta-software">
                    <button className="btn btn-primary">Add</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ComputerBuilder;
