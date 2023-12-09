"use client";

import { Dispatch, SetStateAction } from "react";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Modal({
  children,
  showModal,
  setShowModal,
  className,
  onClose,
  preventDefaultClose,
}: {
  children: React.ReactNode;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  onClose?: () => void;
  preventDefaultClose?: boolean;
}) {
  const router = useRouter();

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return;
    }
    // fire onClose event if provided
    onClose && onClose();

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false);
      // else, this is intercepting route @modal
    } else {
      router.back();
    }
  };

  return (
    <Dialog
      
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogContent className="w-full">{children}</DialogContent>
    </Dialog>
  );
}
