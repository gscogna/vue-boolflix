const preselezione = 'https://image.tmdb.org/t/p/';
const formato = 'w342';

var app = new Vue({
    el:'#app',
    data:{
        contenuti:[],
        query:'',
        apikey:'9c849102cf7097b31d1314854e343536',
        lang:'it-IT'
    },
    methods:{
        ricerca(){
            axios
                .get('https://api.themoviedb.org/3/search/movie',{
                    params:{
                        language: this.lang,
                        api_key: this.apikey,
                        query: this.query
                    }
                })
                .then((result) => {
                    this.contenuti = result.data.results;
                })
                .catch((error)=> console.log(error));
        }
    }
});




// Milestone 1:
// Creare un layout base con una searchbar(una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film.Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto
