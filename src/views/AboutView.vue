<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts" setup>
  import { useSync } from '../use/useSync'
    import { reactive, ref, onMounted, watch } from 'vue';
import type { an } from 'vitest/dist/global-e98f203b';

    const state:any = reactive({
        id: 2
    })

    const { track, trigger } = useSync();
    onMounted(() => {
        console.log(123)
        track('n1', true)

        setTimeout(() => {
            track('n2', true)
        }, 1000)

        track('n3', (resolve:any) => {
            setTimeout(() => {
                resolve({'username': 'ignorezyt'})
            }, 2000)
        })

        getdata(state.id);

        watch(() => state.id, (id) => {
            getdata(id);
        })

        function getdata(id:any) {
            track('n4', (resolve:any, reject:any) => {
                fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        }


        trigger(['n1', 'n2'], (data:any) => {
            let n1 = data['n1'];
            let n2 = data['n2'];
            if(n1 && n2) {
                console.log('do something')
            }
        })

        trigger(['n2', 'n3', 'n4'], (data:any) => {
            let n2 = data['n2'];
            let n4 = data['n4'];
            if(n2) {
               state.info = n4;
            }
        })

    })
</script>
