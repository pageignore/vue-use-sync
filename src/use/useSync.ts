import { reactive, ref, watch } from 'vue';

function isFn(target:any) {
    return typeof target === 'function';
}

function isContained(a:Array<any>, b:Array<any>){
    if(!(a instanceof Array) || !(b instanceof Array)) return false;
    if(a.length < b.length) return false;
    for(var i = 0, len = b.length; i < len; i++){
        if(!a.includes(b[i])) return false;
    }
    return true;
}

export function useSync() {
    const state:any = reactive({});
    const trackList:any = ref([]);
    const triggerMap:Map<Array<string>, any> = new Map();
    const runed:Set<any> = new Set();

    watch(trackList.value, (data:Array<string>) => {
        matchTrigger();
    })

    function trackListPush(name:string) {
        if(trackList.value.includes(name)) {
            deleteRunedItem(name);
            matchTrigger();
        } else {
            trackList.value.push(name);
        }
    }

    function matchTrigger() {
        triggerMap.forEach((callback, key) => {
            runTrigger(key);
        })
    }

    function runTrigger(currTrigger:Array<string>) {
        if(isContained(trackList.value, currTrigger)) {
            let res:any = reactive({});
            currTrigger.forEach(k => {
                res[k] = state[k];
            })
            let cb = triggerMap.get(currTrigger);
            if(runed.has(currTrigger)) return;
            cb(res);
            runed.add(currTrigger);
        }
    };

    function deleteRunedItem(name:string) {
        runed.forEach(item => {
            if(item.includes(name)) {
                runed.delete(item);
            }
        });
    }

    function track(name:string, effect:any) {
        if(isFn(effect)) {
            new Promise(effect).then(res => {
                state[name] = res;
                trackListPush(name);
            }).catch(err => {
                state[name] = err;
                trackListPush(name);
            })
        } else {
            state[name] = effect;
            trackListPush(name);
        }
    }


    function trigger(names:Array<string>, callback:Function) {
        triggerMap.set(names, callback);
        runTrigger(names);
    }

    return {
        track,
        trigger,
    }
}