// 🏎️ SISTEMA F1 ANALYTICS - JavaScript Moderno  
// Projeto prático para relembrar ES6+ features com dados da Fórmula 1

// Classe principal para gerenciar dados da F1
class F1Analytics {
    constructor() {
        this.races = [];
        this.nextRaceId = 1;
    }

// Método para adicionar corrida
    addRace = ({name, country, circuit, date, laps}) => {
        const newRace = {
            id: this.nextRaceId++,
            name,
            country,
            circuit, 
            date: new Date(date),
            laps,
            results: []
        };

        this.races.push(newRace);
        console.log(`GP ${name} adicionado ao calendário!`);
        return newRace;
    };

// Método para adicionar resultados
    addRaceResult = ({ raceId, driverName, team, position, points }) => {
        const race = this.races.find(r => r.id === raceId);
// .find() procura o PRIMEIRO item que atende a condição
// r => r.id === raceId significa: "procure uma corrida onde o ID seja igual ao raceId"

        if(!race) {
            throw new Error(`Corrida ${raceId} não encontrada!`);
        }
// throw PARA o programa imediatamente e mostra um erro. É como gritar: "PARE TUDO! Algo deu errado!"

        const result = {
            driverName,
            team,
            position,
            points
        };

        race.results.push(result);
        console.log(`🏆 ${driverName} (#${position}) adicionado ao GP ${race.name}`);
        return result;
    };
}

//classe de análise
class F1StatsAnalyzer {
    constructor(races) {
        this.races = races;
    }

    //MAP: para transfomar dados
    getRaceNames = () => {
        return this.races.map(race => `GP ${race.name} (${race.country})`);
    }; 

    //FILTER: para filtrar vencedores
    getWinners = () => {
        return this.races
        .filter(race => race.results.length > 0)
        .map(race => race.results.find(r => r.position === 1))
        .filter(winner => winner !== undefined);
    }; 

    //REDUCE: para somar pontos por piloto
    getDriverStandings =() => {
        const allResults = this.races.flatMap(race => race.results);

        return allResults.reduce((standings, result) =>{
            const driver = result.driverName;
            if(!standings[driver]) {
                standings[driver] = {name: driver, totalPoints: 0, wins: 0};
            }

            standings[driver].totalPoints += result.points;
            if (result.position === 1) standings[driver].wins++;

            return standings;
        }, {});
    }
}


// === TESTES ===

const f1 = new F1Analytics();
 console.log("Sistema F1 criado!", f1.races);
 console.log("Próximo ID: ", f1.nextRaceId);

// teste addRace
f1.addRace({
     name: "GP do Brasil",
     country: "Brasil",
     circuit: "Interlagos",
     date: "2024-11-03",
     laps: 71
 });

 console.log("Total de corridas: ", f1.races.length);

//teste addRaceResult
f1.addRaceResult({
    raceId: 1, 
    driverName: "Max Verstappen",
    team: "Red Bull", 
    position: 1,
    points: 25
}); 

f1.addRaceResult({
    raceId: 1,
    driverName: "Lando Norris",
    team: "McLaren",
    position: 2,
    points: 18
});

//teste de análise
const analyzer = new F1StatsAnalyzer(f1.races);
console.log("Nomes das corridas: ", analyzer.getRaceNames());
console.log("Vencedores: ", analyzer.getWinners());
console.log("Classificação: ", analyzer.getDriverStandings());

console.log("Resultados: ", f1.races[0].results);