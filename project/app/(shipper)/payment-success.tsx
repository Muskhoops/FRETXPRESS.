import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated as RNAnimated } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Check } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const checkmarkScale = new RNAnimated.Value(0);
  const checkmarkOpacity = new RNAnimated.Value(0);

  useEffect(() => {
    RNAnimated.sequence([
      RNAnimated.timing(checkmarkScale, {
        toValue: 1.2,
        duration: 400,
        useNativeDriver: true,
      }),
      RNAnimated.spring(checkmarkScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    RNAnimated.timing(checkmarkOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

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

      <View style={styles.content}>
        <Animated.View entering={FadeIn.duration(800)} style={styles.successContainer}>
          <Text style={styles.successTitle}>Payment</Text>
          <Text style={styles.successTitleHighlight}>Successful</Text>
          
          <Animated.Text entering={FadeInDown.delay(300).duration(500)} style={styles.orderText}>
            Your order number is
          </Animated.Text>
          
          <Animated.Text entering={FadeInDown.delay(600).duration(500)} style={styles.orderNumber}>
            3257-9821
          </Animated.Text>
          
          <View style={styles.checkmarkContainer}>
            <RNAnimated.View
              style={[
                styles.checkmarkCircle,
                {
                  opacity: checkmarkOpacity,
                  transform: [{ scale: checkmarkScale }],
                },
              ]}
            >
              <Check size={48} color={Colors.text.DEFAULT} strokeWidth={3} />
            </RNAnimated.View>
          </View>
          
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              <Text style={styles.logoHighlight}>D</Text>
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.doneButtonText}>Got it!</Text>
          </TouchableOpacity>
        </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
  },
  successContainer: {
    width: '100%',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    textAlign: 'center',
  },
  successTitleHighlight: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.DEFAULT,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  orderText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.DEFAULT,
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  orderNumber: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    textAlign: 'center',
    marginBottom: Layout.spacing.xxl,
  },
  checkmarkContainer: {
    marginBottom: Layout.spacing.xxl,
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: Layout.spacing.xxl,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
  },
  logoHighlight: {
    color: Colors.primary.DEFAULT,
  },
  doneButton: {
    backgroundColor: Colors.primary.DEFAULT,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.background.DEFAULT,
  },
});