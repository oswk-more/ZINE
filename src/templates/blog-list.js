import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import kebabCase from "lodash/kebabCase"
import Sidebar from "../components/sidebar"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="main-container">
        <main className="main-content">
          <ol style={{ listStyle: `none` }}>
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug
              const tags = post.frontmatter.tags
              const image = getImage(post.frontmatter.thumbnail)

              return (
                <li key={post.fields.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <Link to={post.fields.slug} itemProp="url">
                      <GatsbyImage
                        image={image}
                        alt={siteTitle}
                        imgClassName="rounded-image"
                      />
                    </Link>
                    <div className="content">
                      <header>
                        <h2>
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>

                        <small>{post.frontmatter.date}</small>
                        <div className="tags-article">
                          {tags &&
                            tags.length > 0 &&
                            tags.map(tag => {
                              return (
                                <Link
                                  to={`/tags/${kebabCase(tag)}/`}
                                  itemProp="url"
                                >
                                  <button>{tag}</button>
                                </Link>
                              )
                            })}
                        </div>
                      </header>
                      <section>
                        <div className="explanation">
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                post.frontmatter.description || post.excerpt,
                            }}
                            itemProp="description"
                          />
                        </div>
                      </section>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
          <ul className="pagenation">
            {!pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    pageContext.currentPage === 2
                      ? `/blog/`
                      : `/blog/${pageContext.currentPage - 1}/`
                  }
                  rel="prev"
                >
                  <span>Prev</span>
                </Link>
              </li>
            )}
            {!pageContext.isLast && (
              <li className="next">
                <Link to={`/blog/${pageContext.currentPage + 1}/`} rel="next">
                  <span>Next</span>
                </Link>
              </li>
            )}
          </ul>

          <Bio />
        </main>
        <Sidebar />
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query pageUsersmoredevgatsbyZinEsrctemplatesblogListJs550212975(
    $skip: Int!
    $limit: Int!
  ) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 140)
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
