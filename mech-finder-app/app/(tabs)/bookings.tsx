import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/theme/ThemeProvider';
import { router } from 'expo-router';
import { BookingCard } from '@/components/booking/BookingCard';
import { Booking, bookingsData } from '@/mock/bookingsData';
import { AlertCircle } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';

type FilterType = 'all' | 'upcoming' | 'past' | 'emergency';

export default function BookingsScreen() {
  const { colors, spacing, typography, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const handleBookingPress = (booking: Booking) => {
    router.push({
      pathname: '/booking/[id]',
      params: { id: booking.id }
    });
  };

  const handleNewBooking = () => {
    router.push('/booking/new');
  };

  const filterBookings = () => {
    const today = new Date();
    
    let filtered = [...bookingsData];
    
    switch (activeFilter) {
      case 'upcoming':
        filtered = filtered.filter(
          (booking) => 
            new Date(booking.date) >= today && 
            booking.status !== 'cancelled' && 
            booking.status !== 'completed'
        );
        break;
      case 'past':
        filtered = filtered.filter(
          (booking) => 
            new Date(booking.date) < today || 
            booking.status === 'cancelled' || 
            booking.status === 'completed'
        );
        break;
      case 'emergency':
        filtered = filtered.filter((booking) => booking.isEmergency);
        break;
    }

    return filtered;
  };

  const filteredBookings = filterBookings();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.gray[50] : colors.gray[50] }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            typography.h3,
            { color: isDark ? colors.white : colors.gray[900] },
          ]}
        >
          My Bookings
        </Text>
        <Button
          title="New Booking"
          variant="primary"
          onPress={handleNewBooking}
          size="small"
        />
      </View>

      <View
        style={[
          styles.filterContainer,
          { backgroundColor: isDark ? colors.gray[100] : colors.white },
        ]}
      >
        {(['all', 'upcoming', 'past', 'emergency'] as FilterType[]).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && {
                backgroundColor: colors.primary[500],
              },
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                typography.button,
                {
                  color: activeFilter === filter ? colors.white : (isDark ? colors.gray[700] : colors.gray[700]),
                },
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookingCard booking={item} onPress={handleBookingPress} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bookingsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AlertCircle color={colors.gray[400]} size={spacing.iconSize.large * 2} style={styles.emptyIcon} />
          <Text
            style={[
              styles.emptyText,
              typography.subtitle1,
              { color: isDark ? colors.gray[700] : colors.gray[700] },
            ]}
          >
            No {activeFilter === 'all' ? '' : activeFilter} bookings found
          </Text>
          <Button
            title="Book a Service"
            variant="primary"
            onPress={handleNewBooking}
            style={styles.bookButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  filterText: {
    textAlign: 'center',
  },
  bookingsList: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    marginBottom: 24,
    textAlign: 'center',
  },
  bookButton: {
    minWidth: 200,
  },
});