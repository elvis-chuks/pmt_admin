<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'New Route'}" />
                <div class="all-content">
                    <h1 class="top">Delete staff</h1>
                    <div class="form">
                        <div class="form-left">
                            <label for="depot">Select Depot</label>
                            <select class="form-control" id="depot" @change="userDeets()">
                                <option selected disabled>Select Depot</option>
                                <option value="1">All Depots</option>
                                <option
                                v-for="depot in depots"
                                :key="depot.depotid"
                                :id="depot.depotcode"
                                :value="depot.depotid"
                                :name="depot.name"
                                >{{depot.name}}</option>
                            </select>
                            <label for="fullname">Fullname</label>
                            <input v-model="name" class="form-control" type="text" id="fullname">
                            
                        </div>
                        <div class="form-right">
                        </div>
                    </div>
                    <div class="submit">
                        <p>{{remark}}</p>
                        <input type="checkbox" name="confirm" id="confirm" @click="confirm()" v-model="check"> Disable Staff
                        <button class="submit" id="submit" disabled @click="deleteStaff()">Delete Staff</button>
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
import Loader from '@/components/loader'
export default {
    name:'DeleteStaff',
    components:{
        Sidebar,
        Nav,
        Loader
    },
    data(){
        return {
            depots:[],
            depotid:"",
            staffid:JSON.parse(this.getCookie('pmt_admin')).staffid,
            name:"",
            remark:"",
            baseUrl:this.$store.getters.getBaseUrl,
            loading:false,
            check:false,
        }
    },
    created(){
        if(!this.checkCookie('pmt_admin')){
            this.$router.push({name:'Login'})
        }else{
            this.getDepots();
        }
    },
    mounted(){
        this.getDepots();
    },
    methods:{
        deleteStaff(){
            var depotid = document.getElementById('depot').value;
            fetch(this.baseUrl+'/v3/staff',{
                method:"DELETE",
                headers:{
                    depotid:depotid,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.status == 'done'){
                    this.remark = "Succesfully deleted staff credentials"
                    window.location.reload()
                }else{
                    this.remark = "Error deleting staff"
                }
            })
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
        userDeets(){
            this.name = ""
            var depotid = document.getElementById('depot').value;
            fetch(this.baseUrl+'/v3/getstaff',{
                headers:{
                    depotid:depotid,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if(data.status == 'none'){
                    this.remark = data.msg;
                }else{
                    this.name = data.details.staffname;
                    this.remark = ""
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
.submit{
    margin-top:30px;
}
label{
    display:block;
    margin-top:10px;
}
.form{
    display:flex;
}
.form-left,.form-right{
    flex:1;
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
    margin-top:5px;
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
    .form{
        flex-direction: column;
    }
}
</style>