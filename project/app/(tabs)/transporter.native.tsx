import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapPin, Navigation, Search, Filter, List, Package } from 'lucide-react-native';
import Animated, { SlideInUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

const { width, height } = Dimensions.get('window');

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

  // Use Algiers coordinates as default
  const initialRegion = {
    latitude: 36.737232,
    longitude: 3.086472,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleMarkerPress = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };

  const handleAcceptShipment = () => {
    // Handle accepting the shipment
    console.log('Accepted shipment', selectedShipment?.id);
    setSelectedShipment(null);
  };

  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={mapStyle}
      >
        {/* Current Location Marker */}
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          pinColor={Colors.primary.DEFAULT}
        >
          <View style={styles.currentLocationMarker}>
            <Navigation size={16} color={Colors.background.DEFAULT} />
          </View>
        </Marker>

        {/* Shipment Markers */}
        {isOnline && shipments.map((shipment) => (
          <Marker
            key={shipment.id}
            coordinate={shipment.coordinate}
            onPress={() => handleMarkerPress(shipment)}
          >
            <View style={styles.shipmentMarker}>
              <Package size={14} color={Colors.background.DEFAULT} />
              {shipment.isPro && <View style={styles.proBadge} />}
            </View>
          </Marker>
        ))}
      </MapView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.DEFAULT,
  },
  map: {
    width: '100%',
    height: '100%',
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
  currentLocationMarker: {
    backgroundColor: Colors.primary.DEFAULT,
    borderRadius: 12,
    padding: 8,
  },
  shipmentMarker: {
    backgroundColor: Colors.primary.DEFAULT,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    borderColor: Colors.background.DEFAULT,
  },
  proBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.info.DEFAULT,
    borderWidth: 1,
    borderColor: Colors.background.DEFAULT,
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
    maxHeight: height * 0.6,
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