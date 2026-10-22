import { useCallback, useMemo, useState } from "react"
import useFavouritePhotos from "./hooks/useFavouritePhotos"
import useFetchPhotos from "./hooks/useFetchPhotos"
import SearchBar from "./components/SearchBar"


function App() {
  const {photos,loading,err} = useFetchPhotos()
  const {favourites,dispatch} = useFavouritePhotos()
  const [search,setSearch] = useState("")

  // handlig search change
  const handleSearchChange = useCallback((val)=>{
    setSearch(val)
  },[])

// filtering photos
  const filteredPhotos = useMemo(()=>{
    const q = search.trim().toLowerCase()

    return photos.filter((photo)=>photo.author.toLowerCase().includes(q))
  },[photos,search])

  // loading/error states
  if (loading) return <p className="text-center m-[6rem]">Loading photos...</p>
  if (err) return <p className="text-center m-[6rem]">Error :{err}</p>


  return (
      <main className="flex flex-col justify-center items-center p-4 sm:p-8 lg:mx-32">
      <SearchBar value={search} onChange={handleSearchChange} />

      {filteredPhotos.length === 0 ? (
        <p>No photos found.</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => {
            const isFavourite = favourites.includes(photo.id);

            return (
              <article
                key={photo.id}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                <div className="relative">
                  <img
                    src={photo.download_url}
                    alt={`Photo by ${photo.author}`}
                    className="aspect-square w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "toggle", id: photo.id })
                    }
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl shadow hover:bg-white"
                  >
                    <span className={isFavourite ? "text-red-500" : "text-gray-600"}>
                      {isFavourite ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                <p className="p-3 font-medium text-gray-800">{photo.author}</p>
              </article>
            );
          })}
        </section>
      )}
    </main>
  )
}

export default App