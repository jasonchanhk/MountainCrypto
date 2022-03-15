import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';


export function PercentageBetterment({percentage}) {
    if (percentage >= 0) {
        return (
            <div className="flex font-medium text-green-500 align-middle">
                <AiFillCaretUp className='my-1' /><span className='align-middle'>{percentage}%</span>
            </div>
        )
    }
    else {
        return (
            <div className="flex font-medium text-red-500 align-middle">
                <AiFillCaretDown className='my-1' /><span>{percentage}%</span>
            </div>
        )
    }
}

export function ReadableNumber(number) {
    if (number >= 1) {
      return Number.parseFloat(number).toFixed(2)
    }
    else {
      return Number.parseFloat(number).toPrecision(4)
    }
}
