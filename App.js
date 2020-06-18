import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Alert } from 'react-native';
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
  const [madasAtivo, madasMudarEstado] = useState(false);
  const [PLPsAtivo, PLPsMudarEstado] = useState(false);
  const [isEventShowing, setEventState] = useState(false);
  const [selectDay, setSelectDay] = useState('2020-06-15');
  const [markedDays, setMarkedDays] = useState({ [selectDay]: {selected: true, color: primaryColor}})



  function atualizarEstado() {
    madasMudarEstado(!madasAtivo);
  }

  function atualizarEstadoPLPs() {
    PLPsMudarEstado(!PLPsAtivo);
  }

  const datasMadas = {
    '2020-05-28': {selected: true, startingDay: true, color: primaryColor, endingDay: true},
    '2020-05-22': {selected: true, startingDay: true, color: primaryColor},
    '2020-05-23': {selected: true, color: primaryColor, endingDay: true},
  }

  const datasPLPs = {
    '2020-05-10': {selected: true, startingDay: true, color: secundaryColor},
    '2020-05-11': {selected: true, color: secundaryColor, endingDay: true}
  }
  const markedDates = {
    ...PLPsAtivo ? datasPLPs : {},
    ...madasAtivo ? datasMadas : {}
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={{width:"90%"}}
        // Initially visible month. Default = Date()
        current={selectDay}

        markedDates={markedDays}

        onDayPress={(day)=> {
          setEventState(true); 
          setSelectDay(day.dateString);
          setMarkedDays({[day.dateString]: {selected: true, selectedColor: primaryColor, startingDay: true, endingDay: true}})
        console.log(day)}}

        theme={{ arrowColor: primaryColor }}
      />
      <View style={styles.rowContainer}>
        <View style={styles.switchContainer}>
          <Text> Madás </Text>
          <Switch
            thumbColor={primaryColor}
            value={madasAtivo}
            onValueChange={atualizarEstado}/>
        </View>
        <View style={styles.switchContainer}>
          <Text> PLPs </Text>
          <Switch 
          thumbColor={secundaryColor} 
          value={PLPsAtivo}
          onValueChange={atualizarEstadoPLPs}
          />
        </View>
      </View>
      {isEventShowing ?  
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitulo}>
          Formação interna
        </Text>
        <Text style={styles.cardHorario}>
          14:00 às 16:00
        </Text>
      </View>: null}
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
  },
  cardContainer: {
    backgroundColor: '#fff',
    minHeight: 20,
    width: '90%',
    margin: 20,
    borderRadius: 18,
    paddingLeft: 20,
    elevation: 10
  },
  cardTitulo: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10
  },
  cardHorario: {
    fontStyle: "italic",
    color: '#646464',
    marginBottom: 20
  }
})

const primaryColor = '#5e64ab';
const secundaryColor = '#17a1ce';
const whiteColor = '#ffffff';

