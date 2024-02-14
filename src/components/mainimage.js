import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

//ギャラリーのブロック//

const Mainimage = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "main.png" }) {
        childImageSharp {
          fluid(maxWidth: 4608) {
            base64
            aspectRatio
            src
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
    }
  `)

  return (
    <div class="bg-white py-4 ">
      {/* <!-- image - start --> */}
      <div class="relative  overflow-hidden rounded  md:mb-8 ">
        <Img
          fluid={data.file.childImageSharp.fluid}
          loading="lazy"
          alt="Photo by Minh Pham"
          class="size-full object-center"
        />
      </div>
      {/* <!-- image - end --> */}
      {/* 画像サイズは */}
    </div>
  )
}

export default Mainimage
