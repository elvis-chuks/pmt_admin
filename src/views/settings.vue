<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home',child:'Settings'}" />
                <div class="all-content">
                    <h1 class="top">Settings</h1>
                    <div class="form"> 
                        <input v-model="noOfDays" class="form-control" id="bookable" placeholder="Amount of bookable days"/>
                        <div class="submit">
                            <p>{{remark}}</p>
                            <input type="checkbox" name="confirm" id="confirm" v-model="check" @click="confirm()"> Confirm route fare
                            <button class="submit" id="submit" disabled @click="updateSettings()">Submit</button>
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
    name:'Settings',
    components:{
        Sidebar,
        Nav,
        Loader,
    },
    data(){
        return {
            noOfDays:"",
            msg:"",
            loading:false,
            baseUrl:this.$store.getters.getBaseUrl,
            check:false,
            remark:"",
        }
    },
    mounted(){
        if(!this.checkCookie('pmt_admin')){
            this.$router.push({name:'Login'})
        }else{
            this.getSettings()
        }
       
    },
    methods:{
        updateSettings(){
            this.loading = true;
            this.remark = "";
            fetch(this.baseUrl+'/v2/setup',{
                method:"POST",
                headers:{
                    days:this.noOfDays,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'success'){
                    this.remark = "Successfully updated settings"
                }else{
                    this.remark ="Error updating settings"
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
        getSettings(){
            this.loading = true;
            fetch(this.baseUrl+'/v2/setup')
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'found'){
                    this.noOfDays = data.settings[0].NoOfAdvertizedDays
                }
            })
        },
        checkCookie(name) {
            var username = this.getCookie(name);
            if (username != "") {
                return true;
            } else {
                return false;
                }
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
input{
    border:1px solid grey;
}
.form-control{
    width:90%;
    padding:10px;
    margin-top:10px;
    border-radius:10px;
    /* border:1px solid rgba(224, 150, 52, 0.534); */
}
.top{
    margin-top:30px;
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