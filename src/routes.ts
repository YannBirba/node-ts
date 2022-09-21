import { errorHandler } from "./utils/errorHandler";
import { routePrefix } from "./utils/routePrefix";
// import multer from "multer";
import { addWilder, deleteWilder, editWilder, getWilder, getWilders } from "./controllers/wildersController";
import { addSkill, deleteSkill, editSkill, getSkill, getSkills } from "./controllers/skillsController";
import { addUpvote, deleteUpvote, editUpvote, getUpvote, getUpvotes, upvote } from "./controllers/upvotesController";

// const upload = multer({ dest: "uploads/" });

export const routes = (): void => {
  // Wilders
  routePrefix("wilders", (wilders) => {
    wilders.get("/", errorHandler(getWilders));
    wilders.get("/:id", errorHandler(getWilder));
    wilders.post("/", errorHandler(addWilder));
    wilders.put("/:id", errorHandler(editWilder));
    wilders.delete("/:id", errorHandler(deleteWilder));
  });
  // Skills
  routePrefix("skills", (skills) => {
    skills.get("/", errorHandler(getSkills));
    skills.get("/:id", errorHandler(getSkill));
    skills.post("/", errorHandler(addSkill));
    skills.put("/:id", errorHandler(editSkill));
    skills.delete("/:id", errorHandler(deleteSkill));
  });

  // Upvotes
  routePrefix("upvotes", (upvotes) => {
    upvotes.get("/", errorHandler(getUpvotes));
    upvotes.get("/:id", errorHandler(getUpvote));
    upvotes.post("/", errorHandler(addUpvote));
    upvotes.put("/:id", errorHandler(editUpvote));
    upvotes.delete("/:id", errorHandler(deleteUpvote));
    upvotes.put("/:id/upvote", errorHandler(upvote));
  });
};
