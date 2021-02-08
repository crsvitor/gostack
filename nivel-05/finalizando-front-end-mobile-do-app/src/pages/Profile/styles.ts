import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  /* eixo y */
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  margin-bottom: -100px;
  /* position: relative; */
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 0px;
`;

export const UserAvatar = styled.Image`
  width: 166px;
  height: 166px;
  border-radius: 93px;
  margin-top: 64px;
  align-self: center;
  margin-top: -20px;
`;
