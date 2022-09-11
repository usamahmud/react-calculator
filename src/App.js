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
  const [endResult, setEndResult] = useState(false)

  useEffect(() => {}, [valOne, op, valTwo, valDisplay])

  const clear = () => {
    setValOne(0)
    setOp(null)
    setValTwo(null)
    setValDisplay('0')
    setEndResult(false)
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
      setEndResult(true)

      let newVal = Math.sqrt(valOne)
      if (Number.isNaN(newVal)) {
        // undefined square root
        setValOne(0)
        setValDisplay('Error')
      } else {
        // defined square root
        setValOne(newVal)
        newVal = newVal.toString()
        const extraDigits = newVal.replace(/[^0-9]/g, '').length - 10
        if (extraDigits > 0)
          newVal = newVal.slice(0, -1 * extraDigits)
        newVal = newVal.replace(/^(-*[0-9]+)$|^(-*[0-9]+)\.0*$|^(-*[0-9]+\.[0-9]*?)0*$/g, '$1$2$3')
        setValDisplay(newVal)
      }
    } else {
      // do nothing
    }
  }

  const insertDigit = (digit) => {
    // need to check if equals is last button pressed, if so, new digit should not be appended

    if (endResult) {
      setValOne(parseFloat(digit))
      setOp(null)
      setValTwo(null)
      setValDisplay(digit)
      setEndResult(false)
    } else if (op === null) {
      // val1 is num, op is null, val2 is null => append to val1
      if (valDisplay === '0') {
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
      if (valTwo === null || valDisplay === '0') {
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

  const insertOperator = (operator) => {
    if (valTwo === null) {
      setOp(operator)
      setEndResult(false)
    } else {
      // cannot add operator before equals is pressed => do nothing
    }
    
  }

  const decimal = () => {
    if (endResult || (valDisplay === '0' && op === null) ) {
      setValOne(0)
      setOp(null)
      setValTwo(null)
      setValDisplay('0.')
      setEndResult(false)
    } else if (op !== null && valTwo === null) {
      setValTwo(0)
      setValDisplay('0.')
    } else if (valDisplay.indexOf('.') === -1) {
      setValDisplay(valDisplay + '.')
    }
  }

  const equals = () => {
    if (op === null) {
      // val1 is num, op is null, val2 is null => output val1
      setEndResult(true)
    } else if (valTwo != null) {
      // val1 is num, op is op, val2 is num => do calculation
      setEndResult(true)
      let newVal = 0
      switch (op) {
        case 'divide':
          newVal = valOne / valTwo
          break
        case 'times':
          newVal = valOne * valTwo
          break
        case 'minus':
          newVal = valOne - valTwo
          break
        case 'plus':
          newVal = valOne + valTwo
          break
        default:
          break
      }

      setOp(null)
      setValTwo(null)

      if (Math.round(newVal) < 10000000000 && Math.round(newVal) > -10000000000) {
        // result in range
        setValOne(newVal)
        newVal = newVal.toString()
        const extraDigits = newVal.replace(/[^0-9]/g, '').length - 10
        if (extraDigits > 0)
          newVal = newVal.slice(0, -1 * extraDigits)
        newVal = newVal.replace(/^(-*[0-9]+)$|^(-*[0-9]+)\.0*$|^(-*[0-9]+\.[0-9]*?)0*$/g, '$1$2$3')
        setValDisplay(newVal)
      } else {
        // result out of range
        setValOne(0)
        setValDisplay('Error')
      }
    }
  }


  return (
    <div className='calculator'>
      <h1 className='unselectable'>Calculator</h1>
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
        <Button keyFunction='.' text='.' keyType='decimal' onClick={decimal} />
        <Button keyFunction='=' text={<FaEquals size={20} />} keyType='equal' onClick={equals} />
        <Button keyFunction='plus' text={<FaPlus size={20} />} keyType='operator' onClick={insertOperator} />
      </div>
    </div>
  );
}

export default App;
