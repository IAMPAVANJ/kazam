import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import type { IToDo } from '../../types/types';

export default function TodoCard({isOpen, setIsOpen,data}:{isOpen:boolean, setIsOpen: (isOpen: boolean) => void,data:IToDo | null | undefined}) {
    
  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-2xl">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl dark:bg-gray-700 bg-gray-700/25 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white flex flex-row items-center justify-start gap-2"
              >
                Todo
              </DialogTitle>
              <hr />
              <div className="flex flex-col items-start justify-center mt-2">
                <h4 className="text-4xl dark:text-gray-300 text-gray-700">
                  {data?.title}
                </h4>
                <p className="mt-2 text-sm/6 text-gray/50">{data?.description || ""}</p>
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}