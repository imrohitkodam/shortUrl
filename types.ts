
export interface Link {
  id: number;
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
}

export interface CreateLinkDto {
  target_url: string;
  code?: string;
}
