import {makeAutoObservable} from 'mobx'

class ApiStore{

    constructor() {
        makeAutoObservable(this)
    }

    isFetching = false

    setIsFetching(payload){
        this.isFetching = payload
    }

}

export default new ApiStore();