import { useRef, createContext } from 'react'

export const ModalId = createContext('')

export const DialogCallback = createContext(null)

export const handleModalOpen = modalId => {
  const modal = document.querySelector(`#${modalId}`)
  modal.showModal()
}

const ModalDialog = ({ modalId, children }) => {
  const containerRef = useRef(null)
  const dialogRef = useRef(null)

  const closeDialogWithCallback = (toExecute) => {
    dialogRef.current.close()
    if (toExecute) {
      toExecute()}
  }

  const handleClick = e => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      // dialogRef.current.close()
      closeDialogWithCallback()
    }
  }

  return (
    <dialog
    ref={dialogRef}
    id={modalId}
    onClick={handleClick}
    >
      <DialogCallback.Provider value={closeDialogWithCallback}>
      <div ref={containerRef}
      className='modal'
      >
<button onClick={() => dialogRef.current.close()}>Back</button>
        {children}
        </div>
      </DialogCallback.Provider>
    </dialog>
  )
}

export default ModalDialog
