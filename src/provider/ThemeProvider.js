import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Theme1 from 'theme/Theme1/Theme1'
import Theme2 from 'theme/Theme2/Theme2'

const themeMap = {
  light: Theme1,
  dark: Theme2,
}

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.global.theme)
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
