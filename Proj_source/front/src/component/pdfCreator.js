import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const EngineDataPDF = (data) => 
{
  console.log(data.data); 

  const Data = () => `${data.data}`;
  
  return (
  <Document>
  <Page size="A4" style={styles.page}>
    <Text children={<Data/>} ></Text>
  </Page>
</Document>
)};

export default EngineDataPDF;