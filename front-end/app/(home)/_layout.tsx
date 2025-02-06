import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <Stack>
        <Stack.Screen name='home' />
        <Stack.Screen name='profile' />
    </Stack>
  )
}