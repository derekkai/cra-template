import { useContext, useEffect } from 'react'
import StyleContext from 'isomorphic-style-loader/StyleContext'

// To detect if it's in SSR process or in browser. Wrapping with
// the function makes rollup replacement of "this" avoidable
// eslint-disable-next-line func-names

function useStyles(...styles) {
  const { insertCss } = useContext(StyleContext)
  if (!insertCss) throw new Error('Please provide "insertCss" function by StyleContext.Provider')
  const runEffect = () => {
    const removeCss = insertCss(...styles)
    return () => {
      setTimeout(removeCss, 0)
    }
  }

  useEffect(runEffect, [])
}

export default useStyles
