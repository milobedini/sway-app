export type PostTileData = {
  id?: number;
  author?: string;
  created_at?: string | Date | undefined;
  title?: string;
  views?: number;
  text?: string;
  category?: string;
  comments?: [];
  onPress?: () => void;
};
