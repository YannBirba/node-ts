import { Response, Request } from "express";

export const errorHandler = (controllerAction: Function) => {
  return async (req: Request, res: Response) => {
    try {
      await controllerAction(req, res);
    } catch (error: any) {
      console.error("Error", error);
      res.status(500).json({
        message: `Error occured in controller function ${controllerAction.name}`,
        error: error.message,
      });
    }
  };
};
