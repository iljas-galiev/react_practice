import {useQuery} from "@apollo/client"
import getCards from "../graphql/queries/get_cards";

const useCards = (archived) => {
    if (archived === null) archived = 0;

    archived = parseInt(archived)

    const {data, loading} = useQuery(getCards, {variables: {archived: archived}});

    return {
        cards: data?.cards || [],
        loading,
    };
};

export default useCards;
