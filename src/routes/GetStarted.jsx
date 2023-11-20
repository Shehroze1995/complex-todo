import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";

const GetStarted = () => {
  const [getStarted, setGetStarted] = useState(false);
  return (
    <div className="grid grid-cols-2 p-8 min-h-screen max-w-[1800px] m-auto max-[900px]:block max-[900px]:p-4 max-[900px]:bg-[#111111]">
      <div className="bg-[#111111] relative h-[calc(100vh-64px)] flex place-items-center place-content-center rounded-lg max-[900px]:hidden">
        <h2 className="text-white absolute top-8 left-8 text-4xl font-extrabold">
          Todo <br />
          App
        </h2>
        <img
          className={`w-full max-w-xs object-contain ${
            getStarted ? "rotate-90" : "rotate-0"
          }`}
          src="https://assets.api.uizard.io/api/cdn/stream/e99e168f-d429-4983-8089-5b67c2cb03be.png"
        />
      </div>
      <div className="flex place-items-center justify-center h-[calc(100vh-64px)]">
        {!getStarted ? (
          <section className="w-9/12 m-auto grid gap-4 max-[900px]:w-full">
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
          <section className="w-9/12 m-auto grid gap-4 max-[900px]:w-full">
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
            <button
              className="text-xl bg-[#FFD43B] w-full py-2 rounded-md transition-all duration-300 hover:bg-[#111111] hover:text-white"
              type="button"
            >
              Sign in
            </button>
            <div className="flex place-items-center">
              <div className="border-2 border-gray-300 flex-1 max-[900px]:border max-[900px]:border-gray-800" />
              <p className="mx-2 text-gray-600 max-[900px]:text-gray-300">OR</p>
              <div className="border-2 border-gray-300 flex-1 max-[900px]:border max-[900px]:border-gray-800" />
            </div>
            <div className="flex gap-2 text-xl">
              <button
                className="bg-gray-300 flex-1 py-1 rounded-lg text-orange-500"
                type="button"
              >
                Google
              </button>
              <button
                className="bg-gray-300 flex-1 py-1 rounded-lg text-blue-500"
                type="button"
              >
                Facebook
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
