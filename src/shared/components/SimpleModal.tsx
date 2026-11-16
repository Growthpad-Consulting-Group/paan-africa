"use client";

import Modal, { ModalHeader, type ModalSize } from "@/shared/components/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  subtitle?: string;
  size?: ModalSize;
  children: React.ReactNode;
};

/** Titled modal for quick dialogs: header with icon/subtitle and a padded body (ported from kazi's SimpleModal). */
export default function SimpleModal({ open, onClose, title, icon, subtitle, size = "md", children }: Props) {
  return (
    <Modal isOpen={open} onClose={onClose} size={size}>
      <ModalHeader title={title} icon={icon} subtitle={subtitle} onClose={onClose} />
      <div className="px-5 py-4">{children}</div>
    </Modal>
  );
}
