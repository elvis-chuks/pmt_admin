<template>
    <section class="loader-modal" v-show="loading">
        <div class="loader" id="loader"></div>
    </section>
</template>

<script>
export default {
    name:"Loader",
    props:{
        loading:{
            type:Boolean
        }
    }
}
</script>


<style scoped>
.loader-modal{
    width:90%;
    margin:auto;
    display: flex;
    justify-content: center;
    margin-top:20px;
}
.loader{
	border: 3px solid #f3f3f3;
	border-top:3px solid #3498db;
	border-radius:50%;
	width:20px;
	height:20px;
	animation: spin 2s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg);}
    100% {transform:rotate(360deg)}
}
</style>