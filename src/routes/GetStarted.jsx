import { useState } from "react";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";

const GetStarted = () => {
  const [getStarted, setGetStarted] = useState(false);
  return (
    <div className="grid grid-cols-2 p-8 min-h-screen RobotoFont max-w-[1800px] m-auto max-[900px]:block max-[900px]:p-4 max-[900px]:bg-[#111111] onRenderAnimate">
      <div className="bg-[#111111] relative h-[calc(100vh-64px)] flex place-items-center place-content-center rounded-lg max-[900px]:hidden">
        <h2 className="text-white absolute top-8 left-8 text-4xl font-extrabold">
          Todo App
        </h2>
        <img
          className={`w-full max-w-xs object-contain transition-all duration-300 ${
            getStarted ? "rotate-90" : "rotate-0"
          }`}
          src="https://assets.api.uizard.io/api/cdn/stream/e99e168f-d429-4983-8089-5b67c2cb03be.png"
        />
      </div>
      <div className="relative flex place-items-center justify-center h-[calc(100vh-32px)] min-[900px]:h-[calc(100vh-64px)]">
        <div className="absolute top-0 left-0 text-white text-3xl font-extrabold min-[900px]:hidden">
          <h3>Todo App</h3>
          <div className="border-2 border-blue-500 w-8/12 m-auto"/>
        </div>
        {!getStarted ? (
          <section className="w-8/12 m-auto grid gap-4 max-[900px]:w-full">
            <h2 className="text-4xl font-extrabold max-[900px]:text-white">
              Productive Mind
            </h2>
            <p className="text-gray-700 max-[900px]:text-gray-300">
              With only the features you need, Todo App is customized for
              individuals seeking a stress-free way to stay focused on their
              goals, projects, and tasks.
            </p>
            <button
              onClick={() => setGetStarted(true)}
              className="text-xl bg-[#FFD43B] w-full py-2 rounded-md transition-all duration-300 hover:bg-[#111111] hover:text-white"
              type="button"
            >
              Get Started
            </button>
          </section>
        ) : (
          <section className="w-8/12 m-auto grid gap-4 max-[900px]:w-full onRenderAnimate">
            <h2 className="text-4xl font-extrabold max-[900px]:text-white">
              Sign in
            </h2>
            <input
              className="border border-gray-300 w-full rounded-lg py-1 pl-3 outline-none cursor-not-allowed placeholder:text-black"
              readOnly
              placeholder="email@email.com"
              type="email"
              name=""
              id="signin"
            />
            <div className="relative">
              <input
                className="border border-gray-300 w-full rounded-lg py-1 pl-3 outline-none cursor-not-allowed placeholder:text-black"
                type="password"
                placeholder="*******"
                readOnly
                name=""
                id="password"
              />
              <MdRemoveRedEye className="absolute top-[50%] translate-y-[-50%] right-3 cursor-not-allowed" />
            </div>
            <Link
              to={`homepage`}
              className="text-xl text-center bg-[#FFD43B] w-full py-2 rounded-md transition-all duration-300 hover:bg-[#111111] hover:text-white"
              type="button"
            >
              Sign in
            </Link>
            <div className="flex place-items-center">
              <div className="border-2 border-gray-300 flex-1 max-[900px]:border max-[900px]:border-gray-800" />
              <p className="mx-2 text-gray-600 max-[900px]:text-gray-300">OR</p>
              <div className="border-2 border-gray-300 flex-1 max-[900px]:border max-[900px]:border-gray-800" />
            </div>
            <div className="grid gap-2">
              <button className="flex items-center justify-center gap-2 text-xl border border-gray-600 rounded-3xl py-[6px] bg-white">
                <FcGoogle />
                Login with Google+
              </button>
              <button className="flex items-center justify-center gap-2 text-xl rounded-3xl py-2 bg-[#426BC6] text-white">
                <FaFacebookF />
                Login with Facebook
              </button>
            </div>
            <p className="text-center text-gray-600 max-[900px]:text-gray-300">
              Don&apos;t have an account? Sign up
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default GetStarted;
