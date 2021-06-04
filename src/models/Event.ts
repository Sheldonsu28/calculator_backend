/*
 * Created by Sheldon Su
 * Creation Date: 2021-05-31
 * Description: File holding an event Model
 */

import mongoose, { Schema, Document, Model, ObjectId, mongo } from "mongoose";

export interface EventProps {
  eventName: String;
  description: String;
  detail: String;
  organizer: ObjectId;
  organization: ObjectId;
  //status can be one of draft/open/closed/completed
  status: String;
  startDate: Date;
  endDate: Date;
}

export type EventDocument = Document<EventProps> & {
  eventName: String;
  description: String;
  detail: String;
  organizer: ObjectId;
  organization: ObjectId;
  //status can be one of draft/open/closed/completed
  status: String;
  startDate: Date;
  endDate: Date;
  creatAt: Date;
  updateAt: Date;
};

/**
 * Schema used to model events. Required by mongoose.
 */

const eventSchema = new Schema<EventDocument>(
  {
    eventName: {
      type: String,
      required: true,
      max: 80,
      min: 10,
    },
    description: {
      type: String,
      max: 150,
    },
    detail: {
      type: String,
      required: true,
      max: 1000,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    status: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      reqired: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      versionKey: false,
    },
  }
);

/**
 * Return a event document with specified attr.
 * Invoke by calling Event.build().
 *
 * @param props Properties associating with the event
 * @see EventProps
 * @see EventModel
 */
const build = (props: Partial<EventProps>) => {
  return new Event(props);
};

eventSchema.static("build", build);

/**
 * Interface that describes attributes associating
 * with the Event model.
 */
export interface EventModel extends Model<EventDocument> {
  build(props: Partial<EventProps>): EventDocument;
}

export const Event = mongoose.model<EventDocument, EventModel>(
  "Event",
  eventSchema
);
