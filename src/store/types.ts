enum GlobalTypes {
  SAVE_TOKEN = "SAVE_TOKEN"
}

enum ModulesName {
  user = "user"
}

import {
  UserGetters,
  UserMutations,
  UserActions,
  UserTypes
} from "./modules/user_types";

export {
  ModulesName,
  GlobalTypes,
  UserGetters,
  UserMutations,
  UserActions,
  UserTypes
};
