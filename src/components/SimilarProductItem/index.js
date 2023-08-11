// Write your code here
import './index.css'

const SimilarProducts = props => {
  const {eachProducrt} = props
  const {brand, imageUrl, price, rating, title} = eachProducrt

  return (
    <li className="each-list-item-container">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-img"
      />
      <p className="similar-title">{title}</p>
      <p className="similar-brand">by {brand}</p>
      <div className="price-rating-container">
        <p className="similar-price">Rs {price}/- </p>
        <button className="similar-rating" type="button">
          {rating}
        </button>
      </div>
    </li>
  )
}

export default SimilarProducts
