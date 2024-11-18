import React, { useEffect, useState } from 'react'

function App() {
  return <CustomProgram />
}

const half = (number) => number / 2
const double = (number) => number * 2
const increment = (number) => number + 1
const decrement = (number) => number - 1

const CustomProgram = () => {
  const [program, setProgram] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [output, setOutput] = useState(null)
  const [initialValue, setInitialValue] = useState(null)

  // İşlemleri programa ekleme fonksiyonu
  const addOperation = (operation, name) => {
    setProgram([...program, { operation, name }])
  }

  // Programı çalıştır ve sonucu hesapla
  const handleSubmit = (e) => {
    e.preventDefault()
    let result = parseFloat(inputValue)
    if (isNaN(result)) return

    setInitialValue(result) // Başlangıç değerini saklar

    // Her işlem için sırayla uygulama
    program.forEach(({ operation }) => {
      result = operation(result)
    })

    setOutput(result)
    setInputValue('') // Input alanını temizle
  }

  // Programı sıfırlama
  const handleClear = () => {
    setProgram([])
    setOutput(null)
    setInitialValue(null)
  }

  return (
    <div className="flex flex-col items-center mt-5 space-y-4">
      <div className="space-x-2">
        <button
          onClick={() => addOperation(half, 'half')}
          className="px-2 py-1 bg-gray-200 border rounded"
        >
          Yarım
        </button>
        <button
          onClick={() => addOperation(double, 'double')}
          className="px-2 py-1 bg-gray-200 border rounded"
        >
          İki Katı
        </button>
        <button
          onClick={() => addOperation(increment, 'increment')}
          className="px-2 py-1 bg-gray-200 border rounded"
        >
          Artır
        </button>
        <button
          onClick={() => addOperation(decrement, 'decrement')}
          className="px-2 py-1 bg-gray-200 border rounded"
        >
          Azalt
        </button>
        <button
          onClick={handleClear}
          className="px-2 py-1 border rounded bg-gray-100"
        >
          Temizle
        </button>
      </div>
      <h2 className="text-xl font-bold">Fonksiyonum</h2>
      <ul>
        {program.map((item, index) => (
          <li key={index} className="text-center">
            {item.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded w-40"
          placeholder="Başlangıç değeri"
        />
        <button type="submit" className="bg-gray-300 px-2 py-1 rounded">
          Gönder
        </button>
      </form>
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold">Son Yürütme:</h3>
        <p>
          {inputValue !== null ? initialValue : '?'}{' '}
          {` -> Fonksiyon Dizisi -> `}
          {output !== null ? output : '?'}
        </p>
      </div>
    </div>
  )
}

export default App
