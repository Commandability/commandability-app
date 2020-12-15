/**
 * IncidentItem Component
 *
 * Manages displaying a person in a group and sets a person as selected in redux and in local state on press.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectPersonById,
  selectSelectedPersonnel,
  selectTheme,
} from '../../redux/selectors';
import { togglePerson } from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const MS_IN_MINUTE = 60000;

const IncidentItem = ({ id, locationId }) => {
  const dispatch = useDispatch();
  const person = useSelector(state => selectPersonById(state, id));
  const selectedPersonnel = useSelector(state => selectSelectedPersonnel(state));
  const theme = useSelector(state => selectTheme(state));

  const { locationUpdateTime } = person;
  const [time, setTime] = useState(Date.now() - locationUpdateTime);

  const personIsSelected = selectedPersonnel.some(person => person.id === id);

  useEffect(() => {
    let intervalID = '';
    const timeoutID = setTimeout(() => {
      setTime(Date.now() - locationUpdateTime);
      intervalID = setInterval(
        () => setTime(Date.now() - locationUpdateTime),
        MS_IN_MINUTE
      );
    }, MS_IN_MINUTE - ((Date.now() - locationUpdateTime) % MS_IN_MINUTE));

    return () => {
      clearInterval(timeoutID);
      clearInterval(intervalID);
    };
  }, [locationUpdateTime]);

  const onPress = () => {
    dispatch(togglePerson(person, locationId));
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const { firstName, lastName, badge, shift, organization } = person;
  const displayTime = Math.floor(time / MS_IN_MINUTE);
  const renderOverlay = personIsSelected;

  return (
    <>
      {renderOverlay && (
        <TouchableOpacity style={styles.overlay} onPress={onPress} />
      )}
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.mainLine}>
            <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
            <Text style={styles.time}>{`${displayTime}`}</Text>
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

// props validation
IncidentItem.propTypes = {
  id: PropTypes.string, // the person's id
  locationId: PropTypes.string, // the parent groupName
};

export default React.memo(IncidentItem);
