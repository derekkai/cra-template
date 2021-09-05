import { useTranslation } from 'react-i18next'
import useStyles from 'hooks/useStyles'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Login.module.scss'
import { setFlag, setFlag2, setTheme, getData } from '../../reducers/global'

const Login = () => {
  useStyles(styles)
  const { flag, flag2 } = useSelector((state) => state.global)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(setFlag2())
    dispatch(setFlag())
    dispatch(setTheme())
    dispatch(getData())
  }

  return (
    <div className={styles.container}>
      This is Login page.
      <button onClick={handleClick}>Test</button>
    </div>
  )
}

export default Login
