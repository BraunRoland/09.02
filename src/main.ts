import type { Emberek } from "./adat";

let adatok: Emberek[];

async function beolvasas() {
    let response = await fetch("https://retoolapi.dev/2FRbeu/data");
    let data = await response.json();
    console.log(data);
}

function init() {
    beolvasas();
}

document.addEventListener('DOMContentLoaded', init);