import {Document, Schema, model} from 'mongoose';

export interface Publication extends Document {
    id: string;
    content: {
        text: string;
        media_path: string;
    };
    date: Date;
    fav_count: number;
    comments: [{
        id: string;
        content: string;
    }];
}

const publicationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    content: {
        text: {
            type: String,
            required: true,
            trim: true
        },
        media_path: {
            type: String,
            required: false,
            trim: true
        }
    },

    date: {
        type: Date,
        required: true,
        trim: true
    },

    fav_count: {
        type: Number,
        required: true,
        trim: true
    },

    comments: [{
        id: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        }
    }]
});

export default model<Publication>('Publication', publicationSchema);
