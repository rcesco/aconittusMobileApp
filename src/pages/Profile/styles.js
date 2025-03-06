import styled from 'styled-components';

import Button from '../../components/Button';
import Input from '../../components/Input';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';
const statusBarMargin = isIOS ? 60 : 0;

export const Background = styled.View`
  flex: 1;
  background-color: #1583f2;
  padding-top: ${statusBarMargin}px;
`;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin: 0 20px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #8f8f8f;
  margin: 20px 0 10px;
`;

export const AvatarContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;

export const AvatarImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const Name = styled(Input)`
  margin-top: 10px;
`;

export const Username = styled(Input)`
  margin-top: 10px;
`;

export const Email = styled(Input)`
  margin-top: 10px;
`;

export const CurrentPassword = styled(Input)`
  margin-top: 10px;
`;

export const NewPassword = styled(Input)`
  margin-top: 10px;
`;

export const ConfirmationPassword = styled(Input)`
  margin-top: 10px;
`;

export const ProfileButtons = styled.View`
  margin-top: 10px;
`;

export const ProfileContainer = styled.View``;

export const UpdateProfileButton = styled(Button)`
  margin-top: 20px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 20px;
  background: #ff5a5f;
`;
