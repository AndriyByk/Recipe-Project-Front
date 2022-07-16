import {IGender} from "../../categories/IGender";
import {IActivityType} from "../../categories/IActivityType";

export interface IUser {

  // об'єкт який відображається на фронті з бази

  id: number;
  login: string;
  password: string;
  avatar: string;
  email:string;
  weight: number;
  height: number;
  dayOfBirth: string;
  genderDto: IGender;
  activityTypeDto: IActivityType;
  name: string;
  lastName: string;
  dateOfRegistration: string;
}
