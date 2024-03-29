import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import kebabCase from "lodash/kebabCase"
import Sidebar from "../components/sidebar"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const tags = post.frontmatter.tags
  const image = getImage(post.frontmatter.thumbnail)

  return (
    <Layout location={location} title={siteTitle}>
      <div style={{ listStyle: `none` }}>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className="hero">
            <GatsbyImage
              image={image}
              alt={siteTitle}
              imgClassName="rounded-image"
            />
          </div>

          <header>
            <h2 itemProp="headline">{post.frontmatter.title}</h2>
            <p>{post.frontmatter.date}</p>
            <div className="tags-article">
              {tags &&
                tags.length > 0 &&
                tags.map(tag => {
                  return (
                    <Link to={`/tags/${kebabCase(tag)}/`} itemProp="url">
                      <button>{tag}</button>
                    </Link>
                  )
                })}
            </div>
          </header>
          <dev className="section">
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />
          </dev>

          <hr />
          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 20,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li className="blog-post-nav-next">
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <footer>
            <Bio />
          </footer>
        </article>

        <Sidebar />
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 600, height: 380)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
