import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

export default class BlogList extends Component {
  state = {blogsData: [], isLoader: true}

  componentDidMount() {
    this.getComponent()
  }

  getComponent = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    this.setState({blogsData: updatedData, isLoader: false})
  }

  render() {
    const {blogsData, isLoader} = this.state

    return (
      <div className="blogs-container">
        {isLoader ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="orange" height={50} width={50} />
          </div>
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}
