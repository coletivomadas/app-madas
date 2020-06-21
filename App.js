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
  const [cardEvento, setEventState] = useState(null);

  const datasMadas = {
    '2020-06-28': {selected: true, startingDay: true, color: primaryColor, endingDay: true},
    '2020-06-22': {selected: true, startingDay: true, color: primaryColor},
    '2020-06-23': {selected: true, color: primaryColor, endingDay: true},
  }
  
  const datasPLPs = {
    '2020-06-10': {selected: true, startingDay: true, color: secundaryColor},
    '2020-06-11': {selected: true, color: secundaryColor, endingDay: true}
  }

  const markedDates = {
    ...PLPsAtivo ? datasPLPs : {},
    ...madasAtivo ? datasMadas : {}
  };

  // Controla qual dia está selecionado;
  // const [selectDay, setSelectDay] = useState('2020-06-15');

  // Controla quais dias estão marcados no calendário;
  const [markedDays, setMarkedDays] = useState({
    ...markedDates
    // [selectDay]: {selected: true, color: primaryColor}
  })

  function atualizarEstado() {
    setMarkedDays({ ...(madasAtivo === false) ? datasMadas : {} });
    madasMudarEstado(!madasAtivo);
  }

  function atualizarEstadoPLPs() {
    setMarkedDays({ ...(PLPsAtivo === false) ? datasPLPs : {} });
    PLPsMudarEstado(!PLPsAtivo);
  }

  return (
    <View style={styles.container}>
      <Calendar
        style={{width:"90%"}}
        // Initially visible month. Default = Date()
        // current={selectDay}

        markedDates={markedDays}

        onDayPress={(day)=> {
          if (markedDays[day]) {
            setEventState({ titulo: 'Planejamento 2020', horario: '08h00 às 18h00' })
          } else {
            setEventState({ titulo: 'Nada marcado para esse dia. :(', horario: null})
          }
        }}

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
      {cardEvento ?  
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitulo}>
          {cardEvento.titulo}
        </Text>
        <Text style={styles.cardHorario}>
          {cardEvento.horario}
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

