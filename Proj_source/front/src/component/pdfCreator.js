import React from 'react';
import { Page, Text, Document, StyleSheet, Image, Font} from '@react-pdf/renderer';
import unitnLogo from '../img/unitn.png';

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 2,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 15,
    marginHorizontal: 200,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// Create Document Component
const EngineDataPDF = (data) => {
  let lott_num = data.data[0];
  let thread_fatt = data.data[1];
  let cage_fatt = data.data[2];
  let temp = data.data[3];
  let volt = data.data[4];
  let fr = data.data[5];
  let Y = data.data[6];

  const LottoStr = () => `Lot Serial Number: ${lott_num}`;
  const ThreadFattStr = () => `Thread Invoice number:  ${thread_fatt}`;
  const CageFattStr = () => `Cage Invoice number:  ${cage_fatt}`;
  const TempStr = () => `Max Temperature:  ${temp} °C`;
  const VoltStr = () => `Nominal Voltage: ${volt} V`;
  const FrStr = () => `Nominal Frequency: ${fr} Hz`;
  const YStr = () => `Motor Configuration : ${Y}`;

  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Complete lot data</Text>
        <Text style={styles.author} children={<LottoStr />}></Text>
        <Image src={unitnLogo} style={styles.image} />
        <Text style={styles.subtitle} children={<ThreadFattStr />} ></Text>
        <Text style={styles.subtitle} children={<CageFattStr />} ></Text>
        <Text style={styles.subtitle} children={<TempStr />} ></Text>
        <Text style={styles.subtitle} children={<VoltStr />} ></Text>
        <Text style={styles.subtitle} children={<FrStr />} ></Text>
        <Text style={styles.subtitle} children={<YStr />} ></Text>
      </Page>
    </Document>
  )
}; 

// Create Document Component
const PumpDataPDF = (data) => {
  let lott_num = data.data[0];
  let body_fatt = data.data[1];
  let engine_fatt = data.data[2];
  let fr = data.data[3];
  let speed = data.data[4];
  let depth = data.data[5];
  let temp = data.data[6];
  let engine_lott = data.data[7];

  const LottoStr = () => `Lot Serial Number: ${lott_num}`;
  const BodyFattStr = () => `Body Invoice number:  ${body_fatt}`;
  const EngineFattStr = () => {
    if (engine_fatt === "0")
      return `Engine Lot Serial Number:  ${engine_lott}`;
    else
      return `Engine Invoice number:  ${engine_fatt}`;
  }
  const FrStr = () => `Nominal Frequency: ${fr} Hz`;
  const SpeedStr = () => `Speed at full capacity : ${speed} RPM`;
  const DepthStr = () => `Max depth : ${depth} m`;
  const TempStr = () => `Max Temperature:  ${temp} °C`;

  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Complete lotto data</Text>
        <Text style={styles.author} children={<LottoStr />}></Text>
        <Image src={unitnLogo} style={styles.image} />
        <Text style={styles.subtitle} children={<BodyFattStr />} ></Text>
        <Text style={styles.subtitle} children={<EngineFattStr />} ></Text>
        <Text style={styles.subtitle} children={<FrStr />} ></Text>
        <Text style={styles.subtitle} children={<SpeedStr />} ></Text>
        <Text style={styles.subtitle} children={<DepthStr />} ></Text>
        <Text style={styles.subtitle} children={<TempStr />} ></Text>
      </Page>
    </Document>
  )
};

export {EngineDataPDF, PumpDataPDF};