import React from "react";
import Button from "./Button";
// import Modal from "./Components/Modal";
import CartModal from "./Components/CartModal";
import Header from "./Components/Header";
import HeaderImage from "./Components/HeaderImage";
import MainBody from "./Components/MainBody";
import getProducts from "./api/getProducts";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartContent: [],
      modals: [
        { id: 1, name: "addToCard", isShown: false },
        { id: 2, name: "secondModal", isShown: false },
      ],
      addToCartModal: { productId: "", isShown: false },
      headerFixed: false,
    };
  }

  componentDidMount = () => {
    getProducts().then((products) => {
      this.setState({ products });
    });
    window.addEventListener("scroll", this.handleScroll);
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = (event) => {
    // console.log("SCROLL", window.scrollY);
    if (window.scrollY > 500) {
      this.setState({ headerFixed: true });
    } else if (window.scrollY < 500) {
      this.setState({ headerFixed: false });
    }
    // let windowOffset = event.srcElement.body.offsetHeight;
    // let scrollTop = event.srcElement.body.scrollTop;
    // console.log("scrollTop", windowOffset);
  };
  handleAddToCart = () => {
    const { products, cartContent } = this.state;
    // Клик на кнопке Добавить в корзину внутри модального окна
    //Получаем id товара из модального окна
    const inCartId = this.state.addToCartModal.productId;
    // Добавляем товар в this.state.cartContent
    const newCartProduct = products.filter(
      (product) => product.id === inCartId
    );
    const newCartArr = [...newCartProduct, ...cartContent];
    // this.setState({ cartContent: newCartArr });
    this.setState((state) => {
      return {
        addToCartModal: { productId: "", isShown: false },
        cartContent: newCartArr,
      };
    });

    if (!localStorage.getItem("inCart")) {
      localStorage.setItem("inCart", inCartId);
    } else {
      const cartArr = localStorage.getItem("inCart").split(",");
      cartArr.push(inCartId);
      localStorage.setItem("inCart", cartArr);
    }
    this.hideModal();
  };
  handleAddToCartModal = (productId) => {
    // Показываем модальное окно добавления в корзину
    this.setState((state) => {
      return { addToCartModal: { productId, isShown: true } };
    });
  };
  hideModal = () => {
    const modal = document.querySelector(".modal-body");
    const modalCover = document.querySelector(".modal-cover");
    modal.classList.add("modal-hide");
    modalCover.classList.add("modal-cover-hide");
  };
  handleAddToCartModalclose = () => {
    this.hideModal();
    this.setState((state) => {
      return { addToCartModal: { productId: "", isShown: false } };
    });
  };
  handleModal = (productId) => {
    // console.log(productId);
    this.setState((state) => {
      const newModals = state.modals.map((modal) => {
        if (modal.id === 1) {
          return { ...modal, isShown: !modal.isShown };
        }
        return modal;
      });
      return { modals: newModals };
    });
  };
  handleModalClose = (id) => {
    const modal = document.querySelector(".modal-body");
    const modalCover = document.querySelector(".modal-cover");
    modal.classList.add("modal-hide");
    modalCover.classList.add("modal-cover-hide");
    setTimeout(() => {
      this.setState((state) => {
        const newModals = state.modals.map((modal) => {
          if (modal.id === id) {
            return { ...modal, isShown: false };
          }
          return modal;
        });
        return { modals: newModals };
      });
    }, 1000);
  };
  contentBlock = () => {
    const primary = "lightsalmon";
    const secondary = "thistle";
    return (
      <div className="content-block">
        <div className="btn-block">
          <Button
            onClick={() => {
              this.handleModal(1);
            }}
            backgroundColor={primary}
            text="Open first modal"
          />
          <Button
            onClick={() => {
              this.handleModal(2);
            }}
            backgroundColor={secondary}
            text="Open second modal"
          />
        </div>
      </div>
    );
  };
  removeProductFromCart = (id) => {
    const { cartContent } = this.state;
    // console.log("REMOVE", e.target);
    // console.log(cartContent);
    const newCartContent = cartContent.filter((product) => product.id !== id);
    // console.log("newCartContent:", newCartContent);
    this.setState({ cartContent: newCartContent });

    const cartIdArray = localStorage.getItem("inCart").split(",");
    const newCartArr = cartIdArray.filter((item) => +item !== id);
    // console.log(cartIdArray);
    // console.log(newCartArr);
    if (newCartArr.length > 0) {
      localStorage.setItem("inCart", newCartArr);
    } else {
      localStorage.removeItem("inCart");
    }
  };
  render() {
    const { products, addToCartModal, headerFixed } = this.state;
    // console.log(cartContent);
    let cartProduct = {};
    // Получаем продукт который хотим добавить в корзину
    if (addToCartModal.isShown) {
      cartProduct = products.find(
        (item) => item.id === +addToCartModal.productId
      );
    }

    const addToCartModalBtns = (
      <div className="modal-btn-block">
        <button className="btn btn-modal" onClick={this.handleAddToCart}>
          Add to card
        </button>
        <button
          className="btn btn-modal"
          onClick={this.handleAddToCartModalclose}
        >
          Cancel
        </button>
      </div>
    );
    return (
      <>
        <div className="container">
          <HeaderImage />
          <Header
            products={products}
            removeProduct={this.removeProductFromCart}
            headerFixed={headerFixed}
          />
        </div>
        <div className="container">
          <MainBody
            productList={products}
            addToCart={this.handleAddToCartModal}
            style={{ background: "red" }}
          />
        </div>

        {addToCartModal.isShown && (
          <CartModal
            header="Please, confirm adding to cart this product"
            closeButton={true}
            product={cartProduct}
            actions={addToCartModalBtns}
            onModalClose={this.handleAddToCartModalclose}
          />
        )}
      </>
    );
  }
}
export default App;
