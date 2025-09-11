// lib/auth.ts
interface UserData {
  id?: string;
  ime?: string;
  prezime?: string;
  email: string;
  lokacija: string;
}

export const saveUserToStorage = (userData: UserData) => {
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: userData.id,
      ime: userData.ime,
      prezime: userData.prezime,
      email: userData.email,
      lokacija: userData.lokacija,
      isLoggedIn: true,
    })
  );
};

export const getUserFromStorage = () => {
  const userData = localStorage.getItem("currentUser");
  return userData ? JSON.parse(userData) : null;
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("currentUser");
};

export const isUserLoggedIn = () => {
  return getUserFromStorage() !== null;
};
