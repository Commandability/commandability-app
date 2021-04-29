/**
 * IncidentItem Component
 *
 * Displays a person in a group or incident location and sets a person as selected in redux and in local state on press
 */

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  selectPersonById,
  selectSelectedPersonnel,
  selectTheme,
  selectGroupByLocationId,
} from '../../redux/selectors';
import {
  alertPersonToGroup,
  dealertPersonToGroup,
  togglePerson,
} from '../../redux/actions';
import themeSelector from '../../utils/themes';
import createStyleSheet from './styles';

const MS_IN_MINUTE = 60000;

const IncidentItem = ({personId}) => {
  const dispatch = useDispatch();
  const person = useSelector((state) => selectPersonById(state, personId));
  const {firstName, lastName, badge, shift, organization, locationId} = person;
  const group = useSelector((state) =>
    selectGroupByLocationId(state, locationId),
  );
  const selectedPersonnel = useSelector((state) =>
    selectSelectedPersonnel(state),
  );
  const theme = useSelector((state) => selectTheme(state));

  const {locationUpdateTime} = person;

  const [minutesElapsed, setMinutesElapsed] = useState(
    Math.floor((Date.now() - locationUpdateTime) / MS_IN_MINUTE),
  );

  const [alertedItem, setAlertedItem] = useState(false);

  const personIsSelected = selectedPersonnel.some(
    (_person) => _person.personId === personId,
  );

  useEffect(() => {
    let intervalID = '';
    const timeoutID = setTimeout(() => {
      setMinutesElapsed(
        Math.floor((Date.now() - locationUpdateTime) / MS_IN_MINUTE),
      );
      intervalID = setInterval(
        () =>
          setMinutesElapsed(
            Math.floor((Date.now() - locationUpdateTime) / MS_IN_MINUTE),
          ),
        MS_IN_MINUTE,
      );
    }, MS_IN_MINUTE - ((Date.now() - locationUpdateTime) % MS_IN_MINUTE));

    return () => {
      clearInterval(timeoutID);
      clearInterval(intervalID);
    };
  }, [locationUpdateTime]);

  useEffect(() => {
    const {alert} = group ?? {};

    // If the item is in a group and an alert is active
    if (alert && minutesElapsed >= alert) {
      if (!alertedItem) {
        setAlertedItem(true);
        dispatch(alertPersonToGroup(group, person));
      }
    } else {
      if (alertedItem) {
        dispatch(dealertPersonToGroup(group, person));
        setAlertedItem(false);
      }
    }
  }, [dispatch, alertedItem, group, person, minutesElapsed]);

  const onPress = () => {
    dispatch(togglePerson(person));
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);
  const renderOverlay = personIsSelected;

  return (
    <>
      {renderOverlay ? (
        <TouchableOpacity style={styles.overlay} onPress={onPress} />
      ) : null}
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.line}>
            <Text
              style={[
                styles.name,
                alertedItem && styles.alertText,
              ]}>{`${firstName} ${lastName}`}</Text>
            <Text
              style={[
                styles.minutesElapsed,
                alertedItem && styles.alertText,
              ]}>{`${minutesElapsed}`}</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.label, alertedItem && styles.alertText]}>{`${
              badge ? badge + ' ' : ''
            }`}</Text>
            <Text style={[styles.label, alertedItem && styles.alertText]}>{`${
              shift ? shift : ''
            }`}</Text>
            <Text style={[styles.label, alertedItem && styles.alertText]}>{`${
              organization ? organization : ''
            }`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

IncidentItem.propTypes = {
  personId: PropTypes.string,
};

export default React.memo(IncidentItem);
