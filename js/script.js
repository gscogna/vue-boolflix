var app = new Vue({
    el:'#app',
    data:{
        alterantiveFoto:'https://pbs.twimg.com/profile_images/1006975467042328583/FESn8ZMw_400x400.jpg',
        preselezione: 'https://image.tmdb.org/t/p/',
        formato: 'w342',
        contenuti:[],
        series:[],
        query:'',
        apikey:'9c849102cf7097b31d1314854e343536',
        lang: 'it-IT'
    },
    computed: {
        filtered: function () {
            return this.contenuti.slice(0, 2)
        }
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
        
    }
});

