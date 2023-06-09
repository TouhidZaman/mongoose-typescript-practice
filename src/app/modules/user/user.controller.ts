import { NextFunction, Request, Response } from "express";
import { createUserToBD, getFemaleUsersFromDB } from "./user.services";
import { IUser } from "./user.interfaces";
import { IResponse } from "../../utils/interfaces";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUserToBD(req.body);

    //getFullName is now available after adding instance method to our userSchema
    const fullName = user.getFullName();

    const response: IResponse<IUser> = {
      status: "success",
      message: `User ${fullName} created successfully`,
      data: user,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: IResponse<string> = {
      status: "fail",
      message: "failed to create user",
      data: error.message,
    };
    res.status(400).json(response);
    next(error);
  }
};

export const getFemaleUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const femaleUsers = await getFemaleUsersFromDB();

    //getFullName is now available after adding instance method to our userSchema
    const fullName = femaleUsers[0].getFullName() || "No One";

    const response: IResponse<IUser[]> = {
      status: "success",
      message: `${fullName} is the first female user`,
      data: femaleUsers,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: IResponse<string> = {
      status: "fail",
      message: "failed to get female users",
      data: error.message,
    };
    res.status(400).json(response);
    next(error);
  }
};
