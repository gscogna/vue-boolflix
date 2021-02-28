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
        risultati:[],
        generi:[],
        generiValue:'All',
        query:'',
        apiKey:'9c849102cf7097b31d1314854e343536',
        lang: 'it-IT'
    },
    created() {
        this.intervallo = setInterval(this.avanti,3000);
    },
    mounted(){
        axios
            .get("https://api.themoviedb.org/3/genre/movie/list", {
                params: {
                    language: this.lang,
                    api_key: this.apiKey
                }
            })
            .then((result) => {
                result.data.genres.forEach((e) => {
                    if (!this.generi.includes(e.name)) {
                        this.generi.push(e.name);
                    }
                });
            })
            .catch((error) => console.log(error));
            
        axios
            .get(" https://api.themoviedb.org/3/genre/tv/list", {
                params: {
                    language: this.lang,
                    api_key: this.apiKey
                }
            })
            .then((result) => {
                result.data.genres.forEach((e) => {
                    if (!this.generi.includes(e.name)) {
                        this.generi.push(e.name);
                    }
                });
                this.generi = this.generi.sort();
                this.generi.unshift('All')
            })
            .catch((error) => console.log(error));
        },
        methods:{
            search() {
                this.risultati = [];
                const parametri = {
                    api_key: this.apiKey,
                    query: this.query,
                    language: this.lang
                }
    
                let movies = axios.get("https://api.themoviedb.org/3/search/movie", { params: parametri });
    
                let tv = axios.get("https://api.themoviedb.org/3/search/tv", { params: parametri });
    
                axios
                    .all([movies, tv])
                    .then((result) => {
                        this.risultati = result[0].data.results;
    
                        this.risultati.forEach((element) => {
                            this.getCast(element, "movie");
                            this.getGenres(element, "movie");
                        });
    
                        this.risultatiTv = result[1].data.results;
                        this.risultatiTv.forEach((element) => {
                            this.getCast(element, "tv");
                            this.getGenres(element, "tv");
                        });
    
                        this.risultati = this.risultati.concat(this.risultatiTv);
                        console.log(this.risultati);
                    })
                    .catch((error) => console.log(error));
            },
            getPoster(poster) {
                return `https://image.tmdb.org/t/p/w185/${poster}`;
            },
            getCast(el, tipo) {
                axios.get(`https://api.themoviedb.org/3/${tipo}/${el.id}/credits?`, {
                    params: {
                        language: this.lang,
                        api_key: this.apiKey
                    }
                }).then((response) => {
                    let castArray = response.data.cast;
                    let castNames = [];
                    castArray.slice(0, 5).forEach((person) => {
                        castNames.push(person.name);
                    });
                    Vue.set(el, "cast", castNames);
                })
            },
            getGenres(el, tipo) {
                axios.get(`https://api.themoviedb.org/3/genre/${tipo}/list?`, {
                    params: {
                        language: this.lang,
                        api_key: this.apiKey
                    }
                })
                    .then(result => {
                        let genresName = [];
                        let tempGenres = result.data.genres;
    
                        tempGenres.forEach(item => {
                            if (el.genre_ids.includes(item.id)) {
                                genresName.push(item.name);
                            }
                        })
                        Vue.set(el, "genereName", genresName);
                    })
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
            }
        }
    });

