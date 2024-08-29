import apiService from "../services/apiService";
import { getUserId } from "../lib/actions";
import EditProfileForm from "../components/forms/EditProfileForm";

const UserProfile = async () => {
  const userId = await getUserId();
  const response = await apiService.get(`/api/auth/user/${userId}`);

  return <EditProfileForm userData={response.data} />;
};

export default UserProfile;
