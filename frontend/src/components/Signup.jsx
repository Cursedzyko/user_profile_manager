import { useState, useEffect } from "react";
import Input from "./Input";
import { signUpUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      confirm_password: confirmPassword,
    };

    console.log("USER:", userInfo);

    try {
      const response = await signUpUser(userInfo);
      console.log("User created successfully:", response);
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ non_field_errors: ["An unexpected error occurred."] });
      }
    }
  };

  return (
    <div className="bg-gradient-to-t from-gray-700 to-black bg-cover font-mono flex justify-center items-center h-screen">
      <div
        className={`z-40 bg-gray-900 p-8 rounded-lg shadow-lg w-full sm:w-100 m-4 transition-all duration-1000 ${
          isLoaded ? "animate-visible" : ""
        }`}
      >
        <div
          className={`mb-4 text-gray-400 flex justify-center ${
            isLoaded ? "animate-visible1" : ""
          }`}
        >
          <h1 className="font-bold">SignUp to User Profile</h1>
        </div>
        
        {/* Display error message if available */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4">
            {Object.keys(error).map((key) => (
              <p key={key}>
                {error[key].map((msg, index) => (
                  <span key={index}>{msg}</span>
                ))}
              </p>
            ))}
          </div>
        )}

        <form action="post" className="bg-gray-900 flex gap-4 flex-col" onSubmit={handleSubmitForm}>
          <div className={`relative ${isLoaded ? "animate-visible1" : ""}`}>
            <Input
              type={"email"}
              label={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className={`relative ${isLoaded ? "animate-visible1" : ""}`}>
              <Input
                type={"text"}
                label={"First Name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={`relative ${isLoaded ? "animate-visible1" : ""}`}>
              <Input
                type={"text"}
                label={"Last Name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className={`relative ${isLoaded ? "animate-visible1" : ""}`}>
            <Input
              type={"password"}
              label={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={`relative ${isLoaded ? "animate-visible1" : ""}`}>
            <Input
              type={"password"}
              label={"Confirm Password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={` w-full ${isLoaded ? "animate-visible1" : ""}`}>
            <button
              type="submit"
              className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
