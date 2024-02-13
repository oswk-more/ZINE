import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import kebabCase from "lodash/kebabCase"

const Sidebar = ({ isOpen, onClose }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        distinct(field: { frontmatter: { tags: SELECT } })
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const tags = data.allMarkdownRemark.distinct
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h3>Theme</h3>
      <ul>
        <div className="tgs-article">
          {tags &&
            tags.length > 0 &&
            tags.map(tag => {
              return (
                <li>
                  <Link to={`/tags/${kebabCase(tag)}/`} itemProp="url">
                    <button>{tag}</button>
                    {data.allMarkdownRemark.group.map(
                      item =>
                        item.fieldValue === tag && (
                          <span key={item.fieldValue}>
                            {" "}
                            （ {item.totalCount} ）
                          </span>
                        )
                    )}
                  </Link>
                </li>
              )
            })}
        </div>
      </ul>
    </div>
  )
}

export default Sidebar
