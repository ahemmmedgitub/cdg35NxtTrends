// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'

class ProductItemDetails extends Component {
  state = {initialList: []}

  componentDidMount() {
    this.getClickedImageDetails()
  }

  getClickedImageDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `http://localhost:3000/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
    }
  }

  render() {
    return <h1>ahemmad</h1>
  }
}

export default ProductItemDetails
