import {connect} from 'mongoose';

const mongodb_url = process.env.DATABASE_HOST || 'mongodb+srv://sergiomelladomartin:CDfrX4D1qn4X3HQt@cluster0.hlswq6y.mongodb.net/test';

connect(mongodb_url).then(() => {
    console.log('Connection to MongoDB server established');
}).catch(() => {
    console.log('Unnable to connect to MongoDB server');
});