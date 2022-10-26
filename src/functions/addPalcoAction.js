import PalcoService from '../services/PalcoService';

export default function addPalcoAction(palcos, setPalcos, setAddPalco) {
    let palcoValue = document.getElementById("addPalcoArea").value

    let palco = {palco: palcoValue}

    PalcoService.createPalco(palco)
    setAddPalco(false)

    let palcosFinal = [...palcos]
    palcosFinal.push(palco)
    setPalcos(palcosFinal)
}