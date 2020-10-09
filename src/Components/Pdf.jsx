import React from 'react';
import { PDFViewer,Document, Page, View, Text, Image, StyleSheet} from '@react-pdf/renderer';
import Logo from "../Images/tpp.png";

const styles=StyleSheet.create({
    page: { 
        backgroundColor: "#F8F8FF",
    },
    logo: {
        height: "150px",
        width: "150px",
        marginTop: "10px",
        marginLeft: "250px",
        marginBottom: "45px",
    },
    section:{
        marginLeft: "20px"
    },
    text:{
        marginBottom: "15px"
    }
})

const Pdf= (props)=>{
    return (
        <PDFViewer height="762px" width="100%">
            <Document>
                <Page style={styles.page}>
                    <View>
                        <Image src={Logo} style={styles.logo}/>
                        <View style={styles.section}>
                            <Text style={styles.text}>Property Name:</Text>
                            <Text style={styles.text}>Property Address:</Text>
                            <Text style={styles.text}>Description:</Text>
                        </View>
                        <View style={styles.section}>
                        <Text style={styles.text}>Images:</Text>
                            <View>
                                {/*property images*/}
                            </View>
                        </View>
                        <View style={styles.section}>
                        <Text style={styles.text}>Broker Name:</Text>
                        <Text style={styles.text}>Broker Email Id:</Text>
                        <Text style={styles.text}>Broker Phone No. :</Text>
                        </View>
                        <View style={styles.section}>
                        <Text style={styles.text}>Footer</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}

export default Pdf;