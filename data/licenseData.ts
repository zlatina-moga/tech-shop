export interface ILicence {
  id: string;
  category: string;
  imgLink: string;
  version: string;
  title: string;
  price: string;
  descrTitle: string;
  description: string[];
  activationTitle?: string;
  activation1?: string;
  activation2?: string;
  activationSteps?: string[];
  activationLink?: string;
  postDescr?: string[];
}

export const licenseData: ILicence[] = [
  {
    id: "licenta-software/windows/windows-10-home-32-64bit",
    category: "Windows",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-7.jpeg",
    version: "10 HOME 32/64BIT",
    title: "Windows 10 HOME 32/64BIT",
    price: "69.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink:
      "https://www.microsoft.com/en-us/software-download/windows10",
    activation2: "Dupa Instalare :",
    activationSteps: [
      "1. Mergi la  “Settings”",
      "2. Selecteaza “Update & Security”",
      "3. Gaseste “Activation”",
      "4. Selecteaza “Activate” sau “Change Product Key”",
      "5. Insereaza cheia produsului",
      "6. Gata, este activat!",
    ],
  },
  {
    id: "licenta-software/windows/windows-10-pro-32-64bit",
    category: "Windows",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-8.jpeg",
    version: "10 PRO 32/64BIT",
    title: "Windows 10 PRO 32/64BIT",
    price: "69.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink:
      "https://www.microsoft.com/en-us/software-download/windows10",
    activation2: "Dupa Instalare :",
    activationSteps: [
      "1. Mergi la  “Settings”",
      "2. Selecteaza “Update & Security”",
      "3. Gaseste “Activation”",
      "4. Selecteaza “Activate” sau “Change Product Key”",
      "5. Insereaza cheia produsului",
      "6. Gata, este activat!",
    ],
  },
  {
    id: "licenta-software/windows/windows-11-pro-32-64bit",
    category: "Windows",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-10.jpeg",
    version: "11 PRO 32/64BIT",
    title: "Windows 11 PRO 32/64BIT",
    price: "79.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://www.microsoft.com/software-download/windows11",
    activation2: "Dupa Instalare :",
    activationSteps: [
      "1. Booteaza stick/dvd",
      "2. Selecteaza limba si regiunea",
      "3. Introdu cheia",
    ],
  },
  {
    id: "licenta-software/windows/windows-11-home-32-64bit",
    category: "Windows",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-9.jpeg",
    version: "11 HOME 32/64BIT",
    title: "Windows 11 HOME 32/64BIT",
    price: "79.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://www.microsoft.com/software-download/windows11",
    activation2: "Dupa Instalare :",
    activationSteps: [
      "1. Booteaza stick/dvd",
      "2. Selecteaza limba si regiunea",
      "3. Introdu cheia",
    ],
  },
  {
    id: "licenta-software/office/office-2019-professional-plus-global",
    category: "Office",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-3.jpeg",
    version: "2019 Professional PLUS | Global | Asociat cont MS",
    title: "Microsoft Office 2019 Professional PLUS | Global | Asociat cont MS",
    price: "159.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft:setup.Office.com si asociere cu contul Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://setup.office.com",
    activationSteps: [
      "1. Intrati pe setup.office.com",
      "2. Va creati cont",
      "3. Adaugati licenta primita de la noi",
      "4. Descarcati softul.",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/office/microsoft-office-2019-professional-plus-global-retail",
    category: "Office",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-3.jpeg",
    version: "2019 Professional PLUS | Global | Retail",
    title: "Microsoft Office 2019 Professional PLUS | Global | Retail",
    price: "109.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft:setup.Office.com si asociere cu contul Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://setup.office.com",
    activationSteps: [
      "1. Intrati pe setup.office.com",
      "2. Va creati cont",
      "3. Adaugati licenta primita de la noi",
      "4. Descarcati softul.",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/office/microsoft-office-2021-home-and-business-mac-global-retail",
    category: "Office",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/11/office2021bus_nologo-500x500-1.webp",
    version: "2021 Home and Business MAC | Global | Retail",
    title: "Microsoft Office 2021 Home and Business MAC | Global | Retail",
    price: "149.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft:setup.Office.com si asociere cu contul Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://setup.office.com",
    activationSteps: [
      "1. Intrati pe setup.office.com",
      "2. Va creati cont",
      "3. Adaugati licenta primita de la noi",
      "4. Descarcati softul.",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/office/microsoft-office-2021-professional-plus-global",
    category: "Office",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-4.jpeg",
    version: "2021 Professional Plus | Global | Asociat cont MS",
    title: "Microsoft Office Professional Plus | Global | Asociat cont MS",
    price: "189.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft:setup.Office.com si asociere cu contul Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://setup.office.com",
    activationSteps: [
      "1. Intrati pe setup.office.com",
      "2. Va creati cont",
      "3. Adaugati licenta primita de la noi",
      "4. Descarcati softul.",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/office/microsoft-office-2021-professional-plus-key-phone-activation-global",
    category: "Office",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-4.jpeg",
    version: "2021 Professional Plus | Global | Asociat cont MS",
    title: "Microsoft Office Professional Plus | Global | Asociat cont MS",
    price: "189.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft:setup.Office.com si asociere cu contul Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://setup.office.com",
    activationSteps: [
      "1. Intrati pe setup.office.com",
      "2. Va creati cont",
      "3. Adaugati licenta primita de la noi",
      "4. Descarcati softul.",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/office/microsoft-office-365-5-devices-one-time-payment",
    category: "Office",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-5.jpeg",
    version: "365 Home",
    title: "Microsoft Office 365 Home | 5 DEVICES – ONE TIME PAYMENT",
    price: "249.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft:setup.Office.com si asociere cu contul Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://office.com",
    activationSteps: [
      "1. Intrati pe office.com",
      "2. Va logati cu mail si parola furnizata de noi",
      "3. Descarcati kitul de instalare",
      "4. La sfarsitul instalarii, adaugati inca o data contul furnizat de noi.",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/office/microsoft-office-365-personal-1-device-one-time-payment",
    category: "Office",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-9.29.13-PM-6.jpeg",
    version: "365 Personal",
    title: "Microsoft Office 365 Personal | 1 DEVICE – ONE TIME PAYMENT",
    price: "199.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
      "Descarcare de pe pagina oficiala Microsoft:setup.Office.com si asociere cu contul Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://office.com",
    activationSteps: [
      "1. Intrati pe office.com",
      "2. Va logati cu mail si parola furnizata de noi",
      "3. Descarcati kitul de instalare",
      "4. La sfarsitul instalarii, adaugati inca o data contul furnizat de noi.",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/project/microsoft-project-2019-professional-1pc-lifetime",
    category: "Project",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/10/Microsoft-Project-Professional-2019-download-digital-licence_600x600-2.png",
    version: "2019 Professional",
    title: "Microsoft Project 2019 Professional– 1PC | LifeTime",
    price: "179.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Link Descarcare: ",
    activationLink: "https://setup.office.com",
    activationSteps: [
      "1. Insereaza codul pe pagina oficiala Microsoft https://setup.office.com",
      "2. Selecteaza limba si descarca kitul de instalare",
      "3. Deschide softul si mai insereaza inca o data cheia primita pe mail",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/project/microsoft-project-2019-professional-1pc-lifetime-o-singura-instalare",
    category: "Project",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/10/Microsoft-Project-Professional-2019-download-digital-licence_600x600-2.png",
    version: "2019 Professional",
    title:
      "Microsoft Project 2019 Professional– 1PC | LifeTime | O singura instalare",
    price: "59.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationSteps: [
      "1. Descarca kitul de instalare de pe site-ul oficial Microsoft  https://www.microsoft.com",
      "2. Deschide softul si insereaza cheia primita pe mail",
      "3. Softul este activ!",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/project/microsoft-project-2021-professional-1pc-lifetime",
    category: "Project",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/10/Microsoft-Project-Professional-2021-download-digital-licence_600x600.png",
    version: "2021 Professional",
    title: "Microsoft Project 2021 Professional – 1PC | LifeTime",
    price: "199.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationSteps: [
      "1. Descarca kitul de instalare de pe site-ul oficial Microsoft https://www.microsoft.com",
      "2. Deschide softul si insereaza cheia primita pe mail",
      "3. Softul este activ!",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/project/microsoft-project-2021-professional-1pc-lifetime-o-singura-instalare",
    category: "Project",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/10/Microsoft-Project-Professional-2021-download-digital-licence_600x600.png",
    version: "2021 Professional",
    title:
      "Microsoft Project 2021 Professional– 1PC | LifeTime | O singura instalare",
    price: "69.99lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe viata",
      "Garantie 12 luni",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe software original Microsoft",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationSteps: [
      "1. Descarca kitul de instalare de pe site-ul oficial Microsoft https://www.microsoft.com",
      "2. Deschide softul si insereaza cheia primita pe mail",
      "3. Softul este activ!",
    ],
    postDescr: [
      "Licențele pentru softuri sunt create pentru a fi folosite în calculatoare și sisteme digitale, în comerț sau în echipamente industriale.",
      "Excluive Key Licenses S.R.L. lucrează cu numeroși distribuitori, de licențe de softuri care nu sunt folosite sau nu au fost instalate.",
      "Datorită modului de achiziționare, nu trebuie să suportăm costuri de livrare, de depozitare și de personal, astfel putem oferi prețuri foarte favorabile.",
    ],
  },
  {
    id: "licenta-software/adobe-creative-cloud-1-an",
    category: "Adobe",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/10/adobe-creative-cloud-abonament-1-an.png",
    version: "Creative Cloud ",
    title: "Adobe Creative Cloud | 1 An",
    price: "1899.00 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Activare in contul Adobe de pe site-ul oficial.",
      "Valabilitate 1 an – posibilitate reinnoire.",
      "Livrarea se va face imediat in contul dvs.",
    ],
  },
  {
    id: "licenta-software/antivirus/bitdefender-2022-antivirus-plus-1-pc-1-an",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.38-PM-2.jpeg",
    version: "Bitdefender 2022 Antivirus Plus",
    title: "Bitdefender 2022 Antivirus Plus (1 PC -1 An)",
    price: "119.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe un an",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala BitDefender",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "http://central.bitdefender.com",
    activationSteps: [
      "1. Mergi pe http://central.bitdefender.com",
      "2. Creaza un cont",
      "3. Selecteaza tabul “My Subscription”",
      "3. Selecteaza butonul “Activation Code” in coltul din dreapta sus si adauga cheia",
    ],
  },
  {
    id: "licenta-software/antivirus/bitdefender-2022-antivirus-plus-10-pc-1-an",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.38-PM-2.jpeg",
    version: "Bitdefender 2022 Antivirus Plus",
    title: "Bitdefender 2022 Antivirus Plus (10 PC -1 An)",
    price: "329.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala BitDefender",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "http://central.bitdefender.com",
    activationSteps: [
      "1. Mergi pe http://central.bitdefender.com",
      "2. Creaza un cont",
      "3. Selecteaza tabul “My Subscription”",
      "3. Selecteaza butonul “Activation Code” in coltul din dreapta sus si adauga cheia",
    ],
  },
  {
    id: "licenta-software/antivirus/bitdefender-2022-antivirus-plus-5-pc-1-an",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.38-PM-2.jpeg",
    version: "Bitdefender 2022 Antivirus Plus",
    title: "Bitdefender 2022 Antivirus Plus (5 PC -1 An)",
    price: "199.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala BitDefender",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "http://central.bitdefender.com",
    activationSteps: [
      "1. Mergi pe http://central.bitdefender.com",
      "2. Creaza un cont",
      "3. Selecteaza tabul “My Subscription”",
      "3. Selecteaza butonul “Activation Code” in coltul din dreapta sus si adauga cheia",
    ],
  },
  {
    id: "licenta-software/antivirus/bitdefender-2022-antivirus-plus-5-pc-1-an",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.38-PM-2.jpeg",
    version: "Bitdefender 2022 Antivirus Plus",
    title: "Bitdefender 2022 Antivirus Plus (5 PC -1 An)",
    price: "199.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala BitDefender",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "http://central.bitdefender.com",
    activationSteps: [
      "1. Mergi pe http://central.bitdefender.com",
      "2. Creaza un cont",
      "3. Selecteaza tabul “My Subscription”",
      "3. Selecteaza butonul “Activation Code” in coltul din dreapta sus si adauga cheia",
    ],
  },
  {
    id: "licenta-software/antivirus/eset-nod32-antivirus-1-an-1-pc",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.44-PM-1.jpeg",
    version: "ESET NOD32",
    title: "ESET NOD32 Antivirus (1 An / 1 PC)",
    price: "129.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe un an",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala NOD32",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "https://www.eset.com/int/home/internet-security/download",
    activationSteps: [
      "1. Descarca softul de aici https://www.eset.com/int/home/internet-security/download/",
      "2. Lanseaza instalarea si selecteaza “Try for Free” pentru a completa instalarea.",
    ],
    postDescr: [
      "*Nu vă puteți conecta această licență la propriul cont sau nu vă puteți crea/conecta la un cont de acasă ESET atunci când utilizați software-ul antivirus, licența este legată numai de client/dispozitiv",
    ],
  },
  {
    id: "licenta-software/antivirus/eset-nod32-internet-security-1-year-1-pc",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.44-PM.jpeg",
    version: "ESET NOD32 Internet Security",
    title: "ESET NOD32 Internet Security (1 An / 1 PC)",
    price: "149.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe un an",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala NOD32",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "https://www.eset.com/int/home/internet-security/download",
    activationSteps: [
      "1. Descarca softul de aici https://www.eset.com/int/home/internet-security/download/",
      "2. Lanseaza instalarea si selecteaza “Try for Free” pentru a completa instalarea.",
    ],
    postDescr: [
      "*Nu vă puteți conecta această licență la propriul cont sau nu vă puteți crea/conecta la un cont de acasă ESET atunci când utilizați software-ul antivirus, licența este legată numai de client/dispozitiv",
    ],
  },
  {
    id: "licenta-software/antivirus/kaspersky-antivirus-2022-1-an-1-device",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.31-PM.jpeg",
    version: "Kaspersky AntiVirus 2022",
    title: "Kaspersky AntiVirus 2022 ( 1 An / 1 Device )",
    price: "109.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe un an",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala Kaspersky",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "https://support.kaspersky.com/kts21",
    activationSteps: [
      "1. Descarca softul de aici https://support.kaspersky.com/kts21",
      "2. Instaleaza",
      "3. Deschide Kaspersky si selecteaza “Enter Activation Code” in coltul din dreapta jos",
      "2. Alege “Activate Aplication”",
      "2. Introdu codul si selecteaza “Activate”",
    ],
    postDescr: [
      "*Softul poate cere crearea unui cont.",
    ],
  },
  {
    id: "licenta-software/antivirus/kaspersky-total-security-2022-1-an-1-device",
    category: "Antivirus",
    imgLink:
      "https://ialicenta.ro/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-26-at-10.23.31-PM-1.jpeg",
    version: "Kaspersky Total Security 2022",
    title: "Kaspersky Total Security 2022 ( 1 An / 1 Device )",
    price: "129.99 lei",
    descrTitle:
      "Acest produs poate fi utilizat atat de PERSOANE FIZICE cat si de PERSOANE JURIDICE sau REVANZARE!Se ofera FACTURA FISCALA conform legii.",
    description: [
      "Valabilitate pe un an",
      "Retail (varianta comerciala)",
      "Activarea se face in maxim 60 zile",
      "Confirmarea cumparaturi ( factura)",
      "Fara restrictii",
      "Activare pe site-ul official",
      "Descarcare de pe pagina oficiala Kaspersky",
    ],
    activationTitle: "Descriere",
    activation1: "Instructiuni de instalare",
    activationLink: "https://support.kaspersky.com/kts21",
    activationSteps: [
      "1. Descarca softul de aici https://support.kaspersky.com/kts21",
      "2. Instaleaza",
      "3. Deschide Kaspersky si selecteaza “Enter Activation Code” in coltul din dreapta jos",
      "2. Alege “Activate Aplication”",
      "2. Introdu codul si selecteaza “Activate”",
    ],
    postDescr: [
      "*Softul poate cere crearea unui cont.",
    ],
  },
];
