import mongoose, { Schema, Document } from 'mongoose';

export interface IOption {
  _id: string;
  key: string;
  label: string;
  select: string[];
}

export interface IQuestionnaire extends Document {
  _id: string;
  options: IOption[];
}

const OptionSchema = new Schema<IOption>({
  key: { type: String, required: true },
  label: { type: String, required: true },
  select: { type: [String], required: true },
});

const QuestionnaireSchema = new Schema<IQuestionnaire>({
  options: { type: [OptionSchema], required: true },
});

const Questionnaire = mongoose.models.Questionnaire || mongoose.model<IQuestionnaire>('Questionnaire', QuestionnaireSchema);

export default Questionnaire;
