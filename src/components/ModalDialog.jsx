import { useRef, createContext, useContext } from 'react'

export const ModalId = createContext('')

export const DialogCallback = createContext({
  dialog: null,
  dialogCallbackOnClose: null
})

export const handleModalOpen = modalId => {
  const modal = document.querySelector(`#${modalId}`)
  modal.showModal()
}

export const useModal = () => {
  return useContext(DialogCallback)
}

const ModalDialog = ({ modalId, children }) => {
  const containerRef = useRef(null)
  const dialogRef = useRef(null)

  const closeDialogWithCallback = toExecute => {
    dialogRef.current.close()
    if (typeof toExecute === 'function') {
      toExecute()
    }
  }

  const handleClick = e => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      closeDialogWithCallback()
    }
  }

  return (
    <dialog ref={dialogRef} id={modalId} onClick={handleClick}>
      <DialogCallback.Provider
        value={{
          dialog: dialogRef,
          dialogCallbackOnClose: closeDialogWithCallback
        }}
      >
        <div ref={containerRef} className='modal'>
          {children}
        </div>
      </DialogCallback.Provider>
    </dialog>
  )
}

export default ModalDialog
