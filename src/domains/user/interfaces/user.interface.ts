export interface UserData {
  id: number;
  name: string;
  email: string;
  channelId: string;
  platform: string;
  role: string;
  provider: string;
  accessToken: string;
  phone: string;
  birthday: string;
  isCertification: boolean;
  isTerms: boolean;
  isPrivacy: boolean;
  isWork: boolean;
  isPush: boolean;
  pushToken: string;
}

export interface SpaceObject {
  id: number;
  type: string;
  category_id: number;
  thumbnail: string;
  filename: string;
  bundle_key: string;
  asset_keys: string[];
  assetbundle_update_dt: number;
  thumbnail_update_dt: number;
}

export interface SpaceObjectCategory {
  id: string;
  subcategory: number;
  icon: string;
  name: string;
  description: string;
  depth: number;
  parent_id: number;
  thumbnail: string;
  type: number;
  thumbnailUpAt: number;
  upAt: number;
}

export interface PresetObject {
  id: string;
  name: string;
  thumbnail: string;
  thumbnailUpAt: number;
  upAt: number;
}

export interface SpaceObjectList {
  id: string;
  subcategory: number;
  icon: string;
  name: string;
  description: string;
  depth: number;
  parent_id: number;
  thumbnail: string;
  type: number;
  thumbnailUpAt: number;
  upAt: number;
}
