var app = new Vue({
    el:'#app',
    data:{
        alterantiveFoto:'https://pbs.twimg.com/profile_images/1006975467042328583/FESn8ZMw_400x400.jpg',
        preselezione: 'https://image.tmdb.org/t/p/',
        formato: 'w342',
        bandiere: [],
        contenuti:[],
        series:[],
        query:'',
        apikey:'9c849102cf7097b31d1314854e343536',
        lang: 'it-IT'
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
            axios
                .get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        language: this.lang,
                        api_key: this.apikey,
                        query: this.query
                    }
                })
                .then((result) => {
                    this.series.concat(result.data.results);
                })
                .catch((error) => console.log(error))
        },

        filtroBandiere(){
            this.contenuti.forEach(element => {
                if (this.bandiere.includes(element.original_language)) {
                    this.bandiere.push(element.original_language);
                }
            });
        }
    }
});




// 'img/es.jpeg', 'img/it.jpeg', 'img/fr.jpeg', 'img/en.jpeg', 'img/pt.jpeg'


{/* <img class="bandiera-size" : src="(contenuto.original_language == 'es') ? bandiere[0] : (contenuto.original_language == 'it') ? bandiere[1] : (contenuto.original_language == 'fr') ? bandiere[2] : (contenuto.original_language == 'en') ? bandiere[3] : (contenuto.original_language == 'pt') ? bandiere [4] : (contenuto.original_language) " : alt="contenuto.original_language"> */}

// stella a metà
{/* <i class="far fa-star"></i> */}


