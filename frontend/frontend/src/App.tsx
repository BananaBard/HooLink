import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='max-w-[1120px] mx-auto px-44 py-22
      flex flex-col gap-2'>
      <h1 className='text-6xl font-bold'>HooLink</h1>
      <h3 className='text-4xl font-medium'>A ShortUrl API</h3>

      <section className='flex flex-row justify-right gap-8 mt-8'>
        <button className='w-36 py-6 px-3 bg-black rounded-full text-white text-md hover:shadow-sm hover:scale-105 transition-all'
          onClick={() => setCount((count) => count + 1)}>
          Read the docs
        </button>

        <button className='w-36 py-6 px-3 bg-blue-400 rounded-full text-white text-lg font-semibold  hover:shadow-md hover:shadow-slate-400/30 hover:scale-110 transition-all'
          onClick={() => setCount((count) => count + 1)}>
          Use
        </button>
      </section>
    </div>
  )
}

export default App