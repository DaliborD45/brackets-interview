import React, { useEffect } from "react"
import { characterType } from "../types/character"

interface SearchbarProps {
  setData: React.Dispatch<React.SetStateAction<characterType[]>>

  setFilters: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Searchbar({ setData, setFilters }: SearchbarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const keyDownHandler = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      inputRef.current?.focus()
    }
    if (e.key === "Enter") {
      console.log("Enter key pressed")
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler)

    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [])
  return (
    <div className="flex items-center w-full max-w-2xl bg-gray-200 rounded-full border-2 has-[:focus]:ring-blue-500 has-[:focus]:ring-2 h-[3.5rem] py-2 px-3 sm:px-5 ease-linear duration-100">
      <div className="relative hidden md:block">
        <p className="px-2 text-sm border-2 border-black rounded-lg">cmd + k</p>
      </div>
      <input
        ref={inputRef}
        placeholder="search for character"
        className="ml-5 bg-transparent outline-none "
      />
      <div className="flex items-center h-full gap-2 px-2 ml-auto duration-100 ease-linear bg-white rounded-md hover:scale-105 hover:cursor-pointer">
        <svg
          width="20px"
          height="20px"
          viewBox="0 -3.5 21 21"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>settings [#1389]</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-99.000000, -760.000000)"
              fill="#000000"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M53.5,603 C53.5,602.647 53.5756,602 53.6932,602 L43,602 L43,604 L53.6932,604 C53.5756,604 53.5,603.353 53.5,603 L53.5,603 Z M61.7068,602 C61.27315,601 60.1192,600 58.75,600 C57.01015,600 55.6,601.343 55.6,603 C55.6,604.657 57.01015,606 58.75,606 C60.1192,606 61.27315,605 61.7068,604 L64,604 L64,602 L61.7068,602 Z M53.5,611 C53.5,611.353 53.4244,611.686 53.3068,612 L64,612 L64,610 L53.3068,610 C53.4244,610 53.5,610.647 53.5,611 L53.5,611 Z M51.4,611 C51.4,612.657 49.98985,614 48.25,614 C46.8808,614 45.72685,613 45.2932,612 L43,612 L43,610 L45.2932,610 C45.72685,609 46.8808,608 48.25,608 C49.98985,608 51.4,609.343 51.4,611 L51.4,611 Z"
                  id="settings-[#1389]"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <p className="hidden text-sm md:block">Filters</p>
      </div>
      <div className="relative h-full ml-1 duration-100 ease-linear bg-black rounded-lg hover:scale-105 hover:cursor-pointer">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-white sm:mt-[-0.2rem]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 19l-5-5m5 5l-5-5"
          />
        </svg>
      </div>
    </div>
  )
}
