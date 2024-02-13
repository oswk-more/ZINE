import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => {
  return (
    <div class="bg-white lg:pb-4">
      <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header class="flex items-center justify-between py-2 md:py-4">
          {/* <!-- logo - start --> */}
          <a
            href="/"
            class="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              class="h-auto w-6 text-indigo-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            ZINE
          </a>
          {/* <!-- logo - end --> */}

          {/* <!-- buttons - start --> */}
          <div class="-ml-8  flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start lg:mr-20">
            <a
              href="/blog/"
              class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              記事一覧
            </a>
          </div>

          {/* <!-- buttons - end --> */}
        </header>
      </div>
    </div>
  )
}

export default Header
