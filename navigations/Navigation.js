import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from 'react-native-elements'

import Tasks from '../components/tasks/Tasks'
import AddTask from '../components/tasks/AddTask'
import LoginForm from '../components/account/LoginForm'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function Navigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#1a1fba",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen
                    name="login"
                    component={LoginForm}
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    name="tasks"
                    component={Tasks}
                    options={{ title: "Tareas" }}
                />
                <Stack.Screen
                    name="Savetasks"
                    component={AddTask}
                    options={{ title: "Agregar Tareas" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}