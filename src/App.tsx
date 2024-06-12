import { useState, useEffect } from "react"
import Searchbar from "./components/Searchbar"
import SearchResult from "./components/SearchResult"
import { characterType } from "./types/character"

function App() {
  const [data, setData] = useState<Array<characterType>>([])
  const [filters, setFilters] = useState<string[]>([])
  const [searchedPerson, setSearchedPerson] = useState<characterType>(
    {} as characterType
  )
  const handleFetchData = async () => {
    try {
      const response = await fetch("https://swapi.py4e.com/api/people/")
      const data = await response.json()
      setData(data.results)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    handleFetchData()
  }, [])

  return (
    <div className="flex flex-col items-start w-full min-h-screen py-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center w-full max-w-sm px-2 py-5 mx-auto rounded-lg shadow-lg sm:mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl sm:px-10 bg-slate-50">
        <h1 className="mb-2 text-4xl font-semibold">Explore</h1>
        <h2 className="mb-5 text-lg">Search for a star wars character</h2>
        <Searchbar setData={setData} setFilters={setFilters} />
        <ul className="w-full max-w-2xl mt-5">
          {data.map((item, index) => (
            <li
              className="flex items-center gap-3 py-3 pl-5 rounded-lg sm:gap-5 md:pl-12 hover:bg-slate-200 hover:cursor-pointer"
              key={index}
              onClick={() => setSearchedPerson(item)}
            >
              <img
                className="w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] rounded-md"
                src={`https://starwars-visualguide.com/assets/img/characters/${
                  index + 1
                }.jpg`}
              />
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-slate-400">{item.gender}</p>
            </li>
          ))}
        </ul>
      </div>
      {searchedPerson.name && <SearchResult data={searchedPerson} />}
    </div>
  )
}

export default App
