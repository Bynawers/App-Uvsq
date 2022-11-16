import axios, * as others from 'axios';

export function parseDataCelcat(data) {
    let output = [];

    for (let i = 0; i < data.length; i++) {
      let dataRecode = parseCelcat(data[i].description);
      output.push(newCelcatEvent(dataRecode, data[i].start, data[i].end))
    }
    return(output);
}

function parseCelcat(string) {
    let new_string = string.replaceAll("&#233;", "é");
    new_string = new_string.replaceAll("&#39;", "'");
    new_string = new_string.replaceAll("&#224;", "à");
    new_string = new_string.replaceAll("&#232;", "è");
    new_string = new_string.replaceAll("&#244;", "ô");
    new_string = new_string.replaceAll("&#226;", "â");
    new_string = new_string.replaceAll('<br />', '$');
    new_string = new_string.replace(/(\r\n|\n|\r)/gm, "");
    return new_string;
}

function newCelcatEvent( string, dateStart, dateEnd ) {
    let new_string = string.split("$");
    let newDateStart = dateStart.split("T");
    let newDay = newDateStart[0];
    newDay = newDay.replaceAll('-', '/');
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
    let currentDate = new Date("2022/11/10 12:00");
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
    return { batiment: batiment, room: room, empty: isEmpty, until: isEmpty ? untilValue : "" };
}