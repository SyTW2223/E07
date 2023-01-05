import { Document, Schema, model } from "mongoose";
import User from "./user";
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
      id: string;
      content: string;
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
      id: {
        type: String,
        required: false,
        trim: true,
      },
      content: {
        type: String,
        required: false,
        trim: true,
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
