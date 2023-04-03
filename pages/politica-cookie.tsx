import Link from "next/link";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Meta from "../components/layouts/Meta";
import { IData } from "./cum-cumpar";

const data: IData[] = [
  {
    title: "Cookie-urile",
    description: [
      "Acest website folosește atât cookie-uri proprii, cât și de la terți, pentru a furniza vizitatorilor o experiență mult mai bună de navigare și servicii adaptate nevoilor și interesului fiecăruia.",
      "În conformitate cu Regulamentul (UE) 2016/679 al Parlamentului European și al Consiliului din 27 aprilie 2016 privind protecția persoanelor fizice în ceea ce privește prelucrarea datelor cu caracter personal și privind libera circulație a acestor date în sectorul comunicațiilor electronice, tuturor vizitatorilor website-ului li se cere consimțământul înaintea transmiterii de cookies în computerele acestora.",
    ],
  },
  {
    title: "Ce se înțelege prin cookie-uri? ",
    description: [
      "Cookie-ul este un fișier text de mici dimensiuni pe care un site îl salvează în calculatorul sau dispozitivul dumneavoastră mobil atunci când îl vizitați. Datorită cookie-urilor, site-ul reține, pentru o perioadă de timp, acțiunile şi preferințele dumneavoastră (login, limbă, dimensiunea caracterelor și alte preferințe de afișare). Astfel nu mai trebuie să le reintroduceți ori de câte ori reveniți la site sau navigați de pe o pagină pe alta.",
    ],
  },
  {
    title: "Cum se folosesc cookie-urile?",
    description: [
      "Exista 2 tipuri de cookie-uri folosite:",
      "- Cookie-urile necesare fac ca site-ul să fie funcțional, asigurând funcționalități de bază cum ar fi navigarea pe paginile site-ului și accesul la zone securizate ale site-ului. Website-ul nu poate funcționa corect fără aceste cookie-uri.",
      "- Cookie-urile statistice colectează și raportează informații în mod anonim si ajută proprietarii website-urilor să înțeleagă cum interacționează vizitatorii cu website-ul.",
    ],
  },
  {
    title: "Ce sunt cookie-urile plasate de terți?",
    description: [
      'Anumite secțiuni de conținut de pe site pot fi furnizate prin intermediul unor terțe părți. Aceste terțe părți pot plasa cookie-uri prin intermediul altui website și ele se numesc "third party cookies" pentru că nu sunt plasate de proprietarul website-ului respectiv. Furnizorii terți trebuie să respecte de asemenea legea în vigoare și politicile de confidențialitate ale deținătorului site-ului.',
    ],
  },
  {
    title: "Care este durata de viaţă a unui cookie?",
    description: [
      'Cookie-urile sunt administrate de webservere. Durata de viață a unui cookie poate varia semnificativ, depinzând de scopul pentru care este plasat. Unele cookie-uri sunt folosite exclusiv pentru o singură sesiune (session cookies) și nu mai sunt reținute, odată ce utilizatorul a părăsit website-ul, în timp ce alte cookie-uri sunt reținute și refolosite de fiecare dată când utilizatorul revine pe acel website ("cookie-uri persistente"). Cu toate acestea, cookie-urile pot fi șterse de un utilizator în orice moment prin intermediul setărilor browser-ului.',
    ],
  },
  {
    title: "Cum puteți controla cookie-urile?",
    description: [
      "Puteți controla și/sau șterge cookie-urile după cum doriți – pentru detalii, consultați site-ul aboutcookies.org. Puteți șterge toate cookie-urile din calculatorul dumneavoastră și puteți seta majoritatea browser-elor să blocheze plasarea acestora. Dacă faceți acest lucru, este posibil să fiți nevoit să setați manual unele preferințe, de fiecare dată când vizitați site-ul. De asemenea, s-ar putea ca unele servicii sau opțiuni să nu funcționeze.",
    ],
  },
];

const CookiePolicy = () => {
  return (
    <>
      <Navbar />
      <Meta title="Politica Cookie" />
      <div
        className="container-fluid pt-5 laptops-page flex-column"
        style={{
          maxWidth: "95rem",
          display: "flex",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="px-5">Politica Cookie</h1>
        </div>
        {data.map((d, idx) => (
          <div key={idx}>
            <strong>{d.title}</strong>
            <br />
            {d.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))}
          </div>
        ))}
        <div className="mb-5">
          <strong>
            Link-uri utile pentru controlul cookie-urile in funcție de
            browser-ul pe care îl folosiți:
          </strong>
          <br />
          <Link
            className="footer-link"
            href={"https://support.apple.com/en-nz/guide/safari/sfri11471/mac"}
            target="_blank"
          >
            Cookies în Safari
          </Link>
          <br />
          <Link
            className="footer-link"
            href={
              "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
            }
            target="_blank"
          >
            Cookies în Firefox
          </Link>
          <br />
          <Link
            className="footer-link"
            href={
              "https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid&hl=en"
            }
            target="_blank"
          >
            Cookies în Chrome
          </Link>
          <br />
          <Link
            className="footer-link"
            href={"https://www.opera.com/help/tutorials/security/privacy/"}
            target="_blank"
          >
            Cookies în Opera
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicy;
