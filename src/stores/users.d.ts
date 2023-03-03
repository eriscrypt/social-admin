interface IUser {
  id: string;
  address: string;
  profile: IProfile;
  createdAt: string;
  updatedAt: string;
}

interface IProfile {
  firstName: string;
  lastName: string;
  balance: string;
  email: string;
  confirmed: boolean;
}

interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
}

interface IPagination {
  page: number;
  next: number | null;
  prev: number | null;
  total: number;
}
