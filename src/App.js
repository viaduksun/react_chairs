import React from "react";
import "./scss/null.scss";
import "./scss/App.scss";
import Button from "./Button";
import Modal from "./Modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modals: [
        { id: 1, name: "firstModal", isShown: false },
        { id: 2, name: "secondModal", isShown: false },
      ],
    };
  }
  handleModal = (id) => {
    this.setState((state) => {
      const newModals = state.modals.map((modal) => {
        if (modal.id === id) {
          return { ...modal, isShown: !modal.isShown };
        }
        return modal;
      });
      return { modals: newModals };
    });
  };
  handleModalClose(id) {
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
  }
  contentBlock() {
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
  }
  contentBlockRender() {
    let contBlock = "";
    setTimeout(() => {
      contBlock = this.contentBlock();
    }, 1000);
    return contBlock;
  }
  render() {
    const { modals } = this.state;
    const firstModalBtns = (
      <div className="modal-btn-block">
        <button className="btn btn-modal">Ok</button>
        <button
          className="btn btn-modal"
          onClick={() => this.handleModalClose(1)}
        >
          Cancel
        </button>
      </div>
    );
    const secondModalBtns = (
      <div className="modal-btn-block">
        <button
          className="btn btn-modal"
          onClick={() => this.handleModalClose(2)}
        >
          Cancel downloading
        </button>
        <button className="btn btn-modal">Continue downloading</button>
      </div>
    );
    let showFirstModal = false;
    let showSecondModal = false;
    modals.forEach((modal) => {
      if (modal.id === 1) {
        showFirstModal = modal.isShown;
      } else if (modal.id === 2) {
        showSecondModal = modal.isShown;
      }
    });
    return (
      <>
        <div className="container">{this.contentBlock()}</div>
        {showFirstModal && (
          <Modal
            header="Do you want to delete this file?"
            closeButton={true}
            text="Once you delete this file, it won’t be possible to undo this action. 
              Are you sure you want to delete it?"
            actions={firstModalBtns}
            onModalClose={() => {
              this.handleModalClose(1);
            }}
          />
        )}
        {showSecondModal && (
          <Modal
            data={this.state.secondModalData}
            header="Do you want to cancel downloading?"
            closeButton={false}
            text="Once you cancel downloading, it won’t be possible to undo this action. 
              Are you sure you want to cancel it?"
            actions={secondModalBtns}
            onModalClose={() => {
              this.handleModalClose(2);
            }}
          />
        )}
      </>
    );
  }
}

export default App;
