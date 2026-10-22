/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export default function useFetchPhotos(){
    const [photos,setPhotos] = useState([])
    const [loading,setLoading] = useState(true)
    const [err , setErr] = useState(null)

    useEffect(()=>{
        async function fetchPhotos() {
            try{
                const res = await fetch("https://picsum.photos/v2/list?limit=30")
              

                if(!res.ok) throw new Error("Could not fetch photos")

                    setPhotos(await res.json())
            }catch(err){
                setErr(err)
            }finally{
                setLoading(false)
            }
            
        }

        fetchPhotos()
    },[])

    return {photos,loading,err}


}