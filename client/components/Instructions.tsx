export default function Instructions() {
  return (
    <div className=" max-h-[28rem] flex mt-2 bg-black p-4 border-zinc-800 border-2">
      <div className="max-w-lg ml-4 self-start">
        <h2 className="my-2 text-5xl font-sans text-white bg-zinc-800">
          Instructions
        </h2>
        <p className="font-sans text-white">
          Choose your filters:
          <span className="font-label font-thin text-white text-lg">
            either World Events or Inventions
          </span>
        </p>
        <p className="font-sans text-white mb-2">
          Choose to show people:
          <span className="font-label font-thin text-white text-lg">
            click to toggle on and off some famous people
          </span>
        </p>
        <p className="mb-2 font-sans text-white">
          Maybe filter by country?
          <span className="font-label font-thin text-white text-lg">
            choose a country to get specific info about that country
          </span>
        </p>
        <div className="font-label text-white font-thin bg-zinc-800 max-h-72 overflow-auto ">
          <p>
            A short description about the clicked invention, event or person
            will show up here
          </p>
        </div>
      </div>
    </div>
  )
}
