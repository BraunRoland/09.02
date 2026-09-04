import type { Emberek } from "./adat";

let adatok: Emberek[] = [];

async function beolvasas() {
    let response = await fetch("https://retoolapi.dev/VScxxg/data");
    let data = await response.json();
    data.forEach((x: any) => {
        if (x.Lakhely != null || x.Lakhely != "") {
            let ember: Emberek = {nev: x.Nev, szul: new Date(x.Szuletesnap), pontszam: x.Pontszam, varos: x.Lakhely};
            adatok.push(ember)
        }
        else {
            let ember: Emberek = {nev: x.Nevek, szul: x.Szuletesnap, pontszam: x.Pontszam};
            adatok.push(ember)
        }
    });
    console.log(adatok);
}
function kiiras() {
    const tbody: HTMLElement | null = document.getElementById('tablazatAdat');
    adatok.forEach(ember => {
        let tr: HTMLTableRowElement = document.createElement('tr');
        let nev: HTMLTableCellElement = document.createElement('td');
        nev.innerHTML = ember.nev;
        let szul: HTMLTableCellElement = document.createElement('td');
        szul.innerHTML = dateKiiras(ember.szul); 
        let pontszam: HTMLTableCellElement = document.createElement('td');
        pontszam.innerHTML = ember.pontszam.toString();
        let varos: HTMLTableCellElement = document.createElement('td');
        varos.innerHTML = ember.varos;
        tr.appendChild(nev);
        tr.appendChild(szul);
        tr.appendChild(pontszam);
        tr.appendChild(varos);
        tbody?.appendChild(tr);
    })
}

async function formBeolvasas() {
    let nevF = document.getElementById('nev') as HTMLFormElement;
    let szulF = document.getElementById('szul') as HTMLFormElement;
    let pontF = document.getElementById('pont') as HTMLFormElement;
    let lakF = document.getElementById('lak') as HTMLFormElement;
    
    let nev = nevF.value as string;
    let szul = new Date(szulF.value) as Date;
    let pont = parseInt(pontF.value) as number;
    let lak = lakF.value as string;
    let uj: Emberek;
    if (lak != null || lak != "") {
        uj = {nev: nev, szul: szul, pontszam: pont, varos: lak}
    }
    else {
        uj = {nev: nev, szul: szul, pontszam: pont}
    }
    await dbPost(uj)

}

async function dbPost(e: Emberek) {
    let data = await fetch("https://retoolapi.dev/VScxxg/data", 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({Nev: e.nev, Lakhely: e.varos, Pontszam: e.pontszam, Szuletesnap: e.szul})
        }
    );
}

function dateKiiras(datum: Date):string {
    return `${datum.getFullYear()}-${datum.getMonth()+1}-${datum.getDate()}`
}

async function init() {
    await beolvasas();
    kiiras();
}

document.getElementById('form')!.addEventListener('submit',(e)=>{
    e.preventDefault();
    formBeolvasas();
})
document.addEventListener('DOMContentLoaded', init);