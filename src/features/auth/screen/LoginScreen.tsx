import React, { useState } from 'react';
import api from '../../../api/axiosInstance';

import {
  // KeyboardAvoidingView,
  // Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// type LoginScreenProps = {
//   onForgotPassword?: () => void;
//   onLogin?: (email: string, password: string) => void;
//   onSignUp?: (name: string, email: string, password: string) => void;
// };

const socialProviders = [
  { label: 'G', color: '#4285F4' },
  { label: 'f', color: '#1877F2' },
  { label: '𝕏', color: '#111111' },
  { label: '●', color: '#111111' },
];

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);

  console.log('running');
  
  async function onLogin() {
    try {
      const response = await api.post(
        '/login',
        { email, password },
        { withCredentials: true },
      );
      console.log('clicked!');
      console.log(response.data);
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  }

  async function onSignUp() {
    try {
      const response = await api.post('/signup', { name, email, password });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // <KeyboardAvoidingView
    //   style={styles.screen}
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>{signUp ? 'Sign up' : 'Sign in'}</Text>
          <Text style={styles.subtitle}>
            {signUp ? 'Already have an account? ' : 'New user? '}
            <Text
              style={styles.link}
              onPress={() => setSignUp(current => !current)}
            >
              {signUp ? 'Sign in' : 'Create an account'}
            </Text>
          </Text>
        </View>

        <View style={styles.form}>
          {signUp && (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>♙</Text>
              <TextInput
                autoCapitalize="words"
                autoComplete="name"
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor="#969696"
                style={styles.input}
                value={name}
              />
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Email Address"
              placeholderTextColor="#969696"
              style={styles.input}
              value={email}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>♙</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="password"
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#969696"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
            />
            <Pressable
              accessibilityLabel={
                showPassword ? 'Hide password' : 'Show password'
              }
              hitSlop={10}
              onPress={() => setShowPassword(current => !current)}
            >
              <Text style={styles.eye}>{showPassword ? '◉' : '◌'}</Text>
            </Pressable>
          </View>

          {!signUp && (
            <Pressable style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          )}

          <Pressable
            accessibilityLabel={signUp ? 'Sign up' : 'Login'}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.pressed,
            ]}
            onPress={
              signUp
                ? () => onSignUp()
                : () => onLogin()
            }
          >
            <Text style={styles.loginText}>{signUp ? 'Sign up' : 'Login'}</Text>
          </Pressable>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.socialPrompt}>
          Join With Your Favourite Social Media Account
        </Text>
        <View style={styles.socialRow}>
          {socialProviders.map(provider => (
            <Pressable
              accessibilityLabel={`Continue with ${provider.label}`}
              key={provider.label}
              style={({ pressed }) => [
                styles.socialButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.socialIcon, { color: provider.color }]}>
                {provider.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.terms}>
          By signing in with an account, you agree to SO&apos;s{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fffcfc',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    maxWidth: 420,
    paddingHorizontal: 28,
    paddingVertical: 34,
    shadowColor: '#000000',
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.09,
    shadowRadius: 20,
    width: '100%',
  },
  title: {
    color: '#0b0b0b',
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: '#242424',
    fontSize: 11,
    marginTop: 7,
  },
  link: {
    color: '#111111',
    fontWeight: '800',
  },
  form: {
    marginTop: 27,
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    height: 48,
    marginBottom: 11,
    paddingHorizontal: 13,
  },
  inputIcon: {
    color: '#444444',
    fontSize: 16,
    marginRight: 9,
    width: 17,
  },
  input: {
    color: '#151515',
    flex: 1,
    fontSize: 12,
    paddingVertical: 0,
  },
  eye: {
    color: '#a0a0a0',
    fontSize: 19,
    width: 20,
  },
  forgotButton: {
    alignSelf: 'flex-start',
    marginTop: -3,
    paddingVertical: 5,
  },
  forgotText: {
    color: '#171717',
    fontSize: 10,
    fontWeight: '600',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#050505',
    borderRadius: 28,
    height: 49,
    justifyContent: 'center',
    marginTop: 19,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
  },
  divider: {
    backgroundColor: '#dedede',
    flex: 1,
    height: 1,
  },
  orText: {
    color: '#999999',
    fontSize: 10,
    marginHorizontal: 11,
  },
  socialPrompt: {
    color: '#333333',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 15,
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 7,
    height: 44,
    justifyContent: 'center',
    width: 48,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: '800',
  },
  terms: {
    color: '#929292',
    fontSize: 8,
    lineHeight: 12,
    marginHorizontal: 4,
    marginTop: 31,
    textAlign: 'center',
  },
  termsLink: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
  },
});
