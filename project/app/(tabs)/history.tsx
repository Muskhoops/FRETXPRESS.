import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Package, Truck, Clock, CircleCheck as CheckCircle2, Truck as TruckFast } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface Shipment {
  id: string;
  type: 'package' | 'pallet' | 'dangerous' | 'fresh' | 'container';
  title: string;
  date: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  price: string;
}

export default function HistoryScreen() {
  const shipments: Shipment[] = [
    {
      id: '3257-9821',
      type: 'package',
      title: 'Colis - Alger à Oran',
      date: '22 Juin 2025',
      status: 'delivered',
      price: '12,500 DA',
    },
    {
      id: '2984-1532',
      type: 'pallet',
      title: 'Palette - Annaba à Constantine',
      date: '15 Juin 2025',
      status: 'delivered',
      price: '45,000 DA',
    },
    {
      id: '8473-6542',
      type: 'package',
      title: 'Colis - Alger à Béjaïa',
      date: '08 Juin 2025',
      status: 'in_transit',
      price: '8,700 DA',
    },
    {
      id: '9362-7452',
      type: 'fresh',
      title: 'Produits Frais - Alger à Blida',
      date: '01 Juin 2025',
      status: 'delivered',
      price: '15,300 DA',
    },
    {
      id: '4751-3698',
      type: 'container',
      title: 'Conteneur - Oran à Alger',
      date: '25 Mai 2025',
      status: 'cancelled',
      price: '120,000 DA',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return { bg: Colors.success.light, text: Colors.success.DEFAULT };
      case 'in_transit':
        return { bg: Colors.info.light, text: Colors.info.DEFAULT };
      case 'pending':
        return { bg: Colors.warning.light, text: Colors.warning.DEFAULT };
      case 'cancelled':
        return { bg: Colors.error.light, text: Colors.error.DEFAULT };
      default:
        return { bg: Colors.background[100], text: Colors.text.DEFAULT };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Livré';
      case 'in_transit':
        return 'En transit';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getShipmentIcon = (type: string) => {
    switch (type) {
      case 'package':
        return <Package size={24} color={Colors.text.DEFAULT} />;
      case 'pallet':
        return <Truck size={24} color={Colors.text.DEFAULT} />;
      case 'fresh':
        return <TruckFast size={24} color={Colors.text.DEFAULT} />;
      default:
        return <Package size={24} color={Colors.text.DEFAULT} />;
    }
  };

  const renderItem = ({ item, index }: { item: Shipment; index: number }) => {
    const statusStyle = getStatusColor(item.status);
    
    return (
      <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
        <TouchableOpacity style={styles.shipmentItem}>
          <View style={styles.shipmentIconContainer}>
            {getShipmentIcon(item.type)}
          </View>
          <View style={styles.shipmentContent}>
            <View style={styles.shipmentHeader}>
              <Text style={styles.shipmentTitle}>{item.title}</Text>
              <Text style={styles.shipmentPrice}>{item.price}</Text>
            </View>
            <View style={styles.shipmentFooter}>
              <View style={styles.shipmentMeta}>
                <Clock size={14} color={Colors.text.secondary} style={styles.metaIcon} />
                <Text style={styles.shipmentDate}>{item.date}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.statusText, { color: statusStyle.text }]}>
                  {getStatusText(item.status)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes expéditions</Text>
      </View>

      <FlatList
        data={shipments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Livrées</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>En cours</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune expédition trouvée</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.DEFAULT,
  },
  header: {
    paddingTop: Layout.spacing.xxl,
    paddingBottom: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.xl,
    backgroundColor: Colors.background[50],
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
  },
  listContainer: {
    padding: Layout.spacing.xl,
    paddingTop: Layout.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginHorizontal: Layout.spacing.xs,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.DEFAULT,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  shipmentItem: {
    flexDirection: 'row',
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
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
  shipmentContent: {
    flex: 1,
  },
  shipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  shipmentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
    flex: 1,
  },
  shipmentPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.DEFAULT,
  },
  shipmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shipmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 4,
  },
  shipmentDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xxl,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.secondary,
  },
});