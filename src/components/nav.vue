<template>
    <div>
        <section class="sect">
            <div class="page-name">
                <h1>{{location.page}}</h1>
                <p class="locate">{{location.parent}} > {{location.child}}</p>
            </div>
            <div class="logout">
                <button class="logout-btn" @click="Logout()">Logout</button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:"Nav",
    props:{
        location:{
            type:Object
        }
    },
    methods:{
        Logout(){
            this.setCookie('pmt_admin','',0)
            window.location.href = window.location.origin;
            console.log(window.location.href)
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
    },
    
}
</script>

<style scoped>
.sect{
    display:flex;
    margin-top:25px;
    width:90%;
    margin:auto;
}
.locate{
    font-size:13px;
}
.logout-btn{
    border:none;
    height:40px;
    width:100px;
    background:#F36713;
    color:white;
    border-radius: 5px;
}
.page-name{
    flex:3;
}
.logout{
    flex:1;
    display: flex;
    justify-content: flex-end;
    margin-right:40px;
}
</style>