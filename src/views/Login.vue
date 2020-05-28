<template>
  <div>
    <main>
      <section class="form-div">
        <div class="form"></div>
        <div class="form main-form">
          <h1 class="title">Login</h1>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" v-model="email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" v-model="password">
          </div>
          <button class="btn login form-control" @click="login()">Login</button>
          <p style="color:white;">{{remark}}</p>
          <Loader :loading="loading"/>
        </div>
        <div class="form"></div>
      </section>
    </main>
  </div>
</template>

<script>
import Loader from '@/components/loader.vue'
export default {
  name: 'Login',
  components:{
    Loader,
  },
  data(){
    return {
      loading:false,
      password:"",
      email:"",
      remark:"",
      baseUrl:this.$store.getters.getBaseUrl,
    }
  },
  created(){
    if(this.checkCookie('pmt_admin')){
      if(this.getCookie('pmt_admin').length != 0){
        this.$router.push({name:'Dashboard'})
      }
    }
  },
  methods:{
    login(){
      // call the login endpoint
      this.loading = true;
      this.remark = "";
      fetch(this.baseUrl+"/v3/adminlogin",{
        headers:{
          key:"PMTpub_key1762436ttyetw7289172635w_key",
          username:this.email,
          password:this.password,
        }
      })
      .then(resp => resp.json())
      .then( data => {
        this.loading = false;
        if (data.status != 'done'){
          this.remark = data.reason;
        }else{
          // set cookie here
          this.setCookie('pmt_admin',JSON.stringify(data.data),30)
          this.getDepotname(data.data.depotid);
          switch(data.data.role){
            case '1':
              this.$router.push({name:'Dashboard'})
              break
            default:
              this.$router.push({name:'Dashboard'})
          }
        }
      })
    },
    getDepotname(id){
      this.remark = "";
      fetch(this.baseUrl+'/v3/routedata',{
        headers:{
          depotid:id
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.status == 'done'){
          this.setCookie('pmt_admin_details',JSON.stringify(data.data))
        }else{
          this.remark = "An error occured please try again.";
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
  }
}
</script>
<style scoped>
main{
  background:url('../assets/background.jpg');
  height: 100vh;
}
main h1{
  color:white;
}
.form{
  flex:1;
}
.form-group{
  margin:2px;
}
.form-control{
  width:100%;
  padding:10px;
  border:none;
  margin-top:10px;
  border-radius:5px;
}
.login{
  background:#2F0054 ;
  color:white;
}
.main-form{
  padding:20px;
}
.form-div{
    display: flex;
    width:90%;
    margin:auto;
    min-height: 100vh;
    align-items: center;
}

@media(max-width: 568px){
  .form-div{
    flex-direction: column;
    width:100%;
  }
  
}
</style>