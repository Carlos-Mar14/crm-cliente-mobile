import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Icon, Tab, TabView } from "react-native-elements";
import { SupplyPointList } from "./SupplyPointList";

export default function CustomerCardTabs() {
  const [commentText, setCommentText] = useState("");

  const [tabIndex, setTabIndex] = useState(0);
  return (
    <View>
      <Tab value={tabIndex} onChange={setTabIndex}>
        <Tab.Item title="Comentarios" />
        <Tab.Item title="P.S" />
        <Tab.Item title="DOC" />
      </Tab>

      <TabView value={tabIndex} onChange={setTabIndex}>
        <TabView.Item style={{ width: "90%" }}>
          <View style={styles.commentsContainer}>
            <TextInput
              style={styles.commentsInput}
              onChangeText={setCommentText}
              value={commentText}
              placeholder="Nuevo comentario..."
            />
            <Button
              title="Enviar"
              onPress={() => console.log("Comentario enviado:", commentText)}
            />
          </View>
        </TabView.Item>

        <TabView.Item>
          <SupplyPointList />
        </TabView.Item>

        <TabView.Item>
          <View>
            <View style={styles.docStyle}>
              <View style={styles.buttonNewFile}>
                <TouchableOpacity
                  style={styles.addDocumentArchive}
                  onPress={() => console.log("Cargar archivo")}
                >
                  <Text style={styles.textStyleAddDoc}>
                    + AÑADIR NUEVO ARCHIVO
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updateDocButton}
                  onPress={() => console.log("Actualizar")}
                >
                  <Icon name="refresh" size={30} color="#008000" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.docContainer}>
              <Text style={styles.titlePs}>Fecha</Text>
              <Text style={styles.titlePs}>Usuario</Text>
              <Text style={styles.titlePs}>Archivo</Text>
              <Text style={styles.titlePs}>Typo</Text>
              <TouchableOpacity
                style={styles.downloadFilesButton}
                onPress={() => console.log("Download")}
              >
                <Icon
                  type="material"
                  name="file-download"
                  size={30}
                  color="#9c9c9c"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("Delete")}>
                <Icon name="delete" size={35} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        </TabView.Item>
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
    updateDocButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft: 30,
      },
      docContainer: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 8,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
  titlePs: {
    // define styles for titlePs
  },
  downloadFilesButton: {
    // width: 40,
    // height: 40,
    // justifyContent: "center",
    // alignItems: "center",
  },
  commentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  commentsInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
    padding: 10,
  },
  docStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonNewFile: {
    marginLeft: 960,
    width: 280,
    height: 40,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginBottom: -8,
  },
  addDocumentArchive: {
    backgroundColor: "#008000",
    borderWidth: 1,
    padding: 7,
    borderRadius: 10,
  },
  textStyleAddDoc: {
    color: "#FFFFFF",
    fontSize: 13,
  },
});
