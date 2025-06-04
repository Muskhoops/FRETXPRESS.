import { Platform } from 'react-native';

export const Typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
    giant: 48,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 30,
    xxl: 36,
    xxxl: 42,
    display: 48,
    giant: 56,
  },
};

export const getFontFamily = (weight: 'regular' | 'medium' | 'semiBold' | 'bold') => {
  if (Platform.OS === 'web') {
    switch (weight) {
      case 'regular':
        return 'Poppins-Regular, sans-serif';
      case 'medium':
        return 'Poppins-Medium, sans-serif';
      case 'semiBold':
        return 'Poppins-SemiBold, sans-serif';
      case 'bold':
        return 'Poppins-Bold, sans-serif';
      default:
        return 'Poppins-Regular, sans-serif';
    }
  }
  return Typography.fontFamily[weight];
};

export default Typography;