import {useQuery} from "@apollo/client"
import getCardQuery from "../graphql/queries/get_card";

const useCard = (id = 0) => {

    if (id == 0)
        return {
            data: {card: {name: ""}},
            loading: false
        }

    const {data, loading} = useQuery(getCardQuery, {
        variables: {id: id},
        notifyOnNetworkStatusChange: true
    });

    return {data, loading};
};

export default useCard;
