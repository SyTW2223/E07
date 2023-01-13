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
  follows: UserInterface[];
  followed_by: UserInterface[];
  publications: PublicationInterface[];
}

const userSchema = new Schema<UserInterface>({
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
  follows: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    required: false,
  },
  followed_by: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    required: false,
  },
  publications: {
    type: [{ type: Schema.Types.ObjectId, ref: "Publication" }],
    required: false,
  },
});

userSchema.pre("validate", function (next) {
  const follows_copy = this.follows;
  //console.log(fav_users_copy);
  if (follows_copy.length === 0) next();
  const lookUp = follows_copy.map((user) => {
    return user.id;
  });
  const isDuplicated = lookUp.some((item, idx) => {
    return lookUp.indexOf(item) != idx;
  });
  if (isDuplicated) {
    next(new Error("The user already follows this user"));
    console.log("The user already follows this user");
  } else next();
});

export default model<UserInterface>("User", userSchema);
