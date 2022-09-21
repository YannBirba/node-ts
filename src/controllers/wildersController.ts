import { Response, Request } from "express";
import { wildersRepository } from "../repositories/wildersRepository";

export const getWilders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await wildersRepository.find({
    relations: ["upvotes", "upvotes.skill"],
  });
  res.json({
    data: result,
  });
};

export const getWilder = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const result = await wildersRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ["upvotes", "upvotes.skill"],
  });
  if (result === null) {
    res.status(404);
    return res.json({
      message: "Data not found",
    });
  }
  res.json({
    data: result,
  });
};

export const addWilder = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  if (req.body.name === undefined) {
    res.status(500);
    return res.json({
      message: "Please enter a name",
    });
  }
  let result;
  try {
    const wilder = await wildersRepository.create(req.body);
    result = await wildersRepository.save(wilder);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while add wilder",
      error: error.message,
    });
  }
  res.json({
    data: result,
  });
};

export const editWilder = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  if (req.body.name === undefined && req.body.city === undefined) {
    res.status(500);
    return res.json({
      message: "Please enter a name",
    });
  }
  const wilder = await wildersRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (wilder === null) {
    res.status(404);
    return res.json({
      message: "Wilder not found",
    });
  }

  let result;
  try {
    wildersRepository.merge(wilder, req.body);
    result = await wildersRepository.save(wilder);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while trying to add wilder",
      error: error.message,
    });
  }

  res.json({
    data: result,
  });
};

export const deleteWilder = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const wilder = await wildersRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (wilder === null) {
    res.status(404);
    return res.json({
      message: `The wilder with the id : ${req.params.id} does not exist`,
    });
  }
  try {
    await wildersRepository.delete(req.params.id);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while trying to delete a wilder",
      error: error.message,
    });
  }

  res.json({
    message: "Wilder successfully deleted",
  });
};
