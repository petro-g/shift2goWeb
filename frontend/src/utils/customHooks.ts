import React from "react";
import { ApiCall } from './tools'
import { IApiCall } from './types'

export const useApiCall = (props: IApiCall) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchData = async () => {
        setLoading(true);
        ApiCall(props).then((res: any) => {
            setData(res.data);
            setLoading(false);
        }
        ).catch(error => {
            setError(error);
            setLoading(false);
        }
        );
    }
    React.useEffect(() => {
        fetchData();
    }, [])

    return [data, loading, error]
}