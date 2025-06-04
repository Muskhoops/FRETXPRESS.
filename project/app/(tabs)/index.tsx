import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { Package, Truck, Truck as TruckFast, Warehouse, ThermometerSnowflake, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

type ShipmentType = 'package' | 'pallet' | 'dangerous' | 'fresh' | 'container';

interface ShipmentOption {
  id: ShipmentType;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function ShipmentScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<ShipmentType | null>(null);
  
  const shipmentOptions: ShipmentOption[] = [
    {
      id: 'package',
      title: 'Colis',
      icon: <Package size={24} color={Colors.text.DEFAULT} />,
      description: 'Envoyez des colis de toutes tailles',
    },
    {
      id: 'pallet',
      title: 'Palettes',
      icon: <Warehouse size={24} color={Colors.text.DEFAULT} />,
      description: 'Transport de palettes standards',
    },
    {
      id: 'dangerous',
      title: 'Produits Dangereux',
      icon: <AlertTriangle size={24} color={Colors.text.DEFAULT} />,
      description: 'Transport sécurisé de matières dangereuses',
    },
    {
      id: 'fresh',
      title: 'Produits Frais',
      icon: <ThermometerSnowflake size={24} color={Colors.text.DEFAULT} />,
      description: 'Livraison réfrigérée pour produits périssables',
    },
    {
      id: 'container',
      title: 'Conteneurs',
      icon: <Truck size={24} color={Colors.text.DEFAULT} />,
      description: 'Transport de conteneurs standards',
    },
  ];

  const handleSelectType = (type: ShipmentType) => {
    setSelectedType(type);
    router.push('/(shipper)/shipment-details');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>
          DROPI<Text style={styles.headerHighlight}>GO</Text>
        </Text>
        <View style={styles.headerProfile}>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <Animated.View entering={FadeIn.duration(800)} style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bonjour, Mehdi</Text>
          <Text style={styles.welcomeSubtext}>Que souhaitez-vous expédier aujourd'hui?</Text>
        </Animated.View>
        
        <View style={styles.shipmentOptions}>
          {shipmentOptions.map((option, index) => (
            <Animated.View 
              key={option.id}
              entering={FadeInRight.delay(300 + index * 100).duration(500)}
            >
              <TouchableOpacity
                style={[
                  styles.shipmentOption,
                  selectedType === option.id && styles.selectedShipmentOption,
                ]}
                onPress={() => handleSelectType(option.id)}
              >
                <View style={styles.shipmentIconContainer}>
                  {option.icon}
                </View>
                <View style={styles.shipmentTextContainer}>
                  <Text style={styles.shipmentTitle}>{option.title}</Text>
                  <Text style={styles.shipmentDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        
        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>Expéditions récentes</Text>
          
          <TouchableOpacity style={styles.recentItem}>
            <View style={styles.recentItemIcon}>
              <Package size={24} color={Colors.text.DEFAULT} />
            </View>
            <View style={styles.recentItemContent}>
              <Text style={styles.recentItemTitle}>Colis - #3257-9821</Text>
              <Text style={styles.recentItemDate}>Il y a 2 jours</Text>
            </View>
            <View style={styles.recentItemStatus}>
              <Text style={styles.recentItemStatusText}>Livré</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.recentItem}>
            <View style={styles.recentItemIcon}>
              <Warehouse size={24} color={Colors.text.DEFAULT} />
            </View>
            <View style={styles.recentItemContent}>
              <Text style={styles.recentItemTitle}>Palette - #2984-1532</Text>
              <Text style={styles.recentItemDate}>Il y a 1 semaine</Text>
            </View>
            <View style={styles.recentItemStatus}>
              <Text style={styles.recentItemStatusText}>Livré</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.xxl,
    paddingBottom: Layout.spacing.md,
    backgroundColor: Colors.background[50],
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    letterSpacing: 1,
  },
  headerHighlight: {
    color: Colors.primary.DEFAULT,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary.DEFAULT,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.xl,
  },
  welcomeContainer: {
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.xl,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.xs,
  },
  welcomeSubtext: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  shipmentOptions: {
    marginBottom: Layout.spacing.xl,
  },
  shipmentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.background[100],
  },
  selectedShipmentOption: {
    borderColor: Colors.primary.DEFAULT,
  },
  shipmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  shipmentTextContainer: {
    flex: 1,
  },
  shipmentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: 2,
  },
  shipmentDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  recentContainer: {
    marginBottom: Layout.spacing.xxl,
  },
  recentTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  recentItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  recentItemContent: {
    flex: 1,
  },
  recentItemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
  },
  recentItemDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  recentItemStatus: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    backgroundColor: Colors.success.light,
    borderRadius: Layout.borderRadius.sm,
  },
  recentItemStatusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.success.DEFAULT,
  },
});