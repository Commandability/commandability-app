/**
 * NewPersonnelItem Component
 *
 * Displays a person in a the new personnel list and sets a person's locationId in redux to STAGING when selected
 */

import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {selectPersonById, selectTheme} from '../../redux/selectors';
import {removePerson, movePerson} from '../../redux/actions';
import {staticLocations} from '../../utils/locations';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const {ROSTER, NEW_PERSONNEL} = staticLocations;

const NewPersonnelItem = ({personId}) => {
  const dispatch = useDispatch();
  const person = useSelector((state) => selectPersonById(state, personId));
  const theme = useSelector((state) => selectTheme(state));

  const [personIsSelected, setPersonIsSelected] = useState(false);

  const onPress = () => {
    setPersonIsSelected(true);

    Alert.alert('Remove person?', '', [
      {
        text: 'Cancel',
        onPress: () => {
          setPersonIsSelected(false);
        },
      },
      {
        text: 'OK',
        onPress: () => {
          setPersonIsSelected(false);
          isTemporary
            ? // Remove each temporary selected personId
              dispatch(removePerson(person))
            : // set each selected personId's new locationId to ROSTER
              dispatch(
                movePerson(
                  person,
                  NEW_PERSONNEL, // Set prev group to new personnel if no prev group in redux
                  ROSTER,
                ),
              );
        },
      },
    ]);
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const {isTemporary, firstName, lastName, badge, shift, organization} = person;
  const renderOverlay = personIsSelected;

  return (
    <>
      {renderOverlay ? <View style={styles.overlay} /> : null}
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.line}>
            <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.label}>{`${badge ? badge + ' ' : ''}`}</Text>
            <Text style={styles.label}>{`${shift ? shift : ''}`}</Text>
            <Text style={styles.label}>{`${
              organization ? organization : ''
            }`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

NewPersonnelItem.propTypes = {
  personId: PropTypes.string,
};

export default React.memo(NewPersonnelItem);
