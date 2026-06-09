import mongoose, { Document, Schema } from 'mongoose';

export interface ITestModel extends Document {
  name: string;
  createdAt: Date;
}

const TestModelSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure the model is not re-compiled if it is already in mongoose.models
const TestModel = mongoose.models.TestModel || mongoose.model<ITestModel>('TestModel', TestModelSchema);

export default TestModel;
