import { Document } from 'mongoose';
import { IBlog } from "../../src/models/Blog";

declare module "express-serve-static-core" {
  export interface Response {
    blog?: IBlog & Document;
  }
}
