import { Document, Schema, model } from "mongoose";
import { PublicationInterface } from "./publication";

export interface UserInterface extends Document {
  date: Date;
  username: string;
  pfp_url: string;
  email: string;
  password: string;
  lastLogin: Date;
  personalInfo: {
    firstName: string;
    lastName: string;
    birthDate: Date;
  };
  stats: {
    follower_count: number;
    following_count: number;
    publication_counter: number;
  };
  publications: PublicationInterface[];
}

const UserSchema = new Schema<UserInterface>({
  date: {
    type: Date,
    required: false,
    trim: true,
  },

  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  pfp_url: {
    type: String,
    required: false,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
      },
    },
  },

  lastLogin: {
    type: Date,
    required: false,
    trim: true,
  },

  personalInfo: {
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: false,
      trim: true,
    },
  },

  stats: {
    follower_count: {
      type: Number,
      required: false,
      trim: true,
    },
    following_count: {
      type: Number,
      required: false,
      trim: true,
    },
    publication_counter: {
      type: Number,
      required: false,
      trim: true,
    },
  },

  publications: {
    type: [{ type: Schema.Types.ObjectId, ref: "Publication" }],
    required: false,
  },
});
export default model<UserInterface>("User", UserSchema);
