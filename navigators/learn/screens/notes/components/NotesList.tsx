import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

import { Colours } from "../../../../../colours";
import { baseUrl, secureGet } from "../../../../../lib/api/api";
import { mapNotesTileData } from "./mapNotesTileData";
import { NoteTile } from "./NoteTile";

const styles = StyleSheet.create({
  noteList: { marginHorizontal: 14 },
  tile: { backgroundColor: Colours.yellowNote.$, marginBottom: 12 },
  newTile: {
    backgroundColor: "pink",
  },
  notes: { marginTop: 45 },
});

export type NotesListProps = Omit<ScrollViewProps, "children"> & {
  // onPress: (noteId: number) => void;
  noteAdded: boolean;
  setActive: (x: boolean) => void;
};

export const NotesList = ({
  noteAdded,
  setActive,
  ...rest
}: NotesListProps): JSX.Element => {
  const { width } = useWindowDimensions();

  const [inProgress, setInProgress] = useState(true);
  const [notes, setNotes] = useState([]);
  const [noteDeleted, setNoteDeleted] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const config = await secureGet(`${baseUrl}/notes/`);
      try {
        const res = await axios(config);
        setNotes(res.data.reverse());
      } catch (err) {
        return err;
      }
    };
    getNotes();
    setInProgress(false);
    // Note to delete in [] below
  }, [noteAdded, noteDeleted]);

  const numColumns = useMemo(() => {
    if (width <= 480) return 1;
    if (width <= 800) return 2;
    return Math.floor((width - 346) / 370);
  }, [width]);

  if (notes) {
    return (
      <Animated.FlatList
        style={styles.noteList}
        contentContainerStyle={[styles.notes]}
        data={notes}
        keyExtractor={(note: { id: number }) => String(note.id)}
        contentInsetAdjustmentBehavior="automatic"
        numColumns={numColumns}
        key={numColumns}
        refreshControl={
          <RefreshControl
            refreshing={inProgress}
            tintColor={Colours.dark.$}
            colors={[Colours.dark.$]}
          />
        }
        renderItem={(note) => (
          <NoteTile
            key={note.item.id}
            onPress={() => setActive(false)}
            style={styles.tile}
            note={mapNotesTileData(note.item)}
            setNoteDeleted={setNoteDeleted}
          />
        )}
        {...rest}
      ></Animated.FlatList>
    );
  }

  return <View style={{ backgroundColor: Colours.dark.$, flex: 1 }}></View>;
};
