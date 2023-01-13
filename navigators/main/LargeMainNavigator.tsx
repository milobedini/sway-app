import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer'
import { useWindowDimensions } from 'react-native'
import { Colours } from '../../colours'
import { HomeIcon } from '../../components/icons'
import { HomeNavigator } from '../home'
import { MainNavigatorParamList } from './MainNavigatorParamsList'
const Drawer = createDrawerNavigator<MainNavigatorParamList>()

export const LargeMainNavigator = (): JSX.Element => {
  const { width } = useWindowDimensions()

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: 'permanent',
        drawerStyle: {
          width: width >= 800 ? 216 : 100,
          borderRightWidth: 0,
          shadowOpacity: 0.3,
          shadowColor: Colours.bright.$,
          shadowRadius: 36,
          shadowOffset: { width: 0, height: 6 },
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="home"
        component={HomeNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size: iconSize }) => (
            <HomeIcon fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}
