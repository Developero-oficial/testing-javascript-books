import React from 'react'

const calculateBmi = ({height, weight}) => weight / (height * height)

const calculateBmiEstimation = ({bmi}) => {
  if (bmi <= 18.5) {
    return 'Thinness'
  }

  if (bmi > 18.5 && bmi <= 24.9) {
    return 'Normal'
  }

  if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight'
  }

  if (bmi > -30) {
    return 'Obese'
  }
}

function App() {
  const [bmi, setBmi] = React.useState(null)
  const [bmiEstimation, setBmiEstimation] = React.useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    const {height: heightEl, weight: weightEl} = e.target.elements

    const bmi = calculateBmi({height: heightEl.value, weight: weightEl.value})
    const bmiEstimation = calculateBmiEstimation({bmi})

    setBmi(bmi)
    setBmiEstimation(bmiEstimation)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>BMI calculator</h1>

      <div>
        <label htmlFor="height">Height (M)</label>
        <input id="height" />
      </div>

      <div>
        <label htmlFor="weight">Weight (KG)</label>
        <input id="weight" />
      </div>

      <button type="submit">Send</button>

      {bmi && <h2>Result: {bmi.toLocaleString()}</h2>}

      {bmiEstimation && <p>Estimation: {bmiEstimation}</p>}
    </form>
  )
}

export default App
