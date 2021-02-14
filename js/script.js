var app = new Vue({
    el:'#app',
    data:{
        intervallo:'',
        contatore: 0,
        foto: [
            'https://pad.mymovies.it/filmclub/2017/09/127/locandina.jpg',
            'https://1.bp.blogspot.com/-pawJ-M57E2M/UAfnHjhKS1I/AAAAAAAADGc/29_SavK5j0E/s1600/Montecristo+2002.jpg',
            'https://i.pinimg.com/originals/d7/10/16/d71016d447865eda2e444a0b1dbdb314.jpg',
            'https://opinioni.it/Uploads/Products/1121/il-miglio-verde_large.jpg'
        ],
        foto2: [
            'img/topgun.jpg',
            'img/007.jpg',
            'img/vento.jpg',
            'img/padrino.jpg'
        ],
        alterantiveFoto:'img/genio.jpg',
        preselezione: 'https://image.tmdb.org/t/p/',
        formato: 'w500',
        contenuti:[],
        series:[],
        genereSelect:'Tutti i generi',
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
            },

        cambio(indice) {
            this.contatore = indice
        },  
        
        avanti() {
            (this.contatore == (this.foto.length - 1)) ? this.contatore = 0 : this.contatore++;
        },

        avanti2(){
            (this.contatore == (this.foto2.length - 1)) ? this.contatore = 0 : this.contatore++;
        },

        indietro() {
            (this.contatore < 1) ? this.contatore = (this.foto.length - 1) : this.contatore--;
        },

        indietro2() {
            (this.contatore < 1) ? this.contatore = (this.foto2.length - 1) : this.contatore--;
        },
    },
    created() {
        this.intervallo = setInterval(this.avanti,3000);
    }
});

