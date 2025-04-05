import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data when the component mounts or when `id` changes
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/v1/getprofiledata`, {
          method: "GET"
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        console.log("Profile data:", data); // Log the response data

        setProfileData(data); // Optionally store the fetched data in state
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [id]); // Only refetch if the `id` changes

  return (
    <div>
      <h1>Update Profile</h1>
      <p>Profile ID: {id}</p>
      <div>
        <h3>Profile Data</h3>
        {/* Optionally display the profile data */}
        {profileData ? (
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;
