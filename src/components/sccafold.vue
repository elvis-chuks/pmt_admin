<template>
    <div>
        <main>
            <Sidebar/>
            <section class="main-stuff">
                <Nav class="navy" :location="{page:'Dashboard',parent:'Home > Routes',child:'New Route'}" />
                <div class="all-content">
                    <h1>Create New Route</h1>
                </div>
            </section>
            
        </main>
        
    </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'
import Nav from '@/components/nav.vue'
// import Datatable from '@/components/datatable.vue'
export default {
    name:'NewRoute',
    components:{
        Sidebar,
        Nav,
        // Datatable
    },
    data(){
        return {
        }
    },
}
</script>
<style scoped>
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