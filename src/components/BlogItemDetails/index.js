import {Component} from 'react'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: []}

  componentDidCatch() {
    this.componentMount()
  }

  componentMount = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updateData = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      avatarUrl: data.avatar_url,
      content: data.content,
      author: data.author,
    }
    this.setState({blogData: updateData})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, avatarUrl, content, author} = blogData

    return (
      <div className="blog-info">
        <h1 className="blog-details-title">{title}</h1>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={title} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
