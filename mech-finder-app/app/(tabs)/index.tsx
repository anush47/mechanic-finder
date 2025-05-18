import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { services } from '@/mock/bookingsData';
import {
  Battery,
  Fuel,
  Tool,
  Car,
  Truck,
  Disc,
} from 'lucide-react-native';

const getServiceIcon = (type: string) => {
  switch (type) {
    case 'battery_emergency':
      return Battery;
    case 'fuel_delivery':
      return Fuel;
    case 'maintenance':
      return Tool;
    case 'roadside_assist':
      return Car;
    case 'towing':
      return Truck;
    case 'tire_change':
      return Disc;
    default:
      return Car;
  }
};

export default function HomeScreen() {
  const { colors, spacing, typography, isDark } = useTheme();

  const handleServicePress = (serviceId: string) => {
    router.push({
      pathname: '/booking/new',
      params: { serviceId },
    });
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.gray[50] : colors.gray[50] },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            typography.h2,
            { color: isDark ? colors.white : colors.gray[900] },
          ]}
        >
          Need Help?
        </Text>
        <Text
          style={[
            styles.subtitle,
            typography.body1,
            { color: isDark ? colors.gray[600] : colors.gray[600] },
          ]}
        >
          Choose the service you need
        </Text>
      </View>

      <View style={styles.servicesGrid}>
        {services.map((service) => {
          const Icon = getServiceIcon(service.type);
          return (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                {
                  backgroundColor: isDark ? colors.gray[100] : colors.white,
                  borderColor: isDark ? colors.gray[200] : colors.gray[200],
                },
              ]}
              onPress={() => handleServicePress(service.id)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.primary[500] + '20' },
                ]}
              >
                <Icon
                  color={colors.primary[500]}
                  size={spacing.iconSize.large}
                />
              </View>
              <Text
                style={[
                  styles.serviceName,
                  typography.subtitle1,
                  { color: isDark ? colors.white : colors.gray[900] },
                ]}
              >
                {service.name}
              </Text>
              <Text
                style={[
                  styles.servicePrice,
                  typography.body2,
                  { color: isDark ? colors.gray[600] : colors.gray[600] },
                ]}
              >
                From ${service.basePrice}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  serviceCard: {
    width: '45%',
    margin: '2.5%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    textAlign: 'center',
    marginBottom: 4,
  },
  servicePrice: {
    textAlign: 'center',
  },
});