<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'Adjust Fares'}" />
                <div class="all-content">
                    
                    <div class="top">
                        <div class="all">
                            <h1>All routes discount </h1>
                            <select class="form-control" @change="switchVal()" id="type">
                                <option selected disabled>Select discount amount type</option>
                                <option value="1">Percentage</option>
                                <option value="2">Value</option>
                            </select>
                            <select class="form-control" @change="switchVal()" id="action">
                                <option selected disabled>Select discount type</option>
                                <option value="1">Increment</option>
                                <option value="2">Decrement</option>
                            </select>
                            <select class="form-control" @change="switchVal()" id="class">
                                <option selected disabled>Select Bus class</option>
                                <option value="1">All Buses</option>
                                <option value="2">Economy</option>
                                <option value="3">Executive</option>
                            </select>
                            <input class="form-control"  v-model="value" type="number" placeholder="Increment / Decrement value"/>
                            <div class="submit">
                                <p>{{remark}}</p>
                                <input type="checkbox" name="confirm" id="confirm" @click="confirm" v-model="check"> Confirm fare adjustment
                                <button class="submit" id="submit" disabled @click="allRoutes()">Submit</button>
                            </div>
                        </div>
                        <div class="specific">
                            <h1>Specific routes discount </h1>
                            <select class="form-control" id="sdepot">
                                <option selected disabled>Select depot</option>
                                <option 
                                v-for="depot in depots"
                                :key="depot.depotid"
                                :id="depot.depotcode"
                                :value="depot.depotcode"
                                :name="depot.name"
                                >{{depot.name}}</option>
                            </select>
                            <select class="form-control" id="stype" @change="switchVal()">
                                <option selected disabled>Select discount amount type</option>
                                <option value="1">Percentage</option>
                                <option value="2">Value</option>
                            </select>
                            <select class="form-control" id="saction" @change="switchVal()">
                                <option selected disabled>Select discount type</option>
                                <option value="1">Increment</option>
                                <option value="2">Decrement</option>
                            </select>
                            <select class="form-control" id="sclass" @change="switchVal()">
                                <option selected disabled>Select Bus class</option>
                                <option value="1">All Buses</option>
                                <option value="2">Economy</option>
                                <option value="3">Executive</option>
                            </select>
                            <input class="form-control" v-model="svalue" type="number" placeholder="Increment / Decrement value"/>
                            <div class="submit">
                                <p>{{sremark}}</p>
                                <input type="checkbox" name="confirm" id="confirm" @click="sconfirm" v-model="scheck"> Confirm fare adjustment
                                <button class="submit" id="ssubmit" disabled @click="oneRoute()">Submit</button>
                            </div>
                        </div>
                    </div>
                    <Loader :loading="loading"/>
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
    name:'FareAdjust',
    components:{
        Sidebar,
        Nav,
        Loader
    },
    data(){
        return {
            value:"",
            svalue:"",
            type:"",
            action:"",
            class:"",
            stype:"",
            saction:"",
            sclass:"",
            remark:"",
            sremark:"",
            depots:[],
            baseUrl:this.$store.getters.getBaseUrl,
            loading:false,
            check:false,
            scheck:false,
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
        sconfirm(){
            if(!this.scheck){
                document.getElementById('ssubmit').disabled = false;
            }else{
                document.getElementById('ssubmit').disabled = true;
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
        switchVal(){
        this.class = document.getElementById('class').value;
        this.sclass = document.getElementById('sclass').value
        this.action = document.getElementById('action').value
        this.saction = document.getElementById('saction').value
        this.type = document.getElementById('type').value
        this.stype = document.getElementById('stype').value
      },
      allRoutes(){
        console.log(this.value,this.action,this.type,this.class)
        this.loading = true;
        fetch(this.baseUrl+'/v3/adddiscount',{
          method:"POST",
          headers:{
            value:this.value,
            action:this.action,
            type:this.type,
            class:this.class
          }
        })

        .then(resp => resp.json())
        .then(data => {
            this.loading = false;
          if(data.status == 'done'){
            this.remark = "Succesfully added discount to all routes"
            window.location.reload()
          }else{
            this.remark = "Error adding discount to routes"
          }
        })
      },
      oneRoute(){
        console.log(this.value,this.action,this.type,this.class)
        this.loading = true;

        fetch(this.baseUrl+'/v3/adddiscount',{
          method:"PATCH",
          headers:{
            value:this.svalue,
            action:this.saction,
            type:this.stype,
            class:this.sclass,
            depotcode:document.getElementById('sdepot').value,
          }
        })

        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.loading = false;
          if(data.status == 'done'){
            this.sremark = "Succesfully added discount to specified routes"
            window.location.reload()
          }else{
            this.sremark = "Error adding discount to specified routes"
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
    display:flex;
}
select{
    display:block;
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
input {
    border:1px solid grey;
}
.all,.specific{
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
    
    
}
</style>