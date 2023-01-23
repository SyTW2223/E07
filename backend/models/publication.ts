import { Document, Schema, model } from "mongoose";
import { UserInterface } from "./user";

export interface PublicationInterface extends Document {
  content: {
    text: string;
    media_path: string;
  };
  owner_username: string;
  date: Date;
  fav_users: UserInterface[];
  comments: [
    {
      user: UserInterface;
      text: string;
    }
  ];
}

const publicationSchema = new Schema<PublicationInterface>({
  content: {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    media_path: {
      type: String,
      required: false,
      trim: true,
    },
  },
  owner_username: {
    required: true,
    type: String,
    trim: true,
  },

  date: {
    required: true,
    type: Date,
    trim: true,
  },
  fav_users: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: {
        type: String,
        required: true,
        trim: false,
      },
    },
  ],
});

publicationSchema.pre("validate", function (next) {
  const fav_users_copy = this.fav_users;
  //console.log(fav_users_copy);
  if (fav_users_copy.length === 0) next();
  const lookUp = fav_users_copy.map((user) => {
    return user.id;
  });
  const isDuplicated = lookUp.some((item, idx) => {
    return lookUp.indexOf(item) != idx;
  });
  if (isDuplicated) {
    next(new Error("The user has already liked"));
    console.log("The user has already liked");
  } else next();
});

export default model<PublicationInterface>("Publication", publicationSchema);
