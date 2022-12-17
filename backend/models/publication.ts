import { Document, Schema, model } from "mongoose";

export interface PublicationInterface extends Document {
  content: {
    text: string;
    media_path: string;
  };
  date: Date;
  fav_count: number;
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

  date: {
    required: true,
    type: Date,
    trim: true,
  },

  fav_count: {
    type: Number,
    trim: true,
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

export default model<PublicationInterface>("Publication", publicationSchema);
