import { useState, Suspense, useDeferredValue } from "react"
import Searchbar from "./components/Searchbar"
import SearchResult from "./components/SearchResult"
import { characterType } from "./types/character"
import { dataType } from "./types/dataType"

function App() {
  const [data, setData] = useState<dataType>({} as dataType)
  const [characterInput, setCharacterInput] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const deferredQuery = useDeferredValue(data.results ?? [])
  const [searchedPerson, setSearchedPerson] = useState<characterType>(
    {} as characterType
  )

  const handleSelectCharacter = (character: characterType) => {
    setSearchedPerson(character)
  }

  const handleCalculateCharacterId = (url: string) => {
    const urlParsed = url.split("/")
    return urlParsed[urlParsed.length - 2]
  }

  const handleSearch = (e: string, page: number) => {
    const searchValue = e.toLowerCase()
    if (characterInput === searchValue) {
      //if the search value is the same,
      setPage(page)
      fetch(
        `https://swapi.py4e.com/api/people/?search=${searchValue}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      // Reset page to 1 if the search value is different because we dont want to search from middle page
      setPage(1)
      setCharacterInput(() => searchValue)
      fetch(`https://swapi.py4e.com/api/people/?search=${searchValue}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  return (
    <div className="flex flex-col items-start w-full min-h-screen py-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center w-full max-w-sm px-2 py-5 mx-auto rounded-lg shadow-lg sm:mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl sm:px-10 bg-slate-50">
        <h1 className="mb-2 text-4xl font-semibold">Explore</h1>
        <h2 className="mb-5 text-lg">Search for a star wars character</h2>
        <Searchbar handleSearch={handleSearch} />
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="w-full max-w-2xl mt-5 overflow-scroll h-96">
            {deferredQuery &&
              deferredQuery.map((item, index) => (
                <li
                  className="flex items-center gap-3 py-3 pl-5 rounded-lg sm:gap-5 md:pl-12 hover:bg-slate-200 hover:cursor-pointer"
                  key={index}
                  onClick={() => handleSelectCharacter(item)}
                >
                  <img
                    className="w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] rounded-md"
                    src={`https://starwars-visualguide.com/assets/img/characters/${handleCalculateCharacterId(
                      item.url
                    )}.jpg`}
                  />
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.gender}</p>
                </li>
              ))}
          </ul>
          {data.results && data.results.length > 0 && (
            <div className="flex gap-3">
              <div
                className={`px-4 py-2 mt-5 text-white duration-100 ease-linear rounded-lg hover:scale-105 text-md hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                  data && !data.previous && "opacity-50"
                }`}
                onClick={() =>
                  data && data.previous && handleSearch(characterInput, page - 1)
                }
              >
                Previous
              </div>
              <div
                className={`px-4 py-2 mt-5 text-white duration-100 ease-linear rounded-lg hover:scale-105 text-md hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                  data && !data.next && "opacity-50"
                }`}
                onClick={() =>
                  data && data.next && handleSearch(characterInput, page + 1)
                }
              >
                Next
              </div>
            </div>
          )}
        </Suspense>
      </div>
      {searchedPerson.name && <SearchResult data={searchedPerson} />}
    </div>
  )
}

export default App
