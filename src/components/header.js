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
            <StaticImage
              src="../images/logo.png" // 画像のパスを正しく指定する
              alt="Logo"
              placeholder="blurred"
              layout="fixed"
              width={250} // ロゴの幅を適切に設定する
              height={60} // ロゴの高さを適切に設定する
            />
          </a>
          {/* <!-- logo - end --> */}

          {/* <!-- buttons - start --> */}
          <div class="-ml-8  flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start ">
            <a
              href="/blog/"
              class="inline-block rounded-lg bg-gray-300 px-4 py-2 text-center text-xs font-light  outline-none ring-gray-500 transition duration-100 hover:bg-gray-400 focus-visible:ring active:bg-gray-500 md:text-base md:px-8 md:py-3"
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
