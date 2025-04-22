import styled from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioButton} from 'react-native-paper';
import {Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');
<<<<<<< HEAD
const {height: screenHeight} = Dimensions.get('window');

=======
>>>>>>> 9764c98 (tire inspection)
const wheelWidth = width * 0.15; // 18% da largura da tela
const wheelHeight = wheelWidth * 1.5; // Altura proporcional à largura

const AXIS_SPACING_FRONT = 10; // Espaço entre eixos dianteiros
const AXIS_SPACING_REAR = 50; // Espaço entre eixos traseiros
const AXIS_HEIGHT_FRONT = 150; // Altura para eixos dianteiros
const AXIS_HEIGHT_REAR = 150; // Altura para eixos traseiros
const AXIS_SPACING = 10; // Espaço entre eixos

import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';
const statusBarMargin = isIOS ? 60 : 0;

export const Background = styled.View`
  flex: 1;
  background-color: #1583f2;
  padding-top: ${statusBarMargin}px;
`;

export const Container = styled.View`
  flex: 1;
  margin: 20px;
<<<<<<< HEAD
`;

export const ModalBody = styled.View`
  margin: 20px;
  background-color: rgba(64, 81, 137, 0.9);
  border: 20px;
  border-radius: 20px;
  border-color: rgba(64, 81, 137, 0.9);
  flex: 1;
`;

=======
  background-color: #1583f2;
`;

export const ContainerQuestion = styled.View`
  margin-right: 20px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  flex: 1;
`;

export const Question = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #fff;
`;

export const SelectData = styled(Button)`
  margin-top: 0px;
  height: 40px;
`;

export const ButtonModal = styled.TouchableOpacity`
  margin-top: 10px;
  min-width: 200px;
  height: 46px;
  background: #367fa9;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px;
  background-color: #fff;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 30px 10px 10px #000;
`;

export const ModalOverContainer = styled.View`
  flex: 1;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const ButtonModalText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const ModalBody = styled.View`
  margin: 20px;
  background-color: rgba(64, 81, 137, 0.9);
  border: 20px;
  border-radius: 20px;
  border-color: rgba(64, 81, 137, 0.9);
  flex: 1;
`;

>>>>>>> 9764c98 (tire inspection)
export const ModalButtonSelect = styled(Button)`
  margin-top: 0px;
  height: 35px;
  background: #696969;
`;

export const ModalButton = styled.TouchableOpacity`
  height: 25px;
  background: #f06548;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const VehicleContainer = styled.View`
  align-items: left;
  margin: 0 4px 4px;
  padding: 0px;
  background-color: rgba(64, 81, 137, 0);
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

<<<<<<< HEAD
=======
export const VehicleName = styled.Text`
  color: #fff;
  font-size: 16px;
  line-height: 24px;
`;

>>>>>>> 9764c98 (tire inspection)
export const ButtonSelectVehicle = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  background: ${props => (props.isSelected ? '#FFFFFF' : '#FFFFFF')};
  border-radius: 4px;
  border: 2px solid ${props => (props.isSelected ? '#388E3C' : '#BDBDBD')};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
`;

export const ButtonSelectVehicleIcon = styled(Icon)`
  color: ${props => (props.isSelected ? '#FFFFFF' : '#616161')};
`;

<<<<<<< HEAD
=======
export const RadioContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledRadioButton = styled(RadioButton)`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border-width: 2px;
  border-color: ${props => (props.selected ? '#007BFF' : '#888')};
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const RadioText = styled.Text`
  font-size: 16px;
  color: #e0e0e0;
`;

export const InnerCircle = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: rgb(250, 251, 253);
`;

export const QuestionContainer = styled.View`
  padding: 16px;
  margin: 8px;
  background-color: ${({isAnswered}) =>
    isAnswered ? '#4169E1' : 'rgba(255,255,255,0.05)'};
  border-radius: 8px;
  border-width: ${({isCurrent}) => (isCurrent ? '2px' : '0px')};
  border-color: ${({isCurrent}) => (isCurrent ? '#6200ee' : 'transparent')};
`;

export const currentQuestion = styled.View`
  border-color: #6200ee;
  border-width: 2px;
`;

export const answeredQuestion = styled.View`
  background-color: #e8f5e9;
`;

export const navigationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  gap: 8px;
`;

export const disabledButton = styled.View`
  background-color: #e9ecef;
`;

export const disabledText = styled.Text`
  color: #adb5bd;
`;

export const buttonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-horizontal: 8px;
`;

export const StyledButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({isDisabled}) => (isDisabled ? '#e9ecef' : '#696969')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  margin-right: 2px;
  margin-top: 2px;
`;

export const StyledButtonText = styled.Text`
  color: ${({isDisabled}) => (isDisabled ? '#adb5bd' : 'white')};
  font-weight: bold;
  font-size: 14px;
  margin-left: 3px;
`;

export const NavButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({isDisabled}) => (isDisabled ? '#e9ecef' : '#696969')};
  margin-left: 2px;
  margin-top: 2px;
`;

export const NavButtonText = styled.Text`
  color: ${({isDisabled}) => (isDisabled ? '#adb5bd' : '#fff')};
  font-weight: bold;
  font-size: 14px;
  margin-right: 3px;
`;

export const SubmitQuestions = styled.TouchableOpacity`
  flex: 1;
  background-color: #40e0d0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 8px;
  margin-left: 2px;
  margin-top: 2px;
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;

