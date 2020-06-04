<template>
    <div>
        <main>
            <DepotSidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home',child:'Dashboard'}" />
                <div class="all-content">
                    <div class="content">
                        <div class="content-text">
                            <h1>Enjoy travel , anytime anywhere to any location.</h1>
                            <p>Go with PMT for your next journey.</p>
                        </div>
                        <div class="content-img">
                            <img src="../assets/orangebus.svg" alt="bus">
                        </div>
                    </div>
                    <div class="stats">
                        <div class="stat booked">
                            <p class="small">Total Bookings</p>
                            <p class="big">{{success.length + failedB.length}}</p>
                            <div class="stat-svg">
                                 <img src="../assets/bus.svg" alt="">
                            </div>
                        </div>
                        <div class="stat success" @click="showTable()">
                            <p class="small">Succesful Bookings</p>
                            <p class="big">{{success.length}}</p>
                            <div class="stat-svg">
                                 <img src="../assets/booked.svg" alt="">
                            </div>
                        </div>
                        <div class="stat failed" @click="showTable()">
                            <div class="stat-text">
                                <p class="small">Failed Bookings</p>
                                <p class="big">{{failedB.length}}</p>
                            </div>
                            <div class="stat-svg">
                                 <img src="../assets/booked.svg" alt="">
                            </div>
                           
                        </div>
                    </div>
                </div>
                <Loader :loading="loading"/>
                <section class="datatable" v-show="succesful">
                    <div class="datatable-header">
                        <h1 class="big-title">Succesful Bookings</h1>
                        <input type="date" placeholder="start Date" v-model="startDate" class="form-control"/>
                        <input type="date" placeholder="start Date" v-model="endDate" class="form-control"/>
                        <button class="btn" @click="getPassengers()"><i class="fa fa-search"></i></button>
                    </div>
                    <Datatable :rows="success" ref="datatablesuccess" :key="successKey"/>
                </section>
                <section class="datatable" v-show="failed">
                    <div class="datatable-header">
                        <h1 class="big-title">Failed Bookings</h1>
                        <input type="date" placeholder="start Date" v-model="startDate" class="form-control"/>
                        <input type="date" placeholder="start Date" v-model="endDate" class="form-control"/>
                        <button class="btn" @click="getPassengers()"><i class="fa fa-search"></i></button>
                    </div>
                    <Datatable :rows="failedB" ref="datatablefailed" :key="failedBKey"/>
                </section>
            </section>
            
        </main>
    </div>
</template>

<script>
import DepotSidebar from '@/components/depotsidebar.vue'
import Nav from '@/components/nav.vue'
import Datatable from '@/components/datatable.vue'
import Loader from '@/components/loader.vue'
export default {
    name:"DepotDashboard",
    components:{
        DepotSidebar,
        Nav,
        Datatable,
        Loader,
    },
    data(){
        return {
            succesful:true,
            failed:false,
            loading:true,
            baseUrl:this.$store.getters.getBaseUrl,
            startDate:'',
            endDate:'',
            success:[],
            failedB:[],
            successKey:1,
            failedBKey:1,
        }
    },
    created(){
        if(!this.checkCookie('pmt_admin')){
         this.$router.push({name:'Login'})   
        }
        if(this.checkCookie('pmt_admin')){
            if(JSON.parse(this.getCookie('pmt_admin')).role != 0){
                if(JSON.parse(this.getCookie('pmt_admin')).role == 1){
                    this.$router.push({name:'Dashboard'})
                }else{
                    this.$router.push({name:'Login'})
                }
                
            }
        }
    },
    mounted(){
        this.getPassengers()
        this.startDate = this.getdate[1]
        this.endDate = this.getdate[0]
    },
    methods:{
        showTable(){
            if(this.failed == true){
                this.failed = false;
                this.succesful = true;
            }else{
                this.succesful = false;
                this.failed = true;
            }
        },
        getPassengers(){
            this.loading = true;
            fetch(this.baseUrl+'/v3/getbooking',{
                headers:{
                    startDate : this.startDate,
                    endDate : this.endDate,
                    depotName : JSON.parse(this.getCookie('pmt_admin_details')).depotname,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                if(data.status == 'done'){
                    console.log(data)
                    this.success = data.data;
                    this.failedB = data.failed;
                    this.successKey += 1;
                    this.failedBKey +=1;
                }
            })
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
    computed:{
        getdate(){
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();
            day = day.toString()

            if(month.toString.length == 1){
                month = '0'+month.toString()
            }
            if(day.length == 1){
                day = "0"+day
            }
            var newDay = parseInt(day) - 3
            
            if(newDay.toString().length == 1){
                newDay = "0"+newDay
            }
            
            return [year + '-' + month + '-' + day,year + '-' + month + '-' + newDay]
        },
    }
    
}
</script>
<style scoped>
.datatable-header{
    display:flex;
    align-items:center;
}
.datatable-header h1{
    flex:3;
}
.datatable-header input{
    flex:1;
    height:30px;
    padding:5px;
    margin:5px;
}
.datatable-header button{
    padding:5px;
    border:none;
    background:#B690B7;
    color:white;
    width:50px;
}
.stat:hover{
    border-radius:30px;
    transition:0.7s;
    cursor:pointer;
}
.datatable{
    width:95%;
    margin:auto;
    margin-top:20px;
    transition:slide 2.7s  ease;
}
@keyframes slide{
    0%{
        opacity:0;
        transform:translateY(-80px)
    }
    100%{
        opacity:1;
        transform:translateY(0px)
    }
}
.big-title{
    font-size:30px;
    margin-bottom:10px;
}
.navy{
    margin-top:20px;
}
.big{
    font-size:32px;
    font-weight:bold;
}
.content{
    display: flex;
    min-height:45vh;
    align-items: center;
    /* background:red; */
    /* width:90%;
    margin:auto; */
    
}
.stat-svg{
    float:right;
}
.all-content{
    width:90%;
    margin:auto;
}
.stats{
    display:flex;
    margin-top:15px;
}
.stat{
    flex:1;
    margin:10px;
    border-radius:10px;
    padding:15px 20px;
    color:white;
}
.booked{
    background:#F194AA;
}
.success{
    background:#B690B7;
}
.failed{
    background:#F69682;
}

.content-img{
    display: flex;
    justify-content: center;
}
.content-text,.content-img{
    flex:1;
    transition:margin-left .7s;
    overflow:hidden;
    width:100%;
}
.content-text h1{
    font-weight:600;
    font-size:40px;
}
.content-text p{
    font-size:14px;
    margin-top:10px;
}
main{
    display:flex;
}
.main-stuff{
    flex:1;
}
@media(max-width:568px){
    .content,.stats{
        flex-direction:column;
    }
    
}
</style>