import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

const CustomModal = ({ isOpen, onClick, headerText, bodyText , buttonText }) => {
  return (
    <Modal returnFocusAfterClose isOpen={isOpen} className='modal-dialog-centered'  >
      <ModalHeader >
        <p className="text-danger m-0"> {headerText}</p>
      </ModalHeader>
      <ModalBody className='text-center '>
        <h5>{bodyText}</h5>


        <img src='https://cdn-icons-png.flaticon.com/512/1642/1642337.png' alt='apology icon' style={{ height: '90px' }} />
      </ModalBody>
      <ModalFooter className="d-flex justify-content-center">
        <Button color="danger" onClick={onClick}>
         {buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CustomModal;