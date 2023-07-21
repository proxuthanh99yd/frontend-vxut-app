import Axios from "axios";



const testApi = {
    IndexTest() {
        return Axios({
            method: "GET",
            url: process.env.VUE_APP_API_BASE_URL + 'test/'
        })
    },
    StoreTest(params) {

        return Axios({
            method: "POST",
            url: process.env.VUE_APP_API_BASE_URL + 'test/',
            data: params,

        })
    },
    EditTest(params) {
        return Axios({
            method: "GET",
            url: process.env.VUE_APP_API_BASE_URL + 'test/' + params + '/edit',
            data: params,
        })
    },
    UpdateTest(params) {
        return Axios({
            method: "PUT",
            url: process.env.VUE_APP_API_BASE_URL + 'test/' + params,
            data: params.body,
        })
    },
    DestroyTest(params) {
        return Axios({
            method: "DELETE",
            url: process.env.VUE_APP_API_BASE_URL + 'test/' + params,
        })
    }
}
export default testApi;