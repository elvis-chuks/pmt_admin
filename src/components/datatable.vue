<template>
    <div id="tab">
        <Grid :style="{height: '550px'}"
          :data-items="items"
          :total="rows.length"
          :pageable="true"
          :columns="columns"
          @pagechange="pageChangeHandler"
          :skip= "skip"
          :take="take"
          :key="keyy"
          >
        </Grid>
    </div>
</template>

<script>
export default {
    name:"Datatable",
    components:{
    },
    props:{
        rows:{
            type:Array,
            default:function(){return []}
        }
    },
    mounted(){
        if(this.items != undefined){
            this.items.forEach((item,index) => {
            index;
            this.items.splice(item)
        })
        }
        
        this.rows.forEach(row => {
            this.items.push(row)
        })
    },
    methods:{
        pageChangeHandler: function(event) {
            this.skip = event.page.skip;
            this.take = event.page.take;
            this.keyy +=1 ;
        },
    },
    data(){
        return {
            skip:0,
            keyy:1,
            take:10,
            items:[
                
            ],
            columns:[
                // {
                //     label: 'Title',
                //     field: 'title',
                //     sort: 'asc'
                // },
                {
                    label: 'Name',
                    field: 'fullname',
                    sort: 'asc'
                },
                // {
                //     label: 'Gender',
                //     field: 'Gender',
                //     sort: 'asc'
                // },
                {
                    label: 'Number',
                    field: 'number',
                    sort: 'asc'
                },
                {
                    label: 'Payment Channel',
                    field: 'channel',
                    sort: 'asc'
                },
                {
                    label: 'Route Name',
                    field: 'routename',
                    sort: 'asc'
                },
                {
                    label: 'Bus class',
                    field: 'busclass',
                    sort: 'asc'
                },
                {
                    label: 'Bus order',
                    field: 'busorder',
                    sort: 'asc'
                },
                {
                    label: 'Seats',
                    field: 'seats',
                    sort: 'asc'
                },
                {
                    label: 'Departure Date',
                    field: 'departuredate',
                    sort: 'asc'
                },
                {
                    label: 'Booking Date',
                    field: 'bookingdate',
                    sort: 'asc'
                },
                {
                    label: 'Amount paid',
                    field: 'totalamount',
                    sort: 'asc'
                }
            ],    
        }
    }
}
</script>