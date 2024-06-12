import React from "react"

interface SearchResultProps {
  data: any
}

export default function SearchResult({ data }: SearchResultProps) {
  const dataParsed = [
    { name: "Gender", value: data.gender },
    { name: "Height", value: data.height },
    { name: "Mass", value: data.mass },
    { name: "Hair Color", value: data.hair_color },
  ]

  return (
    <div className="flex flex-col w-full max-w-sm gap-6 px-10 py-5 mx-auto mt-24 rounded-lg shadow-lg sm:gap-12 sm:flex-row sm:max-w-lg md:max-w-2xl bg-slate-50 lg:max-w-4xl">
      <img
        className="h-[7rem] w-[7rem] sm:w-[10rem] sm:h-[10rem] rounded-md mx-auto sm:mx-0"
        src={`https://starwars-visualguide.com/assets/img/characters/${
          0 + 1
        }.jpg`}
      />
      <div className="flex flex-col items-center justify-start gap-2 sm:items-start">
        <p className="text-2xl font-semibold ">{data.name}</p>
        {dataParsed.map((item, index) => (
          <div className="flex gap-4" key={index}>
            <p className="text-sm text-black font semibold">{item.name} :</p>
            <p className="text-sm text-slate-400" >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
