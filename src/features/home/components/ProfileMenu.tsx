import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = { authenticated: boolean; onAction: (action: string) => void };

export default function ProfileMenu({ authenticated, onAction }: Props) {
  const actions = authenticated
    ? ['My Profile', 'My Bookings', 'Settings', 'Logout']
    : ['Login', 'Sign Up'];
  return (
    <View style={styles.menu}>
      {actions.map(action => (
        <Pressable
          key={action}
          accessibilityRole="button"
          onPress={() => onAction(action)}
          style={styles.item}
        >
          <Text style={[styles.itemText, action === 'Logout' && styles.logout]}>
            {action}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#fff',
    borderColor: '#eee8e6',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 7,
    padding: 6,
    position: 'absolute',
    right: 18,
    shadowColor: '#2b1715',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    top: 56,
    width: 164,
    zIndex: 10,
  },
  item: {
    borderRadius: 10,
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  itemText: { color: '#302928', fontSize: 14 },
  logout: { color: '#b52d35', fontWeight: '700' },
});
