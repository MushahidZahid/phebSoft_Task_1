import axios from "axios";
import * as axiosURL from './Urls';

export default axios.create({
    baseURL: axiosURL.BaseUrl
});
