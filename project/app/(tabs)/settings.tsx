import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Bell, Globe, CreditCard, LogOut, Shield, BadgeCheck, CircleHelp as HelpCircle, FileText } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Paramètres</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Mehdi Benali</Text>
              <Text style={styles.profileEmail}>mehdi.benali@gmail.com</Text>
              <View style={styles.profileBadge}>
                <BadgeCheck size={14} color={Colors.text.DEFAULT} style={{marginRight: 4}} />
                <Text style={styles.profileBadgeText}>Compte Pro</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Paramètres du compte</Text>
        </View>

        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <CreditCard size={20} color={Colors.text.DEFAULT} />
              </View>
              <Text style={styles.settingsItemText}>Méthodes de paiement</Text>
            </View>
            <ChevronRight size={20} color={Colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <Shield size={20} color={Colors.text.DEFAULT} />
              </View>
              <Text style={styles.settingsItemText}>Sécurité</Text>
            </View>
            <ChevronRight size={20} color={Colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <Globe size={20} color={Colors.text.DEFAULT} />
              </View>
              <Text style={styles.settingsItemText}>Langue</Text>
            </View>
            <View style={styles.settingsItemRight}>
              <Text style={styles.settingsItemValue}>Français</Text>
              <ChevronRight size={20} color={Colors.text.secondary} />
            </View>
          </TouchableOpacity>

          <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <Bell size={20} color={Colors.text.DEFAULT} />
              </View>
              <Text style={styles.settingsItemText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.background[200], true: Colors.primary[300] }}
              thumbColor={notificationsEnabled ? Colors.primary.DEFAULT : Colors.background[300]}
              ios_backgroundColor={Colors.background[200]}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Support</Text>
        </View>

        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <HelpCircle size={20} color={Colors.text.DEFAULT} />
              </View>
              <Text style={styles.settingsItemText}>Centre d'aide</Text>
            </View>
            <ChevronRight size={20} color={Colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsIconContainer}>
                <FileText size={20} color={Colors.text.DEFAULT} />
              </View>
              <Text style={styles.settingsItemText}>Conditions d'utilisation</Text>
            </View>
            <ChevronRight size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.error.DEFAULT} style={{marginRight: 8}} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    paddingHorizontal: Layout.spacing.xl,
    paddingTop: Layout.spacing.xxl,
    paddingBottom: Layout.spacing.lg,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.lg,
    backgroundColor: Colors.background[50],
    marginBottom: Layout.spacing.md,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Layout.spacing.md,
  },
  profileDetails: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.info.light,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  profileBadgeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.info.DEFAULT,
  },
  editProfileButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
  },
  editProfileText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
  },
  sectionTitle: {
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
  },
  sectionTitleText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
  },
  settingsSection: {
    backgroundColor: Colors.background[50],
    marginBottom: Layout.spacing.md,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background[100],
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  settingsItemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.DEFAULT,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    marginRight: Layout.spacing.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
    marginHorizontal: Layout.spacing.xl,
    marginBottom: Layout.spacing.md,
    backgroundColor: Colors.background[50],
    borderRadius: Layout.borderRadius.md,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.error.DEFAULT,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xxl,
  },
});