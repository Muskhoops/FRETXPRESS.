import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Plus, Package, Truck, ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function ShipmentDetailsScreen() {
  const router = useRouter();
  const [volume, setVolume] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [palletCount, setPalletCount] = useState('');

  const handleContinue = () => {
    router.push('/(shipper)/shipment-schedule');
  };

  const isFormValid = volume && weight;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
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

      <ScrollView style={styles.content}>
        <Animated.View entering={FadeIn.duration(800)}>
          <Text style={styles.title}>Détails de l'envoi</Text>
          <Text style={styles.subtitle}>Veuillez renseigner les détails de votre palette</Text>

          <View style={styles.formContainer}>
            <View style={styles.formRow}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Volume</Text>
                <View style={styles.inputWithUnit}>
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="numeric"
                    value={volume}
                    onChangeText={setVolume}
                  />
                  <Text style={styles.unitText}>m³</Text>
                </View>
              </View>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Poids</Text>
                <View style={styles.inputWithUnit}>
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                  />
                  <Text style={styles.unitText}>kg</Text>
                </View>
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.inputContainer, styles.thirdWidth]}>
                <Text style={styles.inputLabel}>Longueur</Text>
                <View style={styles.inputWithUnit}>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="numeric"
                    value={length}
                    onChangeText={setLength}
                  />
                  <Text style={styles.unitText}>cm</Text>
                </View>
              </View>
              <View style={[styles.inputContainer, styles.thirdWidth]}>
                <Text style={styles.inputLabel}>Largeur</Text>
                <View style={styles.inputWithUnit}>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="numeric"
                    value={width}
                    onChangeText={setWidth}
                  />
                  <Text style={styles.unitText}>cm</Text>
                </View>
              </View>
              <View style={[styles.inputContainer, styles.thirdWidth]}>
                <Text style={styles.inputLabel}>Hauteur</Text>
                <View style={styles.inputWithUnit}>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                  />
                  <Text style={styles.unitText}>cm</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.otherOptionsButton}
              onPress={() => setShowOtherOptions(!showOtherOptions)}
            >
              <Text style={styles.otherOptionsText}>+ Options supplémentaires</Text>
            </TouchableOpacity>

            {showOtherOptions && (
              <View style={styles.otherOptionsContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Nombre de palettes</Text>
                  <View style={styles.inputWithUnit}>
                    <TextInput
                      style={styles.input}
                      placeholder="1"
                      placeholderTextColor={Colors.text.tertiary}
                      keyboardType="numeric"
                      value={palletCount}
                      onChangeText={setPalletCount}
                    />
                    <Text style={styles.unitText}>unités</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.vehicleContainer}>
            <Text style={styles.vehicleTitle}>Véhicule recommandé</Text>
            <View style={styles.vehicleCard}>
              <View style={styles.vehicleIcon}>
                <Truck size={24} color={Colors.text.DEFAULT} />
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleType}>Camion (jusqu'à 3.5T)</Text>
                <Text style={styles.vehicleCapacity}>Capacité: 18m³ | 900kg max.</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.secondary} />
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !isFormValid && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!isFormValid}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingTop: Layout.spacing.md,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xl,
  },
  formContainer: {
    marginBottom: Layout.spacing.xl,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  inputContainer: {
    marginBottom: Layout.spacing.md,
  },
  halfWidth: {
    width: '48%',
  },
  thirdWidth: {
    width: '31%',
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.xs,
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    fontSize: 16,
    color: Colors.text.DEFAULT,
    fontFamily: 'Poppins-Regular',
  },
  unitText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  otherOptionsButton: {
    marginBottom: Layout.spacing.md,
  },
  otherOptionsText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary.DEFAULT,
  },
  otherOptionsContainer: {
    backgroundColor: Colors.background[50],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  vehicleContainer: {
    marginBottom: Layout.spacing.xxl,
  },
  vehicleTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.md,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleType: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    marginBottom: 2,
  },
  vehicleCapacity: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  footer: {
    padding: Layout.spacing.md,
    backgroundColor: Colors.background[50],
    borderTopWidth: 1,
    borderTopColor: Colors.background[200],
  },
  continueButton: {
    backgroundColor: Colors.primary.DEFAULT,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.md,
    alignItems: 'center',
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
});