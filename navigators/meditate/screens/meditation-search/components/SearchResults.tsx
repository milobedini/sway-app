import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  mapMeditationTileData,
  MeditationListResponseDataItem,
} from "../../../../../components/meditate-list/mapMeditationTileData";
import { MeditationTile } from "../../../../../components/meditation-tile";
import { designStyles } from "../../../../../components/text";
import { baseUrl } from "../../../../../lib/api/api";
import { shuffle } from "../../../../../lib/shuffle";
import { ThenThrow } from "../../../../../lib/then-throw";
import { meditationGallery } from "../../meditation-menu/gallery/MeditationGallery";

type SearchResultsProps = {
  text: string;
  searched: boolean;
  onPress: (meditationId: number, image: ImageSourcePropType) => void;
};
type SearchResultDataItem = {
  item: MeditationListResponseDataItem;
  index: number;
};
const images = meditationGallery;
const randomisedImages = shuffle([...images]);
export const SearchResults = ({
  text,
  searched,
  onPress,
}: SearchResultsProps): JSX.Element => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const res = await axios.get(`${baseUrl}/meditations/search/?q=${text}`);
      setResults(res.data);
    };
    getResults();
  }, [searched, text]);

  if (results.length > 0) {
    return (
      <FlatList
        data={results}
        renderItem={({ item, index }: SearchResultDataItem) => {
          return (
            <TouchableOpacity
              onPress={() =>
                onPress(
                  Number(item.id),
                  //@ts-expect-error image type
                  randomisedImages[index % randomisedImages.length] ??
                    ThenThrow("Missing meditation id!")
                )
              }
              style={{ marginTop: 16 }}
            >
              <MeditationTile
                key={item.id}
                meditation={mapMeditationTileData(item)}
                image={randomisedImages[index % randomisedImages.length]}
              />
            </TouchableOpacity>
          );
        }}
      >
        <Text style={[designStyles.body]}>Results</Text>
      </FlatList>
    );
  }
  return (
    <Text style={[designStyles.body, { marginTop: 16 }]}>
      No results match {text}
    </Text>
  );
};
