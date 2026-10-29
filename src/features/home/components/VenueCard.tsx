import React, {memo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Venue} from '../data/mockVenues';

type Props = {venue: Venue; onPress?: (venue: Venue) => void};

function VenueCard({venue, onPress}: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <Pressable accessibilityLabel={`View ${venue.name}`} accessibilityRole="button" onPress={() => onPress?.(venue)} style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      {imageFailed ? <View style={styles.imageFallback}><Text style={styles.fallbackIcon}>⌂</Text><Text style={styles.fallbackText}>Venue image unavailable</Text></View> : <Image accessibilityLabel={`${venue.name} venue photo`} onError={() => setImageFailed(true)} source={{uri: venue.imageUrl}} style={styles.image} />}
      <View style={styles.details}>
        <View style={styles.titleRow}><Text numberOfLines={1} style={styles.name}>{venue.name}</Text><Text style={styles.rating}>★ {venue.rating.toFixed(1)}</Text></View>
        <Text style={styles.location}>⌖  {venue.location}</Text>
        <View style={styles.bottomRow}><Text style={styles.category}>{venue.category}</Text><Text style={styles.price}>₹{venue.price.toLocaleString('en-IN')}<Text style={styles.perDay}> / day</Text></Text></View>
      </View>
    </Pressable>
  );
}

export default memo(VenueCard);

const styles = StyleSheet.create({
  card: {backgroundColor: '#fff', borderColor: '#eee8e6', borderRadius: 20, borderWidth: 1, marginBottom: 16, overflow: 'hidden'},
  pressed: {opacity: 0.9}, image: {backgroundColor: '#f1e8e5', height: 170, width: '100%'},
  imageFallback: {alignItems: 'center', backgroundColor: '#f5eeeb', height: 170, justifyContent: 'center'}, fallbackIcon: {color: '#b52d35', fontSize: 30, marginBottom: 6}, fallbackText: {color: '#8d8582', fontSize: 12},
  details: {padding: 15}, titleRow: {alignItems: 'center', flexDirection: 'row', gap: 8}, name: {color: '#191617', flex: 1, fontSize: 16, fontWeight: '700'}, rating: {color: '#756b68', fontSize: 12, fontWeight: '600'}, location: {color: '#817876', fontSize: 13, marginTop: 7},
  bottomRow: {alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}, category: {backgroundColor: '#fff2f1', borderRadius: 8, color: '#a92831', fontSize: 11, fontWeight: '600', overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 6}, price: {color: '#191617', fontSize: 16, fontWeight: '800'}, perDay: {color: '#817876', fontSize: 11, fontWeight: '400'},
});
