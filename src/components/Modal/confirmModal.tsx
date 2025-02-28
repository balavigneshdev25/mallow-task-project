import React from "react";
import { Modal } from "antd";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;  
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, content, onConfirm, onCancel }) => {
  return (
    <Modal
      open={isOpen}
      title={title}
      onOk={onConfirm}  
      onCancel={onCancel}
      okText="Yes, Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmModal;
