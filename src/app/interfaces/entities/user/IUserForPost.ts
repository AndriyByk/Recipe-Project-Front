
export interface IUserForPost {

  // об'єкт який поститься на бек
  // (це той об'єкт який надсилаємо в постмені)

  username: string;
  password: string;
  avatar: string;
  email:string;
  weight: number;
  height: number;
  dayOfBirth: string;
  genderId: number;
  activityTypeId: number;
  name: string;
  lastName: string;
  dateOfRegistration: string;
}
