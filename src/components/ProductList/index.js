import {Component} from 'react'
import {ImCross} from 'react-icons/im'
import {FaEdit} from 'react-icons/fa'
import {AiFillSave} from 'react-icons/ai'

import './index.css'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditClicked: false,
      itemName: props.productDetails.itemName,
      itemPrice: props.productDetails.itemPrice,
      itemImageUrl: props.productDetails.itemImageUrl,
    }
  }

  onDelete = () => {
    const {productDetails, deleteProduct} = this.props
    const {id} = productDetails
    deleteProduct(id)
  }

  editProduct = () => {
    this.setState(prevState => ({isEditClicked: !prevState.isEditClicked}))
  }

  onEnterProductName = event => {
    this.setState({itemName: event.target.value})
  }

  onEnterProductPrice = event => {
    if (event.target.value.length > event.target.maxLength) {
      this.setState({
        itemPrice: event.target.value.slice(0, event.target.maxLength),
      })
    } else {
      this.setState({itemPrice: event.target.value})
    }
  }

  onEnterImage = event => {
    const imageUrl = URL.createObjectURL(event.target.files[0])
    this.setState({itemImageUrl: imageUrl})
  }

  onSaveEditedProductDetails = () => {
    this.setState(prevState => ({isEditClicked: !prevState.isEditClicked}))
  }

  renderEditableProductDetails = () => {
    const {itemName, itemPrice} = this.state
    return (
      <tr className="product-table-row">
        <td className="product-table-row-cell">
          <input
            type="text"
            value={itemName}
            maxLength="50"
            onChange={this.onEnterProductName}
            className="input-edit"
          />
        </td>
        <td className="product-table-row-cell">
          <input
            type="number"
            value={itemPrice}
            maxLength="5"
            onChange={this.onEnterProductPrice}
            className="input-edit"
          />
        </td>
        <td className="product-table-row-cell">
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            onChange={this.onEnterImage}
          />
        </td>
        <td>
          <button
            type="button"
            className="edit-delete-btn save-btn"
            onClick={this.onSaveEditedProductDetails}
          >
            <AiFillSave className="icon" />
            Save
          </button>
        </td>
      </tr>
    )
  }

  renderProductDetails = () => {
    const {itemName, itemPrice, itemImageUrl} = this.state
    return (
      <tr className="product-table-row">
        <td className="product-table-row-cell">{itemName}</td>
        <td className="product-table-row-cell">{itemPrice} Rs/-</td>
        <td className="product-table-row-cell">
          <img src={itemImageUrl} alt="item" className="list-image" />
        </td>
        <td>
          <button
            type="button"
            className="edit-delete-btn"
            onClick={this.editProduct}
          >
            <FaEdit className="icon" />
            Edit
          </button>
          <button
            type="button"
            className="edit-delete-btn"
            onClick={this.onDelete}
          >
            <ImCross className="icon" />
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const {isEditClicked} = this.state
    return (
      <>
        {isEditClicked
          ? this.renderEditableProductDetails()
          : this.renderProductDetails()}
      </>
    )
  }
}
export default ProductList
