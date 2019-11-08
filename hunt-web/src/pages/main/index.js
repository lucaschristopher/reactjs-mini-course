import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    // Using unstructuring
    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  previousPage = () => {
    // Using unstructuring
    const { page } = this.state;

    // That is, if I'm on the first page...
    if (page === 1) return;

    // else...
    const pageNumber = page - 1; // previous page
    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    // Using unstructuring
    const { page, productInfo } = this.state;

    // That is, if I'm on the last page...
    if (page === productInfo.pages) return;

    // else...
    const pageNumber = page + 1; // next page
    this.loadProducts(pageNumber);
  }

  render() {
    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Access</Link>
          </article>
        ))}

        <div className="actions">
          <button disabled={page === 1} onClick={this.previousPage}>
            Anterior
          </button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

