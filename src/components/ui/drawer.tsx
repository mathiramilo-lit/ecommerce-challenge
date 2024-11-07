import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { CloseCircle } from "@/assets";

interface DrawerProps extends PropsWithChildren {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Drawer = ({ open, setOpen, children }: DrawerProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex w-[80%] max-w-full pr-10 md:w-96">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-500"
            >
              <div className="flex h-full flex-col gap-8 overflow-y-scroll bg-white p-10 shadow-xl">
                <button type="button" onClick={() => setOpen(false)}>
                  <span className="sr-only">Close panel</span>
                  <CloseCircle />
                </button>

                <div className="relative flex flex-1 flex-col gap-8">
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
