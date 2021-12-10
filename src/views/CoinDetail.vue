<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d291'" :size="100" />
    </div>
    <template v-if="asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
            <img
                :src="`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
                class="w-20 h-20 mr-5" 
                :alt="asset.name"
            />
          <h1  class="text-5xl">
              {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
             class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                 class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>

      <line-chart 
        class="my-10" 
        :colors="['orange']" 
        :min="min" 
        :max="max"
        :data="history.map(item => [item.date, parseFloat(item.priceUsd).toFixed(2)])" 
      />

    </template>
  </div>
</template>

<script>
import api from '@/api'


export default {
    nmae: 'CoinDetail',

    data() {
        return{
            isLoading: false,
            asset: {},
            history: []
        }
    },

    created(){
        this.getcoin()
    },

    computed: {
        min(){
            return Math.min(...this.getJustPrices())
        },
        max(){
            return Math.max(...this.getJustPrices())
        },
        avg(){
            return Math.abs(...this.getJustPrices())
        }
    },

    methods: {
        getcoin() {
            const idCoin = this.$route.params.id
            this.isLoading = true;

            Promise.all([
                api.getAsset(idCoin),
                api.getAssetHistory(idCoin)

            ])
                .then(([asset, history]) =>  {
                    this.asset = asset
                    this.history = history
                })
                .finally(()=> this.isLoading = false)
        },
        getJustPrices(){
            const prices = [...this.history.map(price => parseFloat(price.priceUsd).toFixed(2))]
            return prices
        }
    }
}
</script>
