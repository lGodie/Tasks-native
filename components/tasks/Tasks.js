import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { isEmpty, size } from 'lodash'
import {  deleteDocument, updateDocument, getTaskById } from '../../utils/actions'
import { TextInput, Form, StyleSheet, Text, View, Alert, Modal, TouchableHighlight } from 'react-native'
import { Card, ListItem, Button, Input, Divider, Avatar,Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { getCurrentUser } from '../../utils/actions'

export default function Tasks() {

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState("")
    const [idUser, setIdUser] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()


    useEffect(() => {
        (async () => {
            const emailUser = getCurrentUser().email
            const idUser = getCurrentUser().uid
            setEmail(emailUser)
            const result = await getTaskById(idUser)
            if (result.statusResponse) {
                setTasks(result.data)
            }
        })()
    }, [])

    const deleteTask = async (id) => {
        const result = await deleteDocument("task", id)
        if (!result.statusResponse) {
            setError(result.error)
            return
        }

        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const NavigationTask = () => {
        navigation.navigate("Savetasks")
    }

    const editTask = (theTask) => {
        console.log('theTask', theTask)
        setTask(theTask.name)
        setEditMode(true)
        setId(theTask.id)
        setModalVisible(true);
    }

    const updateTask = async (e) => {
        console.log(e)
        e.preventDefault()

        if (!validForm()) {
            return
        }

        const result = await updateDocument("task", id, { name: task })
        if (!result.statusResponse) {
            setError(result.error)
            return
        }

        const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
        setTasks(editedTasks)
        setEditMode(false)
        setTask("")
        setId("")
        setModalVisible(!modalVisible)
    }

    const deleteMessageTask = (id) => {
        Alert.alert(
            'Completar tarea',
            '¿Estas seguro que quieres completar la tarea?',
            [
                { text: 'Si', onPress: () => deleteTask(id) },
                { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }

    return (
        <View style={styles.viewBody}>
            <Icon
                    title="Agregar nueva tarea"
                    type="material-community"
                    name="plus"
                    color="#442484"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => NavigationTask()}
                />
            <View>
                <Text style={styles.titleText}>Bienvenido {email}</Text>
                
                {
                    size(tasks) === 0 ? (
                        <Text style={styles.titleText}>No hay tareas restritradas</Text>
                    ) : (
                        tasks.map((task) => (
                            <ListItem key={task.id}>
                                <ListItem.Content>
                                    <ListItem.Title>{task.name}</ListItem.Title>
                                    <Button
                                        title="Completar tarea"
                                        onPress={() => deleteMessageTask(task.id)}
                                        buttonStyle="#E37399"
                                    />
                                    <Button
                                        title="Editar"
                                        buttonStyle="#242a84"
                                        onPress={() => editTask(task)}
                                    />
                                </ListItem.Content>
                            </ListItem>
                        )))
                }
            </View>
            <View>
                {
                    editMode === true ? (

                        <View style={styles.centeredView}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible)

                                // Alert.alert('Modal has been closed.');
                            }}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible)

                                    // Alert.alert('Modal has been closed.');
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        {/* <View style={styles.inputGroup}> */}
                                        <View style={styles.container}>
                                            <Input
                                                style={styles.inputShit}
                                                placeholder="Name"
                                                onChange={(e) => setTask(e.target.value)}
                                                errorMessage={error}
                                                defaultValue={task}
                                            />
                                        </View>
                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                            onPress={(task) => {
                                                updateTask(task);
                                            }}>
                                            <Text style={styles.textStyle}>Editar Tarea</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    ) : null
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    btnContainer:{
      position:"absolute",
      bottom:10,
      right:10,
      shadowColor:"black",
      shadowOffset:{width:2,height:2},
      shadowOpacity:0.5
    },
    viewBody:{
        flex:1
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    input1: {
        height: 20,
        fontStyle:"normal",
        margin: 0,
        borderWidth: 40
    },
    inputShit: {
        margin: 0,
        height: 20,

        borderColor: '#ffffff',
        borderWidth: 40
    },
    inputGroup: {
        flex: 1,
        padding: 4,
        marginTop: 1,
        marginBottom: 15,
        borderBottomWidth: 1,
        // borderBottomColor: "#cccccc",
    },
    btn: {
        marginBottom: 7,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    }, centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 250
    },
    modalView: {
        margin: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 150,
            height: 100,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 500,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 300,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
});