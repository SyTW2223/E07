import {connect} from 'mongoose';

const mongodb_url = process.env.DATABASE_HOST || 'mongodb://localhost:27017/test';

connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connection to MongoDB server established');
}).catch(() => {
    console.log('Unnable to connect to MongoDB server');
});