export const SubmitButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-left: 2px;
`;

>>>>>>> 9764c98 (tire inspection)
export const FormInput = styled(Input)`
  margin-bottom: 4px;
  height: 40px;
  font-size: 12px;
  padding-horizontal: 4px;
`;

export const TagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${props => (props.isMapped ? '#008000' : '#FF0000')};
  border: 1px solid ${props => (props.isMapped ? '#008080' : '#8B0000')};
`;

export const TagText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  margin-left: 8px;
`;

/**  Axis Wheel */
export const AxisName = styled.Text`
  font-weight: bold;
  color: #2c3e50;
`;

export const AxisType = styled.Text`
  color: #7f8c8d;
`;

export const AxisContent = styled.View`
  position: relative;
  padding: 10px 0;
`;

export const AxisTitle = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-bottom: 2px;
  color: #333;
  font-size: 15px;
`;

export const AxleBar = styled.View`
  height: 8px;
  width: ${width * 0.4}px;
  background-color: #555;
  position: absolute;
  left: ${width * 0.3}px;
`;

export const WheelSquare = styled.View`
  width: 80px;
  height: 120px;
  background-color: #e8f5e9;
  border: 2px solid #81c784;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 0 5px;
  border-radius: 6px;
`;

export const WheelInfoContainer = styled.View`
  width: 100%;
  margin: 8px 0;
`;

export const WheelActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const WheelActionButton = styled.TouchableOpacity`
  background-color: ${props => props.bgColor || '#2196F3'};
  padding: 6px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin: 0 2px;
  justify-content: center;
`;

export const WheelButtonText = styled.Text`
  color: white;
  font-size: 10px;
  margin-left: 4px;
`;

export const WheelContent = styled.View`
  padding: 8px;
`;

export const WheelNumber = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #2e7d32;
  text-align: center;
  margin-bottom: 6px;
`;

export const WheelInfo = styled.View``;

export const WheelInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2px;
`;

export const WheelInfoLabel = styled.Text`
  font-size: 10px;
  color: #455a64;
`;

export const WheelInfoValue = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: #263238;
`;

export const WheelEditButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #2196f3;
  padding: 4px;
  align-items: center;
  justify-content: center;
`;

export const AxesContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 8px;
<<<<<<< HEAD
  max-height: ${screenHeight * 0.75}px;
=======
  max-height: 500px;
>>>>>>> 9764c98 (tire inspection)
`;

export const AxisContainer = styled.View`
  margin-bottom: ${AXIS_SPACING}px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  align-items: center;
  height: ${props => (props.isFront ? AXIS_HEIGHT_FRONT : AXIS_HEIGHT_REAR)}px;
`;

export const AxisSpacer = styled.View`
  height: ${props =>
    props.isFront ? AXIS_SPACING_FRONT : AXIS_SPACING_REAR}px;
  width: 100%;
`;

export const AxisVisualization = styled.View`
  position: relative;
  height: ${wheelHeight - 10}px;
  width: 100%;
  justify-content: center;
<<<<<<< HEAD
  margin-top: 10%;
=======
  margin-top: 2px;
>>>>>>> 9764c98 (tire inspection)
  padding-right: 5px;
`;

export const AxleLine = styled.View`
  position: absolute;
  height: 8px;
  width: 90%; /* Ajustado para 90% da largura */
  background-color: #555;
  z-index: 1;
<<<<<<< HEAD
  left: 3%; /* Centralizado com 5% de margem */
=======
  left: 5%; /* Centralizado com 5% de margem */
>>>>>>> 9764c98 (tire inspection)
  top: 50%;
  margin-top: -4px;
`;

export const WheelGroups = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const WheelGroup = styled.View`
  flex-direction: ${props => (props.side === 'left' ? 'row' : 'row-reverse')};
  align-items: center;
  width: ${props => (props.isDouble ? wheelWidth * 2 : wheelWidth)}px;
  ${props => props.isDouble && 'justify-content: space-between;'}
  margin-right: 2px;
`;

export const WheelContainer = styled.View`
  width: ${wheelWidth}px;
<<<<<<< HEAD
  min-width: 50px;
  min-height: 100px;
=======
>>>>>>> 9764c98 (tire inspection)
  height: ${wheelHeight}px;
  background-color: #e8f5e9;
  border: 2px solid #81c784;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin: 0 2px; /* Pequeno espaçamento entre rodas duplas */
`;

export const WheelPlaceholder = styled.View`
  width: ${wheelWidth}px;
  height: ${wheelHeight}px;
  background-color: #f8f9fa;
  border: 2px dashed #adb5bd;
  border-radius: 8px;
`;

/** modal pressure */
export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.View`
  width: 90%;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
<<<<<<< HEAD
  color: #000;
=======
>>>>>>> 9764c98 (tire inspection)
`;

export const Label = styled.Text`
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
  color: red;
`;

<<<<<<< HEAD
export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: '#000',
  selectionColor: '#000',
})`
  border: 1px solid #000;
=======
export const StyledInput = styled.TextInput`
  border: 1px solid #ccc;
>>>>>>> 9764c98 (tire inspection)
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 12px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: #bbb;
  padding: 10px 20px;
  border-radius: 6px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: #2196f3;
  padding: 10px 20px;
  border-radius: 6px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
