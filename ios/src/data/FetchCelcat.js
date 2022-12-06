export function parseDataCelcat(data) {
    let output = [];
    for (let i = 0; i < data.length; i++) {
      let dataRecode = parseCelcat(data[i].description);
      output.push(newCelcatEvent(dataRecode, data[i].start, data[i].end))
    }
    return(output);
}

function parseCelcat(string) {
    let new_string = string.replace(/&#233;/g, "é");
    new_string = new_string.replace(/&#39;/g, "'");
    new_string = new_string.replace(/&#224;/g, "à");
    new_string = new_string.replace(/&#232;/g, "è");
    new_string = new_string.replace(/&#244;/g, "ô");
    new_string = new_string.replace(/&#226;/g, "â");
    new_string = new_string.replace(/<br \/>/g, '$');
    new_string = new_string.replace(/(\r\n|\n|\r)/gm, "");
    return new_string;
}

function newCelcatEvent( string, dateStart, dateEnd ) {
    let new_string = string.split("$");
    let newDateStart = dateStart.split("T");
    let newDay = newDateStart[0];
    newDay = newDay.replace(/-/g, '/');
    newDateStart = newDateStart[1].split(":")
    newDateStart = newDateStart[0]+":"+newDateStart[1];
    let newDateEnd = dateEnd.split("T");
    newDateEnd = newDateEnd[1].split(":")
    newDateEnd = newDateEnd[0]+":"+newDateEnd[1];
    return {
        type: new_string[0],
        salle: new_string[1],
        matiere: new_string[2],
        groupe: new_string[3],
        heureDebut: newDateStart,
        heureFin: newDateEnd,
        day: newDay,
        date: newDay+" "+newDateStart
    }
}

export function isEmptyRoom(room, data, batiment) {
    let currentDate = new Date("2022/11/24 13:54");
    let isEmpty = true;
    let untilValue = "";
    let isTdPlaying = false;

    if (data.length === 0) {
        untilValue = "toute la journée"
    }

    data.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });

    data.map((elem, index) => {
        let start = new Date(elem.day +" "+ elem.heureDebut);
        let end = new Date(elem.day +" "+ elem.heureFin);
        
        if ( (start <= currentDate) && (end > currentDate) ) {
            isTdPlaying = true;
        }

        if (isTdPlaying) {
            isEmpty = false;
        } else {
            
        }

        if (start > currentDate && untilValue === "") {
            untilValue = "jusqu'à "+data[index].heureDebut;
        }
        else if (index+1 > data.length-1 && untilValue === "") {
            untilValue = "jusqu'à fermeture";
        }
    })
    let secondFloorDescartes = ["ALSACE", "AQUITA", "ARCHIM", "BOURGO", "CENTRE", "JUNGLE"];

    let type = room.startsWith("G0") || room.startsWith("RC") || room.startsWith("21") ? "Rez-de-chaussé"
    : room.startsWith("G1") || room.startsWith("22") || room.startsWith("1") ? "Premier étage"
    : room.startsWith("G2") || secondFloorDescartes.includes(room.substring(0, 6)) ? "Deuxième étage"
    : room.startsWith("AMPHI") ? "Amphithéatre" : "None"

    let newRoom = room.split('-');

    return { batiment: batiment, room: newRoom[0], empty: isEmpty, until: isEmpty ? untilValue : "", type: type };
}