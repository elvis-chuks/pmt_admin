<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'Delete Route'}" />
                <div class="all-content">
                    <h1 class="top">Delete A Route</h1>
                    <div class="form">
                        <select name="depot" id="depot" class="form-control" @change="getZroute()">
                            <option value="" selected disabled>Originating Depot</option>
                            <option 
                            v-for="depot in depots"
                            :key="depot.depotid"
                            :id="depot.depotcode"
                            :value="depot.depotcode"
                            :name="depot.name"
                            >{{depot.name}}</option>
                        </select>
                        <select name="destination" id="destination" class="form-control">
                            <option value="" selected disabled>Destinating Depot</option>
                            <option 
                            v-for="dest in destinations"
                            :key="dest.routeid"
                            :value="dest.routeid"
                            :id="dest.routeid"
                            >{{dest.routename}}</option>
                        </select>
                    </div>
                    <Loader :loading="loading"/>
                    <div class="submit">
                        {{remark}}
                        <input type="checkbox" name="confirm" id="confirm" v-model="check" @click="confirm()"> Confirm delete route
                        <button class="submit" id="submit" disabled @click="deleteRoute()">Submit</button>
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
export default {
    name:'DeleteRoute',
    components:{
        Sidebar,
        Nav,
        Loader,
    },
    data(){
        return {
            remark:"",
            depots:[],
            destinations:[],
            baseUrl:this.$store.getters.getBaseUrl,
            check:false,
            loading:false,
        }
    },
    mounted(){
        if(!this.checkCookie('pmt_admin')){
            this.$router.push({name:'Login'})
        }else{
            this.getDepots();
        }
    },
    methods:{
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
        getZroute(){

            this.loading = true;

            var selected = document.getElementById("depot").value;
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
        deleteRoute(){
            this.loading = true;
            fetch(this.baseUrl+'/v3/deleteroute',{
                headers:{
                    routeid:document.getElementById('destination').value,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'done'){
                    this.remark = "Succesfully deleted route."
                    window.location.reload()
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
    },
}
</script>
<style scoped>
.top{
    margin-top:30px;
}
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
.form-control{
    width:90%;
    padding:10px;
    margin-top:10px;
    border-radius:10px;
    /* border:1px solid rgba(224, 150, 52, 0.534); */
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
    
    
}
</style>