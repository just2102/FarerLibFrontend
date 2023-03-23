import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import Modal from 'react-modal';
import AddBookModal from "./Modals/Book/AddBookModal";
import { useState } from "react";

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: "auto",
      maxHeight: "70vh"
    },
  };

const LibrarySidebar = () => {
    const navigate = useNavigate()
    const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
    const [modalOpen, setModalOpen] = useState(false)
    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

  return (
    <div className="library_sidebar">
      <div className="library_addbook">
        {isAuthorized && (
          <button id="add_book_button" onClick={openModal}>
            Add a book
          </button>
        )}
        {!isAuthorized && (
          <button id="add_book_button" onClick={() => navigate("/login")}>
            Login to add new books!
          </button>
        )}
        <Modal
          style={customStyles}
          isOpen={modalOpen}
          onRequestClose={closeModal}
          contentLabel={"New book"}
        >
          <AddBookModal closeModal={closeModal}></AddBookModal>
        </Modal>
      </div>
      <NavLink to={""} end>All</NavLink>
      <NavLink to={"popular"} end>Popular</NavLink>
      <NavLink to={"new"} end>New Arrivals</NavLink>
      <NavLink to={"available"} end>Available Today</NavLink>
      {isAuthorized && <NavLink to={"uploadedbyme"} end>Uploaded By Me</NavLink>}
    </div>
  );
};

export default LibrarySidebar;
