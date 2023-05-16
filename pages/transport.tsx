import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Meta from "../components/layouts/Meta";

const Transport = () => {
  return (
    <>
      <Navbar />
      <Meta title="Transport & returnare" />
      <div
        className="container-fluid pt-5 laptops-page flex-column mb-5"
        style={{
          maxWidth: "95rem",
          display: "flex",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="px-5">TRANSPORT & RETURNARE</h1>
          <h5>
            Dragă client, mulțumim că ați ales maganizul nostru online și vă
            invităm să citiți cu atenție detaliile de mai jos.
          </h5>
        </div>
        <div className="text-start mb-1 mt-4">
          <p>
            <strong>Transportul este gratuit</strong>
            pentru comenzile de minim <strong>250 lei + TVA</strong>. Dupa
            expedierea produselor vei primii pe email urmatoarele informatii:-
            numarul de identificare al coletului (AWB)- numele curierului cu
            care a fost trimis (produsele se transporta doar prin DPD sau Dragon
            Star) Poti accesa astfel in orice moment website-ul firmei de
            curierat pentru a urmari comanda in timp real.
          </p>
          <p>
            <strong>Expediere in aceeasi zi</strong>
          </p>
          <p>
            <strong>
              Comanda receptionata pana la ora 14:00 se expediaza in aceeasi zi.
            </strong>
            Comenzile primite dupa aceasta ora vor fi procesate in ziua
            urmatoare. <br />
            In localitatile din Romania unde exista sedii DPD, coletul ajunge in
            24 de ore din momentul expedierii. Totusi, ca exceptie, in regiunile
            Moldova si Dobrogea coletul ajunge in maxim 48 de ore. <br />
            In cazul platilor prin virament bancar, livrarea decurge din
            momentul confirmarii in contul PC Bun a platii contravalorii
            facturii proforme. <br />
            Pentru produsele care se intorc in service in perioada de garantie
            datorita unor probleme legate de transport, costul returnarii este
            suportat de catre PC Bun.
          </p>
          <p>
            <strong>
              Expedierea produselor comandate si care nu se afla pe stoc la
              momentul procesarii comenzii
            </strong>
            <br />
            Sistemul de comanda in acest caz implica urmatorii pasi: trimiterea
            comenzii, acceptarea termenilor si conditiilor, plata avansului de
            30% sau a sumei integrale dupa caz, efectuarea comenzii la furnizori
            pentru produsul / produsele si componentele comandate. Dupa receptia
            componentelor, toate componentele sunt testate, produsul / produsele
            sunt asamblate, produsele se retesteaza ca ansambul in final, dupa
            caz se instaleaza sistemul de operare. Livrarea produselor poate
            dura intre minim 14 zile si maxim 3 luni de la momentul efectuarii
            platii.
          </p>
          <p>
            <strong>Returnare:</strong>
            <br />
            Companiile, persoanele fizice autorizate, intreprinderile
            individuale, in considerarea avantajelor dobandite in calitate de
            clienti PC Bun (produse achizitionate in sistem discount, transport
            gratuit, discounturi mari de 35%-60% fata de un produs nou, livrare
            rapida cu prioritate, super garantie), este posibila doar inlocuirea
            produselor care nu corespund cerintelor si care au fost returnate
            catre PC Bun, insa nu este posibila si returnarea de catre PC Bun
            a sumelor de bani platite de catre acestia. Termenul de returnare
            este de 60 de zile si decurge de la data facturii fiscale.
          </p>
          <p>Returnarea produsului se va efectua pe cheltuiala clientului.</p>
          <p>
            Marfa returnata trebuie sa fie completa, neafectata fizic sau
            cosmetic, insotita de factura originala.
          </p>
          <p>
            O exceptie de la aceasta regula o reprezinta produsele care sunt
            returnate din cauze legate de transport. Pentru acestea PC Bun ofera
            transport GRATUIT si inlocuirea produsului doar daca s-a completat
            un proces verbal cu agentul de la curier in momentul preluarii
            coletului sau daca s-a specificat pe awb la observatii faptul ca
            amabalajul este deteriorat.
          </p>
          <p>
            Privind dreptul de unilateral al consumatorului * valabil pentru
            persoanele fizice. Art 4 al.C din OG 34/2014: "Consumatorul persoana
            fizica are dreptul sa notifice prin ce metoda doreste comerciantului
            ca renunta la cumparare, fara penalitati si fara invocarea unui
            motiv, in termen de 14 zile calendaristice de la primirea produsului
            sau, in cazul prestarilor de servicii, de la incheierea
            contractului".
          </p>
          <p>
            Persoanele juridice nu au posibilitatea de retragere unilaterala din
            contract.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transport;
