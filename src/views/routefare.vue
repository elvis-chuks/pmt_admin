<template>
    <div>
        <main>
            <Sidebar v-if="JSON.parse(this.getCookie('pmt_admin')).role == 1"/>
            <DepotSidebar v-else/>
            <!-- {{JSON.parse(this.getCookie('pmt_admin'))}} -->
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'Route Fare'}" />
                <div class="all-content">
                    <h1 class="top">Update Route Fare</h1>
                    <div class="form">
                        <select v-show="JSON.parse(this.getCookie('pmt_admin')).role = 0" class="form-control" id="depot" @change="getZroute()">
                            <option selected :value="depotDetails.depotcode">{{ depotDetails.depotname }}</option>
                        </select>
                        <select v-show="JSON.parse(this.getCookie('pmt_admin')).role == 1" name="depot"  class="form-control" id="depot" @change="getZroute()">
                            <option selected disabled>Select depot</option>
                            <option
                                v-for="depot in depots"
                                :key="depot.depotid"
                                :value="depot.depotcode"
                                
                            >{{depot.name}}</option>
                        </select>
                        <select name="destination"  class="form-control" id="route" @change="getClass()">
                            <option selected disabled>Select destination</option>
                            <option
                                v-for="route in destinations"
                                :key="route.routeid"
                                :value="route.routeid"
                                
                            >{{route.routename}}</option>
                        </select>
                        <select name="busclass"  class="form-control" id="class" @change="getFare()">
                            <option selected disabled>Select BusClass</option>
                            <option
                                v-for="fare in fares"
                                :key="fare.busfarecode"
                                :value="fare.busclassid"
                            >{{fare.busclassname}}</option>
                        </select>
                        <input v-model="price" type="number" placeholder="price" class="form-control">
                    </div>
                    <Loader :loading="loading"/>
                    <div class="submit">
                        <p>{{remark}}</p>
                        <input type="checkbox" name="confirm" id="confirm" v-model="check" @click="confirm()"> Confirm route fare
                        <button class="submit" id="submit" @click="updateFare()">Submit</button>
                    </div>
                </div>
            </section>
            
        </main>
        
    </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'
import DepotSidebar from '@/components/depotsidebar.vue'
import Nav from '@/components/nav.vue'
import Loader from '@/components/loader.vue'
export default {
    name:'RouteFare',
    components:{
        Sidebar,
        DepotSidebar,
        Nav,
        Loader,
    },
    mounted(){
        if(!this.checkCookie('pmt_admin')){
            this.$router.push({name:'Login'})
        }else{
            console.log(this.getCookie('pmt_admin'),JSON.parse(this.getCookie('pmt_admin')))
            this.details = JSON.parse(this.getCookie('pmt_admin'))
            // this.details is unnecessary
            this.depotDetails = JSON.parse(this.getCookie('pmt_admin_details'))
            console.log(this.details)
            if(JSON.parse(this.getCookie('pmt_admin')).role == 0){
                this.getZroute();
            }
            this.getDepots();
        }
    },
    data(){
        return {
            loading:false,
            depots:[],
            destinations:[],
            fares:[],
            baseUrl:this.$store.getters.getBaseUrl,
            price:"",
            busclassid:"",
            remark:"",
            status:"",
            check:false,
            details:{},
            depotDetails:{},
        }
    },
    methods:{
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
        getZroute(){

            this.loading = true;

            var selected = document.getElementById("depot").value;
            
            if(selected.length == 0){
                selected = this.depotDetails.depotcode;
            }
            console.log(selected)
            fetch(this.baseUrl+'/v2/zroute',{
                headers:{
                depotCode:selected,
                depotName:selected,
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.loading = false;
                this.destinations = []
                if (data.status == "found"){
                this.destinations = data.routes
                }
                
            })
        },

        getClass(){
            this.loading = true;
            this.price="";
            this.fares = [];
            
            fetch(this.baseUrl+'/v3/routefare',{
                headers:{
                    routeid:document.getElementById('route').value,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'done'){
                    this.fares = data.fares;
                    data.fares.forEach(fare => {
                        if(fare.busclassid == '2'){
                            fare.busclassname = "Economy"
                        }else{
                            fare.busclassname = "Executive"
                        }
                    })
                }
            })
            
        },
        getFare(){
            var id = document.getElementById('class').value;

            this.fares.forEach(fare => {
                if(fare.busclassid == id){
                    this.price = fare.busfare;
                    this.busclassid = fare.busclassid;
                }
                
            });

        },
        confirm(){
            if(!this.check){
                document.getElementById('submit').disabled = false;
            }else{
                document.getElementById('submit').disabled = true;
            }
        },
        updateFare(){
            this.loading = true;
            fetch(this.baseUrl+'/v3/updatefare',{
                headers:{
                    routeid:document.getElementById('route').value,
                    busclassid:this.busclassid,
                    price:this.price,
                },
                method:"POST"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.loading=false;
                if(data.status == "done"){
                    this.remark = data.msg
                    this.status = "success"
                    window.location.reload()
                }else{
                    this.remark = data.msg
                    this.status = "fail"
                }
            })
        },
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
    }
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
.top{
    margin-top:30px;
}
.form-control{
    width:90%;
    padding:10px;
    margin-top:10px;
    border-radius:10px;
    /* border:1px solid rgba(224, 150, 52, 0.534); */
}
input{
    border:1px solid grey;
}
.navy{
    margin-top:20px;
}
.all-content{
    width:80%;
    margin:auto;
}

main{
    display:flex;
}
.main-stuff{
    flex:1;
}
@media(max-width:568px){
    
    
}
</style>