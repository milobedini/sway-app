import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { MeditationListResponseDataItem } from "../../../../../components/meditate-list/mapMeditationTileData";
import { designStyles } from "../../../../../components/text";
import { baseUrl } from "../../../../../lib/api/api";

type SearchResultsProps = {
  text: string;
  searched: boolean;
};
type SearchResultDataItem = {
  item: MeditationListResponseDataItem;
  index: number;
};
export const SearchResults = ({
  text,
  searched,
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
            <Text key={index} style={[designStyles.body]}>
              {item.name}
            </Text>
          );
        }}
      >
        <Text style={[designStyles.body]}>Results</Text>
      </FlatList>
    );
  }
  return <Text style={[designStyles.body]}>No Results</Text>;
};
