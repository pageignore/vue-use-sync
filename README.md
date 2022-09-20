# vue-useSync

Make async easy.

## Install
`npm i vue-useSync`

## Usage

```javascript
import { reactive, ref, onMounted, watch } from 'vue';
import { useSync } from 'vue-useSync'

const { track, trigger } = useSync();

const state:any = reactive({
    id: 1
})

onMounted(() => {

    track('t1', true)
    // track('t1', 123)
    // track('t1', 'hello')
    // track('t1', [1,2,3])
    // track('t1', {})

    setTimeout(() => {
        track('t2', true)
    }, 1000)
    
    // If a function is passed in, it executes like a promise
    track('t3', (resolve:any) => {
        setTimeout(() => {
            resolve({'username': 'ignorezyt'})
        }, 2000)
    })

    function getdata(id:any) {
        track('t4', (resolve:any, reject:any) => {
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err)
            })
        })
    }

    trigger(['t1', 't2'], (data:any) => {
        let t1 = data['t1'];
        let t2 = data['t2'];
        if(t1 && t2) {
            console.log('do something')
        }
    })

    trigger(['t2', 't3', 't4'], (data:any) => {
        let t2 = data['t2'];
        let t4 = data['t4'];
        if(t2) {
            state.info = t4;
        }
    })

    getdata(state.id);

    watch(() => state.id, (id) => {
        getdata(id);
    })

})
```

