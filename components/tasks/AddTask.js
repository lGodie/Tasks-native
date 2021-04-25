import React, { useState, useEffect } from "react";
import {
    Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert
} from "react-native";
import Loading from '../Loading'
import { isEmpty, size } from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument, getTaskById } from '../../utils/actions'
import { getCurrentUser } from '../../utils/actions'
import { useNavigation } from '@react-navigation/native'
import { Input } from 'react-native-elements'

export default function AddTask() {

    const [task, setTask] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorName, setErrorName] = useState(null)


    const navigation = useNavigation()

    const validForm = () => {
        let isValid = true
        setError(null)

        if (isEmpty(task)) {
            setError("Debes ingresar una tarea.")
            Alert.alert(
                'Debes ingresar una tarea'
            );
            isValid = false
        }

        return isValid
    }

    const addTask = async (e) => {
        if (!validForm()) {
            return
        }
        task.idUser = getCurrentUser().uid
        setLoading(true)

        const result = await addDocument("task", task)
        setLoading(false)

        console.log('guardo')

        if (!result.statusResponse) {
            setError(result.error)
            return
        }
        setTask("")
        if (result.statusResponse) {
            navigation.reset()

        }

    }


    const onChange = (e, type) => {
        setTask({ ...task, [type]: e.nativeEvent.text })
    }


    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.input}

                placeholder="Ingresar nueva tarea"
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
                defaultValue={task.name}
            />


            {/* <View style={styles.button}> */}
            <Button title="Adicionar tarea" onPress={() => addTask()} />
            {/* </View> */}

            <Loading isVisible={loading} text="Guardando tarea..." />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#242a84"
    },
    icon: {
        color: "#c1c1c1"
    },
    btnGoogle: {
        backgroundColor: "#EA4335"
    }
});