import { model } from "mongoose";

import { logSchema } from "./Log.schema";
import { ILog } from "./types";

export const logModel = model<ILog>("Log", logSchema);
