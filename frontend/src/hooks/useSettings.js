import { GET_SETTINGS } from "@/graphql/site-settings/queries";
import { useQuery } from "@apollo/client/react";

export function useSettings(){
    const {data,loading,error}=useQuery(GET_SETTINGS);

    return{
        siteSettings:data?.siteSetting,
        loading,
        error
    }
};