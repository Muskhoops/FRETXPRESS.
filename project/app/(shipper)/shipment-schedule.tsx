import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Calendar, Clock } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

type PickupType = 'appointment' | 'after' | null;

export default function ShipmentScheduleScreen() {
  const router = useRouter();
  const [pickupType, setPickupType] = useState<PickupType>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date;
  });

  // Generate time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const formatDate = (date: Date) => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const handleContinue = () => {
    router.push('/(shipper)/payment');
  };

  const isFormValid = pickupType && selectedDate && (pickupType === 'after' || selectedTime);

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
          <Text style={styles.title}>Planifier l'enlèvement</Text>
          <Text style={styles.subtitle}>Choisissez quand le transporteur peut récupérer votre envoi</Text>

          <View style={styles.pickupTypeContainer}>
            <TouchableOpacity
              style={[
                styles.pickupTypeOption,
                pickupType === 'appointment' && styles.selectedPickupType,
              ]}
              onPress={() => setPickupType('appointment')}
            >
              <View style={styles.pickupTypeIcon}>
                <Calendar size={24} color={pickupType === 'appointment' ? Colors.primary.DEFAULT : Colors.text.secondary} />
              </View>
              <View style={styles.pickupTypeContent}>
                <Text style={[
                  styles.pickupTypeTitle,
                  pickupType === 'appointment' && styles.selectedPickupTypeTitle,
                ]}>
                  Sur rendez-vous
                </Text>
                <Text style={styles.pickupTypeDescription}>
                  Choisissez un créneau horaire précis
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pickupTypeOption,
                pickupType === 'after' && styles.selectedPickupType,
              ]}
              onPress={() => setPickupType('after')}
            >
              <View style={styles.pickupTypeIcon}>
                <Clock size={24} color={pickupType === 'after' ? Colors.primary.DEFAULT : Colors.text.secondary} />
              </View>
              <View style={styles.pickupTypeContent}>
                <Text style={[
                  styles.pickupTypeTitle,
                  pickupType === 'after' && styles.selectedPickupTypeTitle,
                ]}>
                  À partir de
                </Text>
                <Text style={styles.pickupTypeDescription}>
                  Disponible à partir d'une date/heure
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {pickupType && (
            <View style={styles.dateContainer}>
              <Text style={styles.sectionTitle}>Date</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateList}
              >
                {dates.map((date, index) => {
                  const formattedDate = formatDate(date);
                  const isSelected = selectedDate && 
                    selectedDate.getDate() === date.getDate() && 
                    selectedDate.getMonth() === date.getMonth();
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dateOption,
                        isSelected && styles.selectedDateOption,
                      ]}
                      onPress={() => setSelectedDate(date)}
                    >
                      <Text style={[
                        styles.dateDay,
                        isSelected && styles.selectedDateText,
                      ]}>
                        {formattedDate.day}
                      </Text>
                      <Text style={[
                        styles.dateNumber,
                        isSelected && styles.selectedDateText,
                      ]}>
                        {formattedDate.date}
                      </Text>
                      <Text style={[
                        styles.dateMonth,
                        isSelected && styles.selectedDateText,
                      ]}>
                        {formattedDate.month}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {pickupType === 'appointment' && selectedDate && (
            <View style={styles.timeContainer}>
              <Text style={styles.sectionTitle}>Heure</Text>
              <View style={styles.timeGrid}>
                {timeSlots.map((time, index) => {
                  const isSelected = selectedTime === time;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeOption,
                        isSelected && styles.selectedTimeOption,
                      ]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Text style={[
                        styles.timeText,
                        isSelected && styles.selectedTimeText,
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {pickupType === 'after' && selectedDate && (
            <View style={styles.afterTimeContainer}>
              <Text style={styles.sectionTitle}>Disponible à partir de</Text>
              <View style={styles.afterTimeRow}>
                <View style={styles.afterTimeBlock}>
                  <Text style={styles.afterTimeLabel}>Date</Text>
                  <Text style={styles.afterTimeValue}>
                    {`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`}
                  </Text>
                </View>
                <View style={styles.afterTimeBlock}>
                  <Text style={styles.afterTimeLabel}>Heure</Text>
                  <View style={styles.afterTimeOptions}>
                    {['08:00', '12:00', '14:00'].map((time, index) => {
                      const isSelected = selectedTime === time;
                      
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.afterTimeOption,
                            isSelected && styles.selectedAfterTimeOption,
                          ]}
                          onPress={() => setSelectedTime(time)}
                        >
                          <Text style={[
                            styles.afterTimeOptionText,
                            isSelected && styles.selectedAfterTimeOptionText,
                          ]}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
              <Text style={styles.afterTimeNote}>
                Votre colis sera disponible à partir de cette date et heure. Le transporteur pourra l'enlever à tout moment après ce créneau.
              </Text>
            </View>
          )}
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
  pickupTypeContainer: {
    marginBottom: Layout.spacing.xl,
  },
  pickupTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.background[100],
  },
  selectedPickupType: {
    borderColor: Colors.primary.DEFAULT,
    backgroundColor: Colors.background[100],
  },
  pickupTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  pickupTypeContent: {
    flex: 1,
  },
  pickupTypeTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: 2,
  },
  selectedPickupTypeTitle: {
    color: Colors.primary.DEFAULT,
  },
  pickupTypeDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.md,
  },
  dateContainer: {
    marginBottom: Layout.spacing.xl,
  },
  dateList: {
    paddingRight: Layout.spacing.xl,
  },
  dateOption: {
    width: 70,
    height: 90,
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  selectedDateOption: {
    backgroundColor: Colors.primary.DEFAULT,
  },
  dateDay: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  dateNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    marginBottom: 2,
  },
  dateMonth: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.secondary,
  },
  selectedDateText: {
    color: Colors.background.DEFAULT,
  },
  timeContainer: {
    marginBottom: Layout.spacing.xl,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Layout.spacing.xs,
  },
  timeOption: {
    width: '30%',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.md,
    alignItems: 'center',
    margin: Layout.spacing.xs,
  },
  selectedTimeOption: {
    backgroundColor: Colors.primary.DEFAULT,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
  },
  selectedTimeText: {
    color: Colors.background.DEFAULT,
  },
  afterTimeContainer: {
    marginBottom: Layout.spacing.xl,
  },
  afterTimeRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  afterTimeBlock: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  afterTimeLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.sm,
  },
  afterTimeValue: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.DEFAULT,
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    textAlign: 'center',
  },
  afterTimeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  afterTimeOption: {
    flex: 1,
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.sm,
    alignItems: 'center',
    marginRight: Layout.spacing.xs,
  },
  selectedAfterTimeOption: {
    backgroundColor: Colors.primary.DEFAULT,
  },
  afterTimeOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
  },
  selectedAfterTimeOptionText: {
    color: Colors.background.DEFAULT,
  },
  afterTimeNote: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    fontStyle: 'italic',
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