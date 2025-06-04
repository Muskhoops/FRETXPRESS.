import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

type AccountType = 'personal' | 'business' | null;

export default function RegisterScreen() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>(null);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color={Colors.text.DEFAULT} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DROPIGO</Text>
        <View style={styles.placeholder} />
      </View>

      <Animated.View entering={FadeInDown.duration(800)} style={styles.content}>
        <Text style={styles.title}>Inscription</Text>
        <Text style={styles.subtitle}>Choisissez votre type de compte</Text>

        <View style={styles.accountOptions}>
          <TouchableOpacity
            style={[
              styles.accountOption,
              accountType === 'personal' && styles.selectedAccountOption,
            ]}
            onPress={() => setAccountType('personal')}
          >
            <View style={styles.accountIcon}>
              <Text style={styles.accountIconText}>👤</Text>
            </View>
            <Text style={styles.accountTitle}>Particulier</Text>
            <Text style={styles.accountDescription}>
              Pour envoyer des colis en votre nom propre
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.accountOption,
              accountType === 'business' && styles.selectedAccountOption,
            ]}
            onPress={() => setAccountType('business')}
          >
            <View style={styles.accountIcon}>
              <Text style={styles.accountIconText}>🏢</Text>
            </View>
            <Text style={styles.accountTitle}>Professionnel</Text>
            <Text style={styles.accountDescription}>
              Pour les entreprises, avec badge de confiance
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !accountType && styles.continueButtonDisabled,
          ]}
          disabled={!accountType}
          onPress={() => {
            if (accountType === 'personal') {
              router.push('/(auth)/register-personal');
            } else if (accountType === 'business') {
              router.push('/(auth)/register-business');
            }
          }}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.DEFAULT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
  },
  backButton: {
    padding: Layout.spacing.xs,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    letterSpacing: 1,
  },
  placeholder: {
    width: 28,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xl,
  },
  accountOptions: {
    marginBottom: Layout.spacing.xl,
  },
  accountOption: {
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.background[100],
  },
  selectedAccountOption: {
    borderColor: Colors.primary.DEFAULT,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  accountIconText: {
    fontSize: 24,
  },
  accountTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.xs,
  },
  accountDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  continueButton: {
    backgroundColor: Colors.primary.DEFAULT,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.md,
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.primary[800],
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.background.DEFAULT,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    marginRight: Layout.spacing.xs,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.DEFAULT,
  },
});