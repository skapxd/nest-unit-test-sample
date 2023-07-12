import { Schema } from "mongoose";

import { ILog } from "./types";

export const logSchema = new Schema<ILog>(
  {
    status: Schema.Types.Mixed,
    body: Schema.Types.Mixed,
    headers: Schema.Types.Mixed,
    errorMessage: Schema.Types.Mixed,
    url: Schema.Types.Mixed,
    method: Schema.Types.Mixed,
    cURL: Schema.Types.Mixed,
    log: Schema.Types.Mixed,
    optionalParams: [Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);
