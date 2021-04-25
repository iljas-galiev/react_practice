import {useQuery} from "@apollo/client"
import getTaskQuery from "../graphql/queries/get_task";

const useTask = (skip = true, id = 0) => {

    const {data, refetch, loading} = useQuery(getTaskQuery, {
        skip: skip,
        variables: {id: id},
        notifyOnNetworkStatusChange: true
    });

    const getTask = async (id) => {
        const {data} = await refetch({id: id});
        return {
            task: data?.task || null,
            loading
        }
    }

    if (skip) return {getTask};

    return {data, loading};
};

export default useTask;
