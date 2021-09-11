const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss())
  return () => removeCss.forEach((dispose) => dispose())
}

export default insertCss
