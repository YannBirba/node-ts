import { Response, Request } from "express";
import { skillsRepository } from "../repositories/skillsRepository";

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  const result = await skillsRepository.find();
  res.json({
    data: result,
  });
};

export const getSkill = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  const result = await skillsRepository.findOneBy({
    id: parseInt(req.params.id),
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

export const addSkill = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  if (req.body.name === undefined) {
    res.status(500);
    return res.json({
      message: "Please enter a name",
    });
  }

  const checkName = await skillsRepository.findOneBy({
    name: req.body.name,
  });

  if (checkName !== null) {
    res.status(500);
    return res.json({
      message: `Skill with name ${req.body.name as string} already exist`,
    });
  }
  let result;
  try {
    const skill = await skillsRepository.create(req.body);
    result = await skillsRepository.save(skill);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while add skill",
      error: error.message,
    });
  }
  res.json({
    data: result,
  });
};

export const editSkill = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  if (req.body.name === undefined) {
    res.status(500);
    return res.json({
      message: "Please enter a name",
    });
  }

  const skill = await skillsRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (skill === null) {
    res.status(404);
    return res.json({
      message: "Skill not found",
    });
  }

  const checkName = await skillsRepository.findOneBy({
    name: req.body.name,
  });

  if (checkName !== null) {
    res.status(500);
    return res.json({
      message: `Skill with name ${req.body.name as string} already exist`,
    });
  }

  let result;
  try {
    skillsRepository.merge(skill, req.body);
    result = await skillsRepository.save(skill);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while trying to add skill",
      error: error.message,
    });
  }

  res.json({
    data: result,
  });
};

export const deleteSkill = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  const skill = await skillsRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (skill === null) {
    res.status(404);
    return res.json({
      message: `The Skill with the id : ${req.params.id} does not exist`,
    });
  }

  try {
    await skillsRepository.delete(req.params.id);
  } catch (error: any) {
    res.status(500);
    return res.json({
      message: "Error while trying to delete a skill",
      error: error.message,
    });
  }

  return res.json({
    message: "Skill successfully deleted",
  });
};
