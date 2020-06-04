<template>
    <div>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <section id="content">
            <span class="slide" id="open">
                <button @click="openSlideMenu()">
                    <i class="fa fa-list"></i>
                </button>
            </span>

            <div id="menu" class="nav">
                <img src="../assets/pmt_log.png" alt="logo" class="logo">
                <button class="close" @click="closeSlideMenu()">
                    <i class="fa fa-times"></i>
                </button>
                <router-link tag="a" :to="{name:'DepotDashboard'}"><i class="fa fa-home"></i>Home</router-link>
                <button @click="showRouteMenu()" class="nav-link"><i class="fa fa-road"></i>Routes</button>
                <div class="submenu-routes" v-show="routeMenu">
                  <!-- <router-link tag="a" :to="{name:'NewRoute'}"><i class="fa fa-plus-circle"></i>Create Route</router-link>   -->
                  <!-- <router-link tag="a" :to="{name:'DeleteRoute'}"><i class="fa fa-minus-circle"></i>Delete Route</router-link>   -->
                  <router-link tag="a" :to="{name:'RouteFare'}"><i class="fa fa-money-bill-wave"></i>Route Fare</router-link>  
                  <!-- <router-link tag="a" :to="{name:'FareAdjust'}"><i class="fa fa-money-check"></i>Fare Adjustment</router-link>   -->
                   
                </div>
                <!-- <button @click="showStaffMenu()" class="nav-link"><i class="fa fa-users"></i>Staffs</button> -->
                <div class="submenu-routes" v-show="staffMenu">
                  <router-link tag="a" :to="{name:'CreateStaff'}"><i class="fa fa-plus-circle"></i>Create Staff</router-link>  
                  <router-link tag="a" :to="{name:'UpdateStaff'}"><i class="fa fa-upload"></i>Update Staff</router-link>    
                  <router-link tag="a" :to="{name:'DeleteStaff'}"><i class="fa fa-minus-circle"></i>Delete Staff</router-link>    
                </div>
                <router-link tag="a" :to="{name:'Profile'}"><i class="fa fa-user"></i>Profile</router-link>
                <!-- <router-link tag="a" :to="{name:'Settings'}"><i class="fa fa-gear"></i>Settings</router-link>  -->
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:"DepotSidebar",
    data(){
        return {
            routeMenu:false,
            staffMenu:false,
        }
    },
    methods:{
        openSlideMenu(){
            document.getElementById('menu').style.width = '250px';
            document.getElementById('content').style.marginLeft = '250px';
            document.getElementById('open').style.display = 'none';
        },
        closeSlideMenu(){
            document.getElementById('menu').style.width = '0px';
            document.getElementById('content').style.marginLeft = '0px';
            document.getElementById('open').style.display = 'inline-block';
        },
        showRouteMenu(){
            if(this.routeMenu){
                this.routeMenu = false;
            }else{
                this.routeMenu = true;
            }
        },
        showStaffMenu(){
            if(this.staffMenu){
                this.staffMenu = false;
            }else{
                this.staffMenu = true;
            }
        },
    }
}
</script>

<style scoped>
.logo{
    width:200px;
    margin-left:20px;
}
.nav-link{
    font-size:16px;
    padding:20px 30px;
}

#submenu-routes{
    padding:20px 30px;
    transition:0.7s;
}
#submenu-routes a{
    display:block;
    padding:-30px 30px;
}

.slide button{
    border:none;
    background:none;
    font-size:30px;
}
.nav button{
    border:none;
    background:none;
    /* font-size:30px; */
    color:white;
}
.nav{
    height:100%;
    width:0;
    position: fixed;
    z-index:1;
    top:0;
    left:0;
    background-color:#F36713;
    opacity: .9;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.7s;
}
.nav a{
    display:block;
    padding:20px 30px;
    font-size:15px;
    text-decoration: none;
    color:#fff;
}
.nav a:hover{
    color:#ccc;
    transition: 0.4s;
}
.nav .close{
    position:absolute;
    top:0;
    right:0;
    margin-left:50px;
    font-size:20px;
}
.slide a{
    color: #2F0054;
    font-size:26px;
}
#content{
    padding-left:10px;
    padding-top:20px;
    transition:margin-left .7s;
    overflow:hidden;
    width:100%;
}
.fa{
    margin-right:20px;
}
</style>