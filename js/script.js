var app = new Vue({
    el:'#app',
    data:{
        alterantiveFoto:'img/genio.jpg',
        preselezione: 'https://image.tmdb.org/t/p/',
        formato: 'w500',
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
        
        filtered (voto) {
                return parseInt(voto / 2);
        },

        filteredStar (voto) {
                return 5 - parseInt(voto / 2);
            }  
        
    }
});

