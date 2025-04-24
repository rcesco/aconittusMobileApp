import React, {useState, useEffect, useRef} from 'react';
import {View, Alert, Modal, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import Api from '../../services/api';

import {
  Container,
  ModalButton,
  ModalButtonText,
  ModalBody,
  FormInput,
  VehicleContainer,
  ButtonSelectVehicle,
  ButtonSelectVehicleIcon,
  ModalButtonSelect,
  Background,
  TagContainer,
  TagText,
  AxisName,
  AxisType,
  WheelGroups,
  AxesContainer,
  AxisContainer,
  AxisTitle,
  WheelContainer,
  WheelContent,
  WheelInfo,
  WheelInfoRow,
  WheelInfoLabel,
  WheelInfoValue,
  WheelEditButton,
  WheelNumber,
  WheelGroup,
  AxisVisualization,
  AxleLine,
  WheelPlaceholder,
  Overlay,
  ModalBox,
  Title,
  Label,
  StyledInput,
  ButtonRow,
  CancelButton,
  SaveButton,
  ButtonText,
} from './styles';

const VehicleAxisVisualization = ({axes, onEditTire}) => {
  const hasFrontAxes = axes.some(axis =>
    axis.axis.toLowerCase().includes('dianteiro'),
  );

  const AXIS_HEIGHT_FRONT = 150;
  const AXIS_HEIGHT_REAR = 150;
  const AXIS_SPACING = 10;

  const calculateTotalHeight = () => {
    const frontAxesCount = axes.filter(a =>
      a.axis.toLowerCase().includes('dianteiro'),
    ).length;
    const rearAxesCount = axes.length - frontAxesCount;

    return (
      frontAxesCount * AXIS_HEIGHT_FRONT +
      rearAxesCount * AXIS_HEIGHT_REAR +
      (axes.length - 1) * AXIS_SPACING +
      32
    );
  };

  const renderWheelGroup = (wheels, side, isDouble) => (
    <WheelGroup side={side} isDouble={isDouble}>
      {wheels.map((wheel, index) => (
        <WheelContainer key={`${side}-${index}`}>
          {wheel?.fire_number ? (
            <>
              <WheelContent>
                <WheelNumber>{wheel.fire_number}</WheelNumber>
                <WheelInfo>
                  <WheelInfoRow>
                    <WheelInfoLabel>S:</WheelInfoLabel>
                    <WheelInfoValue>
                      {wheel.tire_depth[0]?.depth || '--'}
                    </WheelInfoValue>
                  </WheelInfoRow>
                  <WheelInfoRow>
                    <WheelInfoLabel>P:</WheelInfoLabel>
                    <WheelInfoValue>
                      {wheel.tire_depth[0]?.pressure || '--'}
                    </WheelInfoValue>
                  </WheelInfoRow>
                </WheelInfo>
              </WheelContent>
              <WheelEditButton onPress={() => onEditTire(wheel)}>
                <Icon name="edit" size={14} color="#fff" />
              </WheelEditButton>
            </>
          ) : (
            <WheelPlaceholder />
          )}
        </WheelContainer>
      ))}
    </WheelGroup>
  );

  const renderAllAxes = () => {
    return (
      <>
        {!hasFrontAxes && <View style={{height: 20}} />}

        {axes.map((axis, index) => {
          const isFront = axis.axis.toLowerCase().includes('dianteiro');

          return (
            <AxisContainer
              key={axis.idvehicle_axis}
              isFront={isFront}
              style={index === axes.length - 1 ? {marginBottom: 0} : {}}>
              <AxisTitle>
                <AxisName>{axis.axis.toUpperCase()}</AxisName>
                <AxisType>({axis.type.toUpperCase()})</AxisType>
              </AxisTitle>

              <AxisVisualization>
                <WheelGroups>
                  {renderWheelGroup(
                    axis.type === 'simples'
                      ? [axis.wheel[0]]
                      : [axis.wheel[0], axis.wheel[1]],
                    'left',
                    axis.type !== 'simples',
                  )}
                  {renderWheelGroup(
                    axis.type === 'simples'
                      ? [axis.wheel[1]]
                      : [axis.wheel[3], axis.wheel[2]],
                    'right',
                    axis.type !== 'simples',
                  )}
                </WheelGroups>
                <AxleLine />
              </AxisVisualization>
            </AxisContainer>
          );
        })}
      </>
    );
  };

  return axes && axes.length > 0 ? (
    <AxesContainer>{renderAllAxes()}</AxesContainer>
  ) : null;
};
export default function TireInspection({navigation}) {
  const [pending, setPending] = useState(false);
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleName, setVehicleName] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [vehicleListTmp, setVehiclesListTmp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDepth, setModalVisibleDepth] = useState(false);
  const [vehicleAxisWheel, setVehicleAxisWheel] = useState([]);
  const [pressure, setPressure] = useState('');
  const [depth, setDepth] = useState('');
  const [fireNumber, setFireNumber] = useState('');
  const [idTireStock, setIdTireStock] = useState('');

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      handleVehicles();
    });
    return focused;
  });

  async function handleVehicles() {
    try {
      const response = await Api.get('/vehicle/getoption/tire_inspection');

      const {data} = response.data;

      setVehiclesList(data);
      setVehiclesListTmp(data);
    } catch (error) {
      console.log('erro: ' + error);
      throw error;
    }
  }

  async function handleVehiclesAxisTire() {
    try {
      const response = await Api.get(
        `/vehicle_axis_wheel/getbyidvehicle/${vehicleId}`,
      );
      setPending(false);

      const {data} = response.data;

      setVehicleAxisWheel(data);
    } catch (error) {
      console.log('erro: ' + error);
      throw error;
    }
  }

  function selectVehicle(item) {
    setVehicleName(item.transit_board);
    setVehicleId(item.idvehicle);
    setModalVisible(false);
    setVehiclesList(vehicleListTmp);
    setPending(true);
  }

  async function changeVehicle(filterq) {
    const vehicleTest = vehicleListTmp.filter(
      e =>
        e.transit_board
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .indexOf(
            filterq
              .trim()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          ) !== -1,
    );
    setVehiclesList(vehicleTest);
  }

  useEffect(() => {
    if (vehicleId && pending) {
      handleVehiclesAxisTire();
    }
  }, [vehicleId, pending]);

  const handleSaveDepth = async () => {
    try {
      setModalVisibleDepth(false);
      const dataDepth = {
        tire_stock_id: idTireStock,
        depth: depth,
        pressure: pressure,
        date: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      };
      const response = await Api.post('/tire_depth', dataDepth);

      setPending(true);
      if (response.status === 200) {
        Alert.alert(
          'Resultado',
          `Salvo com sucesso as medidas para o pneu ${fireNumber}`,
        );
      }
    } catch (error) {
      console.log('erro: ' + error);
      throw Alert.alert('Erro', error);
    }
  };

  return (
    <Background>
      <Container>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ModalBody>
            <ModalButton onPress={() => setModalVisible(false)}>
              <ModalButtonText>Fechar</ModalButtonText>
            </ModalButton>
            <FormInput
              editable={true}
              onChangeText={e => changeVehicle(e)}
              placeholder="Pesquisar"
            />
            <FlatList
              data={vehiclesList}
              keyExtractor={comp => comp.idvehicle}
              renderItem={({item}) => (
                <VehicleContainer>
                  <TagContainer isMapped={Boolean(item.has_axis)}>
                    <ButtonSelectVehicle
                      onPress={() => selectVehicle(item)}
                      isSelected={vehicleId === item.idvehicle}>
                      {vehicleId === item.idvehicle && (
                        <ButtonSelectVehicleIcon
                          name="check"
                          size={16}
                          isSelected={vehicleId === item.idvehicle}
                        />
                      )}
                    </ButtonSelectVehicle>
                    <TagText isMapped={Boolean(item.has_axis)}>
                      {item.transit_board}
                      {' - '}
                      {Boolean(item.has_axis)
                        ? 'Pneus Mapeados'
                        : 'Pneus Não Mapeados'}
                    </TagText>
                  </TagContainer>
                </VehicleContainer>
              )}
            />
          </ModalBody>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleDepth}>
          <Overlay>
            <ModalBox>
              <Title>Informar dados do pneu</Title>
              <Label>Pneu: {fireNumber}</Label>

              <StyledInput
                placeholder="Pressão (PSI)"
                keyboardType="numeric"
                value={pressure}
                onChangeText={setPressure}
              />

              <StyledInput
                placeholder="Medida de Sulco (mm)"
                keyboardType="numeric"
                value={depth}
                onChangeText={setDepth}
              />

              <ButtonRow>
                <CancelButton onPress={() => setModalVisibleDepth(false)}>
                  <ButtonText>Cancelar</ButtonText>
                </CancelButton>
                <SaveButton onPress={handleSaveDepth}>
                  <ButtonText>Salvar</ButtonText>
                </SaveButton>
              </ButtonRow>
            </ModalBox>
          </Overlay>
        </Modal>

        <FormInput value={vehicleName} editable={false} />
        <ModalButtonSelect onPress={() => setModalVisible(true)}>
          <ModalButtonText>Selecionar Veículo</ModalButtonText>
        </ModalButtonSelect>

        <VehicleAxisVisualization
          axes={vehicleAxisWheel}
          onEditTire={wheel => {
            setFireNumber(wheel.fire_number);
            setIdTireStock(wheel.tire_stock_id);
            setDepth('');
            setPressure('');
            setModalVisibleDepth(true);
          }}
        />
      </Container>
    </Background>
  );
}

TireInspection.navigationOptions = {
  title: 'Inspeção de Pneus',
};
