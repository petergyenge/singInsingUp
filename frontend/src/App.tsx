import { useState, useEffect } from "react";
import { postsingUp } from "./api/post";
import { postsingIn } from "./api/singin";
import "./App.css";

function App() {

  const [singEmail, setsingEmail] = useState("")
  const [singPassword, setsingPassword] = useState("")
  const [pageChange, setPageChange] = useState(false)


  return (
    <>
      <div>
        <div className={`${pageChange == false ? "bg-violet-900" : "bg-blue-400"} flex justify-center`}>
        <button className="btn btn-lg"
            onClick={() => {setPageChange(!pageChange)}}>
                {pageChange == false ? "Go to the SingIn page" : "Go to the LogIn page"}
            </button>
        </div>
        {pageChange == false ? 
                <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-violet-900">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
                  <h1 className="text-3xl font-semibold text-center text-gray-700">singUp</h1>
                  <form className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="text-base label-text">Email</span>
                      </label>
                      <input type="text" placeholder="Email Address" className="w-full input input-bordered"
                        onChange={(e) => { setsingEmail(e.target.value); }}
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="text-base label-text">Password</span>
                      </label>
                      <input type="password" placeholder="Enter Password"
                        className="w-full input input-bordered"
                        onChange={(e) => { setsingPassword(e.target.value); }}
                      />
                      <button className="btn btn-block mt-5"
                        onClick={() => { postsingUp(singEmail, singPassword) }}
                        disabled={!singEmail || !singPassword}
                      >Login</button>
                    </div>
                  </form>
                </div>
              </div>
              : 
               <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-blue-400">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700">singIn</h1>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="text-base label-text">Email</span>
                </label>
                <input type="text" placeholder="Email Address" className="w-full input input-bordered"
                  onChange={(e) => { setsingEmail(e.target.value); }}
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter Password"
                  className="w-full input input-bordered"
                  onChange={(e) => { setsingPassword(e.target.value); }}
                />
                <button className="btn btn-block mt-5"
                  onClick={() => { postsingIn(singEmail, singPassword) }}
                  disabled={!singEmail || !singPassword}
                >Login</button>
              </div>
            </form>
          </div>
        </div>
    }
      <div></div>
      </div>

    </>
  );
}

export default App;
