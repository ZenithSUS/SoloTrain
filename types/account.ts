// Account interface
export type Account = {
  _id: string;
  email: string;
  password: string;
  status: "active" | "inactive" | "deleted";
  createdAt: Date;
  lastLogin?: Date | null;
};

export type CreateAccount = Omit<
  Account,
  "_id" | "createdAt" | "lastLogin" | "status"
>;

export type LoginAccount = Pick<Account, "email" | "password">;
