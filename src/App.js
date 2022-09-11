import './App.css';
import { useState, useEffect } from 'react';
import { FaBackspace, FaDivide, FaTimes, FaMinus, FaPlus, FaEquals, FaSquareRootAlt } from 'react-icons/fa'
import Display from './components/Display';
import Button from './components/Button';

function App() {

  const [valOne, setValOne] = useState(0)
  const [op, setOp] = useState(null)
  const [valTwo, setValTwo] = useState(null)
  const [valDisplay, setValDisplay] = useState('0')

  useEffect(() => {}, [valOne, op, valTwo, valDisplay])

  const clear = () => {
    setValOne(0)
    setOp(null)
    setValTwo(null)
    setValDisplay('0')
  }

  const backspace = () => {
    // remove last digit
    let newVal = valDisplay.slice(0, -1)
    if (newVal === '')
      newVal = '0'
    
    if (op === null) {
      // val1 is num, op is null, val2 is null => val1
      setValOne(parseFloat(newVal))
      setValDisplay(newVal)
    } else if (valTwo === null) {
      // val1 is num, op is op, val2 is null => nothing

    } else {
      // val1 is num, op is op, val2 is num => val2
      setValTwo(parseFloat(newVal))
      setValDisplay(newVal)
    }
  }

  const insertDigit = (digit) => {
    // need to check if equals is last button pressed, if so, new digit should not be appended

    if (op === null) {
      // val1 is num, op is null, val2 is null => append to val1
      if (valOne === 0) {
        const newVal = digit
        setValOne(parseFloat(newVal))
        setValDisplay(newVal)
      } else if (valDisplay.replace(/[^0-9]/g, '').length < 10) {
        const newVal = valDisplay + digit
        setValOne(parseFloat(newVal))
        setValDisplay(newVal)
      }
    } else {
      // val1 is num, op is op, val2 is num/null => append to val2
      if (valTwo === null || valTwo === 0) {
        const newVal = digit
        setValTwo(parseFloat(newVal))
        setValDisplay(newVal)
      } else if (valDisplay.replace(/[^0-9]/g, '').length < 10) {
        const newVal = valDisplay + digit
        setValTwo(parseFloat(newVal))
        setValDisplay(newVal)
      }
    }
  }

  const negate = () => {
    if (op === null) {
      // val1 is num, op is null, val2 is null => negate val1
      const newVal = valOne * -1
      setValOne(newVal)
      setValDisplay(newVal.toString())
    } else if (valTwo === null) {
      // val1 is num, op is op, val2 is null => do nothing

    } else {
      // val1 is num, op is op, val2 is num => negate val2
      const newVal = valTwo * -1
      setValTwo(newVal)
      setValDisplay(newVal.toString())
    }
  }

  const squareRoot = () => {
    if (op === null) {
      const newVal = Math.sqrt(valOne)
      setValOne(newVal)
      setValDisplay(newVal.toString())
    } else {
      // do nothing
    }
    // check if valOne < 0 => NaN
  }

  const insertOperator = (operator) => {
    if (valTwo === null) {
      setOp(operator)
    } else {
      // cannot add operator before equals is pressed => do nothing
    }
    
  }

  const equals = () => {
    if (op === null) {
      // val1 is num, op is null, val2 is null => output val1
      
    } else if (valTwo != null) {
      // val1 is num, op is op, val2 is num => do calculation
      let newVal = 0
      switch (op) {
        case 'divide':
          newVal = valOne / valTwo
          if (newVal)
          break
        case 'times':
          break
        case 'minus':
          break
        case 'plus':
          break
        default:
          break
      }
    }
    
  }


  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <div className='display-container'>
        <Display text={valDisplay} />
      </div>
      <div className='container'>
        <Button keyFunction='clear' text='CL' onClick={clear} />
        <Button keyFunction='delete' text={<FaBackspace size={20} />} onClick={backspace} />
        <Button keyFunction='+/-' text='+/-' keyType='plusminus' onClick={negate} />
        <Button keyFunction='sqrt' text={<FaSquareRootAlt size={20} />} onClick={squareRoot} />
      </div>
      <div className='container'>
        <Button keyFunction='7' text='7' onClick={insertDigit} />
        <Button keyFunction='8' text='8' onClick={insertDigit} />
        <Button keyFunction='9' text='9' onClick={insertDigit} />
        <Button keyFunction='divide' text={<FaDivide size={20} />} keyType='operator' onClick={insertOperator} />
      </div>
      <div className='container'>
        <Button keyFunction='4' text='4' onClick={insertDigit} />
        <Button keyFunction='5' text='5' onClick={insertDigit} />
        <Button keyFunction='6' text='6' onClick={insertDigit} />
        <Button keyFunction='times' text={<FaTimes size={20} />} keyType='operator' onClick={insertOperator} />
      </div>
      <div className='container'>
        <Button keyFunction='1' text='1' onClick={insertDigit} />
        <Button keyFunction='2' text='2' onClick={insertDigit} />
        <Button keyFunction='3' text='3' onClick={insertDigit} />
        <Button keyFunction='minus' text={<FaMinus size={20} />} keyType='operator' onClick={insertOperator} />
      </div>
      <div className='container'>
        <Button keyFunction='0' text='0' onClick={insertDigit} />
        <Button keyFunction='.' text='.' keyType='decimal' />
        <Button keyFunction='=' text={<FaEquals size={20} />} keyType='equal' />
        <Button keyFunction='plus' text={<FaPlus size={20} />} keyType='operator' onClick={insertOperator} />
      </div>
    </div>
  );
}

export default App;
