import {Dimensions} from 'react-native';

type DimensionType = {
  height: number;
  width: number;
};

// Get the dimensions
const windowDimensions: DimensionType = Dimensions.get('window');

export const HEIGHT = windowDimensions.height;
export const WIDTH = windowDimensions.width;
