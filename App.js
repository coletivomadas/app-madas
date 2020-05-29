import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Calendar, LocaleConfig, defaultLocale } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

export default function App() {
  const currentDate = new Date();
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={styles.container}>
      <Calendar
        style={{width:"90%"}}
        // Initially visible month. Default = Date()
        current={currentDate}

        markedDates={{
          '2020-05-10': {selected: true, startingDay: true, color: primaryColor},
          '2020-05-11': {selected: true, color: primaryColor, endingDay: true},
          '2020-05-28': {selected: true, startingDay: true, color: primaryColor, endingDay: true},
          '2020-05-22': {selected: true, startingDay: true, color: secundaryColor, endingDay: true},
          '2020-05-23': {selected: true, startingDay: true, color: secundaryColor, endingDay: true},

        }}
        markingType={'period'}

        theme={{ arrowColor: primaryColor }}
      />
      <View style={styles.rowContainer}>
        <View style={styles.switchContainer}>
          <Text> Madás </Text>
          <Switch thumbColor={primaryColor} value={isEnabled} onValueChange={() => setIsEnabled(!isEnabled)}/>
        </View>
        <View style={styles.switchContainer}>
          <Text> PLPs </Text>
          <Switch thumbColor={secundaryColor} value={true}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 48,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }

})

const primaryColor = '#5e64ab';
const secundaryColor = '#17a1ce';
const whiteColor = '#ffffff';
