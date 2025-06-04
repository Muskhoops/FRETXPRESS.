import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Navigation, Search, Filter, List, Package } from 'lucide-react-native';
import Animated, { SlideInUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface Shipment {
  id: string;
  title: string;
  distance: string;
  price: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  isPro: boolean;
}

export default function TransporterScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [showList, setShowList] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  // Fake shipments nearby
  const shipments: Shipment[] = [
    {
      id: '1',
      title: 'Colis - 5kg',
      distance: '2.3 km',
      price: '1,200 DA',
      coordinate: {
        latitude: 36.737232,
        longitude: 3.086472, // Alger coordinates + small offset
      },
      isPro: true,
    },
    {
      id: '2',
      title: 'Palette - 2 unités',
      distance: '4.8 km',
      price: '4,500 DA',
      coordinate: {
        latitude: 36.747232,
        longitude: 3.096472,
      },
      isPro: false,
    },
    {
      id: '3',
      title: 'Colis urgent - 1kg',
      distance: '1.5 km',
      price: '900 DA',
      coordinate: {
        latitude: 36.727232,
        longitude: 3.076472,
      },
      isPro: false,
    },
  ];

  const handleMarkerPress = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };

  const handleAcceptShipment = () => {
    // Handle accepting the shipment
    console.log('Accepted shipment', selectedShipment?.id);
    setSelectedShipment(null);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.webMapText}>Carte interactive des expéditions</Text>
          <Text style={styles.webMapSubtext}>(Disponible sur les applications mobiles)</Text>
        </View>

        {/* Header Controls */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.text.secondary} style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Rechercher une adresse...</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.text.DEFAULT} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.listButton}
            onPress={() => setShowList(!showList)}
          >
            <List size={20} color={Colors.text.DEFAULT} />
          </TouchableOpacity>
        </View>

        {/* Online/Offline Toggle */}
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              isOnline ? styles.statusOnline : styles.statusOffline,
            ]}
            onPress={() => setIsOnline(!isOnline)}
          >
            <View style={[
              styles.statusIndicator,
              isOnline ? styles.indicatorOnline : styles.indicatorOffline,
            ]} />
            <Text style={styles.statusText}>
              {isOnline ? 'En ligne' : 'Hors ligne'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Shipment List Panel (slides up) */}
        {showList && (
          <Animated.View 
            entering={SlideInUp.duration(300)}
            style={styles.listPanel}
          >
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Expéditions à proximité</Text>
              <TouchableOpacity onPress={() => setShowList(false)}>
                <Text style={styles.closeText}>Fermer</Text>
              </TouchableOpacity>
            </View>

            {shipments.map((shipment) => (
              <TouchableOpacity 
                key={shipment.id}
                style={styles.listItem}
                onPress={() => handleMarkerPress(shipment)}
              >
                <View style={styles.listItemContent}>
                  <View style={styles.listItemHeader}>
                    <Text style={styles.listItemTitle}>{shipment.title}</Text>
                    {shipment.isPro && (
                      <View style={styles.listProBadge}>
                        <Text style={styles.proBadgeText}>PRO</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.listItemDetails}>
                    <View style={styles.listItemDetail}>
                      <MapPin size={14} color={Colors.text.secondary} style={{marginRight: 4}} />
                      <Text style={styles.listItemDetailText}>{shipment.distance}</Text>
                    </View>
                    <Text style={styles.listItemPrice}>{shipment.price}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.acceptButton}
                  onPress={() => handleAcceptShipment()}
                >
                  <Text style={styles.acceptButtonText}>Accepter</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        {/* Selected Shipment Info */}
        {selectedShipment && !showList && (
          <Animated.View 
            entering={SlideInUp.duration(300)}
            style={styles.shipmentInfoPanel}
          >
            <View style={styles.shipmentInfoHeader}>
              <View>
                <View style={styles.shipmentTitleContainer}>
                  <Text style={styles.shipmentInfoTitle}>{selectedShipment.title}</Text>
                  {selectedShipment.isPro && (
                    <View style={styles.listProBadge}>
                      <Text style={styles.proBadgeText}>PRO</Text>
                    </View>
                  )}
                </View>
                <View style={styles.shipmentInfoDetails}>
                  <View style={styles.shipmentInfoDetail}>
                    <MapPin size={14} color={Colors.text.secondary} style={{marginRight: 4}} />
                    <Text style={styles.shipmentInfoDetailText}>{selectedShipment.distance}</Text>
                  </View>
                  <Text style={styles.shipmentInfoPrice}>{selectedShipment.price}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={handleAcceptShipment}
              >
                <Text style={styles.acceptButtonText}>Accepter</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.DEFAULT,
  },
  webMapPlaceholder: {
    flex: 1,
    backgroundColor: Colors.background[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  webMapText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
    marginBottom: 8,
  },
  webMapSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background[50],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    marginRight: Layout.spacing.sm,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },
  searchPlaceholder: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  filterButton: {
    backgroundColor: Colors.background[50],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.sm,
    marginRight: Layout.spacing.sm,
  },
  listButton: {
    backgroundColor: Colors.background[50],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.sm,
  },
  statusContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: 20,
  },
  statusOnline: {
    backgroundColor: Colors.success.light,
  },
  statusOffline: {
    backgroundColor: Colors.error.light,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  indicatorOnline: {
    backgroundColor: Colors.success.DEFAULT,
  },
  indicatorOffline: {
    backgroundColor: Colors.error.DEFAULT,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  listPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background[50],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Layout.spacing.xl,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  listTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
  },
  closeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary.DEFAULT,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  listItemContent: {
    flex: 1,
  },
  listItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  listItemTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    marginRight: 8,
  },
  listProBadge: {
    backgroundColor: Colors.info.DEFAULT,
    borderRadius: Layout.borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  proBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
  },
  listItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemDetailText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  listItemPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.DEFAULT,
  },
  acceptButton: {
    backgroundColor: Colors.primary.DEFAULT,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.background.DEFAULT,
  },
  shipmentInfoPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.background[50],
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
  },
  shipmentInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shipmentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shipmentInfoTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    marginRight: 8,
  },
  shipmentInfoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 160,
  },
  shipmentInfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shipmentInfoDetailText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  shipmentInfoPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.DEFAULT,
  },
});