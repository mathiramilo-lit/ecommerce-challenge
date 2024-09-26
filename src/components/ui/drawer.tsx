import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

import { CloseCircle, AltArrowRight } from '@/assets';

interface DrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Drawer = ({ open, setOpen }: DrawerProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex w-[80%] max-w-full pr-10 md:w-80">
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
                  {/* Your content */}
                  <button className="flex w-full items-center justify-between transition-opacity hover:opacity-60">
                    <span className="font-text font-semibold text-orange-600">
                      New In
                    </span>
                    <AltArrowRight />
                  </button>
                  <button className="flex w-full items-center justify-between transition-opacity hover:opacity-60">
                    <span className="font-text font-semibold text-orange-600">
                      Clothing
                    </span>
                    <AltArrowRight />
                  </button>
                  <button className="flex w-full items-center justify-between transition-opacity hover:opacity-60">
                    <span className="font-text font-semibold text-orange-600">
                      Footwear
                    </span>
                    <AltArrowRight />
                  </button>
                  <button className="flex w-full items-center justify-between transition-opacity hover:opacity-60">
                    <span className="font-text font-semibold text-orange-600">
                      Accesories
                    </span>
                    <AltArrowRight />
                  </button>
                  <button className="flex w-full items-center justify-between transition-opacity hover:opacity-60">
                    <span className="font-text font-semibold text-orange-600">
                      SALE
                    </span>
                    <AltArrowRight />
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
