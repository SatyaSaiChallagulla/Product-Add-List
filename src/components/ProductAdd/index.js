import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ProductList from '../ProductList'

import './index.css'

class ProductAdd extends Component {
  state = {
    productList: [],
    itemName: '',
    itemPrice: '',
    itemImageUrl: '',
    isProductAddActive: true,
    isProductListActive: false,
    showSubmitError: false,
    showDuplicateError: false,
  }

  onAddProduct = event => {
    event.preventDefault()
    const {productList, itemName, itemPrice, itemImageUrl} = this.state
    const isDuplicate = productList.map(eachProduct =>
      eachProduct.itemName.toLowerCase().includes(itemName.toLowerCase()),
    )
    console.log(isDuplicate[0])
    if (itemName === '' || itemImageUrl === '' || itemPrice === '') {
      this.setState({showSubmitError: true, showDuplicateError: false})
    } else if (isDuplicate[0] === true) {
      this.setState({showDuplicateError: true, showSubmitError: false})
    } else {
      this.setState({showSubmitError: false, showDuplicateError: false})

      const newProduct = {
        id: uuidv4(),
        itemName,
        itemPrice,
        itemImageUrl,
      }
      this.setState(prevState => ({
        productList: [...prevState.productList, newProduct],
        itemName: '',
        itemPrice: '',
        itemImageUrl: '',
      }))
    }
  }

  onChangeItemName = event => {
    this.setState({itemName: event.target.value})
  }

  onChangeItemPrice = event => {
    if (event.target.value.length > event.target.maxLength) {
      this.setState({
        itemPrice: event.target.value.slice(0, event.target.maxLength),
      })
    } else {
      this.setState({itemPrice: event.target.value})
    }
  }

  onChangeItemImage = event => {
    const imageUrl = URL.createObjectURL(event.target.files[0])
    this.setState({itemImageUrl: imageUrl})
  }

  onClickProductListHeading = () => {
    this.setState({isProductListActive: true, isProductAddActive: false})
  }

  onClickProductAddHeading = () => {
    this.setState({isProductListActive: false, isProductAddActive: true})
  }

  onClickAddProducts = () => {
    this.setState({isProductListActive: false, isProductAddActive: true})
  }

  deleteProduct = id => {
    const {productList} = this.state
    const filteredProductsList = productList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({productList: filteredProductsList})
  }

  renderProductsList = () => {
    const {productList} = this.state
    const EmptyList = productList.length === 0
    return (
      <>
        {EmptyList ? (
          <div className="empty-list-container">
            <img
              src="https://res.cloudinary.com/dcjt8xfht/image/upload/v1638879083/empty_list_r9cfdm.jpg"
              alt="empty"
              className="empty-image"
            />
            <h1>List is Empty</h1>
            <button
              type="button"
              className="add-products-btn"
              onClick={this.onClickAddProducts}
            >
              Add Products
            </button>
          </div>
        ) : (
          <table className="product-table">
            <thead>
              <th className="product-table-header">Item Name</th>
              <th className="product-table-header">Item Price</th>
              <th className="product-table-header">Image</th>
              <th className="product-table-header">Actions</th>
            </thead>
            <tbody>
              {productList.map(eachItem => (
                <ProductList
                  productDetails={eachItem}
                  key={eachItem.id}
                  deleteProduct={this.deleteProduct}
                />
              ))}
            </tbody>
          </table>
        )}
      </>
    )
  }

  renderProductInputDetails = () => {
    const {
      itemName,
      itemPrice,
      showSubmitError,
      showDuplicateError,
    } = this.state
    return (
      <>
        <h1 className="product-details-heading">Product Details</h1>
        <form className="form-container" onSubmit={this.onAddProduct}>
          <div className="item-details-container">
            <label htmlFor="itemName" className="item-label">
              Item Name
            </label>
            <input
              type="text"
              className="item-input"
              id="itemName"
              placeholder="Item Name"
              maxLength="50"
              value={itemName}
              onChange={this.onChangeItemName}
            />
          </div>
          <div className="item-details-container">
            <label htmlFor="itemPrice" className="item-label">
              Item Price
            </label>
            <input
              type="number"
              className="item-input"
              id="itemPrice"
              placeholder="Item Price"
              maxLength="5"
              value={itemPrice}
              onChange={this.onChangeItemPrice}
            />
          </div>
          <div className="item-details-container">
            <label htmlFor="itemImage" className="item-label">
              Item Image
            </label>
            <input
              type="file"
              className="item-input"
              id="itemImage"
              placeholder="No file chosen"
              accept="image/png, image/jpeg"
              onChange={this.onChangeItemImage}
            />
          </div>
          {showSubmitError && (
            <p className="error-msg">* All Fields are Mandatory</p>
          )}
          {showDuplicateError && (
            <p className="error-msg">
              * Product is available in the List.Try Adding Different Product
            </p>
          )}
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </>
    )
  }

  render() {
    const {isProductAddActive, isProductListActive, productList} = this.state
    const activeProductAddClass = isProductAddActive
      ? 'active-header'
      : 'inactive-header'
    const activeProductListClass = isProductListActive
      ? 'active-header'
      : 'inactive-header'
    return (
      <div className="app-container">
        <div className="header-container">
          <button
            type="button"
            className={`tab-heading ${activeProductAddClass}`}
            onClick={this.onClickProductAddHeading}
          >
            Product Add
          </button>
          <button
            type="button"
            className={`tab-heading ${activeProductListClass}`}
            onClick={this.onClickProductListHeading}
          >
            Product List ({productList.length})
          </button>
        </div>

        {isProductAddActive && this.renderProductInputDetails()}
        {isProductListActive && this.renderProductsList()}
      </div>
    )
  }
}
export default ProductAdd
