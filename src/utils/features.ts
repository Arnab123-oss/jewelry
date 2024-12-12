import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { NavigateFunction } from "react-router-dom";
import { MessageResponse } from "../types/api-types";
import toast from "react-hot-toast";

type ResType = {
    data: MessageResponse;

} | {

    error: FetchBaseQueryError | SerializedError;
}



export const responseToast = (
    res: ResType,
    navigate: NavigateFunction | null, 
    url: string) => {
    if ("data" in res) {

        toast.success(res.data.message)

        if (navigate) navigate(url)
    }
    else {
        const error = res.error as FetchBaseQueryError;
        const MessageResponse = error.data as MessageResponse;
        toast.error(MessageResponse.message)
    }

}
