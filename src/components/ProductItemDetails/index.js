// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import SimilarProducts from '../SimilarProductItem'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    initialList: [],
    selectedItem: {},
    apiStatus: apiStatusConstants.initial,
    count: 1,
  }

  componentDidMount() {
    this.getClickedImageDetails()
  }

  decreaseItem = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  increaseItem = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  clicksOnContinueShopping = () => {
    const {history} = this.props

    history.push('/products')
  }

  getClickedImageDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedSelectedProduct = {
        availability: fetchedData.availability,
        brand: fetchedData.brand,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        price: fetchedData.price,
        rating: fetchedData.rating,
        style: fetchedData.style,
        title: fetchedData.title,
        totalReviews: fetchedData.total_reviews,
        description: fetchedData.description,
      }

      const updatesSimilarList = fetchedData.similar_products.map(eachItem => ({
        availability: eachItem.availability,
        brand: eachItem.brand,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        price: eachItem.price,
        rating: eachItem.rating,
        style: eachItem.style,
        title: eachItem.title,
        totalReviews: eachItem.total_reviews,
      }))

      this.setState({
        selectedItem: updatedSelectedProduct,
        initialList: updatesSimilarList,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })
    }
  }

  onSuccessFullApi = () => {
    const {selectedItem, initialList, count} = this.state
    let selectedCount = count
    const {
      availability,
      brand,
      imageUrl,
      price,
      rating,
      totalReviews,
      title,
      description,
    } = selectedItem

    if (count <= 1) {
      selectedCount = 1
    }

    return (
      <div className="bg-container">
        <Header />
        <div className="similar-products-main-container">
          <div className="successful-container">
            <img src={imageUrl} alt="product" className="selected-img" />
            <div className="product-details-container">
              <h1 className="title">{title}</h1>
              <p className="price">Rs {price}/- </p>
              <div className="raring-review-container">
                <p className="rating-btn">{rating}</p>
                <p className="reviews">{totalReviews} Reviews</p>
              </div>
              <p className="description">{description}</p>
              <p className="availability">Available: {availability}</p>
              <p className="availability">Brand: {brand}</p>
              <hr />
              <div className="increase-decrease-container">
                <button
                  className="react-icon"
                  data-testid="minus"
                  type="button"
                  onClick={this.decreaseItem}
                >
                  <BsDashSquare />
                </button>
                <p className="count">{selectedCount}</p>
                <button
                  className="react-icon"
                  data-testid="plus"
                  type="button"
                  onClick={this.increaseItem}
                >
                  <BsPlusSquare />
                </button>
              </div>
              <button type="button" className="cart-btn">
                Add To Cart
              </button>
            </div>
          </div>
          <div className="heading-container">
            <h1 className="similar-heading">Similar Products</h1>
          </div>
          <ul className="similar-products-container">
            {initialList.map(eachProducrt => (
              <SimilarProducts
                eachProducrt={eachProducrt}
                key={eachProducrt.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onApiFailure = () => (
    <div className="failure-container">
      <Header />
      <div className="failure-img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="not-found">Product Not Found</h1>
        <button
          onClick={this.clicksOnContinueShopping}
          type="button"
          className="shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )

  displayLoader = () => (
    <div data-testid="loader" className="products-loader-container ">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onSuccessFullApi()
      case apiStatusConstants.failure:
        return this.onApiFailure()
      case apiStatusConstants.inProgress:
        return this.displayLoader()
      default:
        return null
    }
  }
}

export default ProductItemDetails
