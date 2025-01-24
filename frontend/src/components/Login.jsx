import { useEffect, useState } from "react";
import "../index.css";

const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
	setIsLoaded(true);
  }, []);
  
  return (
	<div className="bg-white flex justify-center items-center h-screen">
	  {/* Login Box */}
	  <div
		className={`bg-gray-900 p-8 rounded-lg shadow-lg w-100 m-4 transition-all duration-1000 ${
		  isLoaded ? "animate-swim" : ""
		}`}
	  >
		<form action="" className="bg-gray-900 flex gap-4 flex-col">
		  <div className={`relative ${
		  isLoaded ? "animate-swim-com" : ""
		}`}>
			<input
			  type="text"
			  id="floating_outlined"
			  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
			  placeholder=" "
			/>
			<label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
			  Username
			</label>
		  </div>
		  <div className={`relative ${
		  isLoaded ? "animate-swim-com1" : ""
		}`}>
			<input
			  type="password"
			  id="floating_outlined"
			  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
			  placeholder=" "
			/>
			<label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
			  Password
			</label>
		  </div>
		  <div className={` flex justify-end ${
		  isLoaded ? "animate-swim-com2" : ""
		}`}>
			<a href="#" className="text-gray-400">
			  Forget Password?
			</a>
		  </div>
		  <button
			type="button"
			className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
		  >
			Submit
		  </button>
		</form>
		<div href="#" className={`text-gray-400 ${
			isLoaded ? "animate-swim-com3" : ""
		}`}>
		<a href="">
		  Don't have account?<span className="text-blue-200 underline ml-0.5"> Sign Up</span>
		</a>
		</div>
	  </div>
	</div>
  );
};

export default Login;
