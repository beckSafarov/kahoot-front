import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

interface ModalBaseProps {
  title: string
  isOpen: boolean
  onClose(): void,
  size?: 'xs'|'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const ModalBase = ({title, isOpen, onClose, size, children}:ModalBaseProps) => {
  return (
    <Modal
      size={size || 'md'}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent overflowY='scroll'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY='scroll'>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalBase