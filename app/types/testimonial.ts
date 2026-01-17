export type TestimonialType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  clientName: string;
  clientDesignation: string | null;
  clientCompany: string | null;
  clientImage: string | null;
  review: string;
};
