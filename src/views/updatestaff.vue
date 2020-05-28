<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'New Route'}" />
                <div class="all-content">
                    <h1 class="top">Update staff</h1>
                    <div class="form">
                        <div class="form-left">
                            <label for="depot">Select Depot</label>
                            <select class="form-control" id="depot" @change="userDeets()">
                                <option selected disabled>Select Depot</option>
                                <option value="1">All depots</option>
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
                            <label for="email">Email</label>
                            <input v-model="email" class="form-control" type="email" id="email">
                            <label for="number">Phone Number</label>
                            <input v-model="number" class="form-control" type="text" id="number">
                            
                        </div>
                        <div class="form-right">
                            <label for="username">Username</label>
                            <input v-model="username" class="form-control" type="text" id="username">
                            <label for="password">Password</label>
                            <input v-model="password" class="form-control" type="text" id="password">
                            <label for="address">Address</label>
                            <textarea v-model="address" class="form-control" type="email" id="address"></textarea>
                        </div>
                    </div>
                    <div class="submit">
                        <p>{{remark}}</p>
                        <input type="checkbox" name="confirm" id="confirm" v-model="check" @click="confirm()"> Disable Staff
                        <button class="submit" id="submit" @click="updateStaff()">Update Staff</button>
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
    name:'UpdateStaff',
    components:{
        Sidebar,
        Nav,
        Loader,
    },
    data(){
        return {
            loading:false,
            depots:[],
            username:"",
            password:"",
            depotid:"",
            staffid:JSON.parse(this.getCookie('pmt_admin')).staffid,
            role:"",
            number:"",
            email:"",
            name:"",
            remark:"",
            address:"",
            check:false,
            status:"1",
            baseUrl:this.$store.getters.getBaseUrl,
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
                this.status = "1"
            }else{
                this.status = "0"
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
            this.loading = true;
            var depotid = document.getElementById('depot').value;
            if(depotid == '1'){
                this.role = "1"
            }else{
                this.role = '0'
            }
            fetch(this.baseUrl+'/v3/getstaff',{
                headers:{
                    depotid:depotid,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                console.log(data)
                if(data.status == 'none'){
                    this.remark = data.msg;
                }else{
                    this.name = data.details.staffname;
                    this.email = data.details.email;
                    this.number = data.details.number;
                    this.username = data.details.username;
                    this.password = data.details.password;
                    this.address = data.details.address;
                    this.remark = ""
                }
            })
        },
        updateStaff(){
            this.loading = true;
            var depotid = document.getElementById('depot').value;
            console.log(depotid)
            fetch(this.baseUrl+'/v3/staff',{
                method:"PATCH",
                headers:{
                    depotid:depotid,
                    role:this.role,
                    username:this.username,
                    password:this.password,
                    email:this.email,
                    name:this.name,
                    address:this.address,
                    number:this.number,
                    status:this.status,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                console.log(data)
                if(data.status == 'done'){
                    this.remark = "Succesfully updated user";
                    window.location.reload()
                }else{
                    this.remark = "Error updating user";
                }
            })
            .catch(error => {
                this.loading = false;
                this.remark = "Error updating user"
                console.log(error)
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