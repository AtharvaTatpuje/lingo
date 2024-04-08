import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2e4jWheE7r7DqFyePoe7F2G4dTq",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
