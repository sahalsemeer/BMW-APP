import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../redux/userSlice';
import ProfileMenu from '../components/ProfileMenu';
import VenueCard from '../components/VenueCard';
import { mockVenues, Venue } from '../data/mockVenues';

type RootState = { user?: { user?: { name?: string } | null } };

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user?.user);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const filteredVenues = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized
      ? mockVenues.filter(venue =>
          `${venue.name} ${venue.location}`.toLowerCase().includes(normalized),
        )
      : mockVenues;
  }, [query]);
  const initials = user?.name?.trim().charAt(0).toUpperCase() || '⌾';
  const renderVenue = ({ item }: { item: Venue }) => <VenueCard venue={item} />;

  const handleProfileAction = (action: string) => {
    if (action === 'Logout') dispatch(clearUser());
    setMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.brand}>BookMyVenue</Text>
          <Pressable
            accessibilityLabel="Open account menu"
            accessibilityRole="button"
            onPress={() => setMenuOpen(open => !open)}
            style={styles.profileButton}
          >
            <Text style={styles.profileText}>{initials}</Text> 
          </Pressable>
          {menuOpen && (
            <ProfileMenu
              authenticated={Boolean(user)}
              onAction={handleProfileAction}
            />
          )}
        </View>
        {menuOpen && (
          <Pressable
            accessibilityLabel="Close account menu"
            onPress={() => setMenuOpen(false)}
            style={styles.menuOverlay}
          />
        )}
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.content}
          data={filteredVenues}
          keyboardShouldPersistTaps="handled"
          keyExtractor={item => item.id}
          scrollEnabled={true}
          onScrollBeginDrag={() => console.log('scrolled')
          }
          ListEmptyComponent={
            <Text style={styles.empty}>
              No venues found. Try a different search.
            </Text>
          }
          ListHeaderComponent={
            <View>
              <Text style={styles.eyebrow}>PLAN SOMETHING MEMORABLE</Text>
              <Text style={styles.heading}>Find your perfect venue</Text>
              <Text style={styles.subtitle}>
                Discover spaces for your next special occasion.
              </Text>
              <View style={styles.searchBox}>
                <Text style={styles.searchIcon}>⌕</Text>
                <TextInput
                  accessibilityLabel="Search venues"
                  onChangeText={setQuery}
                  onSubmitEditing={Keyboard.dismiss}
                  placeholder="Search venues, locations..."
                  placeholderTextColor="#9b918e"
                  returnKeyType="search"
                  style={styles.searchInput}
                  value={query}
                />
              </View>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Explore Venues</Text>
                  <Text style={styles.sectionSubtitle}>
                    Discover your next space
                  </Text>
                </View>
                <Text style={styles.count}>{filteredVenues.length} spaces</Text>
              </View>
              <Text style={styles.mockLabel}>MOCK VENUES</Text>
            </View>
          }
          renderItem={renderVenue}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#fffdfc', flex: 1 },
  screen: { flex: 1 },
  list: { flex: 1 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    position: 'relative',
    zIndex: 2,
  },
  menuOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 5,
  },
  brand: {
    color: '#b52d35',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: '#fff0ef',
    borderColor: '#f5d6d3',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  profileText: { color: '#b52d35', fontSize: 16, fontWeight: '700' },
  content: { paddingBottom: 30, paddingHorizontal: 20, paddingTop: 34 },
  eyebrow: {
    color: '#b52d35',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  heading: {
    color: '#191617',
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 37,
    maxWidth: 330,
  },
  subtitle: { color: '#817876', fontSize: 15, lineHeight: 22, marginTop: 10 },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eee8e6',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    height: 53,
    marginTop: 24,
    paddingHorizontal: 15,
  },
  searchIcon: { color: '#b52d35', fontSize: 27, marginRight: 9 },
  searchInput: { color: '#302928', flex: 1, fontSize: 14, paddingVertical: 0 },
  sectionHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 32,
  },
  sectionTitle: { color: '#191617', fontSize: 21, fontWeight: '800' },
  sectionSubtitle: { color: '#948a87', fontSize: 13, marginTop: 4 },
  count: { color: '#a59a97', fontSize: 12 },
  mockLabel: {
    color: '#b8aaa6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  empty: {
    color: '#817876',
    fontSize: 15,
    paddingTop: 32,
    textAlign: 'center',
  },
});
