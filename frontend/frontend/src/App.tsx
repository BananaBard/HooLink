import { Form } from './components/Form';


function App() {

  return (
    <div className='min-h-screen mx-auto bg-slate-900
      text-white'>
      <main className='max-w-[1120px] mx-auto flex flex-col items-start py-44'>
        <h1 className='text-6xl font-bold'>HooLink</h1>
        <h3 className='text-4xl font-medium'>A ShortUrl API</h3>
    
        <Form></Form>
      </main>
    </div>
  )
}

export default App