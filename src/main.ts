import type { Emberek } from "./adat";

let adatok: Emberek[] = [];

async function beolvasas() {
    let response = await fetch("https://retoolapi.dev/VScxxg/data");
    let data = await response.json();
    data.forEach((x: any) => {
        if (x.Lakhely != null) {
            let ember: Emberek = {nev: x.Nev, szul: x.Szuletesnap, pontszam: x.Pontszam, varos: x.Lakhely};
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
        szul.innerHTML =ember.szul; 
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

async function init() {
    await beolvasas();
    kiiras();
}

document.addEventListener('DOMContentLoaded', init);