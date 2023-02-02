import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import { useCallback, useState } from 'react'

interface ModalRemoveProps {
  isOpen: boolean
  handleRemoveItem: () => void
  handleCloseModal: () => void
  dialogTitle: string
}
export const ModalRemove = ({ isOpen, handleRemoveItem, dialogTitle, handleCloseModal }: ModalRemoveProps) => {
  return (
    <Dialog open={isOpen} onClose={handleCloseModal} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>{`Remove ${dialogTitle}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>Are you sure you want to delete this {dialogTitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleRemoveItem}>Remove</Button>
      </DialogActions>
    </Dialog>
  )
}
