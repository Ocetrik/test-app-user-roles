import axios from "axios";

export async function loadUsers(page = 0, count = 5) {
  const response = await axios.get(
    `https://test-js.alef.dev/users?page=${page}&count=${count}`
  );
  return response?.data?.data || [];
}

export async function loadUserInfo(userId) {
  const response = await axios.get(`https://test-js.alef.dev/user/${userId}`);
  return response.data.data;
}

export async function loadRoles() {
  const response = await axios.get("https://test-js.alef.dev/roles");
  return (
    response?.data?.data.map((i, key) => ({
      id: key + 1,
      name: i,
    })) || []
  );
}

export async function setRole(userId, role) {
  const response = await axios.post(
    `https://test-js.alef.dev/user/${userId}/role/${role}`
  );
  return response;
}

export async function deleteRole(userId, role) {
  const response = await axios.delete(
    `https://test-js.alef.dev/user/${userId}/role/${role}`
  );
  return response;
}
