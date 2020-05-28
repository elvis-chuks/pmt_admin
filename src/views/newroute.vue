<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'New Route'}" />
                <div class="all-content">
                    <div class="contents">
                        <div class="content-body">
                            
                            <div class="form">
                                <div class="content-head">
                                    <h1>Create New Route</h1>
                                </div>
                                <select name="depot" id="depot" class="form-control">
                                    <option value="" selected disabled>Originating Depot</option>
                                    <option
                                    v-for="depot in depots"
                                    :key="depot.depotid"
                                    :value="depot.depotcode"
                                    
                                    >{{depot.name}}</option>
                                </select>
                                <select name="destination" id="destination" class="form-control">
                                    <option value="" selected disabled>Destinating Depot</option>
                                    <option 
                                    v-for="depot in depots"
                                    :key="depot.depotid"
                                    :id="depot.depotcode"
                                    :value="depot.depotcode"
                                    :name="depot.name"
                                    >{{depot.name}}</option>
                                </select>

                                <Loader :loading="loading"/>

                                <hr>
                                
                                <div class="content-head">
                                    <h1>Add Price</h1>
                                    
                                </div>
                                <div class="price" v-for="price in priceList" :key="price">
                                    <select name="busclass"  class="form-control class1">
                                        <option value="2">Economy</option>
                                        <option value="3">Executive (A/C)</option>
                                    </select>
                                    <input type="number" name="amount" placeholder="Price" class="form-control prices">
                                </div>
                                <div class="buttons">
                                    <button class="add" @click="addPrice()"><i class="fa fa-plus"></i></button>
                                    <button class="remove" @click="removePrice()"><i class="fa fa-minus"></i></button>
                                </div>
                            </div>
                            <div class="buses">
                                <div class="content-head">
                                    <h1>Add buses to queue</h1>
                                </div>
                                <div class="bus" v-for="index in busList" :key="index">
                                    <select name="busclass"  class="form-control class" >
                                        <option value="2">Economy</option>
                                        <option value="3">Executive</option>
                                    </select>
                                    <select name="busseat"  class="form-control number" >
                                        <option selected disabled>Seat amount</option>
                                        <option value="1">14 seats</option>
                                        <option value="3">15 seats</option>
                                        <option value="5">16 seats</option>
                                    </select>
                                    
                                </div>
                                <div class="buttons">
                                    <button class="add" @click="addBus()"><i class="fa fa-plus"></i></button>
                                    <button class="remove" @click="removeBus()"><i class="fa fa-minus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="submit">
                            <input type="checkbox" name="confirm" id="confirm" v-model="check" @click="confirm()"> Confirm create route
                            <button class="submit" id="submit" disabled @click="addRoute()">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
        
    </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'
import Nav from '@/components/nav.vue'
import Loader from '@/components/loader.vue'
// import Datatable from '@/components/datatable.vue'
export default {
    name:'NewRoute',
    components:{
        Sidebar,
        Nav,
        Loader
    },
    mounted(){
        if(!this.checkCookie('pmt_admin')){
            this.$router.push({name:'Login'})
        }else{
            this.getDepots();
        }
    },
    data(){
        return {
            priceList : 1,
            busList: 1,
            depots:[],
            baseUrl:this.$store.getters.getBaseUrl,
            loading:false,
            check:false,
        }
    },
    methods:{
        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        checkCookie(name) {
            var username = this.getCookie(name);
            if (username != "") {
                return true;
            } else {
                return false;
                }
        },
        addPrice(){
            if (this.priceList < 2){
                this.priceList += 1
            }
        },
        removePrice(){
            if(this.priceList > 1){
                this.priceList -= 1
            }
        },
        addBus(){
            if (this.busList < 6){
                this.busList += 1
            }
        },
        removeBus(){
            if(this.busList > 1){
                this.busList -= 1
            }
        },
        confirm(){
            if(!this.check){
                document.getElementById('submit').disabled = false;
            }else{
                document.getElementById('submit').disabled = true;
            }
        },
        getDepots(){
            this.loading = true;
            fetch(this.baseUrl+'/v2/home')
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'found'){
                    this.depots = data.depot
                }
            })
            .catch(error => {
                console.log(error)
                this.remark = "An error occured"
            })
        },
        addRoute(){
            // var totalDetails = {};
            var depot = document.getElementById('depot').value;
            var destination = document.getElementById('destination').value;
            var prices = document.getElementsByClassName('prices');
            var seatNo = document.getElementsByClassName('number');
            var busclass = document.getElementsByClassName('class');
            var priceClass =document.getElementsByClassName('class1');

            var _price = ""
            var _priceclass = ""
            var _seatNo = ""
            var _busclass = ""

            prices.forEach(price => {
                if(_price.length != 0){
                    _price += ","+price.value;
                }else{
                    _price += price.value;
                }
                
            })

            priceClass.forEach(clas => {

                if(_priceclass.length != 0){

                    _priceclass += ","+clas.value;

                }else{

                    _priceclass += clas.value;

                }

            })
    console.log("this is seatno ",seatNo)
            seatNo.forEach(seat => {

                if(_seatNo.length != 0){

                    _seatNo += ","+seat.value;

                }else{

                    _seatNo += seat.value;

                }

            })
            busclass.forEach(bus => {

                if(_busclass.length != 0){
                    _busclass += ","+bus.value;
                }else{
                    _busclass += bus.value;
                }

            })

            var s = JSON.parse(this.getCookie('pmt_admin')).staffid
            console.log(s)
            fetch(this.baseUrl+'/v3/addroute',{
                headers:{
                    oru:depot,
                    dru:destination,
                    price:_price,
                    priceClass:_priceclass,
                    seatno:_seatNo,
                    busclass:_busclass,
                    staffid:s,
                },
                method:'POST'
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if(data.status == 'done'){
                    this.comment = "Succesfully added route."
                    window.location.reload()
                }else{
                    this.comment = "Error adding route"
                }
            })


            console.log(
            depot,
            destination,
            _price,
            _priceclass,
            _seatNo,
            _busclass,
            s)

        },
    },
}
</script>
<style scoped>
.submit{
    margin-top:30px;
}
.submit button{
    width:150px;
    padding:10px;
    display:block;
    color:white;
    background:#B690B7;
    border:none;
}
.bus{
    display:flex;
}
.bus select{
    flex:1;
    margin:5px;
}
.bus .img{
    flex:1;
    
}
.buttons button{
    margin-right:10px;
    width:30px;
    padding:5px;
    color:white;
    border:none;
}
.buttons{
    margin-top:20px;
}
.add{
    background:#B690B7;
}
.remove{
    background:#F194AA;
}
.price{
    display:flex;
    /* background: #B690B7;
    padding:20px; */

}
.price input{
    border:1px solid grey;
    
}
.price select,.price input{
    flex:1;
    margin:5px;
}
.form-control{
    width:90%;
    padding:10px;
    margin-top:10px;
    border-radius:10px;
    /* border:1px solid rgba(224, 150, 52, 0.534); */
}
hr{
    margin-top:30px;
    margin-bottom:20px;
    margin-right:60px;
}
.contents{
    margin-top:20px;
}
.content-body input,select{
    display:block;
}
.content-body{
    display:flex;
}
.form,.buses{
    flex:1;
}
.navy{
    margin-top:20px;
}
.all-content{
    width:90%;
    margin:auto;
}

main{
    display:flex;
}
.main-stuff{
    flex:1;
}
@media(max-width:568px){
    .content-body{
        flex-direction:column;
    }
    
}
</style>