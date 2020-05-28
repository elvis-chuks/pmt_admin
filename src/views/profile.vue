<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'New Route'}" />
                <div class="all-content">
                    <h1 class="top">Profile</h1>
                    <div class="form">
                        <label for="username">Username</label>
                        <input class="form-control" type="text" id="username" v-model="username">
                        <label for="password">Password</label>
                        <input class="form-control" type="password" id="password" v-model="password">
                        <p>{{remark}}</p>
                        <div class="submit">
                            <input type="checkbox" name="confirm" id="confirm" @click="confirm()" v-model="check"> Confirm update profile
                            <button class="submit" id="submit" @click="submit()" disabled>Submit</button>
                        </div>
                        <Loader :loading="loading"/>
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
    name:'Profile',
    components:{
        Sidebar,
        Nav,
        Loader
    },
    data(){
        return {
            loading:false,
            username:'',
            password:'',
            check:false,
            remark:"",
            baseUrl:this.$store.getters.getBaseUrl,
        }
    },
    mounted(){
        if(!this.checkCookie('pmt_admin')){
            this.$router.push({name:'Login'})
        }else{
            this.getDetails()
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
        submit(){
            this.remark = "";
            this.loading = true;
            
            fetch(this.baseUrl+'/v3/staff',{
                method:"PUT",
                headers:{
                    password:this.password,
                    username:this.username,
                    staffid:JSON.parse(this.getCookie('pmt_admin')).staffid,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'done'){
                    this.remark = "Succesfully updated details"
                }
            })
        },
        getDetails(){
            this.loading = true;
            fetch(this.baseUrl+'/v3/staff',{
                headers:{
                    staffid:JSON.parse(this.getCookie('pmt_admin')).staffid,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'done'){
                    this.username = data.details.username;
                    this.password = data.details.password;
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