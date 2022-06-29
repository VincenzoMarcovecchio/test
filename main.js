

const app = new Vue({

    el: "#root",
  
    data: {

      classes: null,

      categorie: null,
  
      prodotti: null,

      prodottiCerca: "",
  
      search: '',
  
      categorieVal: '',
  
      range: ""
  
  
    },
  
    methods: {
  

      hoverOut: function() {
        console.log('out');
        this.classes = 1
      },


      onChangeCategorie(event) {
        this.prodotti = "loading"
        fetch("https://dummyjson.com/products")
          .then(response => response.json())
          .then(res => {
  
            return this.prodotti = res.products.filter(prodo =>
              prodo.category.toLowerCase().includes(event.target.value)
            );
  
          });
      },
  

      onChangeCerca(event) {
        this.classes = null
        fetch("https://dummyjson.com/products")
          .then(response => response.json())
          .then(res => {
            console.log(res)
            return this.prodottiCerca = res.products.filter(prodo =>
              prodo.title.toLowerCase().includes(event.target.value.toLowerCase())
            );
  
          });
      },
  

      onChangePrezzo(event) {
        this.prodotti = "loading"
        fetch("https://dummyjson.com/products")
          .then(response => response.json())
          .then(res => {
  
            if (event.target.value.toString() === "on") {
  
              console.log(event.target.name)
               return this.prodotti = res.products.sort(function(a, b){return b.price-a.price}).filter(function (item) {
                return item.price <= event.target.name;
              })
              ;
  
  
            };
            return this.prodotti = res.products;
          });
      },
  
  
      loadCategorie() {
        fetch('https://dummyjson.com/products/categories')
          .then(res => res.json())
          .then(res => this.categorie = res);
      },
  
  
      getAllProdotti() {
        fetch("https://dummyjson.com/products")
          .then(response => response.json())
          .then(res => {
            if (this.search) {
              this.prodotti = res.products.filter(prodo =>
                prodo.title.toLowerCase().includes(this.search.toLowerCase())
              );
  
            } else {
              this.prodotti = res.products;
            }
  
          });
  
      }
    },
  
  
    mounted() {
  
      this.loadCategorie();
  
  
    },
  
  
    created() {
  
      this.getAllProdotti();
  
  
    },
  
    computed: {
  
    }
  })



