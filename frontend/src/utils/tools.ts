import {IApiCall} from './types'
import axios, { AxiosResponse } from 'axios'

export const ApiCall = async (props: IApiCall) => {
    //create axios call using await request in ts
    const response = await axios({
        method: props.method,
        url: props.url,
        headers: props.headers,
        data: props.body
    });
    return response;
}