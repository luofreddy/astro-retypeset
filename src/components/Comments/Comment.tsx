import Giscus from '@giscus/react'
import * as React from 'react'

const id = 'inject-comments'
function getTheme() {
  const isDark = document.documentElement.classList.contains('dark')
  return isDark ? 'dark' : 'light'
}
function Comment() {
  const [mounted, setMounted] = React.useState(false)
  const [themeStyle, setThemeStyle] = React.useState(getTheme())

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const getObserver = new MutationObserver(() => {
      const theme = getTheme()
      setThemeStyle(theme)
    })
    getObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => {
      getObserver.disconnect()
    }
  }, [])

  return (
    <div id={id} className="w-full p-t-4">
      {mounted
        ? (
            <Giscus
              id={id}
              repo="luofreddy/astro-retypeset"
              repoId="R_kgDOOTjX5A"
              category="Announcements"
              categoryId="DIC_kwDOOTjX5M4CpQkV"
              theme={themeStyle}
              mapping="title"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              lang="zh-TW"
              loading="lazy"
            />
          )
        : null}
    </div>
  )
}

export default Comment
