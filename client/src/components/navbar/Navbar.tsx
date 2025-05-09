import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {  useState } from "react";
import ProfilePopup from "../popups/ProfilePopUp";
import usePostApi from "../../Api/usePostApi";
import { successToast } from "../../utils/common";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({setIsOpen}:{
  setIsOpen:(isOpen:boolean)=>void
}) {

  const { Logout } = usePostApi();
  const [showProfile, setShowProfile] = useState(false);
  // const [darkMode, setDarkMode] = useState(() => {
  //   const stored = localStorage.getItem("theme");
  //   if (stored) return stored === "dark";
  //   return window.matchMedia("(prefers-color-scheme: dark)").matches;
  // });
  
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);


  const logoutuser = async(e:React.FormEvent)=>{
    e.preventDefault();
    await Logout()
    .then((res)=>{
      console.log(res);
      successToast("Logout Successfully");
      localStorage.clear();
      window.location.href = "/";
    })
  }

  return (
    <Disclosure as="nav" className="dark:bg-gray-800 bg-gray-300">
      <div className="mx-auto max-w-auto w-full px-2 sm:px-6 lg:px-8 dark:bg-gray-800 bg-gray-500 shadow-2xl">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Todo" src="/logo.webp" className="h-8 w-auto" />
              <span className="text-white text-2xl font-bold ml-2">
                Todo App
              </span>
            </div>
          </div>
          <div className="absolute inset-y-0 space-x-2 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
            onClick={() => setIsOpen(true)}
              type="button"
              className="relative hidden sm:ml-6 sm:block rounded-sm p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden border border-indigo-600 bg-indigo-600 px-3 py-1 font-medium  shadow-sm transition-colors hover:bg-indigo-700"
            >
              <span className="text-white">+ New </span>
            </button>
{/* 
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-1 bg-gray-500 dark:bg-gray-700 text-black dark:text-white rounded"
            >
              {darkMode ? "☀️" : "🌛"}
            </button> */}

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="profile"
                    src="/avatar.jpg"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <span
                    onClick={() => setShowProfile(true)}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </span>
                </MenuItem>

                <MenuItem>
                  <span
                  onClick={logoutuser}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </span>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
            as="button"
            onClick={() => setIsOpen(true)}
            className={classNames(
              "text-gray-800 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
          >
            +New Todo
          </DisclosureButton>
        </div>
      </DisclosurePanel>
      <ProfilePopup isOpen={showProfile} setIsOpen={setShowProfile} />
    </Disclosure>
  );
}
