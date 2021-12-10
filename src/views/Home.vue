<template>
    <div>
        <div class="flex justify-center">
            <bounce-loader :loading="isLoading" :color="'#68d291'" :size="100" />
        </div>
        <px-assets-table v-if="!isLoading" :assets="assets" />
    </div>
</template>

<script>
import api from '@/api'
import PxAssetsTable from '@/components/PxAssetsTable.vue'

export default {
    name: 'Home',

    components: { PxAssetsTable},
    data(){
        return {
            isLoading: false,
            assets: []
        }
    },

    created(){
        this.isLoading = true;

        api.getAssets()
        .then(assets => this.assets = assets)
        .finally(()=> this.isLoading = false)
    }
}

</script>
