import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Theme1 from 'theme/Theme1/Theme1'
import Theme2 from 'theme/Theme2/Theme2'
import useStyles from '../hooks/useStyles'
import globalStyles from '../index.css'
import defaultTheme from './_default.scss'

const themeMap = {
  light: Theme1,
  dark: Theme2,
}

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.global.theme)
  useStyles(globalStyles)
  useStyles(defaultTheme)
  return (
    <>
      {children}
      {theme ? <Theme1 /> : <Theme2 />}
    </>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
}

export default ThemeProvider
