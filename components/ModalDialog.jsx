import { useRef, createContext } from 'react'

export const ModalId = createContext('')

export const handleModalOpen = modalId => {
  const modal = document.querySelector(`#${modalId}`)
  modal.showModal()
}

const ModalDialog = ({ modalId, children }) => {
  const containerRef = useRef(null)
  const dialogRef = useRef(null)

  const handleClick = e => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      dialogRef.current.close()
    }
  }

  return (
    <dialog
      className='modal'
      ref={dialogRef}
      id={modalId}
      onClick={handleClick}
    >
      <div ref={containerRef}>{children}</div>
    </dialog>
  )
}

export default ModalDialog
