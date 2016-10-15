import mongoose from 'mongoose';
import config from './'

mongoose.connect(config.mongoose.uri, config.mongoose.options);

export default mongoose;
