import { upvotesRepository } from "./../repositories/upvotesRepository";
import { Response, Request } from "express";

export const getUpvotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await upvotesRepository.find({
    relations: ["skill", "wilder"],
  });
  res.json({
    data: result,
  });
};

export const getUpvote = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const result = await upvotesRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ["skill", "wilder"],
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

export const addUpvote = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  if (req.body.skillId === undefined || req.body.wilderId === undefined) {
    res.status(500);
    return res.json({
      message: "Please enter a skill id and a wilder id",
    });
  }

  const exitingUpvote = await upvotesRepository.findOne({
    where: {
      skill: { id: parseInt(req.body.skillId) },
      wilder: { id: parseInt(req.body.wilderId) },
    },
    relations: ["wilder", "skill"],
  });

  if (exitingUpvote !== null) {
    res.status(500);
    return res.json({
      message: "The upvote already exist for this skill and this wilder",
    });
  }

  let result;
  try {
    const upvote = await upvotesRepository.create({
      upvote: req.body.upvote !== undefined ? parseInt(req.body.upvote) : 0,
      skill: { id: parseInt(req.body.skillId) },
      wilder: { id: parseInt(req.body.wilderId) },
    });
    result = await upvotesRepository.save(upvote);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while add upvote",
      error: error.message,
    });
  }
  res.json({
    data: result,
  });
};

export const editUpvote = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  if (req.body.upvote === undefined) {
    res.status(500);
    return res.json({
      message: "Please enter a upvote number",
    });
  }

  const upvote = await upvotesRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (upvote === null) {
    res.status(404);
    return res.json({
      message: "Upvote not found",
    });
  }

  let result;
  try {
    upvote.upvote = parseInt(req.body.upvote);
    result = await upvotesRepository.save(upvote);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while trying to add upvote",
      error: error.message,
    });
  }

  res.json({
    data: result,
  });
};

export const deleteUpvote = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const upvote = await upvotesRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  
  if (upvote === null) {
    res.status(404);
    return res.json({
      message: `The upvote with the id : ${req.params.id} does not exist`,
    });
  }

  try {
    await upvotesRepository.delete(req.params.id);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while trying to delete a upvote",
      error: error.message,
    });
  }

  return res.json({
    message: "Upvote successfully deleted",
  });
};

export const upvote = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const upvote = await upvotesRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (upvote === null) {
    res.status(500);
    return res.json({
      message: `No upvote with the id : ${req.params.id}`,
    });
  }

  upvote.upvote += 1;

  try {
    await upvotesRepository.save(upvote);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while saving the upvote",
      error: error.message,
    });
  }

  return res.json({
    message: "Upvote successfully inscreased",
  });
};
