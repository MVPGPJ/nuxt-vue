<template>
    <div id="a" class="s">
        gongpengji11111{{ navList }}
    </div>
</template>

<script>
import { getConsultationDetails } from '@/api/asyncData/common'

export default {
    data () {
        return {
            navList: ''
        }
    },
    mounted () {
    },
    async asyncData () {
        const data = {
            aid: 291
        }
        const res = await getConsultationDetails(JSON.stringify(data))
        return {
            navList: res.message
        }
    }
}
</script>
