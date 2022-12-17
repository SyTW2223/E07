import { Document, Schema, model } from "mongoose";

export interface UserInterface extends Document {
  date: Date;
  username: string;
  avatar_path: string;
  email: string;
  password: string;
  lastlogin: Date;
  personalInfo: {
    firstname: string;
    lastname: string;
    birthdate: Date;
  };
  stats: {
    follower_count: number;
    following_count: number;
    publication_counter: number;
  };
  publications: string[];
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

  avatar_path: {
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

  lastlogin: {
    type: Date,
    required: false,
    trim: true,
  },

  personalInfo: {
    firstname: {
      type: String,
      required: false,
      trim: true,
    },
    lastname: {
      type: String,
      required: false,
      trim: true,
    },
    birthdate: {
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
    type: [String],
    required: false,
    trim: true,
  },
});

export default model<UserInterface>("User", UserSchema);
