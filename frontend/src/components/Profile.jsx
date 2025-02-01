import { useEffect } from "react";
import "../index.css";
import { useState } from "react";
import { getUserInfo, updateUserInfo } from "../api/api";
import Cookies from 'js-cookie';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Lucia");
  const [lastName, setLastName] = useState("Alvarez");
  const [age, setAge] = useState(12);
  const [education, setEducation] = useState("Heasdfasdfasdf");
  const [profession, setProfession] = useState(
    "asdfasd fasdfasdfasdfasdf asdfsdfasdfasdddd ddddddddasddddddddd"
  );
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet.");
  const [goals, setGoals] = useState("Become a world-renowned photographer.");
  const [motivations, setMotivations] = useState(
    "Passion for capturing moments."
  );
  const [concerns, setConcerns] = useState(
    "Finding time to balance work and life."
  );
  const [profileImage, setProfileImage] = useState("profile.jpg"); // Default profile image

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedInfo ={
      first_name: firstName,
      "last_name":lastName,
      "age":age,
      "education":education,
      "profession":profession,
      "bio":bio,
      "goals":goals,
      "motivations":motivations,
      "concerns": concerns

    }
    

    try{
      const token = Cookies.get("access_token")
      const response = updateUserInfo(updatedInfo, token );
      console.log(response);
      setIsEditing(false);
    }
    catch(error)
    {
      console.log(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  useEffect( () => {
    const fetchUserInfo = async () =>{
      try
      {
        const token = Cookies.get("access_token");
        const response = await getUserInfo(token);
        

        setFirstName(response.first_name || "");
        setLastName(response.last_name || "");
        setAge(response.age ?? 0);
        setEducation(response.education || "");
        setProfession(response.profession || "");
        setBio(response.bio || "");
        setGoals(response.goals || "");
        setMotivations(response.motivations || "");
        setConcerns(response.concerns || "");
      }catch (error)
      {
        console.log(error);
      }

    };
    fetchUserInfo();

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-black flex justify-center items-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full w-full text-white">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4 justify-center p-6 rounded-lg shadow-[0_0px_40px_rgba(255,255,255,0.4)] text-center md:col-span-1">
          <img
            src={profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white object-cover"
          />
          {isEditing ? (
            // Edit Profile Form
            <form
              onSubmit={handleSave}
              className="mt-4 w-full flex flex-col items-center"
            >
              <div className="mb-4 w-full">
                <label className="block font-semibold text-lg">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2 p-2 w-full rounded-lg border bg-gray-800 text-white"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block font-semibold text-lg">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-2 p-2 w-full rounded-lg border bg-gray-800 text-white"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block font-semibold text-lg">Profession</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="mt-2 p-2 w-full rounded-lg border bg-gray-800 text-white"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block font-semibold text-lg">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="mt-2 p-2 w-full rounded-lg border bg-gray-800 text-white"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block font-semibold text-lg">Education</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mt-2 p-2 w-full rounded-lg border bg-gray-800 text-white"
                />
              </div>
              
              <div className="mb-4 w-full">
                <label className="block font-semibold text-lg">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2 w-full text-sm text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-2/5 self-end"
              >
                Save
              </button>
            </form>
          ) : (
            // Display Profile Information
            <div className="mt-4 text-left w-full flex justify-center gap-2 flex-col items-center">
              <p className="font-semibold text-lg">Full Name</p>
              <span>{firstName} {lastName} </span>
              <p className="font-semibold text-lg">Profession</p>
              <span>{profession}</span>
              <p className="font-semibold text-lg">Age</p>
              <span>{age}</span>
              <p className="font-semibold text-lg">Education</p>
              <span>{education}</span>
            </div>
          )}
          <button
            onClick={handleEditToggle}
            className={`${isEditing ? "mt-4 w-2/5 btn btn-error self-end" : "btn btn-info self-end"}`}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Info Boxes */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Bio", "Goals", "Motivations", "Concerns"].map((title, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg text-white text-lg"
            >
              <h3 className="font-bold text-2xl">{title}</h3>
              {isEditing ? (
                <div className="mt-4">
                  {title === "Bio" && (
                    <textarea
                      maxLength={300}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full h-50 p-2 rounded-lg bg-gray-800 text-white"
                    />
                  )}
                  {title === "Goals" && (
                    <textarea
                      maxLength={300}
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      className="w-full h-50 p-2 rounded-lg bg-gray-800 text-white"
                    />
                  )}
                  {title === "Motivations" && (
                    <textarea
                      maxLength={300}
                      value={motivations}
                      onChange={(e) => setMotivations(e.target.value)}
                      className="w-full h-50 p-2 rounded-lg bg-gray-800 text-white"
                    />
                  )}
                  {title === "Concerns" && (
                    <textarea
                      maxLength={300}
                      value={concerns}
                      onChange={(e) => setConcerns(e.target.value)}
                      className="w-full h-50 p-2 rounded-lg bg-gray-800 text-white"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-300 mt-4">
                  {title === "Bio"
                    ? bio
                    : title === "Goals"
                    ? goals
                    : title === "Motivations"
                    ? motivations
                    : concerns}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
