import PalcoService from '../services/PalcoService';

export default function editPalcoAction(id, palcos, setPalcos, setEditPalco){
    let palcoValue = document.getElementById("editPalcoArea").value

    let palco = {palco: palcoValue}

    PalcoService.updatePalco(palco, id)
    setEditPalco(false)

    let palcosFinal = [...palcos]
    palcosFinal.forEach((palco) => {
        if(palco.id === id) {
            palco.palco = palcoValue
        }
    })

    setPalcos(palcosFinal)
    setEditPalco(false)
  }