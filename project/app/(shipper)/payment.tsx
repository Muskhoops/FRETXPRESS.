import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Truck, CreditCard, Check } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function PaymentScreen() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'edahabia' | 'cib' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    router.push('/(shipper)/payment-success');
  };

  const isFormValid = paymentMethod && 
    (paymentMethod === 'edahabia' || (cardNumber && expiryDate && cvv));

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

      <ScrollView style={styles.content}>
        <Animated.View entering={FadeIn.duration(800)}>
          <Text style={styles.title}>Paiement</Text>
          <Text style={styles.subtitle}>Choisissez votre méthode de paiement</Text>

          <View style={styles.estimateContainer}>
            <Text style={styles.estimateLabel}>Estimation du transport</Text>
            <Text style={styles.estimateAmount}>800,000 DA</Text>
            <View style={styles.vehicleInfo}>
              <Truck size={20} color={Colors.text.secondary} style={styles.vehicleIcon} />
              <Text style={styles.vehicleText}>Camion (3.5T) - Capacité: 18m³ | 900kg max.</Text>
            </View>
          </View>

          <View style={styles.paymentMethodsContainer}>
            <Text style={styles.sectionTitle}>Méthode de paiement</Text>
            
            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                paymentMethod === 'edahabia' && styles.selectedPaymentMethod,
              ]}
              onPress={() => setPaymentMethod('edahabia')}
            >
              <View style={styles.paymentMethodContent}>
                <View style={styles.paymentMethodHeader}>
                  <Text style={styles.paymentMethodTitle}>Carte Edahabia</Text>
                  {paymentMethod === 'edahabia' && (
                    <View style={styles.checkIcon}>
                      <Check size={16} color={Colors.background.DEFAULT} />
                    </View>
                  )}
                </View>
                <Text style={styles.paymentMethodDescription}>
                  Carte postale algérienne
                </Text>
              </View>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg' }}
                style={styles.paymentMethodImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                paymentMethod === 'cib' && styles.selectedPaymentMethod,
              ]}
              onPress={() => setPaymentMethod('cib')}
            >
              <View style={styles.paymentMethodContent}>
                <View style={styles.paymentMethodHeader}>
                  <Text style={styles.paymentMethodTitle}>Carte CIB</Text>
                  {paymentMethod === 'cib' && (
                    <View style={styles.checkIcon}>
                      <Check size={16} color={Colors.background.DEFAULT} />
                    </View>
                  )}
                </View>
                <Text style={styles.paymentMethodDescription}>
                  Carte interbancaire
                </Text>
              </View>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg' }}
                style={styles.paymentMethodImage}
              />
            </TouchableOpacity>

            {paymentMethod && (
              <View style={styles.cardDetailsContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Numéro de carte</Text>
                  <View style={styles.cardNumberInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="0000 0000 0000 0000"
                      placeholderTextColor={Colors.text.tertiary}
                      keyboardType="numeric"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      maxLength={19}
                    />
                    <CreditCard size={20} color={Colors.text.secondary} />
                  </View>
                </View>

                <View style={styles.cardDetailsRow}>
                  <View style={[styles.inputContainer, styles.halfWidth]}>
                    <Text style={styles.inputLabel}>Date d'expiration</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/AA"
                      placeholderTextColor={Colors.text.tertiary}
                      keyboardType="numeric"
                      value={expiryDate}
                      onChangeText={setExpiryDate}
                      maxLength={5}
                    />
                  </View>
                  <View style={[styles.inputContainer, styles.halfWidth]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor={Colors.text.tertiary}
                      keyboardType="numeric"
                      value={cvv}
                      onChangeText={setCvv}
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sous-total</Text>
              <Text style={styles.summaryValue}>750,000 DA</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frais de service (5%)</Text>
              <Text style={styles.summaryValue}>37,500 DA</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>TVA (19%)</Text>
              <Text style={styles.summaryValue}>12,500 DA</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>800,000 DA</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.payButton,
            !isFormValid && styles.payButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!isFormValid}
        >
          <Text style={styles.payButtonText}>Confirmer et payer</Text>
        </TouchableOpacity>
      </View>
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
  estimateContainer: {
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  estimateLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.xs,
  },
  estimateAmount: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.DEFAULT,
    marginBottom: Layout.spacing.md,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    marginRight: Layout.spacing.xs,
  },
  vehicleText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  paymentMethodsContainer: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.md,
  },
  paymentMethodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.background[100],
  },
  selectedPaymentMethod: {
    borderColor: Colors.primary.DEFAULT,
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  paymentMethodImage: {
    width: 40,
    height: 30,
    borderRadius: 4,
  },
  cardDetailsContainer: {
    backgroundColor: Colors.background[50],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginTop: Layout.spacing.sm,
  },
  inputContainer: {
    marginBottom: Layout.spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.xs,
  },
  cardNumberInput: {
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
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  summaryContainer: {
    marginBottom: Layout.spacing.xxl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.background[200],
    paddingTop: Layout.spacing.md,
    marginTop: Layout.spacing.md,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.DEFAULT,
  },
  footer: {
    padding: Layout.spacing.md,
    backgroundColor: Colors.background[50],
    borderTopWidth: 1,
    borderTopColor: Colors.background[200],
  },
  payButton: {
    backgroundColor: Colors.primary.DEFAULT,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.md,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: Colors.primary[800],
    opacity: 0.6,
  },
  payButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.background.DEFAULT,
  },
});