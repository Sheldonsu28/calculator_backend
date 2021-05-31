/*
 * Created by Sheldon Su
 * Creation Date: 2021-05-31
 * Description: File holding a organization Model
 */

import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

/**
 * Interface that describes the properties required
 * when creating a new organization.
 * This interface allows intellisense and error checking
 * when a organization model is created.
 */
export interface OrganizationProps {
  orgName: string;
  address: String;
  owner: ObjectId;
  isActive: Boolean;
}

/**
 * Interface that describes the properties in a organization
 * document. Required by mongoose.
 */
export type OrganizationDocument = Document<OrganizationProps> & {
  orgName: string;
  address: string;
  owner: ObjectId;
  isActive: Boolean;
  createAt: Date;
  updatedAt: Date;
};

/**
 * Schema used to model organizations. Required by mongoose.
 */
const organizationSchema = new Schema<OrganizationDocument>(
  {
    orgName: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      max: 80,
      min: 3
    },
    address: {
      type: String,
      required: false,
      unique: false,
      lowercase: false,
      max: 80,
      min: 3
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true,
      unique: false,
    },
    isActive:{
      type: Boolean,
      required: true,
    }
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
 * Return a organization document with specified attr.
 * Invoke by calling Organization.build().
 *
 * @param props Properties associating with the Organization
 * @see OrganizationProps
 * @see OrganizationModel
 */
const build = (props: Partial<OrganizationProps>) => {
  return new Organization(props);
};

organizationSchema.static("build", build);

/**
 * Interface that describes attributes associating
 * with the Organization model.
 */
export interface OrganizationModel extends Model<OrganizationDocument> {
  build(props: Partial<OrganizationProps>): OrganizationDocument;
}

export const Organization = mongoose.model<OrganizationDocument, OrganizationModel>("Organization", organizationSchema);
