import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../src/theme';
import { useGameStore } from '../src/store/useGameStore';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PressStart2P: PressStart2P_400Regular,
  });
  const router = useRouter();
  const segments = useSegments();
  const hydrated = useGameStore((state) => state.hydrated);
  const hasOnboarded = useGameStore((state) => state.hasOnboarded);
  const hydrate = useGameStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!fontsLoaded || !hydrated) {
      return;
    }
    const inOnboarding = segments[0] === 'onboarding';
    if (!hasOnboarded && !inOnboarding) {
      router.replace('/onboarding');
    }
    if (hasOnboarded && inOnboarding) {
      router.replace('/(tabs)/today');
    }
  }, [fontsLoaded, hydrated, hasOnboarded, router, segments]);

  if (!fontsLoaded || !hydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
