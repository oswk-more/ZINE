---
title: gatsby-starter-blogにタグ機能を追加する
date: "2024-02-12"
description: Gatsby.jsテンプレートであるgatsby-starter-blogにタグ機能を追加する手順を解説
thumbnail: "./Markdown.jpg"
tags: ["Gatsby.js", "ブログ開発"]
---

## 導入

今回は Gatsby.js で作ったブログにタグ機能を追加する手法を紹介します。
[Gatsby Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog) をテンプレートとして使い、これにタグ機能を追加します。

### タグ機能の実装

タグ機能の追加は公式も手順を出しています。（ただし英語です）

まず、ブログの投稿一覧ページとブログの各記事にタグを追加します。

Gatsby.js の内部では GraphQL を用いて markdown から必要な情報を取得し、html に変換します。

タグを追加したい記事の markdown の先頭に以下のように tags の情報を追加します。

```md:sample
---
title: gatsby-starter-blogにタグ機能を追加する
date: "2015-05-28T22:40:32.169Z"
description: Gatsby.jsテンプレートであるgatsby-starter-blogにタグ機能を追加する手順を解説
tags: ["Gatsby.js","ブログ開発"]
---
```

次に、gatsby-node.js の type Frontmatter の部分に、以下のように tags の型を設定します。

```js:sample
type Frontmatter {
  title: String
  description: String
  date: Date @dateformat
  tags: [String!]  // 追加
}
```

これは null でない String 型の配列(配列自体が null であってもよい)を意味します。

これを追加しないとエラーが出ます。

続いて、src/pages/index.js や src/templates/blog-post.js の pageQuery で tags を追加します。

これで、各ページの tags のデータを取得できるようになります。

```js:sample
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
          description
          tags // 追加
          thumbnail
        }
      }
    }
  }
```
