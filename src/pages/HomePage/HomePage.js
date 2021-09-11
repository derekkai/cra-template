import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from 'logo.svg'
import Circle from 'components/Circle/Circle'

const HomePage = () => {
  const [percent, setPercent] = useState(59)
  const timer = useRef(null)
  useEffect(() => {
    timer.current = setInterval(() => {
      setPercent((prevState) => {
        return prevState === 100 ? 0 : prevState + 1
      })
    }, 100)
  }, [])

  useEffect(() => {
    if (percent === 0) {
      clearInterval(timer.current)
      setTimeout(() => {
        timer.current = setInterval(() => {
          setPercent((prevState) => {
            return prevState === 100 ? 0 : prevState + 1
          })
        }, 100)
      }, 100)
    }
  }, [percent])

  return (
    <div>
      <Logo />
      <Circle percent={percent} />
      This is home page<NavLink to="/login">TEST</NavLink>
    </div>
  )
}

export default HomePage
