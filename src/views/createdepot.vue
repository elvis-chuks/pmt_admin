<template>
    <div>
        <main>
            <Sidebar v-if="JSON.parse(this.getCookie('pmt_admin')).role == 1"/>
            <DepotSidebar v-else/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'Route Fare'}" />
                <div class="main-content">
                    <input class="form-control" placeholder="Depot Name" v-model="depotname">
                    <input class="form-control" placeholder="Depot Code" v-model="depotcode">
                    <input class="form-control" placeholder="Address" v-model="address">
                    <!-- <label for="bank">Select Bank</label> -->
                    <select class="form-control" id="bank">
                        <option disabled selected value="0">Select Bank</option>
                        <option 
                        v-for="bank in banks"
                        :key="bank.bankId"
                        :value="bank.bankId">{{bank.bankName}}</option>
                    </select>
                    <input class="form-control" placeholder="Account Number" v-model="account">

                    <Loader :loading="loading"/>

                    <div class="submit">
                        <input type="checkbox" name="confirm" id="confirm" v-model="check" @click="confirm()"> Confirm create depot
                        <button class="submit" id="submit" disabled @click="createDepot()">Submit</button>
                        <p>{{remark}}</p>
                    </div>
                </div>
            </section>

        </main>
<!-- depotname,depotcode,address,bankid,account number -->
    </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
import DepotSidebar from '@/components/depotsidebar'
import Nav from '@/components/nav'
import Loader from '@/components/loader.vue'
export default {
    name : "CreateDepot",
    components:{
        Sidebar,
        DepotSidebar,
        Nav,
        Loader
    },
    data(){
        return {
            loading:false,
            baseUrl:this.$store.getters.getBaseUrl,
            banks:[],
            remark:"",
            depotname:"",
            depotcode:"",
            address:"",
            bankid:"",
            account:"",
            check:false,
        }
    },
    mounted(){
        this.getBanks()
    },
    methods:{
        getBanks(){
            this.loading = true;
            fetch(this.baseUrl+'/v3/bank')
            .then(resp => resp.json())
            .then(data => {
                if(data.status == "success"){
                    this.banks = data.banks;
                    this.loading = false;
                }
            })
        },
        createDepot(){
            this.loading = true;
            this.remark = "";
            fetch(this.baseUrl+'/v3/createdepot',{
                method:"POST",
                headers:{
                    depotname:this.depotname,
                    depotcode:this.depotcode,
                    address:this.address,
                    bankid:document.getElementById("bank").value,
                    account:this.account,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.status == "success"){
                    this.remark = "Succesfully created depot"
                    this.loading = false;
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
        confirm(){
            if(!this.check){
                document.getElementById('submit').disabled = false;
            }else{
                document.getElementById('submit').disabled = true;
            }
        },
    }
}
</script>


<style scoped>
main{
    display:flex;
}
.main-stuff{
    flex:1;
}
.navy{
    margin-top:20px;
}
.form-control{
    width:90%;
    padding:10px;
    margin-top:10px;
    border-radius:10px;
    /* border:1px solid rgba(224, 150, 52, 0.534); */
}
.main-content{
    margin-top:20px;
    width:70%;
    margin:auto;
    padding:20px;
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
</style>