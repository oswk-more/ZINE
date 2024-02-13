import * as React from "react"
import { Link } from "gatsby"

import Footer from "../components/footer"
import Header from "../components/header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = <Header />
  } else {
    header = <Header />
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
