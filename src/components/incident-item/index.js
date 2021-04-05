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
  selectGroupByLocationId,
} from '../../redux/selectors';
import { alertPersonToGroup, dealertPersonToGroup, togglePerson } from '../../redux/actions';
import themeSelector from '../../modules/themes';
import createStyleSheet from './styles';

const MS_IN_MINUTE = 60000;

const IncidentItem = ({ personId }) => {
  const dispatch = useDispatch();
  const person = useSelector(state => selectPersonById(state, personId));
  const { firstName, lastName, badge, shift, organization, locationId } = person;
  const group = useSelector(state => selectGroupByLocationId(state, locationId));
  const selectedPersonnel = useSelector(state =>
    selectSelectedPersonnel(state)
  );
  const theme = useSelector(state => selectTheme(state));

  const { locationUpdateTime } = person;
  const { alert } = group ?? {};
  
  const [time, setTime] = useState(Date.now() - locationUpdateTime);
  const [alerted, setAlerted] = useState(false);

  const personIsSelected = selectedPersonnel.some(
    person => person.personId === personId
  );

  const displayTime = Math.floor(time / MS_IN_MINUTE);

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

  // Won't run if alert is 0, which is when alerts are disabled! This happens when an alert is set and people are alerted, but then the alert is disabled
  // Also make text red instead of the overlay
  // Also also stop dispatching the dealert action every second lol
  // Don't have alerts in firebase by default? (potential solution to first problem)

  useEffect(() => {
    // If the item is in a group and an alert is active
    if (alert){
      if (displayTime >= alert){
        if (!alerted) {
          setAlerted(true);
          dispatch(alertPersonToGroup(group, person));
        }
      }
      else if(displayTime < alert){
        if (alerted) {
          setAlerted(false);
          dispatch(dealertPersonToGroup(group, person));
        }
      }
    // If an alert is no longer active but the item is alerted
    } else if (alerted) {
      setAlerted(false);
      dispatch(dealertPersonToGroup(group, person));
    }
  }, [alert, displayTime]);

  const onPress = () => {
    dispatch(togglePerson(person));
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const renderOverlay = personIsSelected;

  return (
    <>
      {renderOverlay && (
        <TouchableOpacity style={styles.overlay} onPress={onPress} />
      )}
      {alerted ? (
        <View pointerEvents="none" style={styles.contentAlert}/>
      ) : null}
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
  personId: PropTypes.string, // the person's personId
};

export default React.memo(IncidentItem);
