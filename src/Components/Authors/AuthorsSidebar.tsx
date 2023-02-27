import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import Modal from 'react-modal';
import { useState } from "react";
import AddAuthorForm from "../Library/Modals/Author/AddAuthorForm";

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      padding: "30px",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: "10px"
    },
  };

const LibrarySidebar = () => {
    const navigate = useNavigate()
    const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
    const [modalOpen, setModalOpen] = useState(false)
    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

  return (
    <div className="authors_sidebar">
      <div className="authors_addauthor">
        {isAuthorized && (
          <button id="add_book_button" onClick={openModal}>
            Add an author
          </button>
        )}
        {!isAuthorized && (
          <button id="add_book_button" onClick={() => navigate("/login")}>
            Login to add new authors!
          </button>
        )}
        <Modal
          style={customStyles}
          isOpen={modalOpen}
          onRequestClose={closeModal}
          contentLabel={"New book"}
        >
          <AddAuthorForm closeModal={closeModal}></AddAuthorForm>
        </Modal>
      </div>
      <NavLink to={""} end>All</NavLink>
      <NavLink to={"popular"} end>Popular</NavLink>
    </div>
  );
};

export default LibrarySidebar;