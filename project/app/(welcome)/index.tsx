import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const router = useRouter();
  useFrameworkReady();
  
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background with blur effect */}
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg' }}
        style={styles.backgroundImage}
      >
        <BlurView intensity={60} style={StyleSheet.absoluteFill} tint="dark" />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={StyleSheet.absoluteFill}
        />
        
        <View style={styles.contentContainer}>
          {/* Logo */}
          <Animated.View entering={FadeIn.delay(300).duration(1000)} style={styles.logoContainer}>
            <Text style={styles.logoText}>
              DROPI<Text style={styles.logoHighlight}>GO</Text>
            </Text>
          </Animated.View>
          
          {/* Slogan */}
          <Animated.View entering={FadeInDown.delay(800).duration(1000)}>
            <Text style={styles.slogan}>Un Dépôt, Un Pro, Tout est Réglo</Text>
          </Animated.View>
          
          {/* Auth Buttons */}
          <Animated.View entering={FadeInDown.delay(1200).duration(1000)} style={styles.authButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.primaryButtonText}>Se connecter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.secondaryButtonText}>S'inscrire</Text>
            </TouchableOpacity>
          </Animated.View>
          
          {/* Footer Links */}
          <Animated.View entering={FadeInDown.delay(1500).duration(1000)} style={styles.footerLinks}>
            <Link href="/(support)/help" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>J'ai besoin d'aide</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/(support)/about" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>À propos</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.DEFAULT,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
  },
  logoContainer: {
    marginBottom: Layout.spacing.xl,
  },
  logoText: {
    fontSize: 42,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    letterSpacing: 2,
  },
  logoHighlight: {
    color: Colors.primary.DEFAULT,
  },
  slogan: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    textAlign: 'center',
    marginBottom: Layout.spacing.xxl,
  },
  authButtons: {
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  primaryButton: {
    backgroundColor: Colors.primary.DEFAULT,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  primaryButtonText: {
    color: Colors.background.DEFAULT,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary.DEFAULT,
  },
  secondaryButtonText: {
    color: Colors.primary.DEFAULT,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: Layout.spacing.xxl,
  },
  footerLink: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
});