import React from 'react';
import { Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

const PDFDocument = (props) => {
  return (
    <Document>
      <Page>
        <View style={styles.container}>
          <Text style={styles.title}>Comprobante de Almacén de Frutas</Text>
          <Text>Nombre: {props.nombre}</Text>
          <Text>Número de Socio: {props.numeroSocio}</Text>
          <Text>DNI: {props.dni}</Text>
          <Text>Fecha: {props.fecha}</Text>
          <View style={styles.section}>
            <Text style={styles.label}>Total Kilos: {props.totalKilos}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Tara: {props.tara}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Kilos de Primera Clase: {props.kilosPrimera}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Kilos de Segunda Clase: {props.kilosSegunda}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;