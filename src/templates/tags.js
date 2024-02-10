import React from "react"
import { Link, graphql } from "gatsby"
import moment from "moment"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import kebabCase from "lodash/kebabCase"

import Sidebar from "../components/sidebar"

const Tags = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.nodes
  const { tag } = pageContext

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={`タグ: "${tag}" (0記事)`} />
        <p>該当するタグの投稿記事がありません。</p>
      </Layout>
    )
  }

  const tagHeader = `${tag} `
  const count = `${totalCount}`
  return (
    <Layout location={location} title={siteTitle}>
      <div className="main-container">
        <main className="main-content">
          <ol style={{ listStyle: `none` }}>
            <Seo title={tagHeader} />
            <h1>{tagHeader}</h1>
            <h4>&emsp;{count}件の記事</h4>

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
                    <div className="thumnail">
                      <GatsbyImage image={image} />
                    </div>
                    <div className="content">
                      <header>
                        <h2>
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                        <small>
                          {moment(post.frontmatter.date).format(
                            `YYYY年MM月DD日 HH:mm`
                          )}
                        </small>
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
          <Bio />
        </main>
        <Sidebar />
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
          description
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 230)
            }
          }
        }
      }
    }
  }
`
