import PropTypes from 'prop-types'
import useStyles from 'hooks/useStyles'
import styles from './Circle.module.scss'

const Circle = ({ percent = 0 }) => {
  useStyles(styles)
  return (
    <svg className={styles.root} viewBox="0 0 200 200">
      <path
        style={{
          strokeDashoffset: (471 / 100) * (100 - percent),
        }}
        d=" M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 "
      />
    </svg>
  )
}

Circle.propTypes = {
  percent: PropTypes.number.isRequired,
}

export default Circle
