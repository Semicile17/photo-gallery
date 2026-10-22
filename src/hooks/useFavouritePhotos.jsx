import { useEffect, useReducer } from "react";

const KEY = "favourite-photos"

function getSavedFavourites(){
    try{
        return JSON.parse(localStorage.getItem(KEY)) ?? [];

    }catch{
        return []
    }
}

function favouritePhotosReducer(favourites,action){
    if(action.type === "toggle"){
        return favourites.includes(action.id) ? favourites.filter((id)=>id !== action.id) : [...favourites,action.id]
    }

    return favourites
}

export default function useFavouritePhotos(){
    const [favourites,dispatch]=useReducer(
        favouritePhotosReducer,
        undefined,   // no use of this argument
        getSavedFavourites
    )

    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(favourites))
    },[favourites])

    return {favourites,dispatch}
}