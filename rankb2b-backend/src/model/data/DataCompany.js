import mongoose from 'mongoose';
import { getDataConnection } from '../../config/dataDb.js';

const dataCompanySchema = new mongoose.Schema(
  {
    key: { type: String, required: true }, // li:<linkedin id>, else domain, else slug|industry|city
    linkedinId: String,
    importIds: [mongoose.Schema.Types.ObjectId], // upload files that contributed to this record
    partners: [String],
    services: [String],
    name: { type: String, required: true },
    nameLower: { type: String, required: true },
    slug: { type: String, required: true },
    domain: String,
    website: String,
    employees: Number,
    industry: String,
    industrySlug: { type: String, required: true },
    logo: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    street: String,
    city: String,
    citySlug: { type: String, required: true },
    state: String,
    country: String,
    countrySlug: String,
    postalCode: String,
    address: String,
    keywords: [String],
    technologies: [String],
    sic: String,
    naics: String,
    description: String,
    foundedYear: Number,
  },
  { timestamps: true }
);

dataCompanySchema.index({ key: 1 }, { unique: true });
dataCompanySchema.index({ linkedinId: 1 }, { sparse: true });
dataCompanySchema.index({ importIds: 1 });
dataCompanySchema.index({ industrySlug: 1, citySlug: 1, slug: 1 }, { unique: true });
dataCompanySchema.index({ nameLower: 1 });
dataCompanySchema.index({ industrySlug: 1, _id: 1 });
dataCompanySchema.index({ countrySlug: 1, _id: 1 });
dataCompanySchema.index({ citySlug: 1, _id: 1 });
dataCompanySchema.index({ employees: 1 });
dataCompanySchema.index({ foundedYear: 1 });

const conn = getDataConnection();
export default conn.models.DataCompany || conn.model('DataCompany', dataCompanySchema);
