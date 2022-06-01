export interface IApiCall {
    method: "POST"|"GET"|"PUT"|"DELETE";
    url: string;
    headers: { [key: string]: string };
    body: any;
}