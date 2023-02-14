import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-native-modal";

import { TabBarButton } from "./components";
import { MainNavigatorParamList } from "./MainNavigatorParamsList";
import { Colours } from "../../colours";
import { HomeIcon } from "../../components/icons/HomeIcon";
import { LearnIcon } from "../../components/icons/LearnIcon";
import { MediateIcon } from "../../components/icons/MeditateIcon";
import { MoreInfoIcon } from "../../components/icons/MoreInfoIcon";
import { TimerIcon } from "../../components/icons/TimerIcon";
import { HomeNavigator } from "../home";
import { LearnNavigator } from "../learn";
import { MeditateNavigator } from "../meditate";
import { MoreInfoNavigator } from "../more-info";
import { TimerNavigator } from "../timer";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import {
  setLatestMeditation,
  setMeditations,
} from "../../lib/redux/actions/meditationsActions";
import { baseUrl, secureGet } from "../../lib/api/api";
import { setArticles } from "../../lib/redux/actions/feedActions";
import { PostListResponseDataItem } from "../learn/screens/feed/components";
import { getUserId } from "../../lib/auth/auth";
import { setProfile } from "../../lib/redux/actions/profileActions";
import { LoadingIndicator } from "../../components/loading-animation";

const Tab = createBottomTabNavigator<MainNavigatorParamList>();

export const SmallMainNavigator = (): JSX.Element => {
  const { bottom } = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);

  const meditations = useAppSelector(
    (state) => state.allMeditations.meditations
  );
  const articles = useAppSelector((state) => state.allArticles.articles);
  // @ts-expect-error redux.
  const user = useAppSelector((state) => state.userProfile.profile);
  const latestMeditation = useAppSelector(
    // @ts-expect-error redux.
    (state) => state.latestMeditation.latestMeditation
  );
  const dispatch = useAppDispatch();

  //  APP SETUP - REFACTOR
  useEffect(() => {
    // Load meditations in to redux state.
    const getMeditations = async () => {
      const res = await axios.get(`${baseUrl}/meditations/`);
      dispatch(setMeditations(res.data));
    };

    // Load meditations if not loaded
    if (!meditations || meditations.length === 0) {
      getMeditations();
    }
    // Load articles in to redux state.
    const getArticles = async () => {
      try {
        const res = await axios.get(`${baseUrl}/feed/`);
        dispatch(
          setArticles(
            res.data.filter(
              (post: PostListResponseDataItem) => post.category === "Articles"
            )
          )
        );
      } catch (err) {
        return err;
      }
    };

    // Load articles if not loaded
    if (!articles || articles.length === 0) {
      getArticles();
    }

    // Load profile in to redux state.
    const getProfile = async () => {
      const config = await secureGet(
        `${baseUrl}/auth/profile/${await getUserId()}/`
      );
      try {
        const res = await axios(config);
        dispatch(setProfile(res.data));
      } catch (err) {
        return err;
      }
    };

    // Check logged in user to compare to redux state.
    const getCurrentUser = async () => {
      const currentUserId = await getUserId();
      return currentUserId;
    };
    if (!user || getCurrentUser() !== user.id) {
      getProfile();
    }

    // Load profile if not loaded, or if user has changed.
    if (!user || getCurrentUser() !== user.id) {
      getProfile();
    }

    // Load latest meditation
    const checkLatest = async () => {
      const res = await axios.get(`${baseUrl}/meditations/latest/`);
      try {
        dispatch(setLatestMeditation(res.data));
      } catch (err) {
        return err;
      }
    };

    if (!latestMeditation) {
      checkLatest();
    }

    // Remove loader after max 2.5 seconds regardless. This should be used to load all content. Timeout for now.

    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      <Modal
        isVisible={loading}
        animationOut="fadeOutDown"
        animationIn={"fadeIn"}
        animationInTiming={1000}
        animationOutTiming={2000}
        style={{ flex: 1, width: "100%", margin: 0, padding: 0 }}
      >
        <LoadingIndicator marginBottom={0} />
      </Modal>
      {!loading ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: Colours.dark.$,
              borderTopColor: Colours.bright.$,
              paddingTop: 4,
              paddingBottom: bottom ? bottom / 2 : 8,
              height: 76 + bottom / 2,
              borderTopWidth: 2,
              shadowOpacity: 0.3,
              shadowColor: Colours.white.$,
              shadowRadius: 36,
              shadowOffset: { width: 0, height: 6 },
            },
          }}
        >
          <Tab.Screen
            name="home"
            component={HomeNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarButton icon={HomeIcon} focussed={focused} />
              ),
            }}
          />
          {/* Meditate */}
          <Tab.Screen
            name="meditate"
            component={MeditateNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarButton icon={MediateIcon} focussed={focused} />
              ),
            }}
          />
          {/* Timer */}
          <Tab.Screen
            name="timer"
            component={TimerNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarButton icon={TimerIcon} focussed={focused} />
              ),
            }}
          />
          {/* Notes, Articles & Community aka Learn */}
          <Tab.Screen
            name="learn"
            component={LearnNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarButton icon={LearnIcon} focussed={focused} />
              ),
            }}
          />
          {/* Show More - Progress, Help, Logout aka More*/}
          <Tab.Screen
            name="more-info"
            component={MoreInfoNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarButton icon={MoreInfoIcon} focussed={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : null}
    </>
  );
};
