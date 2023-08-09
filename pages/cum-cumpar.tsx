import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Meta from "../components/layouts/Meta";

export interface IData {
  section?: string;
  title?: string;
  description: string[];
}

const data: IData[] = [
  {
    title: "Alege produsele",
    description: [
      'Folosind meniul din stanga, navighezi prin categoriile de produse sau lista producatorilor. Odata ce ai gasit un produs care se potriveste dorintelor tale, apasa pe butonul "Adauga in cos" pentru a-l adauga in cosul de cumparaturi.',
    ],
  },
  {
    title: "Cosul de cumparaturi",
    description: [
      "Da click pe iconita ce reprezinta Cosul de cumpraturi din partea de sus a oricarei pagini din site si se va deschide o casuta in care ai posibilitatea sa revezi lista produselor, sa actualizezi cantitatea produselor sau sa renunti la unul sau toate produsele selectate.",
    ],
  },
  {
    description: [
      'Dupa verificarea comenzii, apasa linkul "Finalizeaza comanda" (este necesara logarea in cont sau crearea unuia nou).',
    ],
  },
  {
    title: "Date personale",
    description: [
      'Completeaza datele personale in formularul din pagina. Nu uita sa adaugi si un numar de telefon si o adresa de email. Daca doresti sa achizitionezi pentru firma trebuie sa completezi formularul "Persoana juridica".',
    ],
  },
  {
    section: "Modalitatea de plata",
    title: "Plata in numerar",
    description: [
      "Plata cu numerar se face in lei, integral. Valoarea produselor este cea din momentul confirmarii a comenzii.",
    ],
  },
  {
    title: "Ramburs",
    description: [
      "La livrare, plata se va face catre comisionarul care efectueaza livrarea.",
      "ATENTIE! La plata produselor in sistem ramburs, coletaria percepe o taxa suplimentara de returnare a rambursului, si difera in functie de valoarea produselor. Graficul tarifelor percepute de coletarie se poate vedea pe pagina de servicii transport.",
    ],
  },
  {
    title: "Plata cu card online",
    description: [
      "Se poate efectua plata online cu cardul personal sau al firmei, in conditii de siguranta deplina. Cardurile acceptate la plata sunt cele emise sub siglele VISA (Classic si Electron) si MASTERCARD (inclusiv Maestro, daca au cod CVV2/CVC2)",
      "Nu este perceput nici un comision suplimentar pentru tranzactii. Pentru asigurarea securitatii tranzactiilor, <firm name> foloseste sistemul PayU payments. Pentru finalizarea corecta a tranzactiei, trebuie sa furnizezi codul cardului (toate cifrele din cele patru grupe de pe fata cardului, fara spatii), data de expirare si ultimele trei cifre de pe spatele cardului inscriptionate pe banda cu semnatura ta. Indiferent de valuta pe care o ai in cont, tranzactiile se fac in lei la cursul de schimb al bancii unde este emis cardul. Procesarea datelor de card se face in mod exclusiv pe serverele PayU payments, <firm name> nu solicita si nu stocheaza nici un fel de detalii referitoare la card.",
    ],
  },
  { description: ["Livrarea marfii se va face dupa confirmarea platii."] },
  {
    section: "Contact:",
    title: "",
    description: ["tel: +1234567890", "email: email@email.com"],
  },
  {
    title: "Unde livram",
    description: [
      "Livram in toate localitatile din tara, in toate cele 94 municipii: Adjud , Aiud , Alba Iulia , Alexandria , Arad , Bacău , Baia Mare , Băilești , Bârlad , Beiuș , Bistrița , Blaj , Botoșani , Brad , Brăila , Brașov , București , Buzău ,Calafat , Călărași , Câmpia Turzii , Câmpina , Câmpulung , Câmpulung Moldovenesc , Caracal , Caransebeș , Carei , Cluj Napoca , Codlea , Constanța , Craiova ,Curtea de Argeș , Dej , Deva , Dorohoi , Drăgășani , Drobeta-Turnu Severin , Făgăraș , Fălticeni , Fetești , Focșani , Galați , Gheorgheni , Gherla , Giurgiu ,Hunedoara , Huși , Iași , Lugoj , Lupeni , Mangalia , Marghita , Medgidia , Mediaș , Miercurea Ciuc , Moinești , Moreni , Motru , Odorheiu Secuiesc , Oltenița ,Onești , Oradea , Orăștie , Orșova , Pașcani , Petroșani , Piatra Neamț , Pitești , Ploiești , Rădăuți , Râmnicu Sărat , Râmnicu Vâlcea , Reghin , Reșița , Roman ,Roșiorii de Vede , Săcele , Salonta , Satu Mare , Sebeș , Sfântu Gheorghe , Sibiu , Sighetu Marmației , Sighișoara , Slatina , Slobozia , Suceava , Târgoviște ,Târgu Jiu , Târgu Mureș , Târgu Secuiesc , Târnăveni , Tecuci , Timișoara , Toplița , Tulcea , Turda , Turnu Măgu",
    ],
  },
];

const CumCumpar = () => {
  return (
    <>
      <Navbar />
      <Meta title="Cum Cumpar?" />
      <div
        className="container-fluid pt-5 laptops-page flex-column"
        style={{
          maxWidth: "95rem",
          display: "flex",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="px-5">Cum Cumpar?</h1>
        </div>
        {data.map((d, idx) => (
          <div key={idx}>
            {d.section && (
              <>
                <strong style={{ fontSize: "20px" }}>{d.section}</strong>
                <br />{" "}
              </>
            )}
            <strong>{d.title}</strong>
            <br />
            {d.description.map((desc, idx) => (
              <p key={idx}>{desc}</p>
            ))}
          </div>
        ))}
        <div className="mb-5">
          <strong style={{ fontSize: "20px" }}>
            Linkuri catre produsele noatre de calitate:
          </strong>
          <br />
          <Link className="footer-link" href={"/calculatoare"}>
            Calculatoare noi, second hand si refurbished{" "}
          </Link>
          <br />
          <Link className="footer-link" href={"/laptop"}>
            Laptopuri noi, second hand si refurbished{" "}
          </Link>
          <br />
          <Link className="footer-link" href={"/servere"}>
            Servere noi, second hand si refurbished{" "}
          </Link>
          <br />
          <Link className="footer-link" href={"/workstation"}>
            Statii grafice si Workstation
          </Link>
          <br />
          <Link className="footer-link" href={"/monitoare"}>
            Monitoare noi, second hand si refurbished
          </Link>
          <br />
          <Link className="footer-link" href={"/imprimante"}>
            Imprimante si Multifunctionale second hand si refurbished
          </Link>
          <br />
          <Link className="footer-link" href={"/ups"}>
            UPS noi, second hand si refurbished
          </Link>
          <br />
          <Link className="footer-link" href={"/componente"}>
            Componente
          </Link>
          <br />
          <Link className="footer-link" href={"/sisteme-pos"}>
            Sisteme POS noi, second hand si refurbished
          </Link>
          <br />
          <Link className="footer-link" href={"/retelistica"}>
            Retelistica
          </Link>
          <br />
          <Link className="footer-link" href={"/accesorii"}>
            Accesorii
          </Link>
          <br />
          <Link className="footer-link" href={"/sisteme-solare-fotovoltaice"}>
            Sisteme solare fotovoltaice
          </Link>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CumCumpar;
