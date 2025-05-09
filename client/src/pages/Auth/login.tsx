import { useEffect, useState } from "react";
import Icons from "../../utils/icons";
import usePostApi from "../../Api/usePostApi";
import { useNavigate } from "react-router-dom";
import { errorToast, isValidEmail, successToast } from "../../utils/common";
import useGetApi from "../../Api/useGetApi";
import SpinnerLoader from "../../components/loader/SpinnerLoader";

const Login = () => {
  const { CloseEye, OpenEye } = Icons;
  const { login, register } = usePostApi();
  const { wakeup } = useGetApi();
  const [loading,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [authToggle, setAuthToggle] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    // to wake up render backend as render needs to be triggred
    localStorage.clear();
    wakeup()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userlogin = async () => {
    setLoading(true);
    await login({
      email: form.email,
      password: form.password,
    })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res?.data));
        localStorage.setItem("token", JSON.stringify(res?.data?.accessToken));
        navigate("/todo");
        successToast("Logged In");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        errorToast(err?.response?.data?.message);
      });
  };

  const userRegister = async () => {
    setLoading(true);
    await register(form)
      .then((res) => {
        setLoading(false);
        console.log(res);
        successToast("Registered Successfully");
        setForm({ name: "", email: "", password: "" });
        // setAuthToggle(!authToggle);
        userlogin();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        errorToast(err?.response?.data?.message);
      });
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      errorToast("Please Enter valid email");
      return;
    }
    if (authToggle) {
      //signup
      userRegister();
    } else {
      //login
      userlogin();
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-row items-center mx-auto justify-center gap-x-2">
          <img alt="Kazam" src="/logo.webp" className=" h-10 w-auto max-w-20" />
          <h1 className="text-center text-2xl font-bold tracking-tight text-[#1676a5]">
            Todo App
          </h1>
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#27346A]">
          {authToggle ? "Register" : "Sign in"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          {authToggle && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={form.email}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, email: e.target.value }));
                }}
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                value={form.password}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, password: e.target.value }));
                }}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {show ? (
                <img
                  src={OpenEye}
                  className="max-w-5 min-w-5 max-h-5 min-h-5 cursor-pointer right-1 top-2 absolute"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <img
                  src={CloseEye}
                  className="max-w-5 min-w-5 max-h-5 min-h-5 cursor-pointer right-1 top-2 absolute"
                  onClick={() => setShow(!show)}
                />
              )}
            </div>
          </div>

          <div>
            <button
              onClick={(e) => handleForm(e)}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              { loading ? <SpinnerLoader/>  : authToggle ? "Register" : "Sign In"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {authToggle ? "Already Member?" : "Not a member?"}{" "}
          <span
            onClick={() => setAuthToggle(!authToggle)}
            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            {  authToggle ? "Sign In" : "Register"}
          </span>
        </p>
      </div>
      <div className="mx-auto mt-2">
        <strong className="text-[#27346A]">Note* : Backend is Deployed on Render.com (Free server) and which may take upto 1 Minute for First Time to Login.</strong>
        <strong className="text-[#2790C3] ms-1">Please Be Patient.</strong>
      </div>
    </div>
  );
};

export default Login;